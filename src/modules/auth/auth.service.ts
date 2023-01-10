import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  AccessToken,
  JWTPayload,
  Login,
  RefreshToken,
  Register,
  Tokens,
} from './interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/model/user.model';
import { compare, genSalt, hash } from 'bcryptjs';
import { UserRole } from 'src/enums';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginData: Login): Promise<Tokens> {
    const user = await this.userRepository.findOneBy({
      login: loginData.login,
    });
    if (!user) {
      throw new BadRequestException(`wrong data`);
    }
    if (!(await compare(loginData.password, user.password))) {
      throw new BadRequestException(`wrong data`);
    }

    const data = await this.userRepository.update(
      {
        id: user.id,
      },
      {
        role: UserRole.Admin,
      },
    );

    return await this.generateTokens({
      id: user.id,
      role: user.role,
    });
  }

  async register(user: Register): Promise<Tokens> {
    user.password = await hash(user.password, await genSalt(10));
    const createUser = await this.userRepository.save(user);
    const tokens = await this.generateTokens({
      id: createUser.id,
      role: createUser.role,
    });
    return tokens;
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
