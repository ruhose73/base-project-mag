import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from '../token.service';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException(`No auth user token`);
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    const { refreshToken } = req.body;
    if (bearer !== 'Bearer' || !token || !refreshToken) {
      throw new UnauthorizedException(`No user tokens`);
    }
    let tokenPayload;
    if (process.env.NODE_ENV !== 'production') {
      tokenPayload = this.tokenService.decodeJWTToken(token);
    } else {
      tokenPayload = await this.tokenService.verifyJWTToken(token);
    }
    if (!tokenPayload) {
      throw new UnauthorizedException(`Token is not valid`);
    }
    req.user = tokenPayload;
    return true;
  }
}
