import { UserRole } from '../enum';

export interface UserCreationAttributes {
  login: string;
  password: string;
  name: string;
  role?: UserRole;
}
