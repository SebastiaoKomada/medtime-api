import { ProfileIdService } from './profile-id/profile-id.service';
import { ProfileService } from './profile.service';
import { Controller, Body, Post, Get, Param, UsePipes, ValidationPipe, Delete} from '@nestjs/common';
import { CreateProfileDto } from './dtos/createProfile.dto';
import { ProfileEntity } from './entities/profile.entity'
import { UserType } from '../user/enum/user.enum';
import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/user-id.decorator';
import { DeleteResult } from 'typeorm';

@Roles(UserType.User)
@Controller('perfil')
export class PerfilController {
  constructor(private readonly ProfileService: ProfileService,
    private readonly profileIdService: ProfileIdService,
  ) { }

  @Get()
  async gettAllPerfilByUserId(@UserId() perUsuId: number): Promise<ProfileEntity[]> {
    return this.ProfileService.gettAllPerfilByUserId(perUsuId);
  }

  @Get('/:perId')
  async gettOnePerfilByPerId(@UserId() perId: number): Promise<ProfileEntity[]> {
    return this.ProfileService.gettOnePerfilByPerId(perId);
  }
  
  @UsePipes(ValidationPipe)
  @Post()
  async createPerfil(@Body() createProfilelDto: CreateProfileDto, @UserId() perUsuId: number): Promise<ProfileEntity> {
    return this.ProfileService.createPerfil(createProfilelDto, perUsuId)
  }

  @Post('/:perId')
  async selectPerfil(@Param('perId') perId: number, @UserId() perUsuId: number): Promise<ProfileEntity> {
    return this.ProfileService.selectPerfil( perId, perUsuId);
  }

  @UsePipes(ValidationPipe)
  @Delete('/:perId')
  async deletePerfil(@Param('perId') perId: number,@Param('perUsuId') perUsuId: number): Promise<DeleteResult> {
    return this.ProfileService.deletePerfilByID(perId,perUsuId)
  }

}
