import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

// @Auth(Role.ADMIN)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.usersService.findOneById(+userId);
  }

  @Patch(':userId')
  update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+userId, updateUserDto);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    return this.usersService.remove(+userId);
  }

  @Get('userDetails/:userId')
  profile(@Param('userId') userId: string) {
    return this.usersService.findOneById(+userId);
  }

  @Patch(':userId/update-current-level')
  async updateCurrentLevel(
    @Param('userId') userId: number,
    @Body('newLevel') newLevel: string,
  ) {
    const updatedUser = await this.usersService.updateCurrentLevel(
      userId,
      newLevel,
    );
    return updatedUser;
  }

  @Patch(':userId/update-user-level-score/:levelName')
  async updateUserLevelScore(
    @Param('userId') userId: number,
    @Param('levelName') levelName: string,
    @Body() body: { newLevelScore: string },
  ) {
    const { newLevelScore } = body;
    const updatedUser = await this.usersService.updateUserLevelScore(
      userId,
      levelName,
      newLevelScore,
    );
    return updatedUser;
  }
}
