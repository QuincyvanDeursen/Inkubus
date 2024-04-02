import {
	CanActivate,
	ExecutionContext,
	Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Role } from 'src/app/models/auth.model';
import { UserService } from 'src/app/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());

    if (!requiredRoles) {
      return true; // No roles are required, so allow access
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return false; // If no authorization header is provided, deny access
    }

    const token = await this.authService.verifyToken(authHeader);

    if (!token) {
      return false; // If token verification fails, deny access
    }

    const user = await this.userService.getUserById(token.id);

    if (!user) {
      return false; // If user retrieval fails, deny access
    }

    // Check if user's role matches any of the required roles
	var result = requiredRoles.some((role) => user.role === role);
    return result;
  }
}