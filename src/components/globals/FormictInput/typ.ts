export type FormikInputProps = {
  title: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  onBlur: (e: any) => void;
  value: string;
  touched: boolean;
  errors: boolean;
  additonalText?: String;
  required: boolean;
  errorText: any;
  multiline?: boolean;
  mulipleFields?: boolean;
  name?: string;
  setValue?: (field: string, value: string) => void;
};
