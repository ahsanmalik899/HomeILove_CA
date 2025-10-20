import { userdata } from "@/store/slices/selector/user";

import Image from "@assets/test/test.jpeg";
import CircleImage from "@src/components/globals/CircleImage/CircleImage";
import HomeCard from "@src/components/globals/HomeCard";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { ms, vs } from "@utils/design/design";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
const Home = () => {
  const user = useAppSelector(userdata);
  return (
    <View className="flex-1 bg-white">
     
      <View style={{ marginTop: vs(10) }} className="items-center">
        <CircleImage source={Image} Size={70} />
        <Text
          style={{
            marginTop: vs(5),
            color: Colors.light.DarkGreen,
            fontWeight: "600",
            fontSize: ms(16),
          }}
        >
          {user.name}
        </Text>
        <Text style={{ marginTop: vs(5), color: Colors.light.textGray }}>
          Let’s find your perfect home today
        </Text>
      </View>
      <View>
        <ScrollView style={{ paddingTop: vs(10) }}>
          <HomeCard
            title="Buy"
            onpress={() => router.navigate("/Buy")}
          />
          <HomeCard
            title="Rent"
            onpress={() => router.navigate("/Rent")}
          />
          <HomeCard
            title="New Home"
            onpress={() => router.navigate("/NewHome")}
          />
          <HomeCard
            title="Home Value"
            onpress={() => router.navigate("/HomeValue")}
          />
        
          <HomeCard
            title="Get Help"
            onpress={() => router.navigate("/GetHelp")}
          />
          <HomeCard
            title="Home Romance"
            onpress={() => router.navigate("/HomeRomance")}
          />
       <HomeCard
            title="Sell Property"
            onpress={() => router.navigate("/SellProperty")}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
