import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import {
  ParamListBase,
  TabNavigationState,
} from "@react-navigation/native";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import Colors from "@src/constants/Colors";
import { ms, vs } from "@utils/design/design";
import { withLayoutContext } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const { Navigator } = createMaterialTopTabNavigator();

export const MateralTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);
const getLabel = (name: string) => {
  switch (name) {
    case "Connected":
      return "Connected";

    case "Requiested":
      return "Requests";

    default:
      return name;
  }
};

const CustomTabBar = ({ state, navigation }: any) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: number) => {
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
                    color: focused ? Colors.light.red : "black",
                    fontWeight: focused ? "700" : "400",
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
    <SafeAreaView
      style={{ flex: 1 }}
      edges={["bottom", "left", "right"]}
    >
      <View style={styles.container}>
        <HeaderWithBack />

        <MateralTopTabs
          tabBar={(props) => <CustomTabBar {...props} />}
          screenOptions={{
            lazy: true,
            lazyPreloadDistance: 1,
            swipeEnabled: true,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default _layout;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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

  labelContainer: {
    alignItems: "center",
    paddingBottom: vs(8),
    borderBottomWidth: vs(3),
    borderBottomColor: "transparent",
  },

  activeLabelContainer: {
    borderBottomColor: Colors.light.red,
  },

  label: {
    fontSize: ms(12),
    fontFamily: "PopinRegula",
  },
});