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
export const FormikDropdown = ({
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
}: FormikDropdownProps) => {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState(
    options.map((opt) => ({ label: opt, value: opt }))
  );
  const [selectedData, setSelectedData] = useState<string[]>([]);
  const [currentValue, setCurrentValue] = useState<string | null>(null);

  const handleAdd = () => {
    if (!currentValue) return;

    if (selectedData.includes(currentValue)) return;

    const updated = [...selectedData, currentValue];

    setSelectedData(updated);
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
        <View className="flex-row" style={{ marginBottom: vs(10) }}>
          <Text style={styles.title}>{title}</Text>
          {required && <Text style={{ color: Colors.light.red }}> *</Text>}
          {additonalText && (
            <Text style={{ paddingLeft: hs(5) }}>{`(${additonalText})`}</Text>
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
      maxHeight={400}
      setValue={(callback) => {
        const val = callback(currentValue);
        setCurrentValue(val);

        if (!multipleFields) {
          setValue(name, val);
          onSelect?.(val);
        }
      }}
      setItems={setItems}
      listMode="MODAL"
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
      zIndex={2000}
      zIndexInverse={1000}
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
        <Text style={{ color: Colors.light.red, marginTop: vs(5) }}>
          {errorText}
        </Text>
      )}
      {multipleFields && (
        <FlatList
          data={selectedData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              style={[styles.card,{
                padding: ms(8),
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }]}
            >
              <View className="flex-row gap-3 items-center">
                <Heart />

                <Text
                  style={{
                    color: Colors.light.DarkGreen,
                    fontSize: ms(15),
                    fontWeight: "500",
                    width:hs(250)
                  }}
                >
                  {item}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  handleRemove(index);
                }}
              >
                <Cross />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: ms(14), fontWeight: "600" },
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
