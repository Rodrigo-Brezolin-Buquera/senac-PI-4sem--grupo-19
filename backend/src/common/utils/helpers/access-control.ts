import { ForbiddenException } from '@nestjs/common';
import { UserPayload } from '../../types/user-payload';

export class AccessControl {
  static assertAdmin(user: UserPayload) {
    if (user.role !== 'admin') {
      throw new ForbiddenException('Acesso negado para este recurso.');
    }
  }

  static assertSelfOrAdmin(user: UserPayload, id: number) {
    if (user.role !== 'admin' && user.id !== id) {
      throw new ForbiddenException('Acesso negado para este recurso.');
    }
  }

  static assertSameCompanyOrAdmin(user: UserPayload, id: number) {
    if (user.role !== 'admin' && user.company !== id) {
      throw new ForbiddenException('Acesso negado para este recurso.');
    }
  }
}
