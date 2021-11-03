import { IsNotEmpty } from 'class-validator';

export class CreateUser{

  name: string;

  @IsNotEmpty()
  password: string;
}