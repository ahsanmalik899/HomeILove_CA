// eslint-disable-next-line import/extensions
import SpaceMonoFont from '@assets/fonts/SpaceMono-Regular.ttf';
import store from '@store/index';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-gesture-handler';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();
const persistor = persistStore(store);

const ReduxWrapper = () => {
  const [loaded, error] = useFonts({
    SpaceMono: SpaceMonoFont,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="small" />
      </View>
    );
  }

  return (
    <>
      <Slot
        screenOptions={{
          headerShown: false,
        }}
      />
      <StatusBar />
    </>
  );
};

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider
            theme={{
              ...DefaultTheme,
              colors: {
                ...DefaultTheme.colors,
                secondaryContainer: 'transparent',
              },
            }}
          >
            <ReduxWrapper />
          </PaperProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default RootLayout;
