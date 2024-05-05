export interface User {
  id?: string;
  userName?: string;
  password?: string;
  role?: Role;
}

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
