export type HealthyStatus = 'healthy' | 'unhealthy';

export interface HealthStatus {
  status: 'ok' | 'error';
  timestamp: string;
  uptime: number;
  environment: string;
  version: string;
  dependencies: {
    database: HealthyStatus;
    n8n: HealthyStatus;
    ollama: HealthyStatus;
  };
}

export interface ReadinessStatus {
  status: 'ready' | 'not-ready';
  checks: {
    database: boolean;
    migrations: boolean;
  };
}

export interface LivenessStatus {
  status: 'alive';
  timestamp: string;
}
