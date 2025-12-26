import DateTimePicker from "@react-native-community/datetimepicker";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { FormikDatepicker } from "./type";

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

  const dateValue = value ? new Date(value) : new Date();

  const onChange = (_: any, selectedDate?: Date) => {
    setShow(false);

    if (selectedDate) {
      setValue(name, selectedDate.toISOString()); // ✅ correct
    }
  };

  return (
    <View style={{marginTop:vs(10)}}>
       <View className="flex-row" style={{ marginBottom: vs(10) }}>
              {title && <Text style={{   fontSize: ms(14), fontWeight: 600 }}>{title}</Text>}
              {required && (
                <Text
                  style={{
                    color: Colors.light.red,
                  }}
                >
                  *
                </Text>
              )}
            
            </View>
            {editable?(
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
            ? new Date(value).toDateString()
            : placeholder}
        </Text>
      </TouchableOpacity>
            ):(
                <TouchableOpacity
        onPress={()=>{}}
        style={{
          borderRadius: ms(18),
          paddingVertical: vs(14),
          backgroundColor: Colors.light.LightGreen,
          paddingHorizontal: hs(12),
          width: "100%",
        }}
      >
        <Text>
        {placeholder}
        </Text>
      </TouchableOpacity>
            )}
    

      {show && (
        <DateTimePicker
          value={dateValue}
          mode="date"
          textColor={Colors.light.DarkGreen}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChange}
        />
      )}
        {touched && errors && (
              <Text style={{ color: Colors.light.red }}>{errorText}</Text>
            )}
    </View>
  );
}
