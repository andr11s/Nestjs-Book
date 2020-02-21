import { IsString, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @MaxLength(50, { message: 'this Role name is not valid' })
  readonly RoleName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'This descriptions is not valid' })
  readonly descriptions: string;
}
