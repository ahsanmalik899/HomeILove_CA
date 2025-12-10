import { Drawer } from "@/layouts/drawer";
import HomeLogo from "@assets/Home/homeliogo.svg";
import NotificatioOutline from "@assets/Home/notificationOutline.svg";
import SidebarIcon from "@assets/Home/sideMenueIcon.svg";
import Connection from "@assets/icons/bottom-tabs/connectio_icon.svg";
import { MaterialIcons } from "@expo/vector-icons";
import SideBarUser from "@src/components/globals/SideBarUser";
import Colors from "@src/constants/Colors";
import { hs, vs } from "@utils/design/design";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
const _layout = () => {
  return (
      <Drawer
      screenOptions={{
        header: ({ navigation }) => (
         <View
  style={{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: vs(45),
    paddingHorizontal: hs(20),
    backgroundColor: "#fff",
    paddingVertical: vs(10),
  }}
>
  {/* Left section */}
  <View style={{ flex: 1, alignItems: "flex-start" }}>
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <SidebarIcon />
    </TouchableOpacity>
  </View>

  {/* Center section */}
  <View style={{ flex: 1, alignItems: "center" }}>
    <View style={{ marginTop: vs(-10) }}>
      <HomeLogo />
    </View>
  </View>

  {/* Right section */}
  <View
    style={{
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
    }}
  >
    <TouchableOpacity
      style={{ marginRight: hs(10) }}
      onPress={() => router.navigate("/(main)/Connection")}
    >
      <Connection />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => router.navigate("/CurrentAlerts")}>
      <NotificatioOutline />
    </TouchableOpacity>
  </View>
</View>

        ),

        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: "#fff", 
        },
        drawerActiveTintColor: Colors.light.DarkGreen,
        drawerInactiveTintColor: "gray",
        drawerType: "slide",
        drawerStyle: {
          backgroundColor: "#fff",
         width:hs(250) 


        },
      }}
       drawerContent={(props) => <SideBarUser/>}
    >
        <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="home-filled" size={size} color={color} />
          ),
        }}
      />
   
    </Drawer>
  );
};

export default _layout;
