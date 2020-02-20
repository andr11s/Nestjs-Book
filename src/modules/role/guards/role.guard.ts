import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly _refecltor: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles: string[] = this._refecltor.get<string[]>(
      'roles',
      context.getHandler,
    );

    if (!roles) {
      return true;
      console.log('no');
    }

    const Request = context.switchToHttp().getRequest();
    const { user } = Request;
    const HasRole = () =>
      user.roles.some((role: string) => roles.includes(role));

    return user && user.roles && HasRole();
  }
}
