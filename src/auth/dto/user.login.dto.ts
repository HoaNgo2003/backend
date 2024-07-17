import { IsEmail, IsNotEmpty,  IsString, MinLength } from "class-validator"
 
export class LoginDto{
 

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string

  @IsNotEmpty()
  @IsEmail({}, {message:'Please enter correct email'})
  readonly email: string

  
 
}