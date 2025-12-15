import Add from "@assets/CreateProfile/Vector.svg";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FormikInputProps } from "./typ";
export const FormikInput = ({
  title,
  placeholder,
  onChangeText,
  onBlur,
  value,
  touched,
  errors,
  errorText,
  additonalText,
  required,
  multiline,
  mulipleFields,
}: FormikInputProps) => (
  <View style={{ marginTop: vs(10) }}>
    <View className="flex-row" style={{ marginBottom: vs(10) }}>
      {title && <Text style={styles.title}>{title}</Text>}
      {required && (
        <Text
          style={{
            color: Colors.light.red,
          }}
        >
          {" "}
          *
        </Text>
      )}
      {additonalText && (
        <Text style={{ paddingLeft: hs(5) }}>{`(${additonalText})`}</Text>
      )}
    </View>
    <View className="flex-row gap-2">
      <View
        style={{
          borderRadius: ms(18),
          paddingVertical: vs(5),
          backgroundColor: Colors.light.LightGreen,
          paddingHorizontal: hs(5),
          width: mulipleFields?"80%":"100%"
        }}
      >
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          multiline={multiline}
          cursorColor={Colors.light.DarkGreen}
          placeholderTextColor={Colors.light.DarkGreen}
          style={[
            multiline ? styles.inputdes : styles.input,

            { color: Colors.light.DarkGreen },
          ]}
        />
      </View>
      {mulipleFields &&(
        <TouchableOpacity style={{ backgroundColor: Colors.light.LightGreen, borderRadius:ms(8) }} className="justify-center px-4 ">
        <Add />
      </TouchableOpacity>
      )}
      
    </View>
    {touched && errors && (
      <Text style={{ color: Colors.light.red }}>{errorText}</Text>
    )}
  </View>
);
const styles = StyleSheet.create({
  title: { fontSize: ms(14), fontWeight: 600 },
  inputdes: {
    height: vs(120),
    textAlignVertical: "top",
  },
  input: {
    backgroundColor: "transparent",
  },
});
