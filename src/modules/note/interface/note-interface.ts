export interface INote {
    id:string;
    title:string;
    description:string;
    status:boolean;
    userId?: string;
    lastChangedDateTime:Date
}