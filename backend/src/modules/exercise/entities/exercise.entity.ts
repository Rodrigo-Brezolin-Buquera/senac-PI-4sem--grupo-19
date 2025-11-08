import { Training } from 'src/modules/training/entities/training.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
  } from 'typeorm';
  
  @Entity('exercises')
  export class Exercise {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'text', nullable: false })
    name: string;
  
    @Column({ type: 'text', nullable: true })
    description?: string;
  
    @Column({ type: 'int', nullable: true })
    weight?: number; // kg
  
    @Column({ type: 'text', nullable: false })
    repetitions: string;
  
    @ManyToOne(() => Training, (training) => training.exercises, {
      onDelete: 'CASCADE',
    })
    training: Training;
  }
  