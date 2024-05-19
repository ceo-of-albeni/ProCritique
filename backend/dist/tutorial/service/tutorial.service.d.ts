/// <reference types="multer" />
import { CreateUserDto } from 'src/dto/create-user.dto';
import { CreateCourseDto } from 'src/dto/create-course.dto';
import { CreateCommentDto } from 'src/dto/create-comment.dto';
export declare class TutorialService {
    createUserData(userId: string, createUserDto: CreateUserDto): Promise<void>;
    getUserData(userId: string): Promise<any>;
    createCourseData(courseId: string, createCourseDto: CreateCourseDto): Promise<void>;
    addCommentToCourse(courseId: string, commentId: string, createCommentDto: CreateCommentDto): Promise<void>;
    getCourseData(courseId: string): Promise<any>;
    getCoursesByCategory(category: string): Promise<any[]>;
    getAllCourses(): Promise<any[]>;
    getCoursesSortedByRating(order: string): Promise<any[]>;
    getTeachersAndMentors(courseId: string): Promise<any>;
    private calculateAverageRating;
    uploadFile(file: Express.Multer.File): Promise<string>;
    getFileUrl(fileName: string): Promise<string>;
}
