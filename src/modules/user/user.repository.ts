import { Repository, EntityRepository } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
