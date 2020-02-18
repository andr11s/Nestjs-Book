import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from '../role/role.repository';
import { RoleEntity } from '../role/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly _RoleRepository: RoleRepository,
  ) {}

  async get(id: number): Promise<RoleEntity> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const role = await this._RoleRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!role) {
      throw new NotFoundException();
    }

    return role;
  }

  async getAll(): Promise<RoleEntity[]> {
    const roleAll = await this._RoleRepository.find({
      where: { status: 'ACTIVE' },
    });

    return roleAll;
  }

  async create(RoleEntitys: RoleEntity): Promise<RoleEntity> {
    const role = await this._RoleRepository.save(RoleEntitys);
    return role;
  }

  async update(id: number, RoleEntitys: RoleEntity) {
    return await this._RoleRepository.update(id, RoleEntitys);
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
