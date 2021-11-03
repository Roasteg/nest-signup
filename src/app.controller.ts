import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Users } from './entities/users.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('protected')
  getHello(): string{
    return this.appService.getHello();
  }
}
