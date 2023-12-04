import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
})
export class NotificationGateway {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('NotificationGateway');
  private myNotification;

  @SubscribeMessage('msgToServer')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: boolean): void {
    //console.log('Mensagem recebida do frontend:', payload);

    if(payload == true) {
      this.emitNotification(this.myNotification)
    } else {
      this.server.emit('msgToClient', 'Erro',);
    }
  }
  emitNotification(notificacao: any): void {
    this.myNotification = notificacao;
    this.server.emit('notificacao', notificacao);
  }


  afterInit(server: Server) {
    this.logger.log('WebSocket Gateway initialized');
  }

  // handleConnection(client: Socket) {
  //   this.logger.log(`Client connected: ${client.id}`);
  // }

  // handleDisconnect(client: Socket) {
  //   this.logger.log(`Client disconnected: ${client.id}`);
  // }
}
