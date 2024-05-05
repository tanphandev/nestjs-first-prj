import { Injectable } from '@nestjs/common';
import * as userList from '../../mocks/users-list.json';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: any[] = userList;

  findByName(userName: string): User {
    return this.users.find((user) => user.userName === userName);
  }

  getAll(): User[] {
    return this.users;
  }

  create(user: User): User {
    this.users.push(user);
    return user;
  }
}
