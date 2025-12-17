import { ComponentType } from "react";
export type ImageValue = {
  uri?: string;
  name?: string;
  type?: string;
};

export type UploadPic = {
  text1: string;
  text2?: string;
  text3?: string;
  additionalText?: string;
  Logo: ComponentType;
  border?: boolean;
  setValue: (name: string, value: ImageValue|null) => void;
  name: string;
  value: ImageValue|null;
};
