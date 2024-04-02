import { SetMetadata } from '@nestjs/common';
import { Role } from "src/app/models/auth.model";

export const HasRoles = (...roles: Role[]) => SetMetadata('roles', roles);