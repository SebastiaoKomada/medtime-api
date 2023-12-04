import { IsOptional, IsString } from "class-validator";

export class CreateProfileDto {
    @IsString()
    perNome: string;

    @IsString()
    @IsOptional()
    perImagem: string;
}
