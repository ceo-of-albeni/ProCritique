import { Module } from "@nestjs/common";
import { TutorialController } from "./tutorial/controller/tutorial.controller";
import { TutorialService } from "./tutorial/service/tutorial.service";


@Module({
    controllers: [TutorialController],
    providers: [TutorialService],
})
export class AppModule{}