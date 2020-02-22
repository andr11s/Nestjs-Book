import { Exclude, Expose, Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { ReadUserDto } from '../../user/dto/read-user.dto';

@Exclude()
export class LoggedInDto {
  @Expose()
  @IsString()
  token: String;

  @Expose()
  @Type(() => ReadUserDto)
  user: ReadUserDto;
}
