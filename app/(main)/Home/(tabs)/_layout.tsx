
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { Tabs } from "expo-router";
import { Platform, Text } from "react-native";
const _layout = () => {
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