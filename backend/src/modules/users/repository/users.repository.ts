import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';


@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async findUserWithTrainingsAndExercises(userId: number): Promise<User> {
    const user = await this.repo.findOne({
      where: { id: userId },
      relations: {
        trainings: {
          exercises: true,
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${userId} não encontrado`);
    }

    return user;
  }


  
}
