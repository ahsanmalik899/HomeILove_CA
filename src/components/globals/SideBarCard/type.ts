import { ComponentType } from "react";

export type SideBarCardprops = {
    Svg:ComponentType,
    text:string,
    type:string,
    totalPosts?:string,
    onPress?:()=>void
}