import { Drawer } from "@/layouts/drawer";
import { useGetUnreadNotificationsCountQuery } from "@/store/api/user/MainApi";
import { setNotificationCount } from "@/store/slices/Notification";
import { Notification } from "@/store/slices/selector/Notification";
import { userdata } from "@/store/slices/selector/user";
import HomeLogo from "@assets/Home/homeliogo.svg";
import NotificatioOutline from "@assets/Home/notificationOutline.svg";
import SidebarIcon from "@assets/Home/sideMenueIcon.svg";
import Connection from "@assets/icons/bottom-tabs/connectio_icon.svg";
import { MaterialIcons } from "@expo/vector-icons";
import SideBarUser from "@src/components/globals/SideBarUser";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { socket } from "@src/socket";
import { hs, vs } from "@utils/design/design";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
const _layout = () => {
  const user = useAppSelector(userdata);
  const dispatch = useDispatch();
  const notifiation = useAppSelector(Notification);

  const { data: unredCount ,refetch} = useGetUnreadNotificationsCountQuery({
    user_id: user?.id,
  });
useFocusEffect(
  useCallback(() => {
    refetch();
  }, [refetch])
);
  useEffect(() => {
    dispatch(setNotificationCount(unredCount?.unread_count));
  }, [unredCount]);
  useEffect(() => {
  if (unredCount) {
    dispatch(setNotificationCount(unredCount.unread_count));
  }
}, [unredCount, dispatch]);
useEffect(() => {
  if (!user?.id) return;

  socket.emit("join", String(user.id));

  const onNotification = () => {
    dispatch(
      setNotificationCount(
        notifiation.NotificationCount + 1
      )
    );
  };

  socket.on("newNotification", onNotification);

  return () => {
    socket.off("newNotification", onNotification);
  };
}, [user?.id]);
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
              <TouchableOpacity
                onPress={() => router.navigate("/CurrentAlerts")}
                style={{ position: "relative" }}
              >
                <NotificatioOutline />

                {notifiation.NotificationCount > 0 && (
                  <View
                    style={{
                      position: "absolute",
                      top: -6,
                      right: -6,
                      backgroundColor: "#FF3B30",
                      borderRadius: 10,
                      minWidth: 18,
                      height: 18,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingHorizontal: 3,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 10,
                        fontWeight: "bold",
                      }}
                    >
                      {notifiation.NotificationCount > 19
                        ? "19+"
                        : notifiation.NotificationCount}
                    </Text>
                  </View>
                )}
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
          width: hs(250),
        },
      }}
      drawerContent={(props) => <SideBarUser />}
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

