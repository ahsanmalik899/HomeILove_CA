
import { userdata } from "@/store/slices/selector/user";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { db } from "@src/utils/firebse";
import { hs, ms, vs } from "@utils/design/design";
import { Tabs } from "expo-router";
import { collection, documentId, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Platform, Text } from "react-native";
const _layout = () => {
  const user = useAppSelector(userdata);
 
    const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user.id) return;

    const chatsRef = collection(db, "userChats");

    const q = query(
      chatsRef,
       where(documentId(),">=",user.id+"-"),

   where(documentId(),"<=",user.id+"-\uf8ff"),

    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let count = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();
        if ((data.unread_count ?? 0) > 0) {
          count += 1; // Count rooms with unread messages
        }
      });

      setUnreadCount(count);
      console.log("Unread chat rooms:", count);
    });

    return () => unsubscribe();
  }, [user.id]);

  
  
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