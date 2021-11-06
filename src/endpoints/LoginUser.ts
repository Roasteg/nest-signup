import { IsNotEmpty } from 'class-validator';


export class LoginUser {
  username: string;

  @IsNotEmpty()
  password: string;

}