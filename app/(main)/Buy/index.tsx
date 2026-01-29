import FormandLand from "@assets/Buy/formLandForSale.svg";
import PropertyForSale from "@assets/Buy/propertyforSale.svg";
import Rebuilt from "@assets/Buy/reBuiltForsale.svg";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import SideBarCard from "@src/components/globals/SideBarCard";
import { hs, vs } from "@utils/design/design";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
const index = () => {
  return (
    <View className="bg-white flex-1">
      <HeaderWithBack title="Buy" buttonTitile="Raise query to Buy" />
      <View style={{ marginHorizontal: hs(20), marginTop: vs(30) }}>
        <View className="flex-row justify-between">
          <SideBarCard
            Svg={PropertyForSale}
            text="House"
            onPress={() => {
              router.navigate({
                pathname: "/(main)/BuyFilter",
                params: { type: "House",property_for:"sale" },
              });
            }}
            type={"Buy"}
          />
          <SideBarCard
            Svg={Rebuilt}
            text="Commercials"
            onPress={() => {
              router.navigate({
                pathname: "/(main)/BuyFilter",
                params: { type: "Commercial" ,property_for:"sale"},
              });
            }}
            type={"Buy"}
          />
        </View>
        <View className="flex-row justify-between">
          <SideBarCard
            Svg={FormandLand}
            text="Farm & Land"
            onPress={() => {
              router.navigate({
                pathname: "/(main)/BuyFilter",
                params: { type: "Farms/Lands",property_for:"sale" },
              });
            }}
            type={"Buy"}
          />
        </View>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
