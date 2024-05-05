import { Role } from 'src/app/users/interfaces/user.interface';

export interface SignUpDto {
  userName: string;
  password: string;
  role: Role;
}
