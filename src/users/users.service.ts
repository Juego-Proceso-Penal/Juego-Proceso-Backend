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
    return this.userRepository.find({
      select: ['userId', 'email', 'nickName', 'accountType', 'currentLevel'],
      relations: ['userLevels'],
    });
  }

  findOneById(userId: number) {
    return this.userRepository.findOne({
      where: { userId },
      select: [
        'userId',
        'email',
        'fullName',
        'nickName',
        'accountType',
        'currentLevel',
      ],
      relations: ['userLevels'],
    });
  }

  async update(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      // Buscar el usuario por su ID
      let user = await this.findOneById(userId);

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      // Actualizar los campos del usuario con los datos proporcionados en updateUserDto
      if (updateUserDto.email !== undefined) {
        user.email = updateUserDto.email;
      }
      if (updateUserDto.fullName !== undefined) {
        user.fullName = updateUserDto.fullName;
      }
      if (updateUserDto.nickName !== undefined) {
        user.nickName = updateUserDto.nickName;
      }
      if (updateUserDto.currentLevel !== undefined) {
        user.currentLevel = updateUserDto.currentLevel;
      }
      if (updateUserDto.userLevels !== undefined) {
        // Actualizar los niveles del usuario si se proporcionan en updateUserDto
        user.userLevels = await Promise.all(
          updateUserDto.userLevels.map(async (levelData) => {
            // Buscar el nivel correspondiente en los niveles del usuario
            let level = user.userLevels.find(
              (l) => l.levelName === levelData.levelName,
            );

            if (!level) {
              // Si el nivel no existe, crearlo
              level = this.levelRepository.create(levelData);
              user.userLevels.push(level);
            }

            // Actualizar el levelScore del nivel
            level.levelScore = levelData.levelScore;

            // Guardar los cambios en la base de datos
            await this.levelRepository.save(level);

            return level;
          }),
        );
      }

      // Guardar los cambios en el usuario
      user = await this.userRepository.save(user);

      // Retornar el usuario actualizado
      return user;
    } catch (error) {
      // Si se produce un error, manejarlo
      throw error;
    }
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
