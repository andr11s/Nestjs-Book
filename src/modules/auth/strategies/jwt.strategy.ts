import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '../../../config/config.service';
import { Configurations } from 'src/config/config.keys';
import { Authrepository } from '../auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { IJwtPayload } from '../jwt-payload-interface';
import { UnauthorizedException, Injectable } from '@nestjs/common';

@Injectable()
export class JTstrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _ConfigService: ConfigService,

    @InjectRepository(Authrepository)
    private readonly _AuthRepository: Authrepository,
  ) {
    super({
      jwtfromrequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secreteKey: _ConfigService.get(Configurations.JWT_SECRET),
    });
  }

  async validate(payload: IJwtPayload) {
    const { username } = payload;
    const user = await this._AuthRepository.findOne({
      where: { username, name: 'ACTIVE' },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
