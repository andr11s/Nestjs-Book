import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { LoggedInDto } from './dto/logged-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _AuthService: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  Signup(@Body() signupdto: SignUpDto): Promise<void> {
    return this._AuthService.siginup(signupdto);
  }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  Signin(@Body() sigindto: SigninDto): Promise<LoggedInDto> {
    return this._AuthService.sigin(sigindto);
  }
}
