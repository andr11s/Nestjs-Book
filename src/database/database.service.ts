import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ConnectionOptions } from 'typeorm';
import { Configurations } from '../config/config.keys';

export const DatabaseService = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        type: 'mysql',
        host: config.get(Configurations.HOST),
        username: config.get(Configurations.USERNAME),
        port: 3306,
        database: 'test',
        password: config.get(Configurations.PASSWOORD),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      } as ConnectionOptions;
    },
  }),
];
