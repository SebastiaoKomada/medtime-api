import { Injectable } from '@nestjs/common';
import * as webpush from 'web-push'

@Injectable()
export class NotificationService {
  private vapidKeys = {
    publicKey: 'BAQ08t2D4WLtaIIP_wfpZlZAKuCaUE1OIkPeVjVDb_HQ4BW2_LcYFfBomsK7cJiHosIySBsrOZ0qQ8C91Us3Gd0',
    privateKey: 'uJ_dVg0EFK-y1QxV4_HHuWc34vhXWcyPYtGoJ8e1RqE',
  };

  constructor() {
    webpush.setVapidDetails(
      'mailto:sebastiao.komada15@hotmail.com',
      this.vapidKeys.publicKey,
      this.vapidKeys.privateKey
    );
  }
  getPublicKey(): string {
    return this.vapidKeys.publicKey;
  }

  sendNotification(subscription: { endpoint: string, keys: { p256dh: string, auth: string } }, title: string, body: string, action_click: string) {
    const payload = {
      title: title,
      body: body,
      action_click: action_click,
    };
    return webpush.sendNotification(subscription, JSON.stringify(payload));
  }
}
