import { useAppSelector } from '@src/hooks/useReduxHooks';
import { Redirect } from 'expo-router';
import { MaterialBottomTabs } from '../../layouts/material-bottom-tabs';
// Icons
// const MainStack = createBottomTabNavigator<RootTabParamList>();
const Layout = () => {
  const user = useAppSelector(state => state.user);

  if (!user?.data?.email) return <Redirect href="/(auth)/welcome" />;

  return (
    <MaterialBottomTabs
      initialRouteName="home"
      screenOptions={
        {
          // tabBarStyle: styles.tabBarStyle,
          // tabBarActiveTintColor: Colors.light.textYellow,
          // tabBarInactiveTintColor: Colors.light.textGray,
          // tabBarLabelStyle: styles.tabBarLabelStyle,
        }
      }
      shifting
      sceneAnimationEnabled
      sceneAnimationType="shifting"
    >
      <MaterialBottomTabs.Screen name="home" />
      <MaterialBottomTabs.Screen name="account" />
    </MaterialBottomTabs>
  );
};

export default Layout;

// const styles = StyleSheet.create({
//   iconSquare: {
//     width: getRespValue(35),
//     height: getRespValue(35),
//   },
//   iconHorizontal: {
//     width: getRespValue(45),
//     height: getRespValue(45),
//   },
//   tabBarStyle: {
//     backgroundColor: Colors.light.background,
//     height: hp('11%'),
//     paddingTop: hp('2%'),
//     paddingBottom: Platform.OS === 'ios' ? hp('3.5%') : hp('2%'),
//   },
//   tabBarLabelStyle: {
//     fontSize: getRespValue(13),
//     fontFamily: 'aeonik',
//   },
// });
