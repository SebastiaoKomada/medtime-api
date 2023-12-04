import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { PerfilController } from './profile.controller';
import { ProfileService } from './profile.service';
import { CacheModule } from '../cache/cache.module';
import { UserModule } from '../user/user.module';
import { ProfileIdModule } from './profile-id/profile-id.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProfileEntity]),
        CacheModule, UserModule, ProfileIdModule
    ],
    controllers: [PerfilController],
    providers: [ProfileService],
    exports: [ProfileService],
})
export class ProfileModule { }
