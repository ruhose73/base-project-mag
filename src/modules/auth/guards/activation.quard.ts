import {
    Injectable,
    CanActivate,
    ExecutionContext,
    BadRequestException,
  } from '@nestjs/common';
  import { UserService } from 'src/modules/user/user.service';

  @Injectable()
  export class ActivationGuard implements CanActivate {
    constructor(private readonly userService: UserService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const req = context.switchToHttp().getRequest();
      const link = req.params.link;
      const user = await this.userService.findByLink(link);
      if (!user) {
        throw new BadRequestException(`User already activated`);
      }
      req.params.link = link;
      return true;
    }
  }
  