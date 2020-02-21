import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from '../role/role.repository';
import { RoleEntity } from '../role/role.entity';
import { ReadRoleDto, CreateRoleDto, UpdateRoleDto } from './dtos';
import { plainToClass } from 'class-transformer';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly _RoleRepository: RoleRepository,
  ) {}

  async get(id: number): Promise<ReadRoleDto> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const role = await this._RoleRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!role) {
      throw new NotFoundException();
    }

    return plainToClass(ReadRoleDto, RoleEntity);
  }

  async getAll(): Promise<ReadRoleDto[]> {
    const roles: RoleEntity[] = await this._RoleRepository.find({
      where: { status: 'ACTIVE' },
    });

    return roles.map((role: RoleEntity) =>
      plainToClass(ReadRoleDto, RoleEntity),
    );
  }

  async create(role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
    const savedRole: RoleEntity = await this._RoleRepository.save(role);
    return plainToClass(ReadRoleDto, savedRole);
  }

  async update(
    roleId: number,
    Roles: Partial<UpdateRoleDto>,
  ): Promise<ReadRoleDto> {
    const foundRole = await this._RoleRepository.findOne(roleId, {
      where: { status: 'ACTIVE' },
    });
    if (!foundRole) {
      throw new NotFoundException('this Roles does not exits');
    }

    foundRole.RoleName = Roles.Rolename;
    foundRole.descriptions = Roles.descriptions;

    const updateRole: RoleEntity = await this._RoleRepository.save(foundRole);

    return plainToClass(ReadRoleDto, updateRole);
  }

  async delete(id: number): Promise<void> {
    const RoleExists = await this._RoleRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!RoleExists) {
      throw new NotFoundException();
    }
    await this._RoleRepository.update(id, { status: 'INACTIVE' });
  }
}
