import Homes from "@assets/Rent/Homes.svg";
import Commercial from "@assets/Rent/commercial.svg";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import SideBarCard from "@src/components/globals/SideBarCard";
import { hs, vs } from "@utils/design/design";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
const index = () => {
  return (
    <View className="flex-1 bg-white ">
      <HeaderWithBack
        title="New Home"
        buttonTitile="Raise query for new Love"
         onButtonPress={()=>router.navigate({
        pathname:"/HomeValue",
        params:{type:"community"}
      })} 
      />
      <View style={{ marginHorizontal: hs(20), marginTop: vs(20) }}>
        <View className="flex-row justify-between">
          <SideBarCard
            Svg={Homes}
            text="New Home"
            onPress={() => {
              router.navigate({
                pathname: "/NewHomeFilter",
                params: { condition: "Newly build", type: "New Home" },
              });
            }}
            type={""}
          />
          <SideBarCard
            Svg={Commercial}
            text="Communities"
            onPress={() => {
              router.navigate({
                pathname: "/NewHomeFilter",
                params: { condition: "Newly build", type: "Communities" },
              });
            }}
            type={""}
          />
        </View>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
