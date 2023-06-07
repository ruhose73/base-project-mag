import { INote } from "../interface";
import { Note } from "../model/note.model";

export class NoteDto implements INote{
    id:string;
    title:string;
    description:string;
    status:boolean;
    lastChangedDateTime:Date

    constructor(dto:Note) {
        this.id = dto.id;
        this.title = dto.title;
        this.description = dto.description;
        this.status = dto.status;
        this.lastChangedDateTime = dto.lastChangedDateTime;
    }
}