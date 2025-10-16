import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { StyleSheet, Text, TextInput, View } from "react-native";
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
}: FormikInputProps) => (
  <View>
    <View className="flex-row" style={{marginBottom:vs(10)}}>
      <Text style={styles.title}>{title}</Text>
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
      {additonalText && <Text style={{paddingLeft:hs(5)}}>{`(${additonalText})`}</Text>}
    </View>
    <View
      style={{
        borderRadius: ms(18),
        paddingVertical: vs(5),
        backgroundColor: Colors.light.LightGreen,
        paddingHorizontal: hs(5),
      }}
    >
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholderTextColor={Colors.light.DarkGreen}
     
      />
    </View>
    {touched && errors && <Text style={{ color:Colors.light.red }}>{errorText}</Text>}
  </View>
);
const styles = StyleSheet.create({
  title: { fontSize: ms(14), fontWeight: 600 },
});
