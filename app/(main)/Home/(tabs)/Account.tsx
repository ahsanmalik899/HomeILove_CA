import { userdata } from "@/store/slices/selector/user";
import CircleImage from "@src/components/globals/CircleImage/CircleImage";
import HomeCard from "@src/components/globals/HomeCard";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { ms, vs } from "@utils/design/design";
import { ImageFormater } from "@utils/ImageFormat";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
const Account = () => {
  const user = useAppSelector(userdata);
  return (
    <View className="flex-1 bg-white">
      <View style={{ marginTop: vs(20) }} className="items-center">
        <CircleImage  source={{uri:ImageFormater(user?.logo)}} Size={70} />
        <Text
          style={{
            marginTop: vs(5),
            color: Colors.light.DarkGreen,
            fontWeight: "600",
            fontSize: ms(16),
            fontFamily: "PopinRegula",
          }}
        >
          {user.name}
        </Text>
      </View>
      <View>
        <ScrollView style={{ paddingTop: vs(45) }}>
          {user.user_type === "Business" && (
            <HomeCard
              title="Business Profiles"
              onpress={() => router.navigate("/(main)/BusenessProfiles")}
            />
          )}
          <HomeCard
            title="Your Ads"
            onpress={() => router.navigate("/(main)/YouAds")}
          />

          <HomeCard
            title="Inquiries"
            onpress={() => router.navigate("/(main)/Inquires")}
          />
          <HomeCard
            title="Buy Credit"
            onpress={() => router.navigate("/BuyCredit")}
          />

          <HomeCard
            title="Advertise"
            onpress={() => router.navigate("/Advertise")}
          />
          <HomeCard
            title="Your Promotions"
            onpress={() => router.navigate("/YourPromotions")}
          />
          <HomeCard
            title="Set Alerts"
            onpress={() => router.navigate("/SetAlerts")}
          />
          <HomeCard
            title="Reviews"
            onpress={() => router.navigate("/Reviews")}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default Account;


