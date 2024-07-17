import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserSchema } from './schema/user.schema';
import { JwtStrategy } from './jwt.stratery';


@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService)=>{
        return{
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string|number>('JWT_EXPIRE')
          }
        }
      }
    }),
    MongooseModule.forFeature([{name:"User", schema: UserSchema}])
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports:[JwtStrategy, PassportModule]
})
export class AuthModule {}