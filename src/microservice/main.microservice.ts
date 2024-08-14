import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { INotifyMessage } from 'src/interface/publish-message.interface';
import { ServiceGateway } from 'src/web-gateway/service.gateway';

@Controller()
export class MainMicroService {
  constructor(private readonly gatewayService: ServiceGateway) {}

  @EventPattern('publish-message')
  public sendToClient(data: INotifyMessage) {
    this.gatewayService.boardcastNotify(data.room, data.msg);
  }
}