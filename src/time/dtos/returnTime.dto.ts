import { TimeEntity } from '../entities/time.entity';

export class ReturnTimeDto {
  horId: number;
  horMedId: number;
  horUsuId: number;
  horPerId: number;
  horario: string;

  constructor(timeEntity: TimeEntity) {
    this.horId = timeEntity.horId;
    this.horMedId = timeEntity.horMedId;
    this.horUsuId = timeEntity.horUsuId;
    this.horPerId = timeEntity.horPerId;
    this.horario = timeEntity.horario;
  }
}