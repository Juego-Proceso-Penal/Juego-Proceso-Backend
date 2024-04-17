// import { PartialType } from '@nestjs/mapped-types';
// import { CreateUserDto } from './create-user.dto';

// export class UpdateUserDto extends PartialType(CreateUserDto) {

// }
interface Level {
  id: number; // Añade la propiedad id

  levelName: string;
  levelScore: string;
}
export class UpdateUserDto {
  email?: string;
  fullName?: string;
  nickName?: string;
  currentLevel?: string;
  userLevels?: { levelName: string; levelScore: string }[];
}
