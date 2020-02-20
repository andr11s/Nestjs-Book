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

@Controller('auth')
export class AuthController {
  constructor(private readonly _AuthService: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  async Signup(@Body() signupdto: SignUpDto): Promise<void> {
    return this._AuthService.siginup(signupdto);
  }

  @Post('/sigin')
  @UsePipes(ValidationPipe)
  async Sigin(@Body() sigindto: SigninDto) {
    return this._AuthService.sigin(sigindto);
  }
}
