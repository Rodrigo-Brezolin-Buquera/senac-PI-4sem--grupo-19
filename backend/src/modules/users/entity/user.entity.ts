import { TUserType } from 'src/common/constants/user-roles';
import { Training } from 'src/modules/training/entities/training.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';


@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', unique: true, nullable: false })
  email: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Column({ type: 'text', nullable: true })
  phone?: string;

  @Column({ type: 'int', nullable: true })
  height_cm?: number;

  @Column({ type: 'int', nullable: true })
  weight_kg?: number;

  @Column({ type: 'int', nullable: true })
  age?: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  experience_level?: string;

  @Column({ type: 'int', nullable: true })
  weekly_frequency?: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  goal?: string;

@OneToMany(() => Training, (training) => training.user)
trainings: Training[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;
}
