import Colors from "@src/constants/Colors";
import { ms, vs } from "@utils/design/design";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UploadPic } from "./type";

const index = ({
  text1,
  text2,
  text3,
  additionalText,
  Logo,
  border,
  onPress,
}: UploadPic) => {
  return (
    <View style={{marginBottom:vs(20)}}>
      <View className="flex-row ">
      <Text style={{ fontSize: ms(15), fontWeight: 600 }}>
        {text1}
        <Text style={{ color: Colors.light.red }}>{text2}</Text>
        {text3}
      </Text>
      {additionalText && <Text>{` (${additionalText})`}</Text>}
      </View>
      <View
      
        style={{
          marginTop: vs(10),
          backgroundColor: "white",
          borderWidth: border?(0.5):(0),
          borderColor: Colors.light.textGray,
          height:vs(150),
          borderRadius: ms(10),
          justifyContent:'center',
          alignItems:'center',
        }}
      >
        <TouchableOpacity
          onPress={() => {
            onPress();
          }}
   
        >
          <Logo />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
