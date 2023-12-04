import { Module } from '@nestjs/common';
import { ConfirmationController } from './confirmation.controller';
import { ConfirmationService } from './confirmation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfirmationEntity } from './entities/confirmation.entity';
import { TimeModule } from 'src/time/time.module';
import { MedicationModule } from 'src/medication/medication.module';
import { ProfileIdModule } from 'src/profile/profile-id/profile-id.module';
import { ProfileModule } from 'src/profile/profile.module';
import { MedicationEntity } from 'src/medication/entities/medication.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConfirmationEntity]),TypeOrmModule.forFeature([MedicationEntity]),
    TimeModule, MedicationModule, ProfileModule, ProfileIdModule
  ],
  controllers: [ConfirmationController],
  providers: [ConfirmationService]
})
export class ConfirmationModule { }
