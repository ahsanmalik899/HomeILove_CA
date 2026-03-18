import DateTimePicker from "@react-native-community/datetimepicker";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { FormikDatepicker } from "./type";

// Helper to format date as YYYY-MM-DD
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function FormikDatePicker({
  name,
  setValue,
  value,
  title,
  touched,
  errors,
  errorText,
  required,
  placeholder,
  editable,
}: FormikDatepicker) {
  const [show, setShow] = useState(false);

  // Use current value or today
  const dateValue = value ? new Date(value) : new Date();

  const onChange = (_: any, selectedDate?: Date) => {
    setShow(false);

    if (selectedDate) {
      // Save in YYYY-MM-DD format
      setValue(name, formatDate(selectedDate));
    }
  };

  return (
    <View style={{ marginTop: vs(10) }}>
      <View className="flex-row" style={{ marginBottom: vs(10) }}>
        {title && <Text style={{ fontSize: ms(14), fontWeight: "600",fontFamily: "PopinRegula", }}>{title}</Text>}
        {required && <Text style={{ color: Colors.light.red,fontFamily: "PopinRegula", }}>*</Text>}
      </View>

      <TouchableOpacity
        onPress={editable ? () => setShow(true) : undefined}
        style={{
          borderRadius: ms(18),
          paddingVertical: vs(14),
          backgroundColor: Colors.light.LightGreen,
          paddingHorizontal: hs(12),
          width: "100%",
        }}
      >
        <Text style={{fontFamily: "PopinRegula",}}>{value ? value : placeholder}</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={dateValue}
          mode="date"
          textColor={Colors.light.DarkGreen}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChange}
        />
      )}

      {touched && errors && <Text style={{ color: Colors.light.red ,fontFamily: "PopinRegula",}}>{errorText}</Text>}
    </View>
  );
}
