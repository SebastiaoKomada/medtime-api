import { IsInt, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  usuNome: string;

  @IsString()
  usuEmail: string;

  @IsString()
  usuSenha: string;

  @IsString()
  usuTelefone: string;
}
