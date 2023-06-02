import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserRole, UserStatus } from 'src/enums';
import { User } from '../model/user.model';

export class UserDto {
  @ApiProperty({ example: `+79998404904`, description: `Номер телефона` })
  @IsNotEmpty()
  login?: string;

  @ApiProperty({ example: `mail@mail.mail`, description: `Почта пользователя` })
  @IsNotEmpty()
  email?: string;

  @ApiProperty({ example: ` Михаил`, description: `Имя пользователя` })
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ type:UserRole, description: `Роль пользователя` })
  @IsNotEmpty()
  role?: UserRole;

  @ApiProperty({ type:UserStatus, description: `Статус пользователя` })
  @IsNotEmpty()
  status?: UserStatus;

  constructor(user: User) {
    this.login = user.login;
    this.email = user.email;
    this.name = user.name;
    this.role = user.role;
    this.status = user.status;
  }
}
