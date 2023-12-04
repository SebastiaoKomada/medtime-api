import { MonitoringEntity } from "../entities/monitoring.entity";

export class ReturnMonitoringDto {
    monId: number; 
    monSintomas: string; 
    monData: string; 

  
    constructor(monitoringEntity: MonitoringEntity) {
        this.monId = monitoringEntity.monId;
        this.monSintomas = monitoringEntity.monSintomas;
        this.monData = monitoringEntity.monData;
  }
}
  