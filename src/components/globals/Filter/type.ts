
export type filtertype={
 values: any;
  errors: any;
  touched: any;
  setFieldValue: (field: string, value: any) => void;
  handleSubmit: () => void;
  resetForm: (values:any) => void;
  setshowFilter: (value:boolean) => void;
setFieldTouched: (field: string, touched?: boolean, shouldValidate?: boolean) => void;
setAddress: (val: string) => void;
  setCity: (val: string) => void;
  setLat: (val: number) => void;
  setLng: (val: number) => void;
  setState: (val: string) => void;
  setZip: (val: string) => void;
  onpress:()=>void;
  value:string;
  latValue:number;
  longValue:number;
  type:string;

}
