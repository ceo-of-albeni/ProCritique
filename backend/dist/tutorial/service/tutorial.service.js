"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorialService = void 0;
const common_1 = require("@nestjs/common");
const firebase_config_1 = require("../../firebase.config");
const database_1 = require("firebase/database");
const storage_1 = require("firebase/storage");
const uuid_1 = require("uuid");
let TutorialService = class TutorialService {
    async createUserData(userId, createUserDto) {
        const userRef = (0, database_1.ref)(firebase_config_1.database, 'users/' + userId);
        await (0, database_1.set)(userRef, createUserDto);
    }
    async getUserData(userId) {
        const userRef = (0, database_1.ref)(firebase_config_1.database, 'users/' + userId);
        const snapshot = await (0, database_1.get)(userRef);
        const userData = snapshot.val();
        if (!userData) {
            throw new common_1.NotFoundException('User not found');
        }
        return userData;
    }
    async createCourseData(courseId, createCourseDto) {
        const courseRef = (0, database_1.ref)(firebase_config_1.database, 'courses/' + courseId);
        await (0, database_1.set)(courseRef, createCourseDto);
    }
    async addCommentToCourse(courseId, commentId, createCommentDto) {
        const courseRef = (0, database_1.ref)(firebase_config_1.database, 'courses/' + courseId);
        const snapshot = await (0, database_1.get)(courseRef);
        const course = snapshot.val();
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        if (!course.comments) {
            course.comments = {};
        }
        course.comments[commentId] = createCommentDto;
        await (0, database_1.update)(courseRef, { comments: course.comments });
    }
    async getCourseData(courseId) {
        const courseRef = (0, database_1.ref)(firebase_config_1.database, 'courses/' + courseId);
        const snapshot = await (0, database_1.get)(courseRef);
        const courseData = snapshot.val();
        if (!courseData) {
            throw new common_1.NotFoundException('Course not found');
        }
        return courseData;
    }
    async getCoursesByCategory(category) {
        const coursesRef = (0, database_1.query)((0, database_1.ref)(firebase_config_1.database, 'courses'), (0, database_1.orderByChild)('category'), (0, database_1.equalTo)(category));
        const snapshot = await (0, database_1.get)(coursesRef);
        const courses = snapshot.val();
        return Object.values(courses || {});
    }
    async getAllCourses() {
        const coursesRef = (0, database_1.ref)(firebase_config_1.database, 'courses');
        const snapshot = await (0, database_1.get)(coursesRef);
        const courses = snapshot.val();
        return Object.values(courses || {});
    }
    async getCoursesSortedByRating(order) {
        const coursesRef = (0, database_1.ref)(firebase_config_1.database, 'courses');
        const snapshot = await (0, database_1.get)(coursesRef);
        const courses = snapshot.val();
        const coursesArray = Object.values(courses || {});
        coursesArray.sort((a, b) => {
            const ratingA = this.calculateAverageRating(a.comments);
            const ratingB = this.calculateAverageRating(b.comments);
            return order === 'asc' ? ratingA - ratingB : ratingB - ratingA;
        });
        return coursesArray;
    }
    async getTeachersAndMentors(courseId) {
        const courseRef = (0, database_1.ref)(firebase_config_1.database, 'courses/' + courseId);
        const snapshot = await (0, database_1.get)(courseRef);
        const course = snapshot.val();
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        return {
            teachers: course.teachers,
            mentors: course.mentors,
        };
    }
    calculateAverageRating(comments) {
        const ratings = Object.values(comments || {}).map((comment) => comment.rating);
        const sum = ratings.reduce((a, b) => a + b, 0);
        return ratings.length ? sum / ratings.length : 0;
    }
    async uploadFile(file) {
        const fileRef = (0, storage_1.ref)(firebase_config_1.storage, `icons/${(0, uuid_1.v4)()}-${file.originalname}`);
        await (0, storage_1.uploadBytes)(fileRef, file.buffer);
        const downloadURL = await (0, storage_1.getDownloadURL)(fileRef);
        return downloadURL;
    }
    async getFileUrl(fileName) {
        try {
            const fileRef = (0, storage_1.ref)(firebase_config_1.storage, `icons/${fileName}`);
            await (0, storage_1.getMetadata)(fileRef);
            const downloadURL = await (0, storage_1.getDownloadURL)(fileRef);
            return downloadURL;
        }
        catch (error) {
            throw new common_1.NotFoundException(`File ${fileName} not found`);
        }
    }
};
exports.TutorialService = TutorialService;
exports.TutorialService = TutorialService = __decorate([
    (0, common_1.Injectable)()
], TutorialService);
//# sourceMappingURL=tutorial.service.js.map