import { Injectable } from '@nestjs/common';
import { AccessToken, JWTPayload, RefreshToken, Tokens } from './interfaces';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async generateTokens(user: JWTPayload): Promise<Tokens> {
    return {
      accessToken: await this.generateJWTToken(user),
      refreshToken: this.generateRefreshToken(),
    };
  }
  async generateJWTToken(user: JWTPayload): Promise<AccessToken> {
    return await this.jwtService.signAsync({
      id: user.id,
      role: user.role,
    });
  }

  async verifyJWTToken(token: AccessToken): Promise<any> {
    return await this.jwtService.verifyAsync(token);
  }

  decodeJWTToken(token: AccessToken): string | { [key: string]: any } {
    return this.jwtService.decode(token);
  }

  generateRefreshToken(): RefreshToken {
    return uuidv4();
  }
}
