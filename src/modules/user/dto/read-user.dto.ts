import { IsNumber, IsNotEmpty, IsEmail } from 'class-validator';
import { ReadDetailsdto } from './read-details.dto';
import { Type, Exclude, Expose } from 'class-transformer';
import { ReadRoleDto } from '../../role/dtos/read-role.dto';

@Exclude()
export class ReadUserDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsNotEmpty()
  username: string;

  @Expose()
  @Type(type => ReadDetailsdto)
  readonly details: ReadDetailsdto;

  @Expose()
  @Type(Type => ReadRoleDto)
  readonly roles: ReadRoleDto[];
}
