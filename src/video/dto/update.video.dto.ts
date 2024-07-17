import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Category } from "../schema/video.schema";
import { User } from "src/auth/schema/user.schema";

export class UpdateVideoDto{
  @IsNotEmpty()
  @IsString()
  readonly title: string

  @IsNotEmpty()
  @IsString()
  readonly link: string

  @IsNotEmpty()
  @IsString()
  readonly author: string
  @IsEnum(Category, {message:'Please enter correct category'})
  readonly category: Category

  @IsNotEmpty()
  @IsString()
  readonly description: string

  @IsNotEmpty()
  @IsNumber()
  readonly view: number
  @IsEmpty({message: 'You cannot pass user id'})
  readonly user: User
}