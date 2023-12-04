import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';
import { CreateMonitoringDto } from './dtos/createMonitoring.dto';
import { ProfileIdService } from 'src/profile/profile-id/profile-id.service';
import { MonitoringEntity } from './entities/monitoring.entity';
import { ReturnMonitoringDto } from './dtos/returnMonitoring.dto';

@Controller('monitoring')
export class MonitoringController {
  constructor(
    private monitoringService: MonitoringService , 
    private readonly profileIdService:ProfileIdService
    ) { }

  @Post('/:monPerId')
  async createMonitoring(
    @Body() createMonitoringDto: CreateMonitoringDto, 
    @Param('monPerId') monPerId: number
    ): Promise<MonitoringEntity>  {
    return this.monitoringService.createMonitoring(
      createMonitoringDto,
      monPerId
    ); //passa os dados para o monitoringData no service
  
  }

  
  @Get()
  async gettAllMonitoringByPerId(@Param('monPerId') monPerId: number): Promise<ReturnMonitoringDto[]> {
    const newPerId = this.profileIdService.getProfileId();
    const result = this.monitoringService.gettAllMonitoringByPerId(newPerId)
    return result;
  }

  @Get("/count")
  async countAllMonitoringByPerId(@Param('monPerId') monPerId: number): Promise<Record<string, number>> {
    const newPerId = this.profileIdService.getProfileId();
    const result = await this.monitoringService.gettAllMonitoringByPerId(newPerId);
    
    const contagemSintomas: Record<string, number> = result.reduce((accumulator: Record<string, number>, currentValue: ReturnMonitoringDto) => {
      const key = currentValue.monSintomas; 
      accumulator[key] = (accumulator[key] || 0) + 1;
      return accumulator;
    }, {});    
  
    console.log(contagemSintomas);
    return contagemSintomas;
  }

  // @Get("/:monSintomas")
  // async gettAllMonitoringBymonSintomas(@Param('monPerId') monPerId: number, @Param('monSintomas') monSintomas: string): Promise<ReturnMonitoringDto[]> {
  //   const newPerId = this.profileIdService.getProfileId();
  //   return this.monitoringService.gettAllMonitoringBymonSintomas(newPerId, monSintomas);
  // }

}
