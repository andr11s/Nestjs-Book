import { EntityRepository, Repository, getConnection } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { SignUpDto } from './dto/signup.dto';
import { RoleRepository } from '../role/role.repository';
import { RoleEntity } from '../role/role.entity';
import { RoleType } from '../role/rolestypes.enum';
import { UserDetails } from '../user/user.details.entity';
import { genSalt, hash } from 'bcryptjs';

@EntityRepository(UserEntity)
export class Authrepository extends Repository<UserEntity> {
  async Signup(Signup: SignUpDto) {
    const { username, password, email } = Signup;
    const users = new UserEntity();
    users.username = username;
    users.password = password;
    users.email = email;

    const rolerepository: RoleRepository = await getConnection().getRepository(
      RoleEntity,
    );

    const defaultrole: RoleEntity = await rolerepository.findOne({
      where: { name: RoleType.GENERAL },
    });

    users.roles = [defaultrole];

    const details = new UserDetails();
    users.details = details;

    const salt = await genSalt(10);
    users.password = await hash(password, salt);
    await users.save();
  }
}
