import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UsersI } from '../models/users.interface';
import { Observable } from 'rxjs';
import { CreateUser } from '../../endpoints/CreateUser';
import { LoginUser } from '../../endpoints/LoginUser';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @Post()
  create(@Body() createUser: CreateUser): Observable<UsersI> {
    return this.usersService.create(createUser);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() loginUser: LoginUser): Observable<Object> {
    return this.usersService.login(loginUser);
  }


}
