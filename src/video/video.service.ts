import { Injectable, NotFoundException } from '@nestjs/common';
import { Video } from './schema/video.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {Query} from 'express-serve-static-core'
import { User } from 'src/auth/schema/user.schema';
@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name)
    private videoModel: mongoose.Model<Video>
  ){}
  async findAllVideo(query: Query): Promise<Video[]>{
 
    const keyword = query.keyword?{
      title:{
        $regex: query.keyword,
        $options: 'i'
      }
    }:{}
    const videos = await this.videoModel.find({...keyword})
    if(!videos){
      throw new NotFoundException('Video not found')
    }
    return videos
  }
  async getVideoById(id:string):Promise<Video>{
    const video = await this.videoModel.findById(id)
    if(!video){
      throw new NotFoundException('Video not found')

    }
    return video
  }
  async createVideo(video: Video, user: User): Promise<Video>{
    const data = Object.assign(video, {
      user: user._id
    })
    const res = await this.videoModel.create(data)
    return res
  }
  async updateVideo(id: string, video:Video):Promise<Video>{
    return await this.videoModel.findByIdAndUpdate(id, video,{
      new: true,
      runValidators: true
    })
  }
  async deleteVideo(id: string){
    return this.videoModel.findByIdAndDelete(id)
  }
}
