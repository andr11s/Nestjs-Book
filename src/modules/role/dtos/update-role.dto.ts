import { IsString, MaxLength, IsNumber } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UpdateRoleDto {
  @IsString()
  @MaxLength(50, { message: 'this Role name is not valid' })
  readonly Rolename: string;

  @IsString()
  @MaxLength(100, { message: 'This descriptions is not valid' })
  readonly descriptions: string;
}