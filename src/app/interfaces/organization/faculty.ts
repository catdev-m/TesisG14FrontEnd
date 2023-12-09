import { Guid } from 'typescript-guid';
export interface Faculty {
    facultyId:Guid,
    name:string,
    description:string,
    active:boolean,
    createdAt?:Date,
    updatedAt?:Date
}
