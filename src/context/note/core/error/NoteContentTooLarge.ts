import CoreError from "../../../shared/core/errors/CoreError";

export default class NoteContentTooLarge extends CoreError{
    constructor(info?:unknown){
        super('Content of note is too large', info);
        Object.setPrototypeOf(this, NoteContentTooLarge);
    }
};
