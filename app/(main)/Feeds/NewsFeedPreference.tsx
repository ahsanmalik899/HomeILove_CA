import Community from "@assets/Home/Community.svg";
import Property from "@assets/Home/Property.svg";
import PrefrenceCard from "@src/components/globals/PrefrenceCard";
import { router } from "expo-router";
import { View } from "react-native";
const NewsFeedPreference = () => {
  return (
    <View className="flex-1">
      <View className="mt-5 ml-2 mr-2">
      <PrefrenceCard
        BtnText="Continue"
        Heading="For Property"
        Svg={Community}
        OnSubmit={() => router.navigate("/(auth)/forgot")}
      />
      </View>
      <View className="mt-2 ml-2 mr-2">
      <PrefrenceCard
        BtnText="Continue"
        Heading="For Community"
        Svg={Property}
        OnSubmit={() => router.navigate("/(auth)/forgot")}
      />
      </View>
    </View>
  );
};

export default NewsFeedPreference;
