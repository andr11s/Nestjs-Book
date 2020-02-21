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
import { ReadUserDto } from './dto/read-user.dto';
import { plainToClass } from 'class-transformer';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _UserRepository: UserRepository,
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}

  async get(id: number): Promise<ReadUserDto> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const user = await this._UserRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return plainToClass(ReadUserDto, user);
  }

  async getAll(): Promise<ReadUserDto[]> {
    const users: UserEntity[] = await this._UserRepository.find({
      where: { status: status.ACTIVE },
    });

    return users.map((user: UserEntity) => plainToClass(ReadUserDto, user));
  }

  async create(user: UserEntity): Promise<ReadUserDto> {
    const savedUser = await this._UserRepository.save(user);
    return plainToClass(ReadUserDto, savedUser);
  }

  async update(userid: number, user: UpdateUserDto): Promise<ReadUserDto> {
    const foundUser = await this._UserRepository.findOne(userid, {
      where: { status: 'ACTIVE' },
    });

    if (!foundUser) {
      throw new NotFoundException('This user does not exits');
    }

    foundUser.username = user.username;

    const updateuser = this._UserRepository.save(foundUser);

    return plainToClass(ReadUserDto, updateuser);
  }

  async delete(userid: number): Promise<void> {
    const UserExist = await this._UserRepository.findOne(userid, {
      where: { status: status.ACTIVE },
    });

    if (!UserExist) {
      throw new NotFoundException();
    }
    await this._UserRepository.update(userid, { status: 'INACTIVE' });
  }

  async setRolUser(userid: number, rolid: number): Promise<Boolean> {
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
