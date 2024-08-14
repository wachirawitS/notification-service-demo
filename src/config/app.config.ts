import { registerAs } from "@nestjs/config";

export interface IAppConfig {
  redis: {
    host: string;
    port: number;
  };
}

export default registerAs('appConfig', (): IAppConfig => ({
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379
  }
}));