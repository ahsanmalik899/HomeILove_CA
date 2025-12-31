import { FormikProps } from "formik";
import { CommunityFormValues } from "./values";

export type CommuntyFormProps = {
  count: number;
  setCount:  (count: number | ((prev: number) => number)) => void;

  handleChange: FormikProps<CommunityFormValues>["handleChange"];
  handleBlur: FormikProps<CommunityFormValues>["handleBlur"];
  touched: FormikProps<CommunityFormValues>["touched"];
  errors: FormikProps<CommunityFormValues>["errors"];
  values: CommunityFormValues;
  setFieldValue: FormikProps<CommunityFormValues>["setFieldValue"];
};
