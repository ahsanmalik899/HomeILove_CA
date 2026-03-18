import { MaterialIcons } from "@expo/vector-icons";
import Colors from "@src/constants/Colors";
import { hs } from "@utils/design/design";
import { Text, TouchableOpacity, View } from "react-native";
import { RadioButtonProps } from "./type";

const index = ({ title,text, checkedValue,value, onPress }: RadioButtonProps) => {
  return (
    <View>
      {title&&(
      <Text className="font-bold" style={{fontFamily: "PopinRegula",}}>{title}</Text>)}
      <TouchableOpacity
        onPress={() => {
          onPress(value===checkedValue? "":checkedValue);
        }}
      >
        <View className="flex-row mt-4 items-center">
          <MaterialIcons
            size={18}
            color={Colors.light.DarkGreen}
            name={value === checkedValue ? "check-box" : "check-box-outline-blank"}
          />
          <Text style={{ marginLeft: hs(5), fontWeight: "500",fontFamily: "PopinRegula", }}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default index;
