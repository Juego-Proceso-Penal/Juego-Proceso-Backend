import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  findByEmailWithPassword(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['userId', 'email', 'password', 'fullName', 'accountType'],
    });
  }

  findAll() {
    return this.userRepository.find();
  }

  findOneById(userId: number) {
    return this.userRepository.findOne({
      where: { userId },
      select: [
        'userId',
        'email',
        'password',
        'fullName',
        'nickName',
        'accountType',
        'currentLevel',
      ],
    });
  }

  update(userId: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${userId} user`;
  }

  async updateCurrentLevel(userId: number, newLevel: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    user.currentLevel = newLevel;
    return await this.userRepository.save(user);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
