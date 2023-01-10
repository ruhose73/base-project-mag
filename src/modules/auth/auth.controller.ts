import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { Tokens } from './interfaces';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() user: LoginDto): Promise<Tokens> {
    return this.authService.login(user);
  }

  @Post('/register')
  async register(@Body() user: RegisterDto): Promise<Tokens> {
    return this.authService.register(user);
  }
}
