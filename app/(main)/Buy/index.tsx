import CommercialSale from '@assets/Buy/commerCialPropertFroSale.svg';
import FormandLand from '@assets/Buy/formLandForSale.svg';
import Folclosure from '@assets/Buy/fourcoluserForsale.svg';
import PropertyForSale from "@assets/Buy/propertyforSale.svg";
import Rebuilt from '@assets/Buy/reBuiltForsale.svg';
import Retirement from '@assets/Buy/retirementPropertyForSale.svg';
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import SideBarCard from "@src/components/globals/SideBarCard";
import { hs, vs } from "@utils/design/design";
import { router } from 'expo-router';
import { StyleSheet, View } from "react-native";
const index = () => {
  return (
    <View className="bg-white flex-1">
      <HeaderWithBack title="Buy" buttonTitile='Raise query to Buy'/>
      <View style={{ marginHorizontal: hs(20), marginTop: vs(30) }}>
        <View className="flex-row justify-between">
          <SideBarCard
            Svg={PropertyForSale}
            text="Property For Sale"
            onPress={() => {
              router.navigate({
                pathname: "/(main)/BuyListing",
                params: { type: "All Sale" }
              })
            }}
            type={"Buy"}
          />
          <SideBarCard
            Svg={Rebuilt}
            text="Re-Built Property For sale"
            onPress={() => {
              router.navigate({
                pathname: "/(main)/BuyListing",
                params: { type: "Re-Built" }
              })
            }}
            type={"Buy"}
          />
        </View>
        <View className="flex-row justify-between">
          <SideBarCard
            Svg={Folclosure}
            text="Foreclosure For Sale"
            onPress={() => {
              router.navigate({
                pathname: "/(main)/BuyListing",
                params: { type: "Foreclosure" }
              })
            }}
            type={"Buy"}
          />
          <SideBarCard
            Svg={FormandLand}
            text="Farm & Land For Sale"
            onPress={() => {
              router.navigate({
                pathname: "/(main)/BuyListing",
                params: { type: "Farm & Land" }
              })
            }}
            type={"Buy"}
          />
        </View>
        <View className="flex-row justify-between">
          <SideBarCard
            Svg={CommercialSale}
            text="Commercial Property For Sale"
            onPress={() => {
              router.navigate({
                pathname: "/(main)/BuyListing",
                params: { type: "Commercial" }
              })
            }}
            type={"Buy"}
          />
          <SideBarCard
            Svg={Retirement}
            text="Retirement Property For Sale"
            onPress={() => {
              router.navigate({
                pathname: "/(main)/BuyListing",
                params: { type: "Retirement" }
              })
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
