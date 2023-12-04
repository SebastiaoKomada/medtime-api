import { Injectable } from '@nestjs/common';
import { CreateMonitoringDto } from './dtos/createMonitoring.dto';
import { MonitoringEntity } from './entities/monitoring.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MonitoringService {
  constructor(
    @InjectRepository(MonitoringEntity)
    private readonly monitoringRepository: Repository<MonitoringEntity>

  ) { }

  async createMonitoring(createMonitoringDto: CreateMonitoringDto, monPerId: number): Promise<MonitoringEntity> {

    return this.monitoringRepository.save({
      ...createMonitoringDto, 
      monPerId
    }
    )

  }

  async findMonitoringById(monId: number): Promise<MonitoringEntity> {
    const monitoringEntity = await this.monitoringRepository.findOne({
      where: {
        monId,
      },
    });

    return monitoringEntity;
  }

  async gettAllMonitoringByPerId(monPerId: number): Promise<MonitoringEntity[]> {
    return this.monitoringRepository.find({
      where: {
        monPerId,
      }
    }).catch(() => undefined);
  }

  // async gettAllMonitoringBymonSintomas( monPerId: number, monSintomas: string): Promise<MonitoringEntity[]> {
  //   return this.monitoringRepository.find({
  //     where: {
  //       monSintomas,
  //       monPerId
  //     }
  //   }).catch(() => undefined);
  // }
}
