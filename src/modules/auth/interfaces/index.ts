import { UserRole } from 'src/enums/users-roles.enum';

export type AccessToken = string;
export type RefreshToken = string;

export class Tokens {
  accessToken: AccessToken;
  refreshToken: RefreshToken;
}

export interface IJWTPayload {
  id: string;
  role: UserRole;
}

export interface UpdatePasswordPayload {
  id: string;
  newPassword: string;
}

export interface TokenCreationAttributes {
  userId: string;
  accessToken?: AccessToken;
  refreshToken: RefreshToken;
}
