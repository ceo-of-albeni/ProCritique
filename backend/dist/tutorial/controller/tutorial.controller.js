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
    async createData(data) {
        await this.tutorialService.createData(data);
    }
};
exports.TutorialController = TutorialController;
__decorate([
    (0, common_1.Post)('createData'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TutorialController.prototype, "createData", null);
exports.TutorialController = TutorialController = __decorate([
    (0, common_1.Controller)('tutorial'),
    __metadata("design:paramtypes", [tutorial_service_1.TutorialService])
], TutorialController);
//# sourceMappingURL=tutorial.controller.js.map