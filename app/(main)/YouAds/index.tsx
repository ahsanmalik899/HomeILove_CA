import Community from "@assets/SideBar/community.svg";
import Rent from "@assets/SideBar/rent.svg";
import Sale from "@assets/SideBar/sale.svg";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import SideBarCard from "@src/components/globals/SideBarCard";
import { hs, vs } from "@utils/design/design";
import { View } from "react-native";
const index = () => {
  return (
    <View className="flex-1 bg-white">
      <HeaderWithBack title="Your Ads" />
      <View style={{ paddingHorizontal: hs(20), marginTop: vs(20) }}>
        <View className="flex-row justify-between">
          <SideBarCard text="Sale" Svg={Sale} type="yourAds" totalPosts='2' />
          <SideBarCard text="Rent" Svg={Rent} type="yourAds" totalPosts='2' />
        </View>
        <SideBarCard
          text="Community"
          Svg={Community}
          type="yourAds"
          totalPosts='2'
        />
      </View>
    </View>
  );
};

export default index;
