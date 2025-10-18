import Add from "@assets/SideBar/addGreen.svg";
import ArrowUp from "@assets/SideBar/arrowup.svg";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SideBarCardprops } from "./type";
const index = ({ Svg, text, type, totalPosts,onPress }: SideBarCardprops) => {
  return (
    <TouchableOpacity
      style={styles.card}

      onPress={() => { type === "busenessProfile"
    ? router.navigate({
        pathname: "/(main)/CreateProfiles",
        params: { type: text },
      })
    : onPress()}}
    >
      {type === "busenessProfile" ? (
        <View style={{marginTop: vs(10)}}>
        <Add />
        </View>
      ) : (
        <View className="flex-row justify-between items-center">
          <Text style={{ color: Colors.light.red }}>{totalPosts}</Text>
          <ArrowUp />
        </View>
      )}

      <View className="items-center self-center ">
        <Svg />
        <Text style={{ marginTop: vs(15), fontWeight: 600 }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default index;

const styles = StyleSheet.create({
  card: {
    height: vs(140),
    width: hs(160),
    backgroundColor: "white",
    elevation: 5,
    borderRadius: ms(10),
    paddingHorizontal: hs(5),
    paddingBottom:vs(10),
    marginBottom: vs(10),
  },
});
