import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from "../../user/entities/user.entity";

@Entity({name:'tblmonitoramento'})
export class MonitoringEntity {
  @PrimaryGeneratedColumn()
  monId: number;

  @Column({ name: 'monPerId', nullable: false })
  monPerId: number;
  
  @Column({ name: 'monSintomas', nullable: false })
  monSintomas: string;

  @Column({  name: 'monData', nullable: false })
  monData: string;

  // @ManyToOne(() => UserEntity, (user) => user.perfis)
  //   @JoinColumn({ name: 'perUsuId', referencedColumnName: 'monPerId' })
  //   user?: UserEntity;
}
