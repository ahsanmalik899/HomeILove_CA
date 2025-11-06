
export type TabLikeButtonProps={
    title1?:string,
    title2?:string,
    btnTxt1:string, 
    btnTxt2:string,
     btnTxt3?:string,
    value:string,
    btn1value:string,
    btn2value:string,
     btn3value?:string,
    Componet1?: React.ReactNode;
  Componet2?: React.ReactNode;
   Componet3?: React.ReactNode;
    onPress:(value:string)=>void

}