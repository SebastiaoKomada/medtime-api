import { ConfirmationEntity } from "../entities/confirmation.entity";


export class ReturnConfirmationDto {
    conId: number;
    conMedId: number;
    conHorId: number;
    conPerId: number;
    conData: string;
    created_at: string;
  
    constructor(confirmationEntity: ConfirmationEntity) {
      this.conId = confirmationEntity.conId;
      this.conMedId = confirmationEntity.conMedId;
      this.conHorId = confirmationEntity.conHorId;
      this.conPerId = confirmationEntity.conPerId;
      this.conData = confirmationEntity.conData;
      this.created_at = confirmationEntity.created_at
    }
  }
  