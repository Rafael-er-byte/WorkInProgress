import TaskBusinessRules from "../constants/TaskBuisnessRules";
import type TaskNote from "./TaskNote";
import InvalidOperation from "../../../../shared/core/errors/InvalidOperation";
import ConflictDuplicateResource from "../../../../shared/core/errors/ConflictDuplicatedResource";
import type Collection from "../../../../shared/core/objects/Collection";
import type Note from "../../../note/core/model/Note";
import IntNumber from "../../../../shared/core/objects/IntNumber";

export default class NoteCollection implements Collection{
    private readonly limitOfNotes:number = TaskBusinessRules.maxNotes();
    private readonly notes:Note[] = [];
    
    constructor(notes:Note[] = []){
        this.notes = notes;
    }

    public addItem(note:Note):NoteCollection{
        if(this.notes.length + 1 > this.limitOfNotes)throw new InvalidOperation('Note limit exeeded')
        const exists = this.notes.find(savedNote => savedNote.getID() === note.getID());
        if(exists)throw new ConflictDuplicateResource('This Note already exists', note);
        return new NoteCollection([...this.notes, note]);
    }

    public deleteItem(note:TaskNote):NoteCollection{
        return this;
    }

    public find(note: Note): boolean {
        const exists = this.notes.find(savedNote => savedNote.getID() === note.getID());
        if(exists)return true;
        return false;
    }

    public size(): IntNumber {
        return new IntNumber(this.notes.length);
    }
};
