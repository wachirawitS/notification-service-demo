import { Module } from '@nestjs/common';
import { HqController } from './http/hq.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MainMicroService } from './microservice/main.microservice';
import { ServiceGateway } from './web-gateway/service.gateway';

@Module({
  imports: [
    ClientsModule.register([
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
    ]),
  ],
  controllers: [HqController, MainMicroService],
  providers: [ServiceGateway]
})
export class AppModule {}
