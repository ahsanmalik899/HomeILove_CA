import { Stack } from 'expo-router';
// const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Layout = () => {
  return (
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
  );
};

export default Layout;
