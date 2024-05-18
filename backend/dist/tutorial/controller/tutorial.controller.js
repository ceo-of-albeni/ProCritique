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
const create_user_dto_1 = require("../../dto/create-user.dto");
const create_course_dto_1 = require("../../dto/create-course.dto");
const create_comment_dto_1 = require("../../dto/create-comment.dto");
const swagger_1 = require("@nestjs/swagger");
let TutorialController = class TutorialController {
    constructor(tutorialService) {
        this.tutorialService = tutorialService;
    }
    async createUserData(createUserDto) {
        const userId = 'user' + Date.now();
        await this.tutorialService.createUserData(userId, createUserDto);
    }
    async createCourseData(createCourseDto) {
        const courseId = 'course' + Date.now();
        await this.tutorialService.createCourseData(courseId, createCourseDto);
    }
    async addCommentToCourse(courseId, createCommentDto) {
        const commentId = 'comment' + Date.now();
        await this.tutorialService.addCommentToCourse(courseId, commentId, createCommentDto);
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
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The user has been successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], TutorialController.prototype, "createUserData", null);
__decorate([
    (0, common_1.Post)('createCourse'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new course' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The course has been successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_dto_1.CreateCourseDto]),
    __metadata("design:returntype", Promise)
], TutorialController.prototype, "createCourseData", null);
__decorate([
    (0, common_1.Post)('addComment/:courseId'),
    (0, swagger_1.ApiOperation)({ summary: 'Add a comment to a course' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The comment has been successfully added.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", Promise)
], TutorialController.prototype, "addCommentToCourse", null);
__decorate([
    (0, common_1.Get)('getUser/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user data by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return user data.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found.' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TutorialController.prototype, "getUserData", null);
__decorate([
    (0, common_1.Get)('getCourse/:courseId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get course data by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return course data.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Course not found.' }),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TutorialController.prototype, "getCourseData", null);
__decorate([
    (0, common_1.Get)('getCoursesByCategory'),
    (0, swagger_1.ApiOperation)({ summary: 'Get courses by category' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return courses by category.' }),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TutorialController.prototype, "getCoursesByCategory", null);
__decorate([
    (0, common_1.Get)('getAllCourses'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all courses' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all courses.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TutorialController.prototype, "getAllCourses", null);
exports.TutorialController = TutorialController = __decorate([
    (0, swagger_1.ApiTags)('tutorial'),
    (0, common_1.Controller)('tutorial'),
    __metadata("design:paramtypes", [tutorial_service_1.TutorialService])
], TutorialController);
//# sourceMappingURL=tutorial.controller.js.map