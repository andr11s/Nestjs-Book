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
import { ReadRoleDto, CreateRoleDto, UpdateRoleDto } from './dtos';

@Controller('roles')
export class RoleController {
  constructor(private readonly _RoleService: RoleService) {}

  @Get('id')
  getRole(@Param('id', ParseIntPipe) id: number): Promise<ReadRoleDto> {
    const role = this._RoleService.get(id);
    return role;
  }

  @Get()
  getAll(): Promise<ReadRoleDto[]> {
    const roles = this._RoleService.getAll();
    return roles;
  }

  @Post()
  create(@Body() Roles: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
    return this._RoleService.create(Roles);
  }

  @Patch(':roleid')
  UpdateRole(
    @Param('roleid', ParseIntPipe) roleid: number,
    @Body() Roles: Partial<UpdateRoleDto>,
  ): Promise<ReadRoleDto> {
    return this._RoleService.update(roleid, Roles);
  }

  @Delete(':roleid')
  deleteRole(@Param('roleid', ParseIntPipe) roleid: number) {
    return this._RoleService.delete(roleid);
  }
}
