import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ExtractUserFromRequest = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest()?.user;
  },
);
