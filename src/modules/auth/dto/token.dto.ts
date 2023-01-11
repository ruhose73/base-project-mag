import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { AccessToken, RefreshToken } from '../types';

export class TokenDto {
  @IsNotEmpty()
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIxYTFhY2M3LTkzMTUtNDFiNi05Y2NjLTZhMGY5M2EzYmZ',
    description: `access token`,
  })
  accessToken: AccessToken;

  @IsNotEmpty()
  @ApiProperty({
    example: '3c4edc65-d1e0-4f10-84f6-442d50a39db5',
    description: `refresh token`,
  })
  refreshToken: RefreshToken;
}
