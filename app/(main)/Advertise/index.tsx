import AdvatiseBaner from "@assets/SideBar/advertisementpic.svg";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LargeButton from "@src/components/globals/LaregeButton";
import { hs, vs } from "@utils/design/design";
import { StyleSheet, Text, View } from "react-native";
const index = () => {
  return (
    <View className="flex-1 bg-white">
      <HeaderWithBack title="Advertisements" />
      <View className="items-center" style={{marginHorizontal:hs(20), marginTop:vs(20)}}>
        <AdvatiseBaner />
        <Text style={{ fontWeight: 600, marginTop: vs(30) }}>
          You have no advertisement.
        </Text>
        <Text style={{marginTop:vs(20)}}>
          Why not advertise your business or brand at our website and expand in
          no time and cost effectively
        </Text>

        
      </View>
      <View style={{marginHorizontal:hs(20), marginTop:vs(20)}}>
      <LargeButton text="Advertise now" handleSubmit={()=>{}}/>
        </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
