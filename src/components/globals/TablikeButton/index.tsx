import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SelecteAdTypeprps } from "./type";

const index = ({
  btnTxt1,
  btnTxt2,
  title1,
  title2,
  btn1value,
  btn2value,
  value,
  Componet1,
  Componet2,
  onPress,
}: SelecteAdTypeprps) => {
  return (
    <View className="flex-1 bg-white" >
      <Text style={{ fontSize: ms(14), fontWeight: 600 }}>
        {title1}
        <Text style={{ color: Colors.light.red }}>{title2}</Text>
      </Text>
      <View className="flex-row justify-between" style={{ marginTop: vs(10) }}>
        <TouchableOpacity
          style={[styles.btn, value === btn1value && styles.btnselected]}
          onPress={() => onPress(btn1value)}
        >
          <Text
            style={{
              color: value === btn2value ? "black" : "white",
              fontWeight: 600,
            }}
          >
            {btnTxt1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, value === btn2value && styles.btnselected]}
          onPress={() => onPress(btn2value)}
        >
          <Text
            style={{
              color: value === btn1value ? "black" : "white",
              fontWeight: 600,
            }}
          >
            {btnTxt2}
          </Text>
        </TouchableOpacity>
      </View>
        {value === btn1value && Componet1}
      {value === btn2value && Componet2}
    </View>
  );
};
const styles = StyleSheet.create({
  btn: {
    width: hs(165),
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
