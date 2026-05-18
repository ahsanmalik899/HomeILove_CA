import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { SideBarButtonProps } from "./type";

const index = ({ text, onPress }: SideBarButtonProps) => {
     const [pressed, setPressed] = useState(false);
  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={{backgroundColor:  pressed ? Colors.light.DarkGreen : "transparent",
        paddingHorizontal: hs(20),
        paddingVertical:vs(10),
        borderRadius:ms(5)
      }}
    >
      <Text
        style={{ color: Colors.light.DarkGreen,fontWeight:700 ,fontFamily: "PopinRegula", }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default index;
