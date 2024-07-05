import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
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
  country?: string;

  @IsString()
  @MinLength(1)
  currentLevel: string;

  @IsString()
  @MinLength(1)
  accountType: string;

  @IsString()
  userIdentificationID: string;
}
