import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _UserRepository: UserRepository,
  ) {}

  async get(id: number): Promise<UserEntity> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const user = await this._UserRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async getAll(): Promise<UserEntity[]> {
    const users: UserEntity[] = await this._UserRepository.find({
      where: { status: 'ACTIVE' },
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
    const UserExists = await this._UserRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!UserExists) {
      throw new NotFoundException();
    }
    await this._UserRepository.update(id, { status: 'INACTIVE' });
  }
}
