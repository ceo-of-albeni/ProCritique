import { TutorialService } from 'src/tutorial/service/tutorial.service';
export declare class TutorialController {
    private readonly tutorialService;
    constructor(tutorialService: TutorialService);
    createData(data: any): Promise<void>;
}
