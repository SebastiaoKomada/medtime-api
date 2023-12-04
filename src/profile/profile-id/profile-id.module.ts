import { Module } from '@nestjs/common';
import { ProfileIdService } from './profile-id.service';

@Module({
    providers: [ProfileIdService],
    exports: [ProfileIdService],
})

export class ProfileIdModule { }
