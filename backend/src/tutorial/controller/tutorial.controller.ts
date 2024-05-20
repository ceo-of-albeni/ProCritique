import { Body, Controller, Post, Get, Param, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { TutorialService } from 'src/tutorial/service/tutorial.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { CreateCourseDto } from 'src/dto/create-course.dto';
import { CreateCommentDto } from 'src/dto/create-comment.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { LoginUserDto } from 'src/dto/login-user.dto';


@ApiTags('tutorial')
@Controller('tutorial')
export class TutorialController {
  constructor(private readonly tutorialService: TutorialService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully logged in.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async loginUser(@Body() loginUserDto: LoginUserDto): Promise<{ idToken: string }> {
    return await this.tutorialService.loginUser(loginUserDto);
  }

  @Post('createUser')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createUserData(@Body() createUserDto: CreateUserDto): Promise<{ id: string }> {
    return await this.tutorialService.createUserData(createUserDto);
  }

  @Get('getUser/:userId')
  @ApiOperation({ summary: 'Get user data by ID' })
  @ApiResponse({ status: 200, description: 'Return user data.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getUserData(@Param('userId') userId: string): Promise<any> {
    return await this.tutorialService.getUserData(userId);
  }

  @Get('getAllUsers')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  async getAllUsers(): Promise<any[]> {
    return await this.tutorialService.getAllUsers();
  }

  @Post('createCourse')
  @ApiOperation({ summary: 'Create a new course' })
  @ApiResponse({ status: 201, description: 'The course has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createCourseData(@Body() createCourseDto: CreateCourseDto): Promise<void> {
    const courseId = 'course' + Date.now(); 
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
    const commentId = 'comment' + Date.now();
    await this.tutorialService.addCommentToCourse(courseId, commentId, createCommentDto);
  }

  @Post('deleteComment/:courseId/:commentId')
  @ApiOperation({ summary: 'Delete a comment from a course' })
  @ApiResponse({ status: 200, description: 'The comment has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  async deleteCommentFromCourse(
    @Param('courseId') courseId: string,
    @Param('commentId') commentId: string
  ): Promise<void> {
    await this.tutorialService.deleteCommentFromCourse(courseId, commentId);
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

  @Get('getCoursesSortedByRating')
  @ApiOperation({ summary: 'Get courses sorted by rating' })
  @ApiResponse({ status: 200, description: 'Return sorted courses by rating.' })
  async getCoursesSortedByRating(@Query('order') order: string): Promise<any[]> {
    return await this.tutorialService.getCoursesSortedByRating(order);
  }

  @Get('getTeachersAndMentors/:courseId')
  @ApiOperation({ summary: 'Get teachers and mentors by course ID' })
  @ApiResponse({ status: 200, description: 'Return teachers and mentors.' })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  async getTeachersAndMentors(@Param('courseId') courseId: string): Promise<any> {
    return await this.tutorialService.getTeachersAndMentors(courseId);
  }

  @Post('upload')
  @ApiOperation({ summary: 'Upload a file to Firebase Storage' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'The file has been successfully uploaded.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const url = await this.tutorialService.uploadFile(file);
    return { url };
  }

  @Get('file/:fileName')
  @ApiOperation({ summary: 'Get the URL of a file in Firebase Storage' })
  @ApiParam({ name: 'fileName', required: true, description: 'The name of the file' })
  @ApiResponse({ status: 200, description: 'Return the file URL.' })
  @ApiResponse({ status: 404, description: 'File not found.' })
  async getFileUrl(@Param('fileName') fileName: string): Promise<any> {
    const url = await this.tutorialService.getFileUrl(fileName);
    return { url };
  }
}
