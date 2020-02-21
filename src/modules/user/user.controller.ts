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
import { RoleType } from '../role/rolestypes.enum';
import { ReadUserDto } from './dto/read-user.dto';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get(':id')
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  getUser(@Param('id', ParseIntPipe) userid: number): Promise<ReadUserDto> {
    return this._userService.get(userid);
  }

  @UseGuards(AuthGuard())
  @Get()
  getUsers(): Promise<ReadUserDto[]> {
    return this._userService.getAll();
  }

  @Post('create')
  async createuser(@Body() user: UserEntity): Promise<ReadUserDto> {
    return this._userService.create(user);
  }

  @Patch()
  async updateduser(@Param() id: number, @Body() user: UserDto): Promise<any> {
    return this._userService.update(id, user);
  }

  @Delete(':id')
  deteleuser(@Param('id', ParseIntPipe) userid: number): Promise<void> {
    return this._userService.delete(userid);
  }

  @Post('setrole/:userid/:roleid')
  async setrole(
    @Param('userid', ParseIntPipe) userid: number,
    @Param('roleid', ParseIntPipe) roleid: number,
  ): Promise<Boolean> {
    return this._userService.setRolUser(userid, roleid);
  }
}
