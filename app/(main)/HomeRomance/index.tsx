import Decore from '@assets/HomeRomance/Interior.svg';
import Builder from '@assets/HomeRomance/builderh.svg';
import Electrician from '@assets/HomeRomance/electrician.svg';
import Painter from '@assets/HomeRomance/painterh.svg';
import Plumber from '@assets/HomeRomance/plumberh.svg';
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import SideBarCard from "@src/components/globals/SideBarCard";
import { hs, vs } from "@utils/design/design";
import { router } from 'expo-router';
import { ScrollView, View } from "react-native";
const index = () => {
  return (
    <View className="flex-1 bg-white ">
      <HeaderWithBack title="Home Romance" />
      <ScrollView style={{ paddingHorizontal: hs(20), paddingTop: vs(30) }}>
        <View className="flex-row justify-between">
          <SideBarCard
            text="Search Electricians"
            Svg={Electrician}
            type="Buy"
            onPress={()=>{router.navigate({
              pathname:"/(main)/HomeRomanceListing",
              params:{type:"Electricians"}
            })}}
          />
          <SideBarCard
            text="Search Plumbers"
            Svg={Plumber}
               type="Buy"
                 onPress={()=>{router.navigate({
              pathname:"/(main)/HomeRomanceListing",
              params:{type:"Plumbers"}
            })}}
          />
        </View>
        <View className="flex-row justify-between">
          <SideBarCard
            text="Interior Decors"
            Svg={Decore}
               type="Buy"
                   onPress={()=>{router.navigate({
              pathname:"/(main)/HomeRomanceListing",
              params:{type:"Decors"}
            })}}
          />
          <SideBarCard
            text="Search Painters"
            Svg={Painter}
               type="Buy"
                   onPress={()=>{router.navigate({
              pathname:"/(main)/HomeRomanceListing",
              params:{type:"Painters"}
            })}}
          />
        </View>

        <View className="flex-row justify-between">
          <SideBarCard
            text="Home Builders"
            Svg={Builder}
               type="Buy"
                   onPress={()=>{router.navigate({
              pathname:"/(main)/HomeRomanceListing",
              params:{type:"Builders"}
            })}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default index;


