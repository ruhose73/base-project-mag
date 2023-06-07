import { UserRole } from '../../user/enum';
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
