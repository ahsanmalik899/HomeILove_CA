import { FormikErrors, FormikTouched, FormikValues } from "formik";

export type FormikInputProps = {
  title: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  onBlur: (e: any) => void;
  value: string;
  touched: FormikTouched<FormikValues>;
  errors: FormikErrors<FormikValues>;
  additonalText?:String;
  required:boolean;
  errorText:any;
};
