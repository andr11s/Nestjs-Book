import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleEntity } from './role.entity';

@Controller('roles')
export class RoleController {
  constructor(private readonly _RoleService: RoleService) {}

  @Get('id')
  async getRole(@Param('id', ParseIntPipe) id: number) {
    const role = this._RoleService.get(id);
    return role;
  }

  @Get()
  async getAll(): Promise<RoleEntity[]> {
    const roles = await this._RoleService.getAll();
    return roles;
  }

  @Post()
  async create(@Body() Roles: RoleEntity): Promise<RoleEntity> {
    const role = this._RoleService.create(Roles);
    return role;
  }

  @Patch(':id')
  async UpdateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() Roles: RoleEntity,
  ): Promise<any> {
    const role = await this._RoleService.update(id, Roles);
  }

  @Delete(':id')
  async deleteRole(@Param('id', ParseIntPipe) id: number) {
    const deleterole = await this._RoleService.delete(id);
  }
}
