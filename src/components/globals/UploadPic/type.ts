import { ComponentType } from "react";

export type UploadPic={
text1:string,
text2?:string,
text3?:string,
additionalText?:string,
Logo:ComponentType,
onPress:()=>void,
border?:boolean,
}