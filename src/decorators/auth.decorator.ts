import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from 'src/app/users/interfaces/user.interface';
import { Roles } from './roles.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { RolesGuard } from 'src/guard/roles.guard';

export function Auth(roles: Role[]) {
  return applyDecorators(Roles(roles), UseGuards(AuthGuard, RolesGuard));
}
