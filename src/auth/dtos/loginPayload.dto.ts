import { UserEntity } from '../../user/entities/user.entity';

export class LoginPayload {
  id: number;
  typeUser: number;

  constructor(user: UserEntity) {
    this.id = user.usuId;
    this.typeUser = user.usuTipo;
  }
}
