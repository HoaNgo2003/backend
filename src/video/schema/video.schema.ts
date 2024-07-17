import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/auth/schema/user.schema";
export enum Category{
  ADVENTURE = 'Adventure',
  CLASSICS = 'Classics',
  CRIME ='Crime',
  FANTASY = 'Fantasy'
} 
@Schema({
  timestamps: true
})
export class Video{
  @Prop()
  title: string
  @Prop()
  author: string
  @Prop()
  description: string
  @Prop()
  link: string
  @Prop()
  view: number
  @Prop()
  category: Category;
  @Prop({type:mongoose.Schema.Types.ObjectId, ref:'User'})
  user: User;
}
export const VideoSchema = SchemaFactory.createForClass(Video)