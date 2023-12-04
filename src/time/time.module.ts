import { TimeEntity } from './entities/time.entity';
import { Module } from '@nestjs/common';
import { TimeService } from './time.service';
import { TimeController } from './time.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { ProfileService } from 'src/profile/profile.service'; 
import { UserModule } from 'src/user/user.module';
import { ProfileModule } from 'src/profile/profile.module';
import { ProfileIdModule } from 'src/profile/profile-id/profile-id.module';
import { ProfileEntity } from 'src/profile/entities/profile.entity';
import { NotificationGateway } from 'src/notification/notification.gateway';
import { NotificationModule } from 'src/notification/notification.module';
import { MedicationEntity } from 'src/medication/entities/medication.entity';
import { ConfirmationEntity } from 'src/confirmation/entities/confirmation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TimeEntity]), TypeOrmModule.forFeature([ProfileEntity]), TypeOrmModule.forFeature([MedicationEntity]), UserModule, ProfileModule, ProfileIdModule, NotificationModule],
  providers: [TimeService, NotificationGateway],
  controllers: [TimeController],
  exports: [TimeService],

})
export class TimeModule {}
