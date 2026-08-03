import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
// const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Layout = () => {
  return (
    <SafeAreaView
  style={{ flex: 1 }}
  edges={[ "bottom", "left", "right"]}
>
    <Stack
      screenOptions={{ headerShown: false }}
      initialRouteName="welcome/index"
    >
      <Stack.Screen name="signin/index" />
      <Stack.Screen name="signup/index" />
      <Stack.Screen name="Verifyacc/index" />
      <Stack.Screen name="forgot/index" />
      <Stack.Screen name="Account/index" />
      <Stack.Screen name="PassReset/index" />
      <Stack.Screen name="PasswordChange/index" />
      <Stack.Screen name="CreateNewpass/index" />
    </Stack>
    </SafeAreaView>
  );
};

export default Layout;
