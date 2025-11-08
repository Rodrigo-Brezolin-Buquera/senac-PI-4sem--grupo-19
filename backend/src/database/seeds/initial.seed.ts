import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exercise } from 'src/modules/exercise/entities/exercise.entity';
import { Training } from 'src/modules/training/entities/training.entity';
import { User } from 'src/modules/users/entity/user.entity';

export async function runInitialSeed(AppDataSource: DataSource) {
  const userRepository = AppDataSource.getRepository(User);
  const trainingRepository = AppDataSource.getRepository(Training);
  const exerciseRepository = AppDataSource.getRepository(Exercise);

  const existing = await userRepository.findOne({ where: { email: 'demo@fit.com' } });
  if (existing) return;

  const hashedPassword = await bcrypt.hash('123456', 10);

  const user = userRepository.create({
    name: 'Usuário Demo',
    email: 'demo@fit.com',
    password: hashedPassword,
    height_cm: 175,
    weight_kg: 78,
    age: 28,
    weekly_frequency: 4,
    experience_level: 'iniciante',
    goal: 'ganho_de_massa',
  });
  await userRepository.save(user);

  const trainingA = trainingRepository.create({
    name: 'Treino A — Peito & Tríceps',
    week_day: 'segunda',
    description: 'Foco em peito e tríceps',
    user,
  });
  await trainingRepository.save(trainingA);

  const trainingB = trainingRepository.create({
    name: 'Treino B — Costas & Bíceps',
    week_day: 'quarta',
    description: 'Foco em costas e bíceps',
    user,
  });
  await trainingRepository.save(trainingB);

  await exerciseRepository.save([
    exerciseRepository.create({ name: 'Supino reto', repetitions: '3x10', weight: 60, training: trainingA }),
    exerciseRepository.create({ name: 'Tríceps pulley', repetitions: '4x12', weight: 25, training: trainingA }),
    exerciseRepository.create({ name: 'Tríceps francês', repetitions: '3x8', weight: 15, training: trainingA }),
    exerciseRepository.create({ name: 'Tríceps pulley', repetitions: '4x10', weight: 30, training: trainingA }),

  ]);

  await exerciseRepository.save([
    exerciseRepository.create({ name: 'Puxada frontal', repetitions: '3x12', weight: 50, training: trainingB }),
    exerciseRepository.create({ name: 'Rosca direta', repetitions: '3x10', weight: 15, training: trainingB }),
    exerciseRepository.create({ name: 'Rosca martelo', repetitions: '3x10', weight: 15, training: trainingB }),
    exerciseRepository.create({ name: 'Desenvolvimento halter', repetitions: '3x10', weight: 10, training: trainingB }),

  ]);

  console.log('✅ Seed inicial executado!');
}
