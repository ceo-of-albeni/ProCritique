import { TutorialController } from "./controller/tutorial.controller";
import { TutorialService } from "./service/tutorial.service";
import {Module} from '@nestjs/common'

@Module({
    providers: [TutorialService],
    controllers: [TutorialController],
})
export class TutorialMode{}