/// <reference types="multer" />
import { CreateUserDto } from 'src/dto/create-user.dto';
import { CreateCourseDto } from 'src/dto/create-course.dto';
import { CreateCommentDto } from 'src/dto/create-comment.dto';
import { LoginUserDto } from 'src/dto/login-user.dto';
export declare class TutorialService {
    createUserData(createUserDto: CreateUserDto): Promise<{
        id: string;
    }>;
    loginUser(loginUserDto: LoginUserDto): Promise<{
        idToken: string;
        email: string;
        username: string;
        userId: string;
    }>;
    getAllUsers(): Promise<any[]>;
    getUserData(userId: string): Promise<any>;
    createCourseData(courseId: string, createCourseDto: CreateCourseDto): Promise<void>;
    addCommentToCourse(courseId: string, commentId: string, createCommentDto: CreateCommentDto, userId: string): Promise<void>;
    deleteCommentFromCourse(courseId: string, commentId: string, userId: string): Promise<void>;
    updateCommentInCourse(courseId: string, commentId: string, createCommentDto: CreateCommentDto, userId: string): Promise<void>;
    getCourseData(courseId: string): Promise<any>;
    getCoursesByCategory(category: string): Promise<any[]>;
    getAllCourses(): Promise<any[]>;
    getTeachersAndMentors(courseId: string): Promise<any>;
    uploadFile(file: Express.Multer.File): Promise<string>;
    getFileUrl(fileName: string): Promise<string>;
    getCoursesSortedByRating(order: string): Promise<any[]>;
    private updateCourseRating;
    private calculateAverageRating;
}
