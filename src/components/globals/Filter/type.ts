
export type filtertype={
 values: any;
  errors: any;
  touched: any;
  setFieldValue: (field: string, value: any) => void;
  handleSubmit: () => void;
  resetForm: () => void;
  setshowFilter: (value:boolean) => void;
setFieldTouched: (field: string, touched?: boolean, shouldValidate?: boolean) => void;

}
