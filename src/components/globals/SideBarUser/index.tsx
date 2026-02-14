import { resetUserData } from "@/store/slices/user";
import SidebarLogo from "@assets/SideBar/sideBarLogo.svg";
import { hs, ms, vs } from "@utils/design/design";
import { router } from "expo-router";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import LargeButton from "../LaregeButton";
import SideBarButtons from "../SideBarButtons";
const index = () => {
  const dispatch = useDispatch();
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
          text="Get Help"
          onPress={() => router.navigate("/GetHelp")}
        />
      </View>
      <View style={{ marginTop: vs(5) }}>
        <SideBarButtons
          text="Home Romance"
          onPress={() => router.navigate("/HomeRomance")}
        />
      </View>
      <View style={{ marginTop: vs(5) }}>
        <SideBarButtons
          text="Sell Property"
          onPress={() => router.navigate("/(main)/SellProperty")}
        />
      </View>
      <View style={{ marginTop: vs(5) }}>
        <SideBarButtons
          text="Account"
          onPress={() => router.navigate("/Account")}
        />
      </View>
      <View style={{ marginTop: vs(20), width: hs(150) }}>
        <LargeButton
          handleSubmit={async()=> {
            dispatch(resetUserData());
            router.replace("/(auth)/signin")
          }}
          text="Logout"
        />
      </View>
    </View>
  );
};

export default index;
