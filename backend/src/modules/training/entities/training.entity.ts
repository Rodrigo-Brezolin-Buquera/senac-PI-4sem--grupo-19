import { Exercise } from 'src/modules/exercise/entities/exercise.entity';
import { User } from 'src/modules/users/entity/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
 
  
  @Entity('trainings')
  export class Training {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'text', nullable: false })
    name: string;
  
    @Column({ type: 'text', nullable: false })
    week_day: string; // ex: "segunda", "terça", etc.
  
    @Column({ type: 'text', nullable: true })
    description?: string;
  
    @ManyToOne(() => User, (user) => user.trainings, { onDelete: 'CASCADE' })
    user: User;
  
    @OneToMany(() => Exercise, (exercise) => exercise.training, { cascade: true })
    exercises: Exercise[];
  }
  