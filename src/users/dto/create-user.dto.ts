interface Level {
  levelName: string;
  levelScore: string;
}
export class CreateUserDto {
  country: string;
  email: string;
  password: string;
  fullName: string;
  nickName: string;
  currentLevel: string;
  accountType: string;
  userLevels?: Level[];
}
