import { ProfileEntity } from "../entities/profile.entity";

export class ReturnProfileDto {
    perId: number;
    perNome: string;
    perImagem: string;

    constructor(profileEntity: ProfileEntity) {
        this.perId = profileEntity.perId,
            this.perNome = profileEntity.perNome,
            this.perImagem = profileEntity.perImagem
    }
}