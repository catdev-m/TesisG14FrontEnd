import { UserState } from "./user-state";

export interface User {
    userId?:string,
    name:string,
    email:string,
    password?:string,
    createdAt?:Date,
    updatedAt?:Date,
    state?:UserState
}
