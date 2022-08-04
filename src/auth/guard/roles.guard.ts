import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../users/role/role.enum';
import { ROLES_KEY } from '../../decorator/role.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const payload = req.rawHeaders[1].replace('Bearer ', '');
    const user = this.jwtService.decode(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    const roleId = user['role']['id'];
    return requiredRoles.some((role) => roleId?.includes(role));
  }
}
