import { Guid } from "typescript-guid";

export interface Menu {
    code:Guid,
    name:string,
    description:string,
    url:string,
    active:boolean,
    icon:string
}
