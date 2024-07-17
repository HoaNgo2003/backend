import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { VideoService } from './video.service';
import { Video } from './schema/video.schema';
import { CreateVideoDto } from './dto/video.create.dto';
import { UpdateVideoDto } from './dto/update.video.dto';
 
import {Query as ExpessQuery} from 'express-serve-static-core'
import { AuthGuard } from '@nestjs/passport';
@Controller('video')
export class VideoController {
  constructor(private videoService: VideoService){}
  @Get()
  async getAllVideo(@Query() query: ExpessQuery):Promise<Video[]>{
    return this.videoService.findAllVideo(query)
  }
  @Get(':id')
  async getVideoById(@Param('id') id: string): Promise<Video>{
    return this.videoService.getVideoById(id)
  }
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createNewVideo(@Body() video: CreateVideoDto, @Req() req): Promise<Video>{
    return this.videoService.createVideo(video, req.user)
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch('/update/:id')
  async updateBookById(@Param('id') id: string,
  @Body() video: UpdateVideoDto  
  ){
    return this.videoService.updateVideo(id, video)
}
  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete/:id')
  async deleteBookById(@Param('id') id: string){
    return this.videoService.deleteVideo(id)
  }
  
}
