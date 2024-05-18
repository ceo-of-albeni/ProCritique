import { Body, Controller, Post, Get, Param, Query } from '@nestjs/common';
import { TutorialService } from 'src/tutorial/service/tutorial.service';

@Controller('tutorial')
export class TutorialController {
  constructor(private readonly tutorialService: TutorialService) {}

  @Post('createUser')
  async createUserData(@Body() data: any): Promise<void> {
    const userId = 'user' + Date.now(); // Пример генерации уникального ID
    await this.tutorialService.createUserData(userId, data);
  }

  @Post('createCourse')
  async createCourseData(@Body() data: any): Promise<void> {
    const courseId = 'course' + Date.now(); // Пример генерации уникального ID
    await this.tutorialService.createCourseData(courseId, data);
  }

  @Post('addComment/:courseId')
  async addCommentToCourse(
    @Param('courseId') courseId: string,
    @Body() data: any
  ): Promise<void> {
    const commentId = 'comment' + Date.now(); // Пример генерации уникального ID
    await this.tutorialService.addCommentToCourse(courseId, commentId, data);
  }

  @Get('getUser/:userId')
  async getUserData(@Param('userId') userId: string): Promise<any> {
    return await this.tutorialService.getUserData(userId);
  }

  @Get('getCourse/:courseId')
  async getCourseData(@Param('courseId') courseId: string): Promise<any> {
    return await this.tutorialService.getCourseData(courseId);
  }

  @Get('getCoursesByCategory')
  async getCoursesByCategory(@Query('category') category: string): Promise<any[]> {
    return await this.tutorialService.getCoursesByCategory(category);
  }

  @Get('getAllCourses')
  async getAllCourses(): Promise<any[]> {
    return await this.tutorialService.getAllCourses();
  }
}
