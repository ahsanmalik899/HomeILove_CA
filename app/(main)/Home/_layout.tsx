import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor:Colors.light.DarkGreen,
        tabBarInactiveTintColor:Colors.light.LightGreen,
        tabBarStyle: {
          position: "absolute",
          bottom: Platform.OS === "ios" ? vs(15) : vs(10),
          elevation: 10,
          backgroundColor: "white",
          borderRadius: ms(50),
          height: vs(60),
          marginHorizontal:hs(10),
          alignItems:'center',
          paddingTop:vs(5)

        },
        
       
      }}
    >
      <Tabs.Screen
        name="HomeInner"
        
        options={{
          
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home-filled" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Message"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Account"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
