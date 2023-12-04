import { CreateUserDto } from './dtos/createUser.dto';
import { BadGatewayException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>,
  ) { }

  async createUser(CreateUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.findUserByEmail(CreateUserDto.usuEmail).catch(
      () => undefined
    );
    if(user) {
      throw new BadGatewayException('Email already registered in the system');
    }
    const saltOrRounds = 10;
    const passwordHashed = await hash(CreateUserDto.usuSenha, saltOrRounds);

    return this.userRepository.save({  
      ...CreateUserDto,
      usuSenha: passwordHashed
    })
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findUserById(usuId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        usuId,
      }
    });

    if (!user) {
      throw new NotFoundException(`usuId: ${usuId} Not Found`);
    }

    return user;
  }

  async findUserByEmail(usuEmail: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        usuEmail,
      }
    });

    if (!user) {
      throw new NotFoundException(`usuEmail: ${usuEmail} Not Found`);
    }

    return user;
  }

  async getUserByIdUsingRelations(usuId: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        usuId,
      },
      relations: ['perfis'],
    })
  }
}
