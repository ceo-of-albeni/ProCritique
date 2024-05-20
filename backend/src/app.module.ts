import { Module } from "@nestjs/common";
import { TutorialController } from "./tutorial/controller/tutorial.controller";
import { TutorialService } from "./tutorial/service/tutorial.service";
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [TutorialController],
    providers: [TutorialService],
})
export class AppModule{}