import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/prisma.service';
import {
  HealthStatus,
  ReadinessStatus,
  LivenessStatus,
  HealthyStatus,
} from './health.types';

@Injectable()
export class HealthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async getHealthStatus(): Promise<HealthStatus> {
    const dependencies = await this.checkDependencies();
    const overallStatus = Object.values(dependencies).every(
      (status) => status === 'healthy',
    )
      ? 'ok'
      : 'error';

    return {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: this.configService.get('NODE_ENV') || 'development',
      version: process.env.npm_package_version || '1.0.0',
      dependencies,
    };
  }

  async getReadinessStatus(): Promise<ReadinessStatus> {
    const databaseCheck = await this.checkDatabase();
    const migrationsCheck = await this.checkMigrations();

    return {
      status: databaseCheck && migrationsCheck ? 'ready' : 'not-ready',
      checks: {
        database: databaseCheck,
        migrations: migrationsCheck,
      },
    };
  }

  getLivenessStatus(): LivenessStatus {
    return {
      status: 'alive',
      timestamp: new Date().toISOString(),
    };
  }

  private async checkDependencies(): Promise<{
    database: HealthyStatus;
    n8n: HealthyStatus;
    ollama: HealthyStatus;
  }> {
    const [database, n8n, ollama] = await Promise.allSettled([
      this.checkDatabase(),
      this.checkN8n(),
      this.checkOllama(),
    ]);

    return {
      database:
        database.status === 'fulfilled' && database.value
          ? 'healthy'
          : 'unhealthy',
      n8n: n8n.status === 'fulfilled' && n8n.value ? 'healthy' : 'unhealthy',
      ollama:
        ollama.status === 'fulfilled' && ollama.value ? 'healthy' : 'unhealthy',
    };
  }

  private async checkDatabase(): Promise<boolean> {
    try {
      await this.prismaService.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }

  private async checkMigrations(): Promise<boolean> {
    try {
      // Verificar que la tabla _prisma_migrations existe
      await this.prismaService
        .$queryRaw`SELECT 1 FROM information_schema.tables WHERE table_name = '_prisma_migrations'`;
      return true;
    } catch {
      return false;
    }
  }

  private async checkN8n(): Promise<boolean> {
    try {
      const n8nUrl: string =
        this.configService.get<string>('N8N_WEBHOOK_URL') ||
        'http://localhost:5678';
      const response = await fetch(
        `${n8nUrl.replace('/webhook', '')}/healthz`,
        {
          method: 'GET',
          signal: AbortSignal.timeout(5000), // 5 segundos timeout
        },
      );
      return response.ok;
    } catch {
      return false;
    }
  }

  private async checkOllama(): Promise<boolean> {
    try {
      const ollamaUrl: string =
        this.configService.get<string>('OLLAMA_URL') ||
        'http://localhost:11434';
      const response = await fetch(`${ollamaUrl}/api/tags`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000), // 5 segundos timeout
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}
