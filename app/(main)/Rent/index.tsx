import Homes from "@assets/Rent/Homes.svg";
import Commercial from "@assets/Rent/commercial.svg";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import SideBarCard from "@src/components/globals/SideBarCard";
import { hs, vs } from "@utils/design/design";
import { router } from "expo-router";
import { View } from "react-native";
const index = () => {
  return (
    <View className="bg-white flex-1">
      <HeaderWithBack title="Rent" />
      <View style={{ marginHorizontal: hs(20), marginTop: vs(20) }}>
        <View className="flex-row justify-between">
          <SideBarCard Svg={Homes} text="Homes" onPress={() => {router.navigate({
            pathname:"/(main)/RentListing",
            params:{type:"Homes"}
          })}} type={""} />
          <SideBarCard
            Svg={Commercial}
            text="Commercial"
            onPress={() => {router.navigate({
            pathname:"/(main)/RentListing",
            params:{type:"Commercial"}
          })}}
            type={""}
          />
        </View>
      </View>
    </View>
  );
};

export default index;
