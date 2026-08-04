export interface FormikDropdownProps {
  title: string;
  value: string;
  options: string[];
  placeholder?: string;
  onSelect: (value: string) => void;
  touched?: boolean;
  errors?: boolean;
  errorText?: string;
  required?: boolean;
  additonalText?: string;
  multipleFields?:boolean;
 name?: string;
 openDirection?:string;
  setValue?: (field: string, value: string) => void;
}
