import { User } from "../administration/user";
import { Menu } from "./menu";
import { Permission } from "./permission";

export interface LogedUser {
    user?:any;
    menus?:Menu[];
    permissions?:Permission[];
}
