import { Body, Controller,  Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/user.create.dto';
import { LoginDto } from './dto/user.login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}
  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto):Promise<{token:string}>{
    return this.authService.signUp(signUpDto)
  }
  @Post('/login')
    LoginDto(@Body() loginDto:LoginDto):Promise<{token:string}>{
      return this.authService.login(loginDto)
    
  }
}

