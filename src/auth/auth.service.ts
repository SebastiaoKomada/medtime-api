import { CreateProfileDto } from '../profile/dtos/createProfile.dto';
import { compare } from 'bcrypt';
import { UserService } from './../user/user.service';
import { LoginDto } from './dtos/login.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ReturnLogin } from './dtos/returnLogin.dto';
import { ReturnUserDto } from '../user/dtos/returnUser.dto';
import { LoginPayload } from './dtos/loginPayload.dto';
import { ProfileEntity } from '../profile/entities/profile.entity';
import { Repository } from 'typeorm';
import { ProfileService } from '../profile/profile.service';
import { ReturnProfileDto } from '../profile/dtos/returnProfile.dto';
import { ProfileIdService } from 'src/profile/profile-id/profile-id.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
    private readonly profileIdService: ProfileIdService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<ReturnLogin> {
    const user: UserEntity | undefined = await this.userService
      .findUserByEmail(loginDto.usuEmail)
      .catch(() => undefined);
      
    const isMatch = await compare(loginDto.usuSenha, user?.usuSenha || '');

    if (!user || !isMatch) {
      throw new NotFoundException('Email ou senha inválidos');
    }
    const returnUser = new  ReturnUserDto(await this.userService.getUserByIdUsingRelations(user.usuId),);
    if (!returnUser.perfis || returnUser.perfis.length === 0) {
      const createProfileDto: CreateProfileDto = {
        perNome: returnUser.usuNome,
        perImagem: 'profile.png',
      };

      const newPerfil = await this.profileService.createPerfil(
        createProfileDto,
        user.usuId,
      );
    }

    if (returnUser.perfis && returnUser.perfis.length > 0) {
      const userPerfil = returnUser.perfis[0];
      this.profileIdService.setProfileId(Number(userPerfil.perId));
      console.log('Perfil Iniciado: ', this.profileIdService.getProfileId())
    }
    return {
      accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
      user: new ReturnUserDto(user),
    };
  }
}
