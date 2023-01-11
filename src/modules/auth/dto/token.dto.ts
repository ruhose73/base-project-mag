import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { AccessToken, RefreshToken } from '../interfaces';

export class TokenDto {
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
