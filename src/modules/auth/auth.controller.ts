import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { JWTPayload, Tokens } from './interfaces';
import { ExtractUserFromRequest } from 'src/common/decorators';
import { RefreshTokenGuard } from './refresh-tokens.guard';

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

  @Get('/refresh')
  @UseGuards(RefreshTokenGuard)
  async refresh(@ExtractUserFromRequest() user: JWTPayload): Promise<Tokens> {
    return this.authService.refresh(user);
  }
}
