import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from './config/app.config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: '*' } });
  const configService = app.get(ConfigService);
  const appConfig = configService.get<IAppConfig>("appConfig");
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: appConfig.redis
  });
  await app.startAllMicroservices();
  await app.listen(3010);
  Logger.log(JSON.stringify(appConfig), 'AppConfig')
}
bootstrap();
