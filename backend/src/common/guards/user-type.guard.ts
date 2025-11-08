import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { USER_TYPE_KEY } from '../decorators/user-type.decorator';
import { TUserType } from '../constants/user-roles';

@Injectable()
export class UserTypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const userTypeDecorator = this.reflector.getAllAndOverride<TUserType[]>(
      USER_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest();
    const isValid = this.validateTUserType(request, userTypeDecorator);
    if (!isValid) {
      throw new ForbiddenException();
    }

    return true;
  }

  private validateTUserType(request: Request, types: TUserType[]): boolean {
    const user = request['user'];
    const userType = user?.role;
    return types.includes(userType);
  }
}
