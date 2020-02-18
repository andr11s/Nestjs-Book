import { Injectable } from '@nestjs/common';
import { TypeMapper } from 'ts-mapper';
import { UserDto } from '../modules/user/dto/user.dto';
import { UserEntity } from '../modules/user/user.entity';

@Injectable()
export class MapperService extends TypeMapper {
  constructor() {
    super();
    this.config();
  }

  private config(): void {
    this.createMap<UserEntity, UserDto>()
      .map(
        Entity => Entity.userid,
        dto => dto.id,
      )
      .map(
        Entity => Entity.username,
        dto => dto.username,
      )
      .map(
        Entity => Entity.email,
        dto => dto.email,
      )
      .map(
        Entity => Entity.roles,
        dto => dto.roles,
      )
      .map(
        Entity => Entity.details,
        dto => dto.details,
      );
  }
}
