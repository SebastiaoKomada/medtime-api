import { IsInt, IsString } from 'class-validator';

export class CreateTimeDto {
  @IsString()
  horario: string;
}
