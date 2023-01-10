import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordPayloadDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  newPassword: string;
}
