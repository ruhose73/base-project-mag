import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: `+79998404904`, description: `Номер телефона` })
  @IsNotEmpty()
  @IsPhoneNumber()
  login: string;

  @ApiProperty({ example: `Qwerty!23`, description: `Пароль` })
  @IsNotEmpty()
  @IsString()
  @Length(8, 16)
  password: string;

  @ApiProperty({ example: `Misha`, description: `Имя` })
  @IsNotEmpty()
  @IsString()
  @Length(2, 16)
  name: string;
}
