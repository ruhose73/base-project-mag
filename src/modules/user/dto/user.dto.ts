import { ApiProperty } from '@nestjs/swagger';
import { UserRole, UserStatus } from '../enum';
import { User } from '../model/user.model';

export class UserDto {
  @ApiProperty({ example: `+79998404904`, description: `Номер телефона` })
  login?: string;

  @ApiProperty({ example: `mail@mail.mail`, description: `Почта пользователя` })
  email?: string;

  @ApiProperty({ example: ` Михаил`, description: `Имя пользователя` })
  name?: string;

  @ApiProperty({ enum: UserRole, description: `Роль пользователя` })
  role?: UserRole;

  @ApiProperty({ enum:UserStatus, description: `Статус пользователя` })
  status?: UserStatus;

  constructor(user: User) {
    this.login = user.login;
    this.email = user.email;
    this.name = user.name;
    this.role = user.role;
    this.status = user.status;
  }
}
