import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JWTPayload } from 'src/modules/auth/interfaces';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration:
        configService.get('config.nodeEnv') === 'development' ? true : false,
      secretOrKey: configService.get('config.jwt.jwtSecret'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, { ...payload }: JWTPayload) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new BadRequestException(`access token not found`);
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException(`token is empty`);
    }
    return payload;
  }
}
