import { Injectable } from '@nestjs/common';
import { JWTPayload } from './interfaces';
import { TokenService } from './token.service';
import { RegisterDto, TokenDto } from './dto';
import { UserService } from '../user/user.service';
import { MailService } from '../mail/mail.service';
import path from 'path';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  async login(user: JWTPayload): Promise<TokenDto> {
    return await this.tokenService.generateTokens(user);
  }

  async register(dto: RegisterDto): Promise<TokenDto> {
    this.mailService.confirmMessage({
      user: 'Misha',
      link: 'dfdfgdgdg',
      subject: 'dfgdgdgdgagfdsf',
      to: 'ruhose73@gmail.com',
    });
    const user = await this.userService.saveUser(dto);
    return await this.tokenService.generateTokens({
      id: user.id,
      role: user.role,
    });
  }

  async refresh(user: JWTPayload): Promise<TokenDto> {
    return await this.tokenService.generateTokens(user);
  }

  async activate(link: string) {}
}
