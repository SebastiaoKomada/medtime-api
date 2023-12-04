import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MedicationEntity } from './entities/medication.entity';
import { CreateMedicationDto } from './dtos/createMedication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeEntity } from 'src/time/entities/time.entity';
import { ProfileIdService } from 'src/profile/profile-id/profile-id.service';
import { UserId } from 'src/decorators/user-id.decorator';
import { ReturnMedicationWithTimesDto } from './dtos/returnMedicationWithTimes.dto';

@Injectable()
export class MedicationService {
  constructor(
    @InjectRepository(MedicationEntity)
    private readonly medicationRepository: Repository<MedicationEntity>,
    @InjectRepository(TimeEntity)
    private readonly timeRepository: Repository<TimeEntity>,
    private readonly profileIdService: ProfileIdService,
  ) {}

  async gettAllMedicationByPerId(medPerId: number): Promise<MedicationEntity[]> {
    return this.medicationRepository.find({
      where: {
        medPerId,
      },
      relations: ['times'],
    }).catch(() => undefined);
  }

  async getMedicationByIdUsingRelations(medId: number): Promise<MedicationEntity> {
    return this.medicationRepository.findOne({
      where: {
        medId,
      },
      relations: ['times'],
    }).catch(() => undefined);
  }
  async findMedicationById(medId: number): Promise<MedicationEntity> {
    const findMedication = await this.medicationRepository.findOne({
      where: {
        medId,
      },
    });

    if (!findMedication) {
      throw new NotFoundException(`medId: ${medId} Not Found`);
    }

    return findMedication;
  }
  
  async createMedicationAndTimes(
    medication: MedicationEntity,
    horarios: string[],
    userId: number
  ) {
    const newPerId = this.profileIdService.getProfileId();
    medication.medPerId = newPerId;
  
    const savedMedication = await this.medicationRepository.save(medication);
  
    const savedTimes = [];
    for (const horario of horarios) {
      const timeEntry = new TimeEntity();
      timeEntry.medication = savedMedication;
      timeEntry.horario = horario;
      timeEntry.horPerId = newPerId;
      timeEntry.horUsuId = userId;
      const savedTime = await this.timeRepository.save(timeEntry);
      savedTimes.push(savedTime);
    }
  
    const response = new ReturnMedicationWithTimesDto(savedMedication, savedTimes);
  
    return response;
  }
  
}
