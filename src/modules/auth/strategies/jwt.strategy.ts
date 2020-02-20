import { UnauthorizedException, Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { IJwtPayload } from '../jwt-payload-interface';
import { PassportStrategy } from '@nestjs/passport';

import { ConfigService } from '../../../config/config.service';
import { Configurations } from '../../../config/config.keys';
import { Authrepository } from '../auth.repository';

@Injectable()
export class JTstrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _ConfigService: ConfigService,
    @InjectRepository(Authrepository)
    private readonly _AuthRepository: Authrepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _ConfigService.get(Configurations.JWT_SECRET),
    });
  }

  async validate(payload: IJwtPayload) {
    const { username } = payload;
    const user = await this._AuthRepository.findOne({
      where: { username, status: 'ACTIVE' },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
