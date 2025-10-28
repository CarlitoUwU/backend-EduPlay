import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthService } from './health.service';
import type {
  HealthStatus,
  ReadinessStatus,
  LivenessStatus,
} from './health.types';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({
    summary: 'Health check endpoint',
    description: 'Verifica el estado de la aplicación y sus dependencias',
  })
  @ApiResponse({
    status: 200,
    description: 'Sistema funcionando correctamente',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' },
        timestamp: { type: 'string', example: '2025-10-28T10:30:00.000Z' },
        uptime: { type: 'number', example: 123456 },
        environment: { type: 'string', example: 'development' },
        version: { type: 'string', example: '1.0.0' },
        dependencies: {
          type: 'object',
          properties: {
            database: { type: 'string', example: 'healthy' },
            n8n: { type: 'string', example: 'healthy' },
            ollama: { type: 'string', example: 'healthy' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 503,
    description: 'Servicio no disponible - Una o más dependencias fallan',
  })
  async checkHealth(): Promise<HealthStatus> {
    return this.healthService.getHealthStatus();
  }

  @Get('ready')
  @ApiOperation({
    summary: 'Readiness check',
    description: 'Verifica si la aplicación está lista para recibir tráfico',
  })
  @ApiResponse({
    status: 200,
    description: 'Aplicación lista',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ready' },
        checks: {
          type: 'object',
          properties: {
            database: { type: 'boolean', example: true },
            migrations: { type: 'boolean', example: true },
          },
        },
      },
    },
  })
  async checkReadiness(): Promise<ReadinessStatus> {
    return this.healthService.getReadinessStatus();
  }

  @Get('live')
  @ApiOperation({
    summary: 'Liveness check',
    description: 'Verifica si la aplicación está viva (para Kubernetes)',
  })
  @ApiResponse({
    status: 200,
    description: 'Aplicación viva',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'alive' },
        timestamp: { type: 'string', example: '2025-10-28T10:30:00.000Z' },
      },
    },
  })
  checkLiveness(): LivenessStatus {
    return this.healthService.getLivenessStatus();
  }
}
