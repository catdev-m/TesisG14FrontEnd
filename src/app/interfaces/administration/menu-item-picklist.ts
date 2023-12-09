import { Guid } from "typescript-guid";

export interface MenuPickItem {
    code:Guid,
    name:string,
    parent:Guid|null,
    icon:string
}
