import { TutorialService } from 'src/tutorial/service/tutorial.service';
export declare class TutorialController {
    private readonly tutorialService;
    constructor(tutorialService: TutorialService);
    createUserData(data: any): Promise<void>;
    createCourseData(data: any): Promise<void>;
    addCommentToCourse(courseId: string, data: any): Promise<void>;
    getUserData(userId: string): Promise<any>;
    getCourseData(courseId: string): Promise<any>;
    getCoursesByCategory(category: string): Promise<any[]>;
    getAllCourses(): Promise<any[]>;
}
