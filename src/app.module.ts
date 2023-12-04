import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './profile/profile.module';
import { CacheModule } from './cache/cache.module';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './guards/roles.guards';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ProfileIdService } from './profile/profile-id/profile-id.service';
import { ProfileIdModule } from './profile/profile-id/profile-id.module';
import { TimeModule } from './time/time.module';
import { MedicationModule } from './medication/medication.module';
import { ConfirmationModule } from './confirmation/confirmation.module';
import { NotificationGateway } from './notification/notification.gateway';
import { NotificationModule } from './notification/notification.module';
import { MonitoringModule } from './monitoring/monitoring.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env.development.local'],
  }),
  TypeOrmModule.forRoot({
    type: 'mysql',
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    // synchronize: true,
    entities: [`${__dirname}/**/*entity{.js,.ts}`],
    migrations: [`${__dirname}/migrations/{.ts,*.js}`],
    migrationsRun: true
  }), UserModule, ProfileModule, CacheModule, AuthModule, JwtModule, ProfileIdModule, TimeModule, MedicationModule, ConfirmationModule, NotificationModule, MonitoringModule],
  controllers: [],
  providers: [  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }, ProfileIdService, NotificationGateway,],
})
export class AppModule { }
