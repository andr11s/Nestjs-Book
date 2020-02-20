import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Authrepository } from './auth.repository';
import { ConfigService } from '../../config/config.service';
import { JTstrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '../../config/config.module';
import { Configurations } from '../../config/config.keys';

@Module({
  imports: [
    TypeOrmModule.forFeature([Authrepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          secret: config.get(Configurations.JWT_SECRET),
          signOptions: {
            expiresIn: 3600,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ConfigService, JTstrategy],
  exports: [JTstrategy, PassportModule],
})
export class AuthModule {}
