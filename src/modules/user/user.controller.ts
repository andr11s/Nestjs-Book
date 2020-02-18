import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UserEntity } from '../user/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this._userService.get(id);
    return user;
  }

  @Get()
  async getUsers(): Promise<UserEntity[]> {
    const users = await this._userService.getAll();
    return users;
  }

  @Post('create')
  async createuser(@Body() user: UserEntity): Promise<UserEntity> {
    const createUser = await this._userService.create(user);
    return createUser;
  }

  @Patch()
  async updateduser(
    @Param() id: number,
    @Body() user: UserEntity,
  ): Promise<any> {
    const updateUser = await this._userService.update(id, user);
  }

  @Delete(':id')
  async deteleuser(@Param('id', ParseIntPipe) id: number) {
    const deleteUser = await this._userService.delete(id);
  }
}
