import Arrow from "@assets/Home/RedArrow.svg";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HomeCardProps } from "./type";

const index = ({title,onpress}:HomeCardProps) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onpress} >
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Arrow  />
      </View>
    </TouchableOpacity>
  );
};

export default index;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: vs(20),
    paddingHorizontal: hs(15),
    paddingVertical: vs(11),
    backgroundColor: "#fff", 
    borderRadius: ms(5),
    marginBottom:hs(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4, 
  },
  title: {
    fontSize: ms(15),
    fontWeight: "600",
    color:Colors.light.DarkGreen,
  },
});
