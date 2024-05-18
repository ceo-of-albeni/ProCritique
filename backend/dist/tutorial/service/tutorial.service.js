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
const database_1 = require("firebase/database");
const firebase_config_1 = require("../../firebase.config");
let TutorialService = class TutorialService {
    constructor() {
        this.dbRef = (0, database_1.ref)(firebase_config_1.firebaseDataBase);
    }
    async createUserData(userId, data) {
        await (0, database_1.set)((0, database_1.ref)(firebase_config_1.firebaseDataBase, 'users/' + userId), data);
    }
    async createCourseData(courseId, data) {
        await (0, database_1.set)((0, database_1.ref)(firebase_config_1.firebaseDataBase, 'courses/' + courseId), data);
    }
    async addCommentToCourse(courseId, commentId, data) {
        await (0, database_1.set)((0, database_1.ref)(firebase_config_1.firebaseDataBase, `courses/${courseId}/comments/${commentId}`), data);
    }
    async getUserData(userId) {
        const snapshot = await (0, database_1.get)((0, database_1.child)(this.dbRef, `users/${userId}`));
        return snapshot.exists() ? snapshot.val() : null;
    }
    async getCourseData(courseId) {
        const snapshot = await (0, database_1.get)((0, database_1.child)(this.dbRef, `courses/${courseId}`));
        return snapshot.exists() ? snapshot.val() : null;
    }
    async getCoursesByCategory(category) {
        const coursesRef = (0, database_1.query)((0, database_1.ref)(firebase_config_1.firebaseDataBase, 'courses'), (0, database_1.orderByChild)('category'), (0, database_1.equalTo)(category));
        const snapshot = await (0, database_1.get)(coursesRef);
        const courses = [];
        if (snapshot.exists()) {
            snapshot.forEach(childSnapshot => {
                courses.push(childSnapshot.val());
            });
        }
        return courses;
    }
    async getAllCourses() {
        const snapshot = await (0, database_1.get)((0, database_1.ref)(firebase_config_1.firebaseDataBase, 'courses'));
        const courses = [];
        if (snapshot.exists()) {
            snapshot.forEach(childSnapshot => {
                courses.push(childSnapshot.val());
            });
        }
        return courses;
    }
};
exports.TutorialService = TutorialService;
exports.TutorialService = TutorialService = __decorate([
    (0, common_1.Injectable)()
], TutorialService);
//# sourceMappingURL=tutorial.service.js.map