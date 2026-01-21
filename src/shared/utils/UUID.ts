import {v4 as uuidv4} from 'uuid';
import type IDManager from '../../context/contracts/utils/IDManager';

export default class UUID implements IDManager{
    generateId():string{
        const newUUID:string = uuidv4();
        return newUUID;
    }

    validateId(id:string | undefined):boolean{
        if(!id)return false;
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return uuidRegex.test(id);
    }
};