import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UsersI } from '../models/users.interface';
import { Observable } from 'rxjs';
import { CreateUser } from '../../endpoints/CreateUser';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @Post()
  create(@Body() createUser: CreateUser): Observable<UsersI>{
    return this.usersService.create(createUser)
  }



}
