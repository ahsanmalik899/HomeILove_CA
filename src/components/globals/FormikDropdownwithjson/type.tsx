export interface FormikDropdownProps {
  title: string;
  value: string;
  options: {label:string,value:number}[];
  placeholder?: string;
  onSelect: (value: any) => void;
  touched?: boolean;
  errors?: boolean;
  errorText?: string;
  required?: boolean;
  additonalText?: string;
  multipleFields?:boolean;
 name?: string;
  setValue?: (field: string, value: any) => void;
}
