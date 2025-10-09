import { Drawer } from "@/layouts/drawer";
import { userdata } from "@/store/slices/selector/user";
import HomeLogo from "@assets/Home/homeliogo.svg";
import NotificatioOutline from "@assets/Home/notificationOutline.svg";
import SidebarIcon from "@assets/Home/sideMenueIcon.svg";
import { MaterialIcons } from "@expo/vector-icons";
import SideBarBuseness from "@src/components/globals/SideBarBuseness";
import SideBarUser from "@src/components/globals/SideBarUser";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { hs, vs } from "@utils/design/design";
import { TouchableOpacity, View } from "react-native";

const _layout = () => {
const user = useAppSelector(userdata);
  return (
    <Drawer
      screenOptions={{
        header: ({ navigation }) => (
          <View
            style={{
               
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: vs(45),
              paddingHorizontal: hs(20),
              backgroundColor: "#fff", 
              paddingVertical: vs(10),
            }}
          >
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <SidebarIcon />
            </TouchableOpacity>
            <View style={{ marginTop: vs(-10) }}>
              <HomeLogo />
            </View>
            <TouchableOpacity>
              <NotificatioOutline />
            </TouchableOpacity>
          </View>
        ),

        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: "#fff", // ✅ ensures full header is white
        },
        drawerActiveTintColor: Colors.light.DarkGreen,
        drawerInactiveTintColor: "gray",
        drawerType: "slide",
        drawerStyle: {
          backgroundColor: "#fff",
         width: user.user_type !== 'Business' ? hs(200) : '100%',


        },
      }}
       drawerContent={(props) => user.user_type ==='Business'?(<SideBarBuseness/>):(<SideBarUser/>)}
    >
      <Drawer.Screen
        name="index"
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
