import Community from "@assets/Home/Community.svg";
import Connection from "@assets/Home/Conection.svg";
import Property from "@assets/Home/Property.svg";
import PrefrenceCard from "@src/components/globals/PrefrenceCard";
import { router } from "expo-router";
import { ScrollView, View } from "react-native";

const NewsFeedPreference = () => {
  return (
     <ScrollView style={{backgroundColor:"#F4F0F0"}}>
    <View className="flex-1 ">
     
      <View className="mt-4 ml-2 mr-2 items-center">
      <PrefrenceCard
        BtnText="Continue"
        Heading="For Property"
        Svg={Community}
        OnSubmit={() => router.navigate({
          pathname:"/(main)/SetPrefrence",
          params:{type:"Property"}
        })}
      />
      </View>
      <View className="mt-4 ml-2 mr-2 items-center">
      <PrefrenceCard
        BtnText="Continue"
        Heading="For Community"
        Svg={Property}
        OnSubmit={() => router.navigate({
          pathname:"/(main)/SetPrefrence",
          params:{type:"Community"}
        })}
      />
      
      </View>
      <View className="mt-4 ml-2 mr-2 items-center">
        <PrefrenceCard
        BtnText="Continue"
        Heading="For Connection"
        Svg={Connection}
        OnSubmit={() => router.navigate({
          pathname:"/(main)/SetPrefrence",
          params:{type:"Connection"}
        })}
      />
      </View>
    </View>
    </ScrollView>
  );
};

export default NewsFeedPreference;
