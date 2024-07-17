import { User } from "src/auth/schema/user.schema";
import { Category } from "../schema/video.schema";
export class CreateVideoDto{
  readonly title: string
  readonly link: string
  readonly author: string
  readonly category: Category
  readonly description: string
  readonly view: number
  readonly user: User
}