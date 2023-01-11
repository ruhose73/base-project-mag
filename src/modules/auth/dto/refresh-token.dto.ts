import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class RefreshTokenDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: 'd4e5cbd9-b96c-4543-9f53-24a01693bc76',
    description: `refresh token`,
  })
  refreshToken: string;
}
