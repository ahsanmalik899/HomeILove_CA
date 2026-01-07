export interface AddressInputProps {
  city: string;
  state: string;
  zip: string;
  lat:string;
  long:string;
  longValue:number;
  latValue:number;
  value:string;
 title:string,
  placeholder?: string;
  onSelect: (value: string) => void;
  touched?: boolean;
  errors?: boolean;
  errorText?: string;
  required?: boolean;
  additonalText?: string;
  multipleFields?: boolean;
  name?: string;
  withmap?:boolean;
  setValue?: (field: string, value: string) => void;
}
