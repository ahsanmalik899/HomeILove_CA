import DateTimePicker from "@react-native-community/datetimepicker";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { FormikDatepicker } from "./type";

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

  const timeValue = value ? new Date(value) : new Date();

  const onChange = (_: any, selectedTime?: Date) => {
    setShow(false);

    if (selectedTime) {
      setValue(name, selectedTime.toISOString()); // ✅ store ISO (recommended)
    }
  };

  return (
    <View style={{ marginTop: vs(10) }}>
      {/* Label */}
      <View className="flex-row" style={{ marginBottom: vs(10) }}>
        {title && (
          <Text style={{ fontSize: ms(14), fontWeight: "600" }}>
            {title}
          </Text>
        )}
        {required && <Text style={{ color: Colors.light.red }}> *</Text>}
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
        <Text>
          {value
            ? new Date(value).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Select time"}
        </Text>
      </TouchableOpacity>

      {/* Picker */}
      {show && (
        <DateTimePicker
          value={timeValue}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChange}
        />
      )}

      {/* Error */}
      {touched && errors && (
        <Text style={{ color: Colors.light.red }}>{errorText}</Text>
      )}
    </View>
  );
}
