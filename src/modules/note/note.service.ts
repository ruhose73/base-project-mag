import { Injectable } from '@nestjs/common';
import { Note } from './model/note.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  async createNode(): Promise<any> {

  }
}
