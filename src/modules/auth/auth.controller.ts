import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login, Register, Tokens } from './interfaces';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() user: Login): Promise<Tokens> {
    return this.authService.login(user);
  }

  @Post('/register')
  async register(@Body() user: Register): Promise<Tokens> {
    return this.authService.register(user);
  }
}
