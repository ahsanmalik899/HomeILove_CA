export interface AddressInputProps {
  city: string;
  state: string;
  zip: string;
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
  setValue?: (field: string, value: string) => void;
  cityOnly?: boolean;
   radius:string;
}
