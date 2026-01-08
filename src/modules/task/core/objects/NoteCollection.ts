import TaskBusinessRules from "../constants/TaskBuisnessRules";
import type TaskNote from "./TaskNote";
import InvalidOperation from "../../../../shared/core/errors/InvalidOperation";
import ConflictDuplicateResource from "../../../../shared/core/errors/ConflictDuplicatedResource";
import type Collection from "../../../../shared/core/objects/Collection";

export default class NoteCollection implements Collection{
    private readonly limitOfNotes:number = TaskBusinessRules.maxNotes();
    private readonly notes:TaskNote[] = [];
    
    constructor(notes:TaskNote[] = []){
        this.notes = notes;
    }

    public addItem(note:TaskNote):NoteCollection{
        if(this.notes.length + 1 > this.limitOfNotes)throw new InvalidOperation('Note limit exeeded')
        const exists = this.notes.find(savedNote => savedNote.getId() === note.getId());
        if(exists)throw new ConflictDuplicateResource('This Note already exists', note);
        return new NoteCollection([...this.notes, note]);
    }

    public deleteItem(note:TaskNote):NoteCollection{
        return this;
    }
};
