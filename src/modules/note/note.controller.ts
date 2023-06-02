import { Controller } from '@nestjs/common';
import { NoteService } from './note.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(`Заметки`)
@Controller(`note`)
export class NoteController {
  constructor(private readonly noteService: NoteService) {}
}