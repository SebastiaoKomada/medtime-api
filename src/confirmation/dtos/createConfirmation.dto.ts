import { Type } from "class-transformer";
import { IsString } from "class-validator";

export class CreateConfirmationDto {

    @IsString()
    conData: string;
}
