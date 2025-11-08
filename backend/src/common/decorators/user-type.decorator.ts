import { SetMetadata } from '@nestjs/common';
import { TUserType } from '../constants/user-roles';

export const USER_TYPE_KEY = 'userType';

export const UserType = (params: TUserType[]) =>
  SetMetadata(USER_TYPE_KEY, params);
