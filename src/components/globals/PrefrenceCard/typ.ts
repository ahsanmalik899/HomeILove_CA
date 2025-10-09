import { ComponentType } from "react";

export type PrefrenceCardprops = {
    Svg: ComponentType;
    Heading:string;
    BtnText:string;
    OnSubmit:()=>void;
}