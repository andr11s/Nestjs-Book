import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Authrepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { SigninDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { UserEntity } from '../user/user.entity';
import { compare } from 'bcryptjs';
import { IJwtPayload } from './jwt-payload-interface';
import { RoleType } from '../role/rolestypes.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Authrepository)
    private readonly _AuthRpository: Authrepository,
    private readonly _jwtservice: JwtService,
  ) {}

  async siginup(siginupdto: SignUpDto): Promise<void> {
    const { username, email } = siginupdto;

    const UserExist = await this._AuthRpository.findOne({
      where: [{ username }, { email }],
    });

    if (!UserExist) {
      throw new ConflictException('username or email already exists');
    }

    return this._AuthRpository.Signup(siginupdto);
  }

  async sigin(signindto: SigninDto): Promise<{ token: string }> {
    const { username, passwoord } = signindto;
    const user: UserEntity = await this._AuthRpository.findOne({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException('user does not exist');
    }

    const isMatch = await compare(passwoord, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('invalide credentials');
    }

    const payload: IJwtPayload = {
      id: user.userid,
      email: user.email,
      username: user.username,
      roles: user.roles.map(r => r.RoleName as RoleType),
    };

    const token = await this._jwtservice.sign(payload);

    return { token };
  }
}
