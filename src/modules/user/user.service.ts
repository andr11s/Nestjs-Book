import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { MapperService } from 'src/shared/mapper.service';
import { UserDto } from './dto/user.dto';
import { UserEntity } from '../user/user.entity';
import { UserDetails } from './user.details.entity';
import { getConnection } from 'typeorm';
import { Role } from '../role/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _UserRepository: UserRepository,
    private readonly _MapperService: MapperService,
  ) {}

  async get(id: number): Promise<UserDto> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const user = await this._UserRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return this._MapperService.map<UserEntity, UserDto>(user, new UserDto());
  }

  async getAll(): Promise<UserDto> {
    const users: UserEntity[] = await this._UserRepository.find({
      where: { status: 'ACTIVE' },
    });

    return this._MapperService.mapCollection<UserEntity, UserDto>(
      users,
      new UserDto(),
    );
  }

  async create(user: UserEntity): Promise<UserDto> {
    const details = new UserDetails();
    user.details = details;

    const repo = await getConnection().getRepository(Role);
    const defaultRole = await repo.findOne({ where: { name: 'GENERAL' } });
    user.roles = [defaultRole];

    const savedUser = await this._UserRepository.save(user);
    return this._MapperService.map<UserEntity, UserDto>(
      savedUser,
      new UserDto(),
    );
  }

  async update(id: number, user: UserEntity): Promise<void> {
    await this._UserRepository.update(id, user);
  }

  async delete(id: number): Promise<void> {
    const UserExists = await this._UserRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!UserExists) {
      throw new NotFoundException();
    }
    await this._UserRepository.update(id, { status: 'INACTIVE' });
  }
}
