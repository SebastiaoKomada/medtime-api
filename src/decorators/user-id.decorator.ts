import {
  createParamDecorator,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { authorizationToLoginPaylod } from '../utils/base-64-converter';
import { ProfileIdService } from 'src/profile/profile-id/profile-id.service';

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const { authorization } = ctx.switchToHttp().getRequest().headers;

  const loginPayload = authorizationToLoginPaylod(authorization);

  //console.log('authorization', authorization);
  return loginPayload?.id;
});