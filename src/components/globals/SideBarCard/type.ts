import { ComponentType } from "react";

export type SideBarCardprops = {
    Svg:ComponentType,
    text:string,
    type:string,
    totalPosts?:string,
    ProfileExist?:boolean,
    onPress?:()=>void
    id?:number;
    profileType?:string;
    isBlocked?:string;
}