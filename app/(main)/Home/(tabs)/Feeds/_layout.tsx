import { createMaterialTopTabNavigator, MaterialTopTabNavigationEventMap } from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { withLayoutContext } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
const {Navigator}= createMaterialTopTabNavigator()
export const MateralTopTabs= withLayoutContext<MaterialTopTabNavigationEventMap, typeof Navigator,TabNavigationState<ParamListBase>,MaterialTopTabNavigationEventMap>(Navigator)
const _layout = () => {
    
  return (
    <View style={styles.container}>
       <MateralTopTabs
     screenOptions={({ route }) => ({
      lazy:true,
      lazyPreloadDistance:100,
  tabBarActiveTintColor: Colors.light.red,
  tabBarInactiveTintColor: 'black',
  tabBarIndicatorStyle: {
    backgroundColor: Colors.light.red,
    height: vs(3),
  
  },
    tabBarItemStyle: {
      width: 'auto',
    },
tabBarLabel: ({ focused, color }) => {
  let label = route.name;
  switch (route.name) {
    case 'YourPosts':
      label = 'Yours Posts';
      break;
    case 'ContentFeed':
      label = 'Content';
      break;
    case 'NewsFeed':
      label = 'Home Feeds';
      break;
    case 'NewsFeedPreference':
      label = 'NewsFeed Preferences';
      break;
  }

  return (
    <Text style={{ color,fontSize:ms(12), fontWeight: focused ? 'bold' : 'normal' }}>
      {label}
    </Text>
  );
},

  tabBarLabelStyle: {
    fontWeight: 'bold',
    
  },
  tabBarStyle: {
    backgroundColor: '#fff',
    paddingHorizontal:hs(5),
  },
})}

      />
    </View>
  )
}

export default _layout;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff'
  },
topbar:{
marginTop:vs(40),
marginBottom:vs(20),
marginHorizontal:hs(20),
},
  topBarText: {
    color: "black",
    fontSize: ms(16),
    fontWeight: "bold",
  },
});