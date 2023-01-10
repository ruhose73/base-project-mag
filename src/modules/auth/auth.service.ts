import { Injectable } from '@nestjs/common';
import {
  AccessToken,
  JWTPayload,
  RefreshToken,
  Register,
  Tokens,
} from './interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/model/user.model';
import { Token } from './model/token.model';
import { genSalt, hash } from 'bcryptjs';
import { UserRole } from 'src/enums';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
    private jwtService: JwtService,
  ) {}

  async login(): Promise<Tokens> {
    return {
      accessToken: 'AccessToken',
      refreshToken: 'AccessToken',
    };
  }

  async register(user: Register): Promise<Tokens> {
    user.password = await hash(user.password, await genSalt(10));
    const createUser = await this.userRepository.save(user);
    console.log(createUser);
    const tokens = await this.generateTokens({
      id: createUser.id,
      role: UserRole.User,
    });
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

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

  async verifyJWTToken(token: string): Promise<any> {
    return await this.jwtService.verifyAsync(token);
  }

  decodeJWTToken(token: string): string | { [key: string]: any } {
    return this.jwtService.decode(token);
  }

  generateRefreshToken(): RefreshToken {
    return uuidv4();
  }
}
