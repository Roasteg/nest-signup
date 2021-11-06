import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../entities/users.entity';
import { Repository } from 'typeorm';
import { UsersI } from '../models/users.interface';
import { from, map, Observable, switchMap } from 'rxjs';
import { CreateUser } from '../../endpoints/CreateUser';
import { AuthService } from '../../auth/services/auth.service';
import { LoginUser } from '../../endpoints/LoginUser';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private authService: AuthService,
  ) {
  }

  create(user: CreateUser): Observable<UsersI> {
    return this.userExists(user.name).pipe(switchMap((exists: boolean) => {
      if (!exists) {
        return this.authService.hashPassword(user.password).pipe(switchMap((passHash: string) => {
          user.password = passHash;
          return from(this.usersRepository.save(user)).pipe(map((savedUser: UsersI) => {
            const { password, ...user } = savedUser;
            return user;
          }));
        }));
      } else {
        throw new HttpException('Username is already used', HttpStatus.CONFLICT);
      }
    }));
  }

  login(loginUser: LoginUser): Observable<string> {
    return this.findUserByName(loginUser.username).pipe(
      switchMap((user: UsersI) => {
        if(user){
          return this.validatePassword(loginUser.password, user.password).pipe(map((passwordsMatch: boolean) => {
            if (passwordsMatch) {
              return 'Success';
            } else {
              throw new HttpException('Passwords do not match!', HttpStatus.UNAUTHORIZED);
            }
          }))
        } else{
          throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
      }),
    );
  }


  private findUserByName(username: string): Observable<UsersI> {
    return from(this.usersRepository.findOne({ username }, { select: ['id', 'username', 'password'] }));
  }

  private validatePassword(password: string, storedPassHash: string): Observable<boolean> {
    return this.authService.comparePasswords(password, storedPassHash);
  }

  private userExists(username: string): Observable<boolean> {
    return from(this.usersRepository.findOne({ username })).pipe(map((username: UsersI) => {
      if (username) {
        return true;
      } else {
        return false;
      }
    }));
  }
}
