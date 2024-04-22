import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({
    fullName,
    nickName,
    email,
    password,
    country,
    currentLevel,
    accountType,
  }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    // Asegúrate de que currentLevel no sea nulo antes de pasarlo
    if (currentLevel === null || currentLevel === undefined) {
      throw new BadRequestException('currentLevel cannot be null or undefined');
    }
    const userLevelsArray = [
      {
        levelName: '1',
        levelScore: '0',
      },
      {
        levelName: '2',
        levelScore: '0',
      },
      {
        levelName: '3',
        levelScore: '0',
      },
      {
        levelName: '4',
        levelScore: '0',
      },
      {
        levelName: '5',
        levelScore: '0',
      },
    ];
    await this.usersService.create({
      country,
      email,
      password: await bcryptjs.hash(password, 10),
      fullName,
      nickName,
      currentLevel,
      accountType,
      userLevels: userLevelsArray,
    });

    return {
      fullName,
      email,
      userId: user.userId,
    };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findByEmailWithPassword(email);
    if (!user) {
      throw new UnauthorizedException('email is wrong');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('password is wrong');
    }

    const payload = {
      userId: user.userId,
      email: user.email,
      accountType: user.accountType,
    };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      email,
      user,
    };
  }

  async profile({ email }: { email: string; accountType: string }) {
    return await this.usersService.findOneByEmail(email);
  }

  async getuserInfoById({ userId }: User) {
    const user = this.usersService.findOneById(userId);
    return user;
  }
}
