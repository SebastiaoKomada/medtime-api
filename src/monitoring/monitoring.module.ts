import { Module } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';
import { MonitoringEntity } from './entities/monitoring.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitoringController } from './monitoring.controller';
import { ProfileIdModule } from 'src/profile/profile-id/profile-id.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MonitoringEntity]),
     ProfileIdModule
  ], 
  controllers: [MonitoringController],
  providers: [MonitoringService],
  exports: [MonitoringService],

})
export class MonitoringModule {}
