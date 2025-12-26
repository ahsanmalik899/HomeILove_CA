export type FormikDatepicker = {
  title: string;
  placeholder?: string;
  value: string;
  touched: boolean;
  errors: boolean;
  required: boolean;
  errorText: any;
  name: string;
  editable:boolean;
  setValue: (field: string, value: string) => void;
};