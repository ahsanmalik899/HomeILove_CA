import PropertyForSale from "@assets/Buy/propertyforSale.svg";
import Commercial from "@assets/Rent/commercial.svg";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import SideBarCard from "@src/components/globals/SideBarCard";
import { hs, vs } from "@utils/design/design";
import { router } from "expo-router";
import { View } from "react-native";
const index = () => {
  return (
    <View className="flex-1 bg-white ">
      <HeaderWithBack title="Sell Property" />
      <View
        style={{ marginHorizontal: hs(20),marginTop:vs(20) }}
        className="flex-row justify-between"
      >
        <SideBarCard
          Svg={PropertyForSale}
          text="Post Property"
          onPress={() => {
            router.navigate("/(main)/PostProperty");
          }}
          type={"Buy"}
        />
        <SideBarCard
          Svg={Commercial}
          text="Post Community"
          onPress={() => {
            router.navigate({
              pathname: "/(main)/BuyListing",
              params: { type: "Community" },
            });
          }}
          type={"Buy"}
        />
      </View>
    </View>
  );
};

export default index;

