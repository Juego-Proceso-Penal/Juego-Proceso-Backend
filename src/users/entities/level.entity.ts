import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Level {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  levelName: string;

  @Column()
  levelScore: string;

  @ManyToOne(() => User, (user) => user.userLevels)
  user: User;
}
