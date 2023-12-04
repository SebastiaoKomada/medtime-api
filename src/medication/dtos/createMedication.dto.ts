import { IsDate, IsNumber, IsOptional, IsString, isNumber } from "class-validator";

export class CreateMedicationDto {
    @IsString()
    medNome: string;

    @IsString()
    medForma: string;

    @IsNumber()
    medQuantidade: number;

    @IsString()
    //@IsDate()
    medDataInicio: string;

    @IsString()
    //@IsDate()
    @IsOptional()
    medDataFim: string;
}
