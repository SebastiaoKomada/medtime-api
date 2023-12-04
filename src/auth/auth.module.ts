import { ProfileModule } from '../profile/profile.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ProfileIdModule } from 'src/profile/profile-id/profile-id.module';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
      }),
    }),
    ProfileModule,
    ProfileIdModule
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
