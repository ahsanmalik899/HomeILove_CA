import { useGetPostCountQuery } from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import Commercial from "@assets/Rent/commercial.svg";
import Rent from "@assets/SideBar/rent.svg";
import Sale from "@assets/SideBar/sale.svg";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LargeButton from "@src/components/globals/LaregeButton";
import Loading from "@src/components/globals/Loading";
import SideBarCard from "@src/components/globals/SideBarCard";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { hs, vs } from "@utils/design/design";
import { router } from "expo-router";
import { View } from "react-native";
const index = () => {
  const type = "My Posts Counts";
  const user = useAppSelector(userdata);
  const { data, isFetching } = useGetPostCountQuery({ user_id: user.id });
  const total = "3";

  return (
    <View className="flex-1 bg-white">
      <HeaderWithBack title="Your Ads" />
      <View style={{ paddingHorizontal: hs(20), marginTop: vs(20) }}>
        <View className="flex-row justify-between">
          <SideBarCard
            text="Sale"
            Svg={Sale}
            type="yourAds"
            totalPosts={data?.data?.sale_posts}
            onPress={() => {
              router.navigate({
                pathname: "/MyPostListing",
                params: { type: "Sale" },
              });
            }}
          />
          <SideBarCard
            text="Rent"
            Svg={Rent}
            type="yourAds"
            totalPosts={data?.data?.rent_posts}
            onPress={() => {
              router.navigate({
                pathname: "/MyPostListing",
                params: { type: "Rent" },
              });
            }}
          />
        </View>
        <SideBarCard
          text="Community"
          Svg={Commercial}
          type="yourAds"
          totalPosts={data?.data?.community_posts}
          onPress={() => {
            router.navigate({
              pathname: "/MyPostListing",
              params: { type: "Community" },
            });
          }}
        />
      </View>
       <View style={{justifyContent: 'flex-end',marginTop:'auto',marginHorizontal:hs(20),marginBottom:hs(20)}}>
                    <LargeButton text="Post new Add" handleSubmit={() =>router.navigate({
              pathname:"/SellProperty",
             
            })} />
                  </View>
      <Loading isLoading={isFetching} text="Loading..." />
    </View>
  );
};

export default index;
