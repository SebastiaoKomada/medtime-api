//import { UserEntity } from "src/user/entities/user.entity";
import { ConfirmationEntity } from "src/confirmation/entities/confirmation.entity";
import { TimeEntity } from "src/time/entities/time.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tblmedicacao' })
export class MedicationEntity {

    @PrimaryGeneratedColumn()
    medId: number;

    @Column({ name: 'medNome', nullable: false })
    medNome: string;

    @Column({ name: 'medForma', nullable: false })
    medForma: string;

    @Column({ name: 'medQuantidade', nullable: false })
    medQuantidade: number;

    @Column({ name: 'medDataInicio', nullable: false })
    medDataInicio: string;

    @Column({ name: 'medDataFim', nullable: true })
    medDataFim: string;

    @Column({ name: 'medPerId', nullable: false })
    medPerId: number;

    @OneToMany(() => TimeEntity, (times) => times.medication)
    times?: TimeEntity[];

    @OneToMany(() => ConfirmationEntity, (confirmation) => confirmation.medication)
    confirmation?: ConfirmationEntity[];


}