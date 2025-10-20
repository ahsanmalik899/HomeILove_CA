import CommercialSale from '@assets/Buy/commerCialPropertFroSale.svg';
import FormandLand from '@assets/Buy/formLandForSale.svg';
import Folclosure from '@assets/Buy/fourcoluserForsale.svg';
import PropertyForSale from "@assets/Buy/propertyforSale.svg";
import Rebuilt from '@assets/Buy/reBuiltForsale.svg';
import Retirement from '@assets/Buy/retirementPropertyForSale.svg';
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import SideBarCard from "@src/components/globals/SideBarCard";
import { hs, vs } from "@utils/design/design";
import { StyleSheet, View } from "react-native";
const index = () => {
  return (
    <View className="bg-white flex-1">
      <HeaderWithBack title="Buy" />
      <View style={{ marginHorizontal: hs(20), marginTop:vs(30)}}>
        <View className="flex-row justify-between">
          <SideBarCard
            Svg={PropertyForSale}
            text="Property For Sale"
            onPress={() => {}}
            type={"Buy"}
          />
          <SideBarCard
            Svg={Rebuilt}
            text="Re-Built Property For sale"
            onPress={() => {}}
            type={"Buy"}
          />
        </View>
        <View className="flex-row justify-between">
          <SideBarCard
            Svg={Folclosure}
            text="Foreclosure For Sale"
            onPress={() => {}}
            type={"Buy"}
          />
          <SideBarCard
            Svg={FormandLand}
            text="Farm & Land For Sale"
            onPress={() => {}}
            type={"Buy"}
          />
        </View>
        <View className="flex-row justify-between">
           <SideBarCard
            Svg={CommercialSale}
            text="Commercial Property For Sale"
            onPress={() => {}}
            type={"Buy"}
          />
          <SideBarCard
            Svg={Retirement}
            text="Retirement Property For Sale"
            onPress={() => {}}
            type={"Buy"}
          />
        </View>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
