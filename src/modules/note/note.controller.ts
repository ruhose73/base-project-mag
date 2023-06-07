import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Get,
  Query,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateNoteDto,
  DeleteNoteDto,
  GetAllNotesDto,
  GetNoteDto,
  SearchNoteDto,
  UpdateNoteDto,
} from './dto';
import { INote } from './interface';
import { UpdateResult } from 'typeorm';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { UserRole } from '../user/enum';
import { ExtractUserFromRequest, Roles } from 'src/common/decorators';
import { JWTPayload } from '../auth/interfaces';

@ApiTags(`Заметки`)
@Controller(`note`)
@UseGuards(JwtAuthGuard, RolesGuard)
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @Roles(UserRole.User, UserRole.Manager, UserRole.Admin)
  async createNote(
    @ExtractUserFromRequest() user: JWTPayload,
    @Body() dto: CreateNoteDto,
  ): Promise<INote | null> {
    return await this.noteService.createNote({ userId: user.id, ...dto });
  }

  @Put()
  @Roles(UserRole.User, UserRole.Manager, UserRole.Admin)
  async updateNote(
    @ExtractUserFromRequest() user: JWTPayload,
    @Body() dto: UpdateNoteDto,
  ): Promise<INote | UpdateResult | null> {
    return await this.noteService.updateNote({ userId: user.id, ...dto });
  }

  @Get()
  @Roles(UserRole.User, UserRole.Manager, UserRole.Admin)
  async getAllNotes(
    @ExtractUserFromRequest() user: JWTPayload,
    @Query() dto: GetAllNotesDto,
  ): Promise<INote[] | null | []> {
    return await this.noteService.getAllNotes({ userId: user.id, ...dto });
  }

  @Get('/search')
  @Roles(UserRole.User, UserRole.Manager, UserRole.Admin)
  async searchNotes(
    @ExtractUserFromRequest() user: JWTPayload,
    @Query() dto: SearchNoteDto,
  ): Promise<INote[] | null | []> {
    return await this.noteService.searchNotes({ userId: user.id, ...dto });
  }

  @Get('/one/:id')
  @Roles(UserRole.User, UserRole.Manager, UserRole.Admin)
  async getNote(
    @ExtractUserFromRequest() user: JWTPayload,
    @Query() dto: GetNoteDto,
  ): Promise<INote | null> {
    return await this.noteService.getNote({ userId: user.id, ...dto });
  }

  @Delete()
  @HttpCode(204)
  @Roles(UserRole.User, UserRole.Manager, UserRole.Admin)
  async deleteNote(
    @ExtractUserFromRequest() user: JWTPayload,
    @Query() dto: DeleteNoteDto,
  ): Promise<void> {
    return await this.noteService.deleteNote({ userId: user.id, ...dto });
  }
}
