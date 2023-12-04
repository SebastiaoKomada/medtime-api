import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileIdModule } from 'src/profile/profile-id/profile-id.module';
import { MedicationController } from './medication.controller';
import { MedicationService } from './medication.service';
import { MedicationEntity } from './entities/medication.entity';
import { TimeEntity } from 'src/time/entities/time.entity';
@Module({
  imports: [TypeOrmModule.forFeature([MedicationEntity]),TypeOrmModule.forFeature([TimeEntity]), ProfileIdModule],
  controllers: [MedicationController],
  providers: [MedicationService],
  exports: [MedicationService],
})
export class MedicationModule { }