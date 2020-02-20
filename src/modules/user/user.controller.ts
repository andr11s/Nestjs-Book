import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from '../user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../role/decorators/role.decorators';
import { RoleGuard } from '../role/guards/role.guard';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get(':id')
  @Roles('ADMINI')
  @UseGuards(AuthGuard(), RoleGuard)
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this._userService.get(id);
    return user;
  }

  @UseGuards(AuthGuard())
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

  @Post('setrole/:userid/:roleid')
  async setrole(
    @Param('userid', ParseIntPipe) userid: number,
    @Param('roleid', ParseIntPipe) roleid: number,
  ) {
    return this._userService.setRolUser(userid, roleid);
  }
}
