import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TabLikeButtonProps } from "./type";



const index = ({
  btnTxt1,
  btnTxt2,
  btnTxt3,
  btn1value,
  btn2value,
  btn3value,
  value,
  Componet1,
  Componet2,
  Componet3,
  onPress,
}:TabLikeButtonProps) => {
  return (
    <View className=" bg-white" >
      <View className="flex-row justify-between" style={{ marginTop: vs(10),gap:hs(10) }}>
        <TouchableOpacity
          style={[styles.btn, value === btn1value && styles.btnselected,{flex:1}]}
          onPress={() => onPress(btn1value)}
        >
          <Text
            style={{
              color: value === btn1value ?  "white":"black" ,
              fontWeight: 600,
            }}
          >
            {btnTxt1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, value === btn2value && styles.btnselected,{flex:1}]}
          onPress={() => onPress(btn2value)}
        >
          <Text
            style={{
              color: value === btn2value ?   "white": "black",
              fontWeight: 600,
            }}
          >
            {btnTxt2}
          </Text>
        </TouchableOpacity>
        {btn3value &&(
            <TouchableOpacity
          style={[styles.btn, value === btn3value && styles.btnselected,{flex:1}]}
          onPress={() => onPress(btn3value)}
        >
          <Text
            style={{
              color: value === btn3value ?  "white":"black" ,
              fontWeight: 600,
            }}
          >
            {btnTxt3}
          </Text>
        </TouchableOpacity>
        )}
       
      </View>
        {value === btn1value && Componet1}
      {value === btn2value && Componet2}
      {value === btn3value && Componet3}
    </View>
  );
};
const styles = StyleSheet.create({
  btn: {
    borderWidth: 0.5,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    borderColor: Colors.light.textGray,
    borderRadius: ms(5),
    paddingVertical: vs(15),
  },
  btnselected: {
    backgroundColor: Colors.light.DarkGreen,
  },
});

export default index;
