import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { UserRole } from 'src/enums/users-roles.enum';

export type AccessToken = string;
export type RefreshToken = string;

export class Tokens {
  @IsNotEmpty()
  @ApiProperty({
    example: 'd4e5cbd9-b96c-4543-9f53-24a01693bc76',
    description: `access token`,
  })
  accessToken: AccessToken;

  @IsNotEmpty()
  @ApiProperty({
    example: 'd4e5cbd9-b96c-4543-9f53-24a01693bc76',
    description: `refresh token`,
  })
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
