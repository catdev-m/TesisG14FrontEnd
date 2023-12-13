import { Guid } from "typescript-guid"

export interface Department {
    departmentId:Guid
    facultyId:Guid,
    name:string,
    description:string,
    active:boolean,
    createdAt?:Date,
    updatedAt?:Date
}
