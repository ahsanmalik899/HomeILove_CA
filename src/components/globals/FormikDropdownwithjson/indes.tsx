import Cross from "@assets/CreateProfile/cross.svg";
import Heart from "@assets/CreateProfile/heart-red.svg";
import Add from "@assets/CreateProfile/Vector.svg";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { FormikDropdownProps } from "./type";
export const FormikDropdownwithjson = ({
  title,
  value,
  options,
  placeholder,
  onSelect,
  touched,
  errors,
  errorText,
  required,
  additonalText,
  multipleFields,
  setValue = () => {},
  name = "name",
    openDirection="BOTTOM",
}: FormikDropdownProps) => {
  const [open, setOpen] = React.useState(false);
const [items, setItems] = React.useState(options);

const [currentValue, setCurrentValue] = useState<number | null>(null);
const [selectedData, setSelectedData] = useState<number[]>([]);

const handleAdd = () => {
  if (currentValue === null) return;
  if (selectedData.includes(currentValue)) return;

  const updated = [...selectedData, currentValue];
  setSelectedData(updated);

  // Send numbers to Formik (comma-separated or array)
  setValue(name, updated.join(","));
};

const handleRemove = (index: number) => {
  const updated = selectedData.filter((_, i) => i !== index);
  setSelectedData(updated);
  setValue(name, updated.join(","));
};


  return (
    <View style={{ marginTop: vs(10), zIndex: open ? 1000 : 1 }}>
      {title && (
        <View className="flex-row" style={{ marginBottom: vs(10), }}>
          <Text style={styles.title}>{title}</Text>
          {required && <Text style={{ color: Colors.light.red,fontFamily: "PopinRegula", }}> *</Text>}
          {additonalText && (
            <Text style={{ paddingLeft: hs(5) ,fontFamily: "PopinRegula",}}>{`(${additonalText})`}</Text>
          )}
        </View>
      )}
     <View style={{ flexDirection: "row", alignItems: "center" }}>
  <View style={{ flex: 1 }}>
   <DropDownPicker
  open={open}
  
  value={currentValue}
  items={items}
  setOpen={setOpen}
  setItems={setItems}
  listMode="SCROLLVIEW"
  dropDownDirection={openDirection}
  setValue={(callback) => {
    const val = callback(currentValue) as number;
    setCurrentValue(val);

    if (!multipleFields) {
      setValue(name, val); 
      onSelect?.(val);
    }
  }}
  placeholder={placeholder}
  style={{
    backgroundColor: Colors.light.LightGreen,
    borderColor: Colors.light.LightGreen,
    borderRadius: ms(18),
  }}
     
    dropDownContainerStyle={{
        backgroundColor: "white",
        borderColor: "white",
        elevation: 2,
      }}
/>

  </View>

  {multipleFields && (
    <TouchableOpacity
      style={{
        marginLeft: hs(8),
        backgroundColor: Colors.light.LightGreen,
        borderRadius: ms(8),
        paddingHorizontal: hs(12),
        height: vs(45),
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={handleAdd}
    >
      <Add />
    </TouchableOpacity>
  )}
</View>

      {touched && errors && (
        <Text style={{ color: Colors.light.red, marginTop: vs(5),fontFamily: "PopinRegula", }}>
          {errorText}
        </Text>
      )}
      {multipleFields && (
        <FlatList
          data={selectedData}
          keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => {
  const selectedLabel =
    options.find(opt => opt.value === item)?.label || "";

  return (
    <View style={[styles.card]}>
      <View className="flex-row gap-3 items-center">
        <Heart />
        <Text style={{fontFamily: "PopinRegula",}}>{selectedLabel}</Text>
      </View>
      <TouchableOpacity onPress={() => handleRemove(index)}>
        <Cross />
      </TouchableOpacity>
    </View>
  );
}}

        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: ms(14), fontWeight: "600",fontFamily: "PopinRegula", },
    card: {
    backgroundColor: "#fff",
    borderRadius: ms(10),
    marginVertical: vs(6),
    marginHorizontal: hs(3),
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
});
