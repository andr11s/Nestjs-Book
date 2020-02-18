import { EntityRepository, Repository } from 'typeorm';
import { RoleEntity } from '../role/role.entity';

@EntityRepository(RoleEntity)
export class RoleRepository extends Repository<RoleEntity> {}
