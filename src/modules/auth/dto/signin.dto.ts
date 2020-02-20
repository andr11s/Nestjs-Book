import { IsEmpty, IsString, IsNotEmpty } from 'class-validator';

export class SigninDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  passwoord: string;
}
