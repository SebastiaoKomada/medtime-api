import { MedicationEntity } from './../medication/entities/medication.entity';
import { NotificationService } from './../notification/notification.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeEntity } from './entities/time.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { CreateTimeDto } from './dtos/createTime.dto';
import { ProfileService } from 'src/profile/profile.service';
import { ProfileIdService } from 'src/profile/profile-id/profile-id.service';
import { ProfileEntity } from 'src/profile/entities/profile.entity';
import { NotificationGateway } from 'src/notification/notification.gateway';
import * as fs from 'fs';

@Injectable()
export class TimeService {
  private horUsuId: number;
  private isRunning: boolean = false;
  private notifiedTimeIds: Set<number> = new Set<number>();
  private lastCheckedDate: string = '';
  savedSubscription: any;

  constructor(
    @InjectRepository(TimeEntity)
    private readonly timeRepository: Repository<TimeEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    @InjectRepository(MedicationEntity)
    private readonly medicationRepository: Repository<MedicationEntity>,
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
    private readonly profileIdService: ProfileIdService,
    private readonly notificationGateway: NotificationGateway,
    private readonly notificationService: NotificationService,
  ) {}

  async createTime(
    createTimeDto: CreateTimeDto,
    horUsuId: number,
    horPerId: number,
  ): Promise<TimeEntity> {
    const user = await this.userService.findUserById(horUsuId);
    const profile = await this.profileService.selectPerfil(horPerId, horUsuId);
    console.log({
      ...createTimeDto,
      horUsuId,
      horPerId,
    });
    return null;
    // return this.timeRepository.save({
    //     ...createTimeDto,
    //     horUsuId,
    //     horPerId,
    // })
  }

  async findTimeByHourUsuId(horUsuId: number): Promise<TimeEntity[]> {
    const time = await this.timeRepository.find({
      where: {
        horUsuId,
      },
    });

    if (!time) {
      throw new NotFoundException(`usuId: ${horUsuId} Not Found`);
    }

    return time;
  }

  async findTimeById(horId: number): Promise<TimeEntity> {
    const time = await this.timeRepository.findOne({
      where: {
        horId,
      },
    });

    if (!time) {
      throw new NotFoundException(`horId: ${horId} Not Found`);
    }

    return time;
  }

  private loadNotifiedIds() {
    try {
      const data = fs.readFileSync('notifiedIds.json', 'utf-8');
      const parsedData = JSON.parse(data);
      if (Array.isArray(parsedData)) {
        this.notifiedTimeIds = new Set<number>(parsedData);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  private saveNotifiedIds() {
    const data = JSON.stringify(Array.from(this.notifiedTimeIds));
    fs.writeFileSync('notifiedIds.json', data, 'utf-8');
  }

  async startChecking(horUsuId: number, subscription: any) {
    this.isRunning = true;
    this.horUsuId = horUsuId;
    this.savedSubscription = subscription;

    while (this.isRunning) {
      const currentDate = new Date().toLocaleDateString();

      if (currentDate !== this.lastCheckedDate) {
        this.notifiedTimeIds = new Set<number>();
        this.lastCheckedDate = currentDate;
      }

      const currentTime = new Date().getHours() + ':' + new Date().getMinutes();

      const activeTimes = await this.timeRepository.find({
        where: {
          horUsuId: this.horUsuId,
          horario: currentTime,
        },
      });

      for (const time of activeTimes) {
        const medication = await this.medicationRepository.findOne({
          where: {
            medId: time.horMedId,
          },
          select: ['medDataInicio'],
        });

        const dataInicial = medication?.medDataInicio;

        if (dataInicial && new Date() < new Date(dataInicial)) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          continue;
        }

        if (!this.notifiedTimeIds.has(time.horId)) {
          this.notifiedTimeIds.add(time.horId);
          this.saveNotifiedIds();

          const profile = await this.profileRepository.findOne({
            where: {
              perId: time.horPerId,
            },
          });

          if (profile) {
            console.log(
              `Nome: ${profile.perNome}, Horario ID: ${time.horId}, Horario: ${time.horario}`,
            );
            const notificacao = {
              horId: time.horId,
              horMedId: time.horMedId,
              horario: time.horario,
            };
            await this.notificationService.sendNotification(
              this.savedSubscription,
              'Medtime',
              'Hora de tomar seu medicamento!',
              'CONFIRMAR',
            );
            this.notificationGateway.emitNotification(notificacao);
            console.log('Data: ', notificacao);
            return notificacao;
          }
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  stopChecking() {
    this.isRunning = false;
  }
}
