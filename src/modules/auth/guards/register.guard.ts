import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { genSalt, hash } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RegisterGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { login, password, name, email } = req.body;
    const candidate = await this.userService.findByLogin(login);
    if (candidate) {
      throw new BadRequestException(`login already in use`);
    }
    const hashPassword = await hash(password, await genSalt(10));
    const activationLink = uuidv4();
    req.user = { login, password: hashPassword, name, email, activationLink };
    return true;
  }
}
