import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserScore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  level: number;

  @Column()
  score: number;

  @ManyToOne(() => User, (user) => user.scores)
  user: User;
}
