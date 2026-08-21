import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { QuickSerchCardProps } from "./type";

const index = ({ Image, text, onPress }: QuickSerchCardProps) => {
  return (
    <TouchableOpacity
     activeOpacity={1}
      style={styles.card}
      className="justify-between"
      onPress={onPress}
    >
      <Image />
      <Text className="font-bold" style={{fontFamily: "PopinRegula",}}>{text}</Text>
    </TouchableOpacity>
  );
};

export default index;

const styles = StyleSheet.create({
  card: {
    marginTop: vs(10),
    alignItems: "center",
    paddingTop: vs(10),
    height: vs(130),
    width: hs(130),
    marginHorizontal: hs(5),
    backgroundColor: Colors.light.lightGray,
    borderColor: Colors.light.textGray,
    borderRadius: ms(5),
    borderWidth: ms(0.5),
    paddingBottom: vs(5),
    elevation:2,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.DarkGreen,
    width: hs(100),
    marginTop: vs(10),
    borderRadius: ms(5),
    height: vs(30),
  },
});
