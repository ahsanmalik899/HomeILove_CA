import { Drawer } from "@/layouts/drawer";
import { useGetBlockedProfileMessageQuery, useGetUnreadNotificationsCountQuery, useGetUserStatusQuery, useSendBlockedProfileMessageMutation } from "@/store/api/user/MainApi";
import { setNotificationCount } from "@/store/slices/Notification";
import { Notification } from "@/store/slices/selector/Notification";
import { userdata } from "@/store/slices/selector/user";
import NotificatioOutline from "@assets/Home/notificationOutline.svg";
import SidebarIcon from "@assets/Home/sideMenueIcon.svg";
import Connection from "@assets/icons/bottom-tabs/connectio_icon.svg";
import HomeLogo from "@assets/logo/logo-black.svg";
import { MaterialIcons } from "@expo/vector-icons";
import BlockedUserModal from "@src/components/globals/BlockedComponenet/BlockedUserModal";
import SideBarUser from "@src/components/globals/SideBarUser";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { socket } from "@src/socket";
import { hs, vs } from "@utils/design/design";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
const _layout = () => {
  const user = useAppSelector(userdata);
  const dispatch = useDispatch();
  const {
  data: userStatus,
  refetch: refetchUserStatus,
} = useGetUserStatusQuery(
  {
    user_id: user?.id,
  },
  {
    skip: !user?.id,

  }
);
  const [
  sendBlockedProfileMessage,
  { isLoading: sendingMessage },
] = useSendBlockedProfileMessageMutation();
  const {
  data: blockedMessage,
  refetch:refetchMessage,
  isLoading:gettingMessage
} = useGetBlockedProfileMessageQuery(
  {
    post_id: user?.id,
    post_of: "main_account",
  },
  {
    skip: !user?.id,
        refetchOnFocus: true,
    refetchOnReconnect: true,
  }
);
  const notifiation = useAppSelector(Notification);
const isBlocked = userStatus?.user_status === "Block";
  const { data: unredCount ,refetch} = useGetUnreadNotificationsCountQuery({
    user_id: user?.id,
  },{skip:!user?.id});
useFocusEffect(
  useCallback(() => {
    refetch();
    refetchMessage();
    refetchUserStatus();
  }, [refetch, refetchMessage, refetchUserStatus])
);
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
    <>
     <SafeAreaView
      style={{ flex: 1 }}
      edges={["bottom", "left", "right"]}
    >
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
              <TouchableOpacity  activeOpacity={1} onPress={() => navigation.openDrawer()}>
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
               activeOpacity={1}
                style={{ marginRight: hs(10) }}
                onPress={() => router.navigate("/(main)/Connection")}
              >
                <Connection />
              </TouchableOpacity>
              <TouchableOpacity
               activeOpacity={1}
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
<BlockedUserModal
  visible={isBlocked}
  message="Your account has been blocked by the administrator."
  initialMessage={blockedMessage?.messageToAdmin ?? ""}
  loading={sendingMessage||gettingMessage}
  onSendMessage={async (adminMessage) => {
    try {
      const res = await sendBlockedProfileMessage({
        post_id: user?.id,
        post_of: "main_account",
        message: adminMessage,
      }).unwrap();

      if (res.status) {
        alert(res.message);
        refetch();
      } else {
        alert(res.message);
      }
    } catch (e) {
      console.log(e);
      alert("Something went wrong.");
    }
  }}
/>
</SafeAreaView>
    </>
  );
};

export default _layout;

