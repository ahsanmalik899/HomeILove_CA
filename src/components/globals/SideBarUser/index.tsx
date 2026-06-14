import { useLogoutApiMutation } from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import { resetUserData } from "@/store/slices/user";
import SidebarLogo from "@assets/SideBar/sideBarLogo.svg";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { hs, ms, vs } from "@utils/design/design";
import { router } from "expo-router";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import LargeButton from "../LaregeButton";
import Loading from "../Loading";
import SideBarButtons from "../SideBarButtons";
const index = () => {
  const dispatch = useDispatch();
  const user= useAppSelector(userdata)
  const [logoutApi,{isLoading}] = useLogoutApiMutation();
  return (
    <View
      style={{
        paddingTop: vs(40),
        marginHorizontal: hs(20),
        borderTopRightRadius: ms(20),
        borderBottomRightRadius: ms(20),
      }}
      className="flex-1 bg-white"
    >
      <SidebarLogo />
      <View style={{ marginTop: vs(20) }}>
        <SideBarButtons text="Buy" onPress={() => router.navigate("/Buy")} />
      </View>
      <View style={{ marginTop: vs(5) }}>
        <SideBarButtons text="Rent" onPress={() => router.navigate("/Rent")} />
      </View>
      <View style={{ marginTop: vs(5) }}>
        <SideBarButtons
          text="New Home"
          onPress={() => router.navigate("/NewHome")}
        />
      </View>
      <View style={{ marginTop: vs(5) }}>
        <SideBarButtons
          text="Home Value"
          onPress={() => router.navigate({pathname:"/HomeValue",params:{type:"home valuation"}})}
        />
      </View>
      <View style={{ marginTop: vs(5) }}>
        <SideBarButtons
          text="Find Expert"
          onPress={() => router.navigate("/GetHelp")}
        />
      </View>
      <View style={{ marginTop: vs(5) }}>
        <SideBarButtons
          text="Home Romance"
          onPress={() => router.navigate("/HomeRomance")}
        />
      </View>
    
        <View
                                 style={{
                                   height: vs(1),
                                   marginTop: vs(20),
                                   marginBottom: vs(10),
                                   backgroundColor: Colors.light.textGray,
                                   opacity: 0.2,
                                 }}
                               />
      <View style={{ marginTop: vs(5) }}>
        <SideBarButtons
          text="Post Ad"
          onPress={() => router.navigate("/(main)/SellProperty")}
        />
      </View>
          <View
                                 style={{
                                   height: vs(1),
                                   marginTop: vs(20),
                                   marginBottom: vs(10),
                                   backgroundColor: Colors.light.textGray,
                                   opacity: 0.2,
                                 }}
                               />
      <View style={{ marginTop: vs(5) }}>
        <SideBarButtons
          text="Account"
          onPress={() => router.navigate("/Account")}
        />
      </View>
      <View style={{ marginTop: vs(20), width: hs(200) }}>
        <LargeButton
          handleSubmit={async()=> {
            try{
              const res = await logoutApi({user_id:user?.id});
              if(res?.data?.status){
                dispatch(resetUserData());
                router.replace("/(auth)/signin")
              }
            }catch(error){
              console.log(error);
            }
          }}
          text="Logout"
        />
      </View>
      <Loading isLoading={isLoading} text="Logging out..."/>
    </View>
  );
};

export default index;
