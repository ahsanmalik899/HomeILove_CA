import { Dispatch, SetStateAction } from "react";

export type DropdownItem = {
  label: string;
  value: string;
};

export type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  items: DropdownItem[];
  placeholder?: string;
  style?: any;
  dropDownStyle?: any;
  containerStyle?: any;
  setpage:(number:number)=>void;
};
