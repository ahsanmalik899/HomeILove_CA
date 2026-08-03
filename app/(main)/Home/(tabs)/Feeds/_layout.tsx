import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import {
  ParamListBase,
  TabNavigationState,
} from "@react-navigation/native";
import Colors from "@src/constants/Colors";
import { ms, vs } from "@utils/design/design";
import { withLayoutContext } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { Navigator } = createMaterialTopTabNavigator();

export const MateralTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const getLabel = (name: string) => {
  switch (name) {
    case "YourPosts":
      return "Your Posts";

    case "NewsFeed":
      return "Home Feeds";

    case "NewsFeedPreference":
      return "Feed Preferences";

    default:
      return name;
  }
};

const CustomTabBar = ({ state, navigation }) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;

        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.7}
            style={styles.tabItem}
            onPress={() => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!focused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }}
          >
         <View
  style={[
    styles.labelContainer,
    focused && styles.activeLabelContainer,
  ]}
>
  <Text
    style={[
      styles.label,
      {
        color: focused
          ? Colors.light.red
          : Colors.light.DarkGreen,
      },
    ]}
  >
    {getLabel(route.name)}
  </Text>
</View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const _layout = () => {
  return (
    <View style={styles.container}>
      <MateralTopTabs
        backBehavior="history"
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          lazy: true,
          lazyPreloadDistance: 1,
          swipeEnabled: true,
        }}
      />
    </View>
  );
};

export default _layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
labelContainer: {
  alignItems: "center",
  paddingBottom: vs(8),
  borderBottomWidth: vs(3),
  borderBottomColor: "transparent",
},

activeLabelContainer: {
  borderBottomColor: Colors.light.red,
},
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },

  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: vs(12),
  },

 

  label: {
    fontSize: ms(12),
    fontWeight: "700",
    fontFamily: "PopinRegula",
  },

  indicator: {
    width: "100%",
    height: vs(3),
    backgroundColor: Colors.light.red,
    marginTop: vs(8),
  },
});