import { ProfileIdService } from 'src/profile/profile-id/profile-id.service';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Repository, Transaction, getRepository } from 'typeorm';
import { MedicationEntity } from './entities/medication.entity';
import { CreateMedicationDto } from './dtos/createMedication.dto';
import { MedicationService } from './medication.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user.enum';
import { ReturnTimeDto } from 'src/time/dtos/returnTime.dto';
import { ReturnMedicationDto } from './dtos/returnMedication.dto';
import { TimeEntity } from 'src/time/entities/time.entity';
import { UserId } from 'src/decorators/user-id.decorator';

@Roles(UserType.User)
@Controller('medication')
export class MedicationController {
  constructor(
    private readonly medicationService: MedicationService,
    private readonly profileIdService: ProfileIdService,
  ) {}

  @Get()
  async gettAllMedicationByPerId(@Param('medPerId') medPerId: number): Promise<ReturnMedicationDto[]> {
    const newPerId = this.profileIdService.getProfileId();
    return this.medicationService.gettAllMedicationByPerId(newPerId);
  }

  @Get('/:medId')
  async getMedicationByIdUsingRelations(
    @Param('medId') medId: number,
  ): Promise<ReturnMedicationDto> {
    const medicationEntity = await this.medicationService.getMedicationByIdUsingRelations(medId);

    if (!medicationEntity) {
      throw new NotFoundException(`medId: ${medId} Not Found`);
    }
  
    return new ReturnMedicationDto(medicationEntity);
  }

  @Post('create')
  async createMedicationAndTimes(
    @Body() data: {
      medication: MedicationEntity;
      horarios: string[];
    },
    @UserId() userId: number
  ) {
    const result = await this.medicationService.createMedicationAndTimes(data.medication, data.horarios, userId);
    return result;
  }
}
