import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(
    context: ExecutionContext,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new BadRequestException();
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    const { refreshToken } = req.body;
    if (bearer !== 'Bearer' || !token || !refreshToken) {
      throw new BadRequestException();
    }
    const tokenPayload = this.tokenService.decodeJWTToken(token);
    if (!tokenPayload) {
      throw new BadRequestException('bad token');
    }
    req.user = tokenPayload;
    return true;
  }
}
