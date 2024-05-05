import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/interfaces/user.interface';
import { checkHash, hashString } from 'src/helper/hash-string';
import { SignUpDto } from './dto/sign-up.dto';
import { randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(userData: SignUpDto) {
    const isUserExits = this.usersService.findByName(userData.userName);
    if (isUserExits) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    // encode password
    const hashPassword = await hashString(userData.password);
    const newUser: User = {
      id: randomUUID(),
      userName: userData.userName,
      password: hashPassword,
      role: userData.role,
    };

    this.usersService.create(newUser);
    return {
      message: 'User created successfully',
    };
  }

  async signIn(signInData: User) {
    const user = this.usersService.findByName(signInData.userName);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const isMatchPassword = await checkHash(user.password, signInData.password);
    if (!isMatchPassword) {
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    }

    const payload: User = {
      id: user.id,
      userName: user.userName,
      role: user.role,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
