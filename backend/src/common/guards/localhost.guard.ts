import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class LocalOnlyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const ip = request.ip || request.socket?.remoteAddress;

    const allowed = ['::1', '127.0.0.1', '::ffff:127.0.0.1'];
    if (!allowed.includes(ip!)) {
      throw new ForbiddenException('Acesso permitido apenas localmente');
    }

    return true;
  }
}
