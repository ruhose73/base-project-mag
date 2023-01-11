import { UserRole } from 'src/enums';

export interface UserCreationAttributes {
  login: string;
  password: string;
  name: string;
  role?: UserRole;
}
