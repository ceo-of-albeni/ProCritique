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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCourseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateCourseDto {
}
exports.CreateCourseDto = CreateCourseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Introduction to Programming', description: 'The name of the course' }),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "courseName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'This course covers the basics of programming...', description: 'Detailed description of the course' }),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "detailedDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Basic programming concepts.', description: 'Brief description of the course' }),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "briefDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4.5, description: 'The rating of the course' }),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Programming', description: 'The category of the course' }),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, description: 'The cost of the course' }),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "cost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['Python', 'JavaScript'], description: 'The programming languages used in the course' }),
    __metadata("design:type", Array)
], CreateCourseDto.prototype, "programmingLanguages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['Django', 'React'], description: 'The frameworks used in the course' }),
    __metadata("design:type", Array)
], CreateCourseDto.prototype, "frameworks", void 0);
//# sourceMappingURL=create-course.dto.js.map