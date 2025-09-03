import {v4 as uuidv4} from 'uuid';

export default class GenerateId{
    static createId():string{
        const newUUID:string = uuidv4();
        return newUUID;
    }
};