"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorialController = void 0;
const common_1 = require("@nestjs/common");
const tutorial_service_1 = require("../service/tutorial.service");
let TutorialController = class TutorialController {
    constructor(tutorialService) {
        this.tutorialService = tutorialService;
    }
    async createUserData(data) {
        const userId = 'user' + Date.now();
        await this.tutorialService.createUserData(userId, data);
    }
    async createCourseData(data) {
        const courseId = 'course' + Date.now();
        await this.tutorialService.createCourseData(courseId, data);
    }
    async addCommentToCourse(courseId, data) {
        const commentId = 'comment' + Date.now();
        await this.tutorialService.addCommentToCourse(courseId, commentId, data);
    }
    async getUserData(userId) {
        return await this.tutorialService.getUserData(userId);
    }
    async getCourseData(courseId) {
        return await this.tutorialService.getCourseData(courseId);
    }
    async getCoursesByCategory(category) {
        return await this.tutorialService.getCoursesByCategory(category);
    }
    async getAllCourses() {
        return await this.tutorialService.getAllCourses();
    }
};
exports.TutorialController = TutorialController;
__decorate([
    (0, common_1.Post)('createUser'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TutorialController.prototype, "createUserData", null);
__decorate([
    (0, common_1.Post)('createCourse'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TutorialController.prototype, "createCourseData", null);
__decorate([
    (0, common_1.Post)('addComment/:courseId'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TutorialController.prototype, "addCommentToCourse", null);
__decorate([
    (0, common_1.Get)('getUser/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TutorialController.prototype, "getUserData", null);
__decorate([
    (0, common_1.Get)('getCourse/:courseId'),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TutorialController.prototype, "getCourseData", null);
__decorate([
    (0, common_1.Get)('getCoursesByCategory'),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TutorialController.prototype, "getCoursesByCategory", null);
__decorate([
    (0, common_1.Get)('getAllCourses'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TutorialController.prototype, "getAllCourses", null);
exports.TutorialController = TutorialController = __decorate([
    (0, common_1.Controller)('tutorial'),
    __metadata("design:paramtypes", [tutorial_service_1.TutorialService])
], TutorialController);
//# sourceMappingURL=tutorial.controller.js.map