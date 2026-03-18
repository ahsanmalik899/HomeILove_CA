import { useGetProfilesQuery } from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import Agent from "@assets/SideBar/agent.svg";
import Builder from "@assets/SideBar/builder.svg";
import Decore from "@assets/SideBar/decore.svg";
import Electrician from "@assets/SideBar/electricican.svg";
import Investor from "@assets/SideBar/investor.svg";
import Mortgagae from "@assets/SideBar/mortgage.svg";
import Painter from "@assets/SideBar/painter.svg";
import Plumber from "@assets/SideBar/plumber.svg";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import Loading from "@src/components/globals/Loading";
import SideBarCard from "@src/components/globals/SideBarCard";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { hs, vs } from "@utils/design/design";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const index = () => {
  const insets = useSafeAreaInsets();
  const bottom = insets.bottom;
     const user = useAppSelector(userdata);
  const {data,isLoading} =  useGetProfilesQuery({ id: user.id });
  console.log(data);
  return (
    <View className="bg-white flex-1">
      <HeaderWithBack title="Business Profiles" />

      <ScrollView
        style={{ paddingHorizontal: hs(20), paddingTop: vs(10) }}
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-row justify-between">
          <SideBarCard
            text="Mortgage Profile"
            Svg={Mortgagae}
            type="busenessProfile"
            ProfileExist={data?.profiles_exist?.mortgage?.exists}
            id={data?.profiles_exist?.mortgage?.profile_id}
            profileType="mortgage"
          />

          <SideBarCard
            text="Builder Profile"
            Svg={Builder}
            type="busenessProfile"
              ProfileExist={data?.profiles_exist?.builder?.exists}
              id={data?.profiles_exist?.builder?.profile_id}
              profileType="builder"
          />
        </View>
        <View className="flex-row justify-between">
          <SideBarCard
            text="Investor Profile"
            Svg={Investor}
            type="busenessProfile"
            ProfileExist={data?.profiles_exist?.investor?.exists}
            id={data?.profiles_exist?.investor?.profile_id}
            profileType="investor"
          />
          <SideBarCard
            text="Agent Profile"
            Svg={Agent}
            type="busenessProfile"
            ProfileExist={data?.profiles_exist?.agent?.exists}
            id={data?.profiles_exist?.agent?.profile_id}
            profileType="agent"

          />
        </View>
        <View className="flex-row justify-between">
          <SideBarCard
            text="Plumber Profile"
            Svg={Plumber}
            type="busenessProfile"
            ProfileExist={data?.profiles_exist?.plumber?.exists}
            id={data?.profiles_exist?.plumber?.profile_id}
            profileType="plumber"
          />
          <SideBarCard
            text="Painter Profile"
            Svg={Painter}
            type="busenessProfile"
            ProfileExist={data?.profiles_exist?.painter?.exists}
            id={data?.profiles_exist?.painter?.profile_id}
            profileType="painter"
          />
        </View>
        <View className="flex-row justify-between">
          <SideBarCard
            text="Electrician Profile"
            Svg={Electrician}
            type="busenessProfile"
            ProfileExist={data?.profiles_exist?.electrician?.exists}
            id={data?.profiles_exist?.electrician?.profile_id}
            profileType="electrician"
          />
          <SideBarCard
            text="Decor Profile"
            Svg={Decore}
            type="busenessProfile"
            ProfileExist={data?.profiles_exist?.decor?.exists}
            id={data?.profiles_exist?.decor?.profile_id}
            profileType="decor"
          />
        </View>
      </ScrollView>
      <Loading isLoading={isLoading} text="Loading..."/>
    </View>
  );
};

export default index;
