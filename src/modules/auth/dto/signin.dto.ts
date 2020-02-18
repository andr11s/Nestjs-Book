import { IsEmpty, IsString } from 'class-validator';

export class SigninDto {
  @IsEmpty()
  @IsString()
  username: string;

  @IsEmpty()
  @IsString()
  email: string;

  @IsEmpty()
  @IsString()
  passwoord: string;
}
