import { TimeEntity } from "src/time/entities/time.entity";
import { MedicationEntity } from "../entities/medication.entity";

export class ReturnMedicationWithTimesDto {
  medication: {
    medNome: string;
    medForma: string;
    medQuantidade: number;
    medDataInicio: string;
    medDataFim: string;
    medPerId: number;
    medId: number;
  };
  times: {
    horario: string;
    horPerId: number;
    horUsuId: number;
    horMedId: number;
    horId: number;
  }[];

  constructor(medicationEntity: MedicationEntity, times: TimeEntity[]) {
    this.medication = {
      medNome: medicationEntity.medNome,
      medForma: medicationEntity.medForma,
      medQuantidade: medicationEntity.medQuantidade,
      medDataInicio: medicationEntity.medDataInicio,
      medDataFim: medicationEntity.medDataFim,
      medPerId: medicationEntity.medPerId,
      medId: medicationEntity.medId,
    };

    this.times = times.map((time) => ({
      horario: time.horario,
      horPerId: time.horPerId,
      horUsuId: time.horUsuId,
      horMedId: time.horMedId,
      horId: time.horId,
    }));
  }
}
