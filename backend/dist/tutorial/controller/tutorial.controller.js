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
const platform_express_1 = require("@nestjs/platform-express");
const login_user_dto_1 = require("../../dto/login-user.dto");
let TutorialController = class TutorialController {
    constructor(tutorialService) {
        this.tutorialService = tutorialService;
    }
    async loginUser(loginUserDto) {
        return await this.tutorialService.loginUser(loginUserDto);
    }
    async createUserData(createUserDto) {
        return await this.tutorialService.createUserData(createUserDto);
    }
    async getUserData(userId) {
        return await this.tutorialService.getUserData(userId);
    }
    async getAllUsers() {
        return await this.tutorialService.getAllUsers();
    }
    async createCourseData(createCourseDto) {
        const courseId = 'course' + Date.now();
        await this.tutorialService.createCourseData(courseId, createCourseDto);
    }
    async addCommentToCourse(courseId, createCommentDto, userId) {
        console.log('Received userId:', userId);
        const commentId = 'comment' + Date.now();
        if (!userId) {
            throw new common_1.BadRequestException('User ID is missing');
        }
        await this.tutorialService.addCommentToCourse(courseId, commentId, createCommentDto, userId);
    }
    async deleteCommentFromCourse(courseId, commentId, userId) {
        await this.tutorialService.deleteCommentFromCourse(courseId, commentId, userId);
    }
    async updateCommentInCourse(courseId, commentId, createCommentDto, userId) {
        await this.tutorialService.updateCommentInCourse(courseId, commentId, createCommentDto, userId);
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
    async getCoursesSortedByRating(order) {
        return await this.tutorialService.getCoursesSortedByRating(order);
    }
    async getTeachersAndMentors(courseId) {
        return await this.tutorialService.getTeachersAndMentors(courseId);
    }
    async uploadFile(file) {
        const url = await this.tutorialService.uploadFile(file);
        return { url };
    }
    async getFileUrl(fileName) {
        const url = await this.tutorialService.getFileUrl(fileName);
        return { url };
    }
};
exports.TutorialController = TutorialController;
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'Login a user' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The user has been successfully logged in.',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], TutorialController.prototype, "loginUser", null);
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
    (0, common_1.Get)('getAllUsers'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all users.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TutorialController.prototype, "getAllUsers", null);
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
    __param(2, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_comment_dto_1.CreateCommentDto, String]),
    __metadata("design:returntype", Promise)
], TutorialController.prototype, "addCommentToCourse", null);
__decorate([
    (0, common_1.Post)('deleteComment/:courseId/:commentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a comment from a course' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The comment has been successfully deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Param)('commentId')),
    __param(2, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], TutorialController.prototype, "deleteCommentFromCourse", null);
__decorate([
    (0, common_1.Post)('updateComment/:courseId/:commentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a comment in a course' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The comment has been successfully updated.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Param)('commentId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_comment_dto_1.CreateCommentDto, String]),
    __metadata("design:returntype", Promise)
], TutorialController.prototype, "updateCommentInCourse", null);
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
__decorate([
    (0, common_1.Get)('getCoursesSortedByRating'),
    (0, swagger_1.ApiOperation)({ summary: 'Get courses sorted by rating' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return sorted courses by rating.' }),
    __param(0, (0, common_1.Query)('order')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TutorialController.prototype, "getCoursesSortedByRating", null);
__decorate([
    (0, common_1.Get)('getTeachersAndMentors/:courseId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get teachers and mentors by course ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return teachers and mentors.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Course not found.' }),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TutorialController.prototype, "getTeachersAndMentors", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload a file to Firebase Storage' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The file has been successfully uploaded.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request.' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TutorialController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('file/:fileName'),
    (0, swagger_1.ApiOperation)({ summary: 'Get the URL of a file in Firebase Storage' }),
    (0, swagger_1.ApiParam)({ name: 'fileName', required: true, description: 'The name of the file' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the file URL.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'File not found.' }),
    __param(0, (0, common_1.Param)('fileName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TutorialController.prototype, "getFileUrl", null);
exports.TutorialController = TutorialController = __decorate([
    (0, swagger_1.ApiTags)('tutorial'),
    (0, common_1.Controller)('tutorial'),
    __metadata("design:paramtypes", [tutorial_service_1.TutorialService])
], TutorialController);
//# sourceMappingURL=tutorial.controller.js.map