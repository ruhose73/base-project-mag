import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Register, Tokens } from './interfaces';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(): Promise<Tokens> {
    return this.authService.login();
  }

  @Post('/register')
  async register(@Body() user: Register): Promise<Tokens> {
    return this.authService.register(user);
  }
}
