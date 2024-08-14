import { Module } from '@nestjs/common';
import { HqController } from './http/hq.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MainMicroService } from './microservice/main.microservice';
import { ServiceGateway } from './web-gateway/service.gateway';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig, { IAppConfig } from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    ClientsModule.registerAsync([
      {
        name: 'HQ_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          const appConfig = configService.get<IAppConfig>("appConfig")
          return {
            transport: Transport.REDIS,
            options: appConfig.redis
          }
        },
      },
      {
        name: 'SOCKET_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          const appConfig = configService.get<IAppConfig>("appConfig")
          return {
            transport: Transport.REDIS,
            options: appConfig.redis
          }
        },
      },
    ]),
    /* ClientsModule.register([
      {
        name: 'HQ_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
      {
        name: 'SOCKET_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]), */
  ],
  controllers: [HqController, MainMicroService],
  providers: [ServiceGateway],
})
export class AppModule {}
