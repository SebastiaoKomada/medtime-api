import { ReturnTimeDto } from 'src/time/dtos/returnTime.dto';
import { MedicationEntity } from '../entities/medication.entity';

export class ReturnMedicationDto {
  medId: number;
  medNome: string;
  medForma: string;
  medQuantidade: number;
  medDataInicio: string;
  medDataFim: string;
  medPerId: number;
  times?: ReturnTimeDto[];

  constructor(medicationEntity: MedicationEntity) {
    this.medId = medicationEntity.medId;
    this.medNome = medicationEntity.medNome;
    this.medForma = medicationEntity.medForma;
    this.medQuantidade = medicationEntity.medQuantidade;
    this.medDataInicio = medicationEntity.medDataInicio;
    this.medDataFim = medicationEntity.medDataFim;
    this.medPerId = medicationEntity.medPerId;
    
    this.times = medicationEntity.times
      ? medicationEntity.times.map((time) => new ReturnTimeDto(time))
      : undefined;
  }
}