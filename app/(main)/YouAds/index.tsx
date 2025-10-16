import Community from '@assets/SideBar/community.svg';
import Rent from '@assets/SideBar/rent.svg';
import Sale from '@assets/SideBar/sale.svg';
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import SideBarCard from "@src/components/globals/SideBarCard";
import { hs, ms, vs } from "@utils/design/design";
import { Text, View } from "react-native";
const index = () => {
  return (
    <View className="flex-1 bg-white">
      <HeaderWithBack />
      <Text style={{ marginTop: vs(40),fontSize:ms(18), fontWeight: 600, marginLeft: hs(20) }}>
        Your Ads
      </Text>
      <View style={{paddingHorizontal:hs(20), marginTop:vs(20)}}>
        <View className="flex-row justify-between">
            <SideBarCard text='Sale' Svg={Sale}/>
            <SideBarCard text='Rent' Svg={Rent}/>

        </View>
        <SideBarCard text='Community' Svg={Community}/>
      </View>
    </View>
  );
};

export default index;
