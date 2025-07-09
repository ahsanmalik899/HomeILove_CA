/* eslint-disable import/extensions */
// Tailwind CSS must be imported first
import '@/global.css'; // 👈 add this line at the top

// eslint-disable-next-line import/extensions
import SpaceMonoFont from '@assets/fonts/SpaceMono-Regular.ttf';
import store from '@store/index';
import { toastConfig } from '@utils/helpers/toast';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();
const persistor = persistStore(store);

const ReduxWrapper = () => {
  const [loaded, error] = useFonts({
    SpaceMono: SpaceMonoFont,
  });

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
      <Slot />
      <StatusBar />
    </>
  );
};

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
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
        <Toast config={toastConfig} />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default RootLayout;
