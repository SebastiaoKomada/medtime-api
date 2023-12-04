import { MedicationEntity } from "src/medication/entities/medication.entity";
import { ProfileEntity } from "../../profile/entities/profile.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ConfirmationEntity } from "src/confirmation/entities/confirmation.entity";

@Entity({ name: 'tblhorario' })
export class TimeEntity {
  @PrimaryGeneratedColumn()
  horId: number;

  @Column({ name: 'horMedId', nullable: false })
  horMedId: number;

  @Column({ name: 'horUsuId', nullable: false })
  horUsuId: number;

  @Column({ name: 'horPerId', nullable: false })
  horPerId: number;
  
  @Column({ name: 'horario', type: 'time', nullable: false })
  horario: string;

  @Column({ name: 'created_at', nullable: false })
  created_at: string;

  @Column({ name: 'updated_at', nullable: false })
  updated_at: string;

  @ManyToOne(() => MedicationEntity, (medication) => medication.times)
  @JoinColumn({ name: 'horMedId', referencedColumnName: 'medId' })
  medication: MedicationEntity;

  @OneToMany(() => ConfirmationEntity, (confirmation) => confirmation.times)
  confirmation?: ConfirmationEntity[];
}
