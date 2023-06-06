import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../modules/user/enum'
import { ROLES_KEY } from '../constants';

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
