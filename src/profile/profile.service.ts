import { CreateProfileDto } from './dtos/createProfile.dto';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { ProfileEntity } from './entities/profile.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CacheService } from '../cache/cache.service';
import { UserService } from '../user/user.service';
import { ReturnProfileDto } from './dtos/returnProfile.dto';
import { ProfileIdService } from './profile-id/profile-id.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly perfilRepository: Repository<ProfileEntity>,
    private readonly userService: UserService,
    private readonly cacheRepository: CacheService,
    private readonly profileIdService: ProfileIdService,
  ) {}

  // async gettAllPerfilByUserId(perUsuId: number): Promise<PerfilEntity[]> {
  //     return this.cacheRepository.getCache<PerfilEntity[]>(`${perUsuId}`,
  //         () => this.perfilRepository.find({
  //             where: {
  //                 perUsuId,
  //             }
  //         }),
  //     )
  // }

  async gettAllPerfilByUserId(perUsuId: number): Promise<ProfileEntity[]> {
    return this.perfilRepository
      .find({
        where: {
          perUsuId,
        },
      })
      .catch(() => undefined);
  }

  async gettOnePerfilByPerId(perId: number): Promise<ProfileEntity[]> {
    return this.perfilRepository
      .find({
        where: {
          perId,
        },
      })
      .catch(() => undefined);
  }


  async createPerfil(
    createProfileDto: CreateProfileDto,
    perUsuId: number,
  ): Promise<ProfileEntity> {
    const user = await this.userService.findUserById(perUsuId);
    return this.perfilRepository.save({
      ...createProfileDto,
      perUsuId,
    });
  }

  async selectPerfil(perId: number, perUsuId: number): Promise<ProfileEntity> {
    const perfil = await this.perfilRepository.findOne({
      where: {
        perId,
        perUsuId,
      },
    });
    if (!perfil) {
      throw new NotFoundException(`Perfil id: ${perId} not found`);
    }

    this.profileIdService.setProfileId(perfil.perId);
    //console.log('Perfil setado: ', this.profileIdService.getProfileId())
    // console.log('Id Pego: ', this.perfilIdService.getProfileId());
    // console.log(
    //   'Id: ',
    //   perfil.perId,
    //   'Nome: ',
    //   perfil.perNome,
    //   'Imagem: ',
    //   perfil.perImagem,
    //   'Usuario Id: ',
    //   perfil.perUsuId,
    // );
    return perfil;
  }

  async deletePerfilByID(
    perId: number,
    perUsuId: number,
  ): Promise<DeleteResult> {
    const deletePerfil = await this.selectPerfil(perId, perUsuId);

    return this.perfilRepository.delete(deletePerfil);
  }
}
