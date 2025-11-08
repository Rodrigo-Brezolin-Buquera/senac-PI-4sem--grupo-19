import { TUserType } from '../constants/user-roles';

export type UserPayload = {
  id: number;
  email: string;
  role: TUserType;
  company: number;
};
