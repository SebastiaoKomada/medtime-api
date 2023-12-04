import { IsString } from "class-validator";

export class LoginDto{
    @IsString()
    usuEmail: string;

    @IsString()
    usuSenha: string;
}