import { Ionicons } from "@expo/vector-icons";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
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
}: FormikDropdownProps) => {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState(
    options.map((opt) => ({ label: opt, value: opt }))
  );

  return (
    <View style={{ marginTop: vs(10), zIndex: open ? 1000 : 1 }}>
      {/* Label */}
      <View className="flex-row" style={{ marginBottom: vs(10) }}>
        <Text style={styles.title}>{title}</Text>
        {required && <Text style={{ color: Colors.light.red }}> *</Text>}
        {additonalText && (
          <Text style={{ paddingLeft: hs(5) }}>{`(${additonalText})`}</Text>
        )}
      </View>

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={(callback) => {
          const val = callback(value);
          onSelect(val);
        }}
        setItems={setItems}
        placeholder={placeholder}
        placeholderStyle={{
          color: Colors.light.DarkGreen,
          opacity: 0.7,
        }}
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
        textStyle={{
          fontSize: ms(14),
          color: Colors.light.DarkGreen,
        }}
        listItemLabelStyle={{
          color: "black",
        }}
       
        ArrowUpIconComponent={() => (
          <Ionicons
            name="chevron-up"
            size={18}
            color={Colors.light.DarkGreen}
          />
        )}
        ArrowDownIconComponent={() => (
          <Ionicons
            name="chevron-down"
            size={18}
            color={Colors.light.DarkGreen}
          />
        )}
        TickIconComponent={() => null}
        zIndex={2000}
        zIndexInverse={1000}
      />

      {touched && errors && (
        <Text style={{ color: Colors.light.red, marginTop: vs(5) }}>
          {errorText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: ms(14), fontWeight: "600" },
});
