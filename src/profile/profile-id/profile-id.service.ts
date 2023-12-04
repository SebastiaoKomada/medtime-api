import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileIdService {
    findOne(arg0: { where: any; perId: number; }) {
      throw new Error('Method not implemented.');
    }
    private profileId: number;

    setProfileId(id: number) {
      this.profileId = id;
    }
  
    getProfileId(): number {
      return this.profileId;
    }
}
