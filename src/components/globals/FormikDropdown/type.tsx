export interface FormikDropdownProps {
  title: string;
  value: string;
  options: string[]|{labe:string,value:number}[];
  placeholder?: string;
  onSelect: (value: string) => void;
  touched?: boolean;
  errors?: boolean;
  errorText?: string;
  required?: boolean;
  additonalText?: string;
  multipleFields?:boolean;
 name?: string;
  setValue?: (field: string, value: string) => void;
}
