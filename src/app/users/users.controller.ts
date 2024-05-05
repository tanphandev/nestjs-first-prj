import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAll();
  }
}
