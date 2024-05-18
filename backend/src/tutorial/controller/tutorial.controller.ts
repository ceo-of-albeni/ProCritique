import { Body, Controller, Post, Get, Param, Query } from '@nestjs/common';
import { TutorialService } from 'src/tutorial/service/tutorial.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { CreateCourseDto } from 'src/dto/create-course.dto';
import { CreateCommentDto } from 'src/dto/create-comment.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('tutorial')
@Controller('tutorial')
export class TutorialController {
  constructor(private readonly tutorialService: TutorialService) {}

  @Post('createUser')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createUserData(@Body() createUserDto: CreateUserDto): Promise<void> {
    const userId = 'user' + Date.now(); // Пример генерации уникального ID
    await this.tutorialService.createUserData(userId, createUserDto);
  }

  @Post('createCourse')
  @ApiOperation({ summary: 'Create a new course' })
  @ApiResponse({ status: 201, description: 'The course has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createCourseData(@Body() createCourseDto: CreateCourseDto): Promise<void> {
    const courseId = 'course' + Date.now(); // Пример генерации уникального ID
    await this.tutorialService.createCourseData(courseId, createCourseDto);
  }

  @Post('addComment/:courseId')
  @ApiOperation({ summary: 'Add a comment to a course' })
  @ApiResponse({ status: 201, description: 'The comment has been successfully added.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async addCommentToCourse(
    @Param('courseId') courseId: string,
    @Body() createCommentDto: CreateCommentDto
  ): Promise<void> {
    const commentId = 'comment' + Date.now(); // Пример генерации уникального ID
    await this.tutorialService.addCommentToCourse(courseId, commentId, createCommentDto);
  }

  @Get('getUser/:userId')
  @ApiOperation({ summary: 'Get user data by ID' })
  @ApiResponse({ status: 200, description: 'Return user data.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getUserData(@Param('userId') userId: string): Promise<any> {
    return await this.tutorialService.getUserData(userId);
  }

  @Get('getCourse/:courseId')
  @ApiOperation({ summary: 'Get course data by ID' })
  @ApiResponse({ status: 200, description: 'Return course data.' })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  async getCourseData(@Param('courseId') courseId: string): Promise<any> {
    return await this.tutorialService.getCourseData(courseId);
  }

  @Get('getCoursesByCategory')
  @ApiOperation({ summary: 'Get courses by category' })
  @ApiResponse({ status: 200, description: 'Return courses by category.' })
  async getCoursesByCategory(@Query('category') category: string): Promise<any[]> {
    return await this.tutorialService.getCoursesByCategory(category);
  }

  @Get('getAllCourses')
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({ status: 200, description: 'Return all courses.' })
  async getAllCourses(): Promise<any[]> {
    return await this.tutorialService.getAllCourses();
  }
}
