import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from 'src/decorators/roles.decorator';
import { isEmpty } from 'src/utils/validationUtils';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (isEmpty(roles)) return true;
    const request = context.switchToHttp().getRequest();
    const user = request?.user;
    return roles.includes(user?.role);
  }
}
