import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './repository/users.repository';

import { PaginationService } from 'src/common/services/pagination.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly paginationService: PaginationService,
  ) {}

  async findUser() {
   return await this.userRepository.findUserWithTrainingsAndExercises(1)
  }
  
}
