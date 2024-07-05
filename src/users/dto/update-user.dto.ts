import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto {
  country: string;
  email: string;
  fullName: string;
  nickName: string;
  accountType: string;
}
