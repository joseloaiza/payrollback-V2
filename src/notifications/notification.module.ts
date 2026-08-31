import { Module } from '@nestjs/common';
import { NotificationService } from './notification/notification.service';
import { NotificationController } from './notification/notification.controller';

@Module({
  providers: [NotificationService],
  controllers: [NotificationController]
})
export class NotificationsModule {}
