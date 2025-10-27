import { useGetMYPostsQuery } from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import Community from "@assets/SideBar/community.svg";
import Rent from "@assets/SideBar/rent.svg";
import Sale from "@assets/SideBar/sale.svg";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import SideBarCard from "@src/components/globals/SideBarCard";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { hs, vs } from "@utils/design/design";
import { router } from "expo-router";
import { View } from "react-native";
const index = () => {
  const type = "My Posts Counts";
const user =useAppSelector(userdata);
const userid= user.sweetghar_user_id
  const {data,isLoading,refetch}= useGetMYPostsQuery({type,userid})
  
  return (
    <View className="flex-1 bg-white">
      <HeaderWithBack title="Your Ads" />
      <View style={{ paddingHorizontal: hs(20), marginTop: vs(20) }}>
        <View className="flex-row justify-between">
          <SideBarCard
            text="Sale"
            Svg={Sale}
            type="yourAds"
            totalPosts={data?.result?.totalSale}
            onPress={() => {
              router.navigate({pathname:"/MyPostListing",
                params:{type:'Sale'}
              });
            }}
          />
          <SideBarCard
            text="Rent"
            Svg={Rent}
            type="yourAds"
          totalPosts={data?.result?.totalRent}
            onPress={() => {router.navigate({pathname:"/MyPostListing",
                params:{type:'Rent'}
              });}}
          />
        </View>
        <SideBarCard
          text="Community"
          Svg={Community}
          type="yourAds"
         totalPosts={data?.result?.totalCommunity}
          onPress={() => {
            router.navigate({pathname:"/MyPostListing",
                params:{type:'Community'}
              });
          }}
        />
      </View>
    </View>
  );
};

export default index;
