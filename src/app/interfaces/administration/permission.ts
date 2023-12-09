import { Guid } from "typescript-guid";

export interface Permission {
    code:Guid,
    identifier:string,
    name:string,
    menu:string
}
