import { Injectable } from '@nestjs/common';
import {push, ref, set} from 'firebase/database' 
import { firebaseDataBase } from 'src/firebase.config';

@Injectable()
export class TutorialService {
    async createData(data:any): Promise<void>{
        const dataRef = ref(firebaseDataBase, 'Data');
        const newElementRef = push(dataRef, {dataRef:data});
        await set(newElementRef, data);
    }
}
