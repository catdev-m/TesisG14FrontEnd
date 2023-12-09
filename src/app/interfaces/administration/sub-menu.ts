import { Guid } from "typescript-guid";

export interface SubMenu {
    code:Guid;
    name:string;
    url:string;
    descripcion:string;
    parent:Guid|null;
    icon:string;
}
