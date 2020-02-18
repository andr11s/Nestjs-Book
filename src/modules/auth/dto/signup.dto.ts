import { IsEmpty, IsString } from 'class-validator';

export class SignUpDto {
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
