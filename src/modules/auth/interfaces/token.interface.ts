import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { UserRole } from 'src/enums/users-roles.enum';

export type AccessToken = string;
export type RefreshToken = string;

export class Tokens {
  accessToken: AccessToken;
  refreshToken: RefreshToken;
}
export interface JWTPayload {
  id: string;
  role: UserRole;
}
export interface TokenCreationAttributes {
  id: string;
  accessToken?: AccessToken;
  refreshToken: RefreshToken;
}
