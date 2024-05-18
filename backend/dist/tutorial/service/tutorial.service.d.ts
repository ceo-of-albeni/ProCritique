export declare class TutorialService {
    private dbRef;
    createUserData(userId: string, data: any): Promise<void>;
    createCourseData(courseId: string, data: any): Promise<void>;
    addCommentToCourse(courseId: string, commentId: string, data: any): Promise<void>;
    getUserData(userId: string): Promise<any>;
    getCourseData(courseId: string): Promise<any>;
    getCoursesByCategory(category: string): Promise<any[]>;
    getAllCourses(): Promise<any[]>;
}
