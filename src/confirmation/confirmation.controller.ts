import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserId } from 'src/decorators/user-id.decorator';
import { CreateConfirmationDto } from './dtos/createConfirmation.dto';
import { ConfirmationService } from './confirmation.service';
import { ConfirmationEntity } from './entities/confirmation.entity';
import { ProfileIdService } from 'src/profile/profile-id/profile-id.service';
import { MedicationEntity } from 'src/medication/entities/medication.entity';

@Controller('confirmation')
export class ConfirmationController {
        constructor(
            private readonly confirmationService: ConfirmationService,
            private readonly profileIdService: ProfileIdService,

        ) { }

    @UsePipes(ValidationPipe)
    @Post("/:conPerId/:conMedId/:conHorId")
    async confirmMedication(
      @Body() createConfirmationDto: CreateConfirmationDto, 
      @Param('conPerId') conPerId: number, 
      @Param('conMedId') conMedId: number, 
      @Param('conHorId') conHorId: number
    ): Promise<ConfirmationEntity> {
      return this.confirmationService.confirmMedication(createConfirmationDto, conPerId, conMedId, conHorId);  
    } 

    @Post("/:conPerId")
    async gettAllConfirmationByPerId(@Body() conDataObj: { conData: string }, @Param('conPerId') conPerId: number): Promise<ConfirmationEntity[]> {
      const conData: string = conDataObj.conData;
      return this.confirmationService.gettAllConfirmationByPerId(conData, conPerId);
    }
}