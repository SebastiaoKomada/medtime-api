import { MedicationEntity } from "src/medication/entities/medication.entity";
import { TimeEntity } from "src/time/entities/time.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tblconfirmacao' })
export class ConfirmationEntity {

  @PrimaryGeneratedColumn()
  conId: number;

  @Column({ name: 'conPerId', nullable: false })
  conPerId: number;

  @Column({ name: 'conMedId', nullable: false })
  conMedId: number;

  @Column({ name: 'conHorId', nullable: false })
  conHorId: number;

  @Column({ name: 'conData', nullable: false })
  conData: string;

  @Column({ name: 'created_at', nullable: false })
  created_at: string;

  @ManyToOne(() => MedicationEntity, (medication) => medication.confirmation)
  @JoinColumn({ name: 'conMedId', referencedColumnName: 'medId' })
  medication?: MedicationEntity;


  @ManyToOne(() => TimeEntity, (times) => times.confirmation)
  @JoinColumn({ name: 'conHorId', referencedColumnName: 'horId' })
  times?: MedicationEntity;


}