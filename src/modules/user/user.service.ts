import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { RoleRepository } from '../role/role.repository';
import { status } from '../../shared/entiy-status.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _UserRepository: UserRepository,
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}

  async get(id: number): Promise<UserEntity> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const user = await this._UserRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async getAll(): Promise<UserEntity[]> {
    const users: UserEntity[] = await this._UserRepository.find({
      where: { status: status.ACTIVE },
    });

    return users;
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const savedUser = await this._UserRepository.save(user);
    return savedUser;
  }

  async update(id: number, user: UserEntity): Promise<void> {
    await this._UserRepository.update(id, user);
  }

  async delete(id: number): Promise<void> {
    const UserExist = await this._UserRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });

    if (!UserExist) {
      throw new NotFoundException();
    }
    await this._UserRepository.update(id, { status: 'INACTIVE' });
  }

  async setRolUser(userid: number, rolid: number) {
    const UserExist = await this._UserRepository.findOne(userid, {
      where: { status: status.ACTIVE },
    });
    if (!UserExist) {
      throw new NotFoundException('User does not exist');
    }

    const RoleExist = await this._roleRepository.findOne(rolid, {
      where: { status: status.ACTIVE },
    });

    if (!RoleExist) {
      throw new NotFoundException('roles does not exist');
    }

    UserExist.roles.push(RoleExist);
    this._UserRepository.save(UserExist);
    return true;
  }
}
