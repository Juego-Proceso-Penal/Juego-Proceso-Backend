import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Level } from './entities/level.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { userLevels, ...userData } = createUserDto;
    const user = this.userRepository.create(userData); // Crear instancia de usuario sin niveles

    if (userLevels && userLevels.length > 0) {
      // Crear niveles asociados al usuario y guardarlos
      user.userLevels = await Promise.all(
        userLevels.map(async (levelData) => {
          const level = this.levelRepository.create(levelData);
          return await this.levelRepository.save(level);
        }),
      );
    }

    return this.userRepository.save(user);
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  findByEmailWithPassword(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: [
        'userId',
        'email',
        'password',
        'fullName',
        'accountType',
        'currentLevel',
      ],
      relations: ['userLevels'], // Cargar niveles del usuario
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
      relations: ['userLevels'],
    });
  }

  update(userId: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${userId} user`;
  }

  async updateCurrentLevel(userId: number, newLevel: string): Promise<User> {
    try {
      // Busca el usuario por su ID
      const user = await this.userRepository.findOneOrFail({
        where: { userId },
      });

      // Actualiza el nivel actual del usuario
      user.currentLevel = newLevel;

      // Guarda los cambios en la base de datos
      return await this.userRepository.save(user);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        // Si el usuario no se encuentra, lanzar una excepción NotFoundException
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      // Si se produce otro tipo de error, relanzar el error original
      throw error;
    }
  }

  async updateUserLevelScore(
    userId: number,
    levelName: string,
    newLevelScore: string,
  ): Promise<User> {
    // Buscar el usuario por su ID
    const user = await this.userRepository.findOne({
      where: { userId },
      relations: ['userLevels'],
    });

    // Si el usuario no se encuentra, lanzar una excepción NotFoundException
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Encontrar el nivel correspondiente en los niveles del usuario
    const level = user.userLevels.find((l) => l.levelName === levelName);

    // Si no se encuentra el nivel, lanzar una excepción NotFoundException
    if (!level) {
      throw new NotFoundException(
        `Level '${levelName}' not found for user with ID ${userId}`,
      );
    }

    // Actualizar el levelScore del nivel
    level.levelScore = newLevelScore;

    // Guardar los cambios en la base de datos
    await this.levelRepository.save(level);

    // Retornar el usuario actualizado
    return user;
  }

  async remove(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { userId },
      relations: ['userLevels'],
    });

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    console.log('Usuario eliminado exitosamente');
    return await this.userRepository.remove(user);
  }
}
