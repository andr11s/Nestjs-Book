import { IsString, MaxLength, IsNumber } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReadRoleDto {
  @Expose()
  @IsNumber()
  readonly rolesid: number;

  @Expose()
  @IsString()
  @MaxLength(25, { message: 'this Role name is not valid' })
  readonly RoleName: string;

  @Expose()
  @IsString()
  @MaxLength(50, { message: 'This descriptions is not valid' })
  readonly descriptions: string;
}
