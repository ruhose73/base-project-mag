import { BadRequestException, Injectable } from '@nestjs/common';
import { JWTPayload, Tokens } from './interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/model/user.model';
import { compare, genSalt, hash } from 'bcryptjs';
import { TokenService } from './token.service';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly tokenService: TokenService,
  ) {}

  async login(dto: LoginDto): Promise<Tokens> {
    const user = await this.userRepository.findOneBy({
      login: dto.login,
    });
    if (!user) {
      throw new BadRequestException(`wrong data`);
    }
    if (!(await compare(dto.password, user.password))) {
      throw new BadRequestException(`wrong data`);
    }
    return await this.tokenService.generateTokens({
      id: user.id,
      role: user.role,
    });
  }

  async register(dto: RegisterDto): Promise<Tokens> {
    const candidate = await this.userRepository.findOneBy({
      login: dto.login,
    });
    if (candidate) {
      throw new BadRequestException(`login already in use`);
    }
    dto.password = await hash(dto.password, await genSalt(10));
    const createUser = await this.userRepository.save(dto);
    const tokens = await this.tokenService.generateTokens({
      id: createUser.id,
      role: createUser.role,
    });
    return tokens;
  }

  async refresh(user: JWTPayload): Promise<Tokens> {
    const tokens = await this.tokenService.generateTokens({
      id: user.id,
      role: user.role,
    });
    return tokens;
  }
}
