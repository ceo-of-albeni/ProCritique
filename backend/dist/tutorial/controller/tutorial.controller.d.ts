/// <reference types="multer" />
import { TutorialService } from 'src/tutorial/service/tutorial.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { CreateCourseDto } from 'src/dto/create-course.dto';
import { CreateCommentDto } from 'src/dto/create-comment.dto';
export declare class TutorialController {
    private readonly tutorialService;
    constructor(tutorialService: TutorialService);
    createUserData(createUserDto: CreateUserDto): Promise<{
        id: string;
    }>;
    getUserData(userId: string): Promise<any>;
    getAllUsers(): Promise<any[]>;
    createCourseData(createCourseDto: CreateCourseDto): Promise<void>;
    addCommentToCourse(courseId: string, createCommentDto: CreateCommentDto): Promise<void>;
    deleteCommentFromCourse(courseId: string, commentId: string): Promise<void>;
    getCourseData(courseId: string): Promise<any>;
    getCoursesByCategory(category: string): Promise<any[]>;
    getAllCourses(): Promise<any[]>;
    getCoursesSortedByRating(order: string): Promise<any[]>;
    getTeachersAndMentors(courseId: string): Promise<any>;
    uploadFile(file: Express.Multer.File): Promise<{
        url: string;
    }>;
    getFileUrl(fileName: string): Promise<any>;
}
