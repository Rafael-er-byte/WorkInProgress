import TaskRules from "../constants/TaskRules";
import ConflictDuplicateResource from "../../../shared/core/errors/ConflictDuplicatedResource";
import ResourceNotFound from "../../../shared/core/errors/ResourceNotFound";
import type Collection from "../../../shared/core/objects/Collection";
import LimitExceeded from "../../../shared/core/errors/LimitExceeded";
import type Note from "./Note";

export default class NoteCollection implements Collection{
    private readonly limitOfNotes = TaskRules.maxNotes();
    private readonly notes:Note[] = [];

    constructor(notes:Note[] = []){
        this.notes = notes;
    }

    public addItem(note: Note): NoteCollection {
        if(this.notes.length + 1 > this.limitOfNotes)throw new LimitExceeded('Notes limit exceeded');
        const exists = this.notes.find(n => n.getCreator().getId() === note.getCreator().getId());
        if(exists)throw new ConflictDuplicateResource('This note already exists in this task', note);
        return new NoteCollection([...this.notes, note]);        
    }

    public deleteItem(note:Note): NoteCollection {
        const deleteNote = this.notes.find(n => n.getCreator().getId() === note.getCreator().getId());
        if(!deleteNote)throw new ResourceNotFound('This note doesnt exist in this task');
        return new NoteCollection(this.notes.filter(n => n.getCreator().getId() !== note.getCreator().getId()));
    }

    public find(note: Note):boolean{
        const exists = this.notes.find(n => n.getCreator().getId() === note.getCreator().getId());
        if(exists)return true;
        return false;
    }

    public size(): number{
        return this.notes.length;
    }

    public primitiveCollection(): Note[] {
        return [...this.notes];
    }
};
