import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { TimeService } from 'src/time/time.service';
import { UserId } from 'src/decorators/user-id.decorator';
import { UserType } from 'src/user/enum/user.enum';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService,
        private readonly timeService: TimeService,
    ) { }

    @Get('public_key')
    getPublicKey(): { publicKey: string } {
        const publicKey = this.notificationService.getPublicKey();
        return { publicKey };
    }

    // @Post('send')
    // sendPush(@Body() sendPushBody: { subscription: any }) {
    //     const { subscription } = sendPushBody;
    //     return this.notificationService.sendNotification(subscription, 'Hora de tomar seus medicamentos!');
    // }

    @Roles(UserType.User)
    @Post('register')
    async getInfo(@UserId() horUsuId: number, @Body() sendPushBody: { subscription: { endpoint: string, keys: { p256dh: string, auth: string } } }) {
        try {
            const { subscription } = sendPushBody;
            this.timeService.startChecking(horUsuId, subscription, );
            return { success: true, message: 'Registro bem-sucedido' };
        } catch (error) {
            throw new Error('Erro ao processar a solicitação de registro.')
        }
    }
}
