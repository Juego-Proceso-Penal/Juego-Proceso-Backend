import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { LevelDto } from './level.dto';
class Level {
  levelName: string;
  levelScore: string;

  constructor(levelName: string, levelScore: string) {
    this.levelName = levelName;
    this.levelScore = levelScore;
  }
}

export class RegisterDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  fullName: string;

  @IsString()
  @MinLength(1)
  nickName: string;

  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(1)
  country?: string;

  @IsString()
  @MinLength(1)
  currentLevel: string;

  @IsString()
  @MinLength(1)
  accountType: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => LevelDto)
  userLevels: LevelDto[];
}
