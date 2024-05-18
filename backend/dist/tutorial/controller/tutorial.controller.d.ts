import { TutorialService } from 'src/tutorial/service/tutorial.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { CreateCourseDto } from 'src/dto/create-course.dto';
import { CreateCommentDto } from 'src/dto/create-comment.dto';
export declare class TutorialController {
    private readonly tutorialService;
    constructor(tutorialService: TutorialService);
    createUserData(createUserDto: CreateUserDto): Promise<void>;
    createCourseData(createCourseDto: CreateCourseDto): Promise<void>;
    addCommentToCourse(courseId: string, createCommentDto: CreateCommentDto): Promise<void>;
    getUserData(userId: string): Promise<any>;
    getCourseData(courseId: string): Promise<any>;
    getCoursesByCategory(category: string): Promise<any[]>;
    getAllCourses(): Promise<any[]>;
}
