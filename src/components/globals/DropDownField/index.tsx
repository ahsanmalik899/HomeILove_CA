import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Props } from "./type";

const SortDropdown = ({
  value,
  setValue,
  items,
  placeholder = "Sort By",
  style,
  dropDownStyle,
  containerStyle,
  setpage,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
          listMode="SCROLLVIEW"
                     dropDownDirection="BOTTOM"
      setOpen={setOpen}
      setValue={(val)=>{setValue(val);
        setpage(1);
      }}   // ✅ correct typing
      placeholder={placeholder}
      style={[
        { borderColor: "#ccc", minHeight: 45 },
        style,
      ]}
      dropDownContainerStyle={[
        { borderColor: "#ccc" },
        dropDownStyle,
      ]}
      containerStyle={containerStyle}
    
    />
  );
};

export default SortDropdown;
