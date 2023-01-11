import { UserRole } from 'src/enums/users-roles.enum';
import { AccessToken, RefreshToken } from '../types';

export interface JWTPayload {
  id: string;
  role: UserRole;
}
export interface TokenCreationAttributes {
  id: string;
  accessToken?: AccessToken;
  refreshToken: RefreshToken;
}
