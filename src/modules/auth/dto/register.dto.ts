import { IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;
}
