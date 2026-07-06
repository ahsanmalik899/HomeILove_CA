
import { useGetUnreadConversationCountQuery } from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { socket } from "@src/socket";
import { hs, ms, vs } from "@utils/design/design";
import { Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, Text } from "react-native";
const _layout = () => {
  const user = useAppSelector(userdata);
 const {data:count,isLoading}=useGetUnreadConversationCountQuery({user_id:user?.id})
    const [unreadCount, setUnreadCount] = useState(0);
useEffect(()=>{
setUnreadCount(count?.unread_conversations)
},[count])
useEffect(() => {

    socket.on("unreadConversationCount", ({ count }) => {

        setUnreadCount(count);

    });

    return () => {

        socket.off("unreadConversationCount");

    };

}, []);
  
  
  return (
   <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.light.red,
        tabBarInactiveTintColor: Colors.light.DarkGreen,
        tabBarStyle: {
          position: "absolute",
          bottom: Platform.OS === "ios" ? vs(15) : vs(10),
          elevation: 10,
          backgroundColor: "white",
          borderRadius: ms(50),
          height: vs(65),
          marginHorizontal: hs(10),
          alignItems: "center",
          paddingTop: vs(5),
        },
      }}
    >
      <Tabs.Screen
      name="Feeds"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused? Colors.light.red:Colors.light.DarkGreen,
                fontWeight: focused ? "600" : "400",
                fontSize:ms(12),
                fontFamily: "PopinRegula",
              }}
            >
              Home Feed
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home-filled" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Message"
        options={{
          tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: Colors.light.red,
            fontSize: ms(10),
            fontFamily: "PopinRegula",
          },
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
               color: focused? Colors.light.red:Colors.light.DarkGreen,
                fontWeight: focused ? "600" : "400",
                fontSize:ms(12),
                fontFamily: "PopinRegula",
              }}
            >
              Message
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
       name="Account"
        options={{
           tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused? Colors.light.red:Colors.light.DarkGreen,
                fontWeight: focused ? "600" : "400",
                fontSize:ms(12),
                fontFamily: "PopinRegula",
              }}
            >
              Dashboard
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

export default _layout