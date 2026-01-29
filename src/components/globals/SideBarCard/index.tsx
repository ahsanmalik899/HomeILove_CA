import Add from "@assets/SideBar/addGreen.svg";
import ArrowUp from "@assets/SideBar/arrowup.svg";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SideBarCardprops } from "./type";
const index = ({ Svg, text, type, totalPosts, onPress=()=>{},ProfileExist }: SideBarCardprops) => {
  return (
    <TouchableOpacity
      style={[styles.card, { height: type === "Buy" ? vs(160) : vs(140) }]}
      onPress={() => {
        type === "busenessProfile"
          ? router.navigate({
              pathname: ProfileExist?"/(main)/Account":"/(main)/CreateProfiles",
              params: { type: text },
            })
          : onPress();
      }}
    >
      {type === "busenessProfile" ? (
        <View style={{ marginTop: vs(10) }}>
         {ProfileExist?(<ArrowUp />):( <Add />)}
        </View>
      ) : (
        <View className="flex-row justify-between items-center">
          <Text style={{ color: Colors.light.red }}>{totalPosts}</Text>
          <ArrowUp />
        </View>
      )}

      <View className="items-center self-center ">
        <Svg />
        <Text
          style={{
            marginTop: vs(10),
            fontWeight: 600,
            paddingHorizontal: hs(5),
            textAlign: "center",
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default index;

const styles = StyleSheet.create({
  card: {
    width: hs(160),
    backgroundColor: "white",
    elevation: 5,
    borderRadius: ms(10),
    paddingHorizontal: hs(5),
    paddingBottom: vs(10),
    marginBottom: vs(10),
  },
});
