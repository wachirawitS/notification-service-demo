import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class ServiceGateway implements OnGatewayConnection, OnGatewayDisconnect {
  public handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  public handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnect`);
  }

  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('join-rooms')
  public handleJoinRooms(client: Socket, rooms: string[]) {
    /* console.log('join rooms', rooms); */
    rooms.map((room) => {
      client.join(room);
    });
  }

  public boardcastNotify(room: string, msg: any) {
    this.server.to(room).emit(`messageRoom${room}`, {...msg, room});
  }
}
