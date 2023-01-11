import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto';
import { JWTPayload, Tokens } from './interfaces';
import { ExtractUserFromRequest } from 'src/common/decorators';
import { RefreshTokenGuard, RegisterGuard, LoginGuard } from './guards';
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(LoginGuard)
  async login(@ExtractUserFromRequest() user: JWTPayload): Promise<Tokens> {
    return this.authService.login(user);
  }

  @Post('/register')
  @UseGuards(RegisterGuard)
  async register(@ExtractUserFromRequest() user: RegisterDto): Promise<Tokens> {
    return this.authService.register(user);
  }

  @Get('/refresh')
  @UseGuards(RefreshTokenGuard)
  async refresh(@ExtractUserFromRequest() user: JWTPayload): Promise<Tokens> {
    return this.authService.refresh(user);
  }
}
