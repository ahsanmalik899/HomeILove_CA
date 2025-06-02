/* eslint-disable import/extensions */
/* eslint-disable global-require */
import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

const useCachedResources = () => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('@assets/fonts/SpaceMono-Regular.ttf'),
          'aeonik-air': require('@assets/fonts/Aeonik/Aeonik-Air.otf'),
          'aeonik-bold': require('@assets/fonts/Aeonik/Aeonik-Bold.otf'),
          'aeonik-light': require('@assets/fonts/Aeonik/Aeonik-Light.otf'),
          'aeonik-medium': require('@assets/fonts/Aeonik/Aeonik-Medium.otf'),
          aeonik: require('@assets/fonts/Aeonik/Aeonik-Regular.otf'),
          'aeonik-thin': require('@assets/fonts/Aeonik/Aeonik-Thin.otf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
};

export default useCachedResources;
