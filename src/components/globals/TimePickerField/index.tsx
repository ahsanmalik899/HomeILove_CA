import DateTimePicker from "@react-native-community/datetimepicker";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { FormikDatepicker } from "./type";

// Helper → HH:mm
const formatTime = (date: Date) => {
  const hours = `${date.getHours()}`.padStart(2, "0");
  const minutes = `${date.getMinutes()}`.padStart(2, "0");
  return `${hours}:${minutes}`;
};

export default function FormikTimePicker({
  name,
  setValue,
  value,
  title,
  touched,
  errors,
  errorText,
  required,
}: FormikDatepicker) {
  const [show, setShow] = useState(false);

  // If value exists, create a Date from today + time
  const timeValue = value
    ? new Date(`1970-01-01T${value}:00`)
    : new Date();

  const onChange = (_: any, selectedTime?: Date) => {
    setShow(false);

    if (selectedTime) {
      // ✅ STORE AS "HH:mm"
      setValue(name, formatTime(selectedTime));
    }
  };

  return (
    <View style={{ marginTop: vs(10) }}>
      {/* Label */}
      <View className="flex-row" style={{ marginBottom: vs(10) }}>
        {title && (
          <Text style={{ fontSize: ms(14), fontWeight: "600",fontFamily: "PopinRegula", }}>
            {title}
          </Text>
        )}
        {required && <Text style={{ color: Colors.light.red,fontFamily: "PopinRegula", }}> *</Text>}
      </View>

      {/* Button */}
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={{
          borderRadius: ms(18),
          paddingVertical: vs(14),
          backgroundColor: Colors.light.LightGreen,
          paddingHorizontal: hs(12),
          width: "100%",
        }}
      >
        <Text style={{fontFamily: "PopinRegula",}}>{value ? value : "Select time"}</Text>
      </TouchableOpacity>

      {/* Picker */}
      {show && (
        <DateTimePicker
          value={timeValue}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChange}
          is24Hour={true}
        />
      )}

      {/* Error */}
      {touched && errors && (
        <Text style={{ color: Colors.light.red ,fontFamily: "PopinRegula",}}>{errorText}</Text>
      )}
    </View>
  );
}
