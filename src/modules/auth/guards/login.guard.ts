import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { compare } from 'bcryptjs';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { login, password } = req.body;
    const user = await this.userService.findByLogin(login);
    if (!user) {
      throw new BadRequestException(`wrong data`);
    }
    if (!(await compare(password, user.password))) {
      throw new BadRequestException(`wrong data`);
    }
    req.user = { id: user.id, role: user.role };
    return true;
  }
}
