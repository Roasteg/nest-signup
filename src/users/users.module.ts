import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([Users]),
    ConfigModule.forRoot({ envFilePath: ['.env.local'], isGlobal: true, cache: true }),
    AuthModule,
  ],
})
export class UsersModule {
}
