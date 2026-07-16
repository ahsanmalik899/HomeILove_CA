import { useGetProfilesQuery } from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import PropertyForSale from "@assets/Buy/propertyforSale.svg";
import Commercial from "@assets/Rent/commercial.svg";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import Loading from "@src/components/globals/Loading";
import SideBarCard from "@src/components/globals/SideBarCard";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { renderToastError } from "@src/hooks/useToasty";
import { hs, vs } from "@utils/design/design";
import { router } from "expo-router";
import { View } from "react-native";
const index = () => {
   const user = useAppSelector(userdata);
   const {data,isLoading} =  useGetProfilesQuery({ id: user.id });
  return (
    <View className="flex-1 bg-white ">
      <HeaderWithBack title="Post Ad" />
      <View
        style={{ marginHorizontal: hs(20),marginTop:vs(20) }}
        className="flex-row justify-between"
      >
        <SideBarCard
          Svg={PropertyForSale}
          text="Property"
          onPress={() => {
            if(user.user_type==="Business"&&data.active_profiles<1){
              renderToastError("Go to dashboard and atleast create one Profile")
            }
            else{
            router.navigate("/(main)/PostProperty");
            }
          }}
          type={"Buy"}
        />
        <SideBarCard
          Svg={Commercial}
          text="Community"
          onPress={() => {
              if(user.user_type==="Business"&&data.active_profiles<1){
              renderToastError("Go to dashboard and atleast create one Profile")
            }
            else{
            router.navigate("/(main)/postCommunity");
            }
          }}
          type={"Buy"}
        />
      </View>
      <Loading isLoading={isLoading} text="Loading"/>
    </View>

  );
};

export default index;

