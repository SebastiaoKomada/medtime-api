import { ReturnProfileDto } from "../../profile/dtos/returnProfile.dto";
import { UserEntity } from "../entities/user.entity";

export class ReturnUserDto {
  usuId: number;
  usuNome: string;
  usuEmail: string;
  usuTelefone: string;
  perfis?: ReturnProfileDto[];

  constructor(userEntity: UserEntity) {
    this.usuId = userEntity.usuId,
      this.usuNome = userEntity.usuNome,
      this.usuEmail = userEntity.usuEmail,
      this.usuTelefone = userEntity.usuTelefone,

      this.perfis = userEntity.perfis ? userEntity.perfis.map((perfis) => new ReturnProfileDto(perfis)) : undefined;
  }
}