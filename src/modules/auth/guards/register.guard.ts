import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class RegisterGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { login, password, name } = req.body;
    const candidate = await this.userService.findByLogin(login);
    if (candidate) {
      throw new BadRequestException(`login already in use`);
    }
    const hashPassword = await hash(password, await genSalt(10));
    req.user = { login, password: hashPassword, name };
    return true;
  }
}
