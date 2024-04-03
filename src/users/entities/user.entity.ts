import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Level } from './level.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  country: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ nullable: false, select: false })
  fullName: string;

  @Column({ nullable: false, select: false })
  nickName: string;

  @Column({ nullable: false, select: false, default: '1' })
  currentLevel: string;

  @Column({ nullable: false, select: false })
  accountType: string;

  @OneToMany(() => Level, (level) => level.user)
  userLevels: Level[];

  @CreateDateColumn()
  registrationDate: Date;
}
