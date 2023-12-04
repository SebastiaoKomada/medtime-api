import { UserService } from './user.service';
import { Controller, Body, Post, Get, UsePipes, ValidationPipe, Param } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity'
import { ReturnUserDto } from './dtos/returnUser.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from './enum/user.enum';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }

  @Get('/alll')
  async getAllUsers(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUsers()).map((UserEntity) => new ReturnUserDto(UserEntity));
  }

  @Get('/:usuId')
  async getUserById(@Param('usuId') usuId: number): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.userService.getUserByIdUsingRelations(usuId),);
  }

  @Roles(UserType.User)
  @Get()
  async getInfoUser(@UserId() userId: number): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.getUserByIdUsingRelations(userId),
    );
  }
 
}
