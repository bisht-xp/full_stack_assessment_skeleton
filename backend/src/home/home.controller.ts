import { Body, Controller, Get, HttpException, HttpStatus, ParseIntPipe, Post, Query } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('/find-by-user')
  findByUser(@Query('userId', ParseIntPipe) userId: number, @Query('page', ParseIntPipe) page: number = 1) {
    try {
      
      return this.homeService.findByUser(userId, page);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('/update-users')
  updateUsers(@Body() body: { homeId: number; userIds: number[] }) {
    try {
      return this.homeService.updateUsers(body.homeId, body.userIds);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
