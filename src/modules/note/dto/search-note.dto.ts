export class SearchNoteDto {
    userId?: string;
    limit: number;
    offset: number;
    phrase: string;
}