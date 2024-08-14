import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('hq')
export class HqController {
  constructor(@Inject('HQ_SERVICE') private client: ClientProxy) {}

  @Post('publish-message')
  public publicMessage(@Body() requestBody: any) {
    this.client.emit('publish-message', requestBody);
    return { isSuccess: true };
  }
}
