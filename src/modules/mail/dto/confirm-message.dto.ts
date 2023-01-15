import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ConfirmMessageDto {
  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  link: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  to: string;
}
