import { Injectable } from '@nestjs/common';
import { Note } from './model/note.model';
import { Repository, ILike, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateNoteDto,
  GetAllNotesDto,
  NoteDto,
  UpdateNoteDto,
  SearchNoteDto,
  GetNoteDto,
  DeleteNoteDto,
} from './dto';
import { INote } from './interface';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  async createNote(dto: CreateNoteDto): Promise<INote | null> {
    const note = await this.noteRepository.save(dto);
    return new NoteDto(note);
  }

  //перенести на sql
  async updateNote(noteId:string, dto: UpdateNoteDto): Promise<INote | null | UpdateResult> {
    const base = 'public."Note"'
    const sql = await this.noteRepository
    .createQueryBuilder()
    .update()
    .set(dto)
    .where("'id' = :id AND 'userId' = :userId", { id: noteId, userId: dto.userId })
    .returning(["id","title", "description", "status", "lastChangedDateTime" ])
    .getQuery();
    console.log(sql)
    return null
  }

  async updateNoteSlow(noteId:string, dto: UpdateNoteDto): Promise<INote | null > {
    const note = await this.noteRepository.save({id:noteId, ...dto})
    return new NoteDto(note)
  }

  async deleteNote(dto: DeleteNoteDto): Promise<void> {
    await this.noteRepository
    .createQueryBuilder()
    .delete()
    .where("id = :id AND userId = :userId", { id: dto.noteId, userId: dto.userId })
    .execute()
  }

  async deleteNoteSlow(dto: DeleteNoteDto): Promise<void> {
    await this.noteRepository.delete(dto.noteId)
  }

  async getAllNotes(dto: GetAllNotesDto): Promise<INote[] | null | []> {
    return await this.noteRepository.find({
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        lastChangedDateTime:true
      },
      where: { userId: dto.userId },
      order: {
        title: 'ASC',
      },
      skip: dto.offset,
      take: dto.limit
    });
  }

  async searchNotes(dto: SearchNoteDto): Promise<INote[] | null> {
    return await this.noteRepository.find({
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        lastChangedDateTime:true
      },
      where: [
        { userId: dto.userId, title: ILike(`%${dto.phrase}%`) },
        { userId: dto.userId, description: ILike(`%${dto.phrase}%`) },
      ],
      order: {
        title: 'ASC',
      },
      skip: dto.offset,
      take: dto.limit
    });
  }

  async getNote(dto: GetNoteDto): Promise<INote | null> {
    return await this.noteRepository.findOne({
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        lastChangedDateTime:true
      },
      where: { id: dto.noteId, userId: dto.userId }
    });
  }

  async getNoteSlow(dto: GetNoteDto): Promise<INote | null> {
    const note = await this.noteRepository.findOneBy({id:dto.noteId})
    return new NoteDto(note)
  }
}
