import { LayoutSubMenu } from "./layout-sub-menu";

export interface LayoutMenu {
    label:string,
    icon?:string,
    items:LayoutSubMenu[]
}
