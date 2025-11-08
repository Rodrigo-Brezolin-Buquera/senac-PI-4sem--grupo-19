import { User } from '../entity/user.entity';

export class UserMapper {
  static toResponse(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,

      createdAt: user.created_at,
    };
  }

  static mapToResponse(users: User[]) {
    return users.map((user) => this.toResponse(user));
  }
}
