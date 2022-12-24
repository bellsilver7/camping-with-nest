import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from './entities/user.entity';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    console.log(data, ctx);

    const req = ctx.switchToHttp().getRequest();
    console.log(req);

    return req.user;
  },
);
