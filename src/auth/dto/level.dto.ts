// level.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class LevelDto {
  @IsString()
  @IsNotEmpty()
  levelName: string;

  @IsString()
  @IsNotEmpty()
  levelScore: string;
}
