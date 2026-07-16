import Add from "@assets/SideBar/addGreen.svg";
import ArrowUp from "@assets/SideBar/arrowup.svg";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SideBarCardprops } from "./type";
const index = ({ Svg, text, type, totalPosts,profileType,id,isBlocked, onPress=()=>{},ProfileExist }: SideBarCardprops) => {
  console.log("isblocked",isBlocked)
  return (
    <TouchableOpacity
      style={[styles.card, { height: type === "Buy" ? vs(160) : vs(140) ,backgroundColor:ProfileExist?'#F4F0F0':'white'}]}
      onPress={() => {
        type === "busenessProfile"
          ? router.navigate({
              pathname: ProfileExist?"/MProfile":"/(main)/CreateProfiles",
              params: { type: text ,id:id,profileType:profileType},
            })
          : onPress();
      }}
    >
      {(type === "busenessProfile"||type==="Blocked") ? (
        <View style={{ marginTop: vs(10) }}>
    {ProfileExist ? (
  isBlocked === "Blocked" ? (
    <MaterialIcons name="block" size={24} color="red" />
  ) : (
    <ArrowUp />
  )
) : (
  <Add />
)}
        </View>
      ) : (
        <View className="flex-row justify-between items-center">
          <Text style={{ color: Colors.light.red,fontFamily: "PopinRegula", }}>{totalPosts}</Text>
          <ArrowUp />
        </View>
      )}

      <View className="items-center self-center ">
         <Svg
    width={hs(60)}
    height={vs(60)}
  />
        <Text
          style={{
            marginTop: vs(10),
            fontWeight: 600,
            paddingHorizontal: hs(5),
            textAlign: "center",
            fontFamily: "PopinRegula",
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
