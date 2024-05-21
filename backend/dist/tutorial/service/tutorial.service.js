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
const firestore_1 = require("firebase/firestore");
let TutorialService = class TutorialService {
    async createUserData(createUserDto) {
        const { email, password, username } = createUserDto;
        try {
            const userCredential = await (0, firebase_config_1.createUserWithEmailAndPassword)(firebase_config_1.auth, email, password);
            const user = userCredential.user;
            const userId = user.uid;
            await (0, firestore_1.setDoc)((0, firestore_1.doc)(firebase_config_1.firestore, 'users', userId), {
                id: userId,
                email,
                username,
            });
            await (0, database_1.set)((0, database_1.ref)(firebase_config_1.database, 'users/' + userId), {
                id: userId,
                email,
                username,
            });
            return { id: userId };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Error creating user');
        }
    }
    async loginUser(loginUserDto) {
        const { email, password } = loginUserDto;
        try {
            const userCredential = await (0, firebase_config_1.signInWithEmailAndPassword)(firebase_config_1.auth, email, password);
            const user = userCredential.user;
            const idToken = await user.getIdToken();
            const userDoc = await (0, firestore_1.getDoc)((0, firestore_1.doc)(firebase_config_1.firestore, 'users', user.uid));
            const userData = userDoc.data();
            if (!userData) {
                throw new common_1.NotFoundException('User not found in Firestore');
            }
            return { idToken, email: user.email, username: userData.username };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
    }
    async getAllUsers() {
        const usersCollection = (0, firestore_1.collection)(firebase_config_1.firestore, 'users');
        const userDocs = await (0, firestore_1.getDocs)(usersCollection);
        return userDocs.docs.map(doc => doc.data());
    }
    async getUserData(userId) {
        const userDoc = await (0, firestore_1.getDoc)((0, firestore_1.doc)(firebase_config_1.firestore, 'users', userId));
        const userData = userDoc.data();
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
        await this.updateCourseRating(courseId);
    }
    async deleteCommentFromCourse(courseId, commentId) {
        const courseRef = (0, database_1.ref)(firebase_config_1.database, 'courses/' + courseId);
        const snapshot = await (0, database_1.get)(courseRef);
        const course = snapshot.val();
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        if (course.comments && course.comments[commentId]) {
            delete course.comments[commentId];
            await (0, database_1.update)(courseRef, { comments: course.comments });
            await this.updateCourseRating(courseId);
        }
        else {
            throw new common_1.NotFoundException('Comment not found');
        }
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
    async updateCourseRating(courseId) {
        const courseRef = (0, database_1.ref)(firebase_config_1.database, 'courses/' + courseId);
        const snapshot = await (0, database_1.get)(courseRef);
        const course = snapshot.val();
        if (course && course.comments) {
            const ratings = Object.values(course.comments).map((comment) => comment.rating);
            const averageRating = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : '0';
            await (0, database_1.update)(courseRef, { common_rate: averageRating });
        }
    }
    calculateAverageRating(comments) {
        const ratings = Object.values(comments || {}).map((comment) => comment.rating);
        const sum = ratings.reduce((a, b) => a + b, 0);
        return ratings.length ? sum / ratings.length : 0;
    }
};
exports.TutorialService = TutorialService;
exports.TutorialService = TutorialService = __decorate([
    (0, common_1.Injectable)()
], TutorialService);
//# sourceMappingURL=tutorial.service.js.map