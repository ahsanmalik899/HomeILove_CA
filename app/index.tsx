/* eslint-disable import/order */
import { Onboarding } from '@/store/slices/selector/OnBoarding';
import { userdata } from '@/store/slices/selector/user';
import Logo from '@assets/splash/logo.svg';
import splashbg from '@assets/splash/splashbackground.png';
import Colors from '@src/constants/Colors';
import { useAppSelector } from '@src/hooks/useReduxHooks';
import { hs, vs } from '@utils/design/design';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Dimensions, ImageBackground, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const Index = () => {
  const router = useRouter();
  const user = useAppSelector(userdata);
  const isOnboarding = useAppSelector(Onboarding);
  const translateX1 = useSharedValue(0);
  const translateY1 = useSharedValue(0);
  const translateX2 = useSharedValue(0);
  const translateY4 = useSharedValue(0);
  const translateX4 = useSharedValue(0);
  const translateX5 = useSharedValue(0);
  const translateY5 = useSharedValue(0);
  const translateX6 = useSharedValue(0);
  const translateY6 = useSharedValue(0);
  const translateX7 = useSharedValue(0);
  const translateY7 = useSharedValue(0);
  const translateY9 = useSharedValue(0);
  const translateX12 = useSharedValue(0);
  const translateY12 = useSharedValue(0);
  const translateX11 = useSharedValue(0);
  const translateY11 = useSharedValue(0);
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const { height: SCREEN_HEIGHT } = Dimensions.get('window');

  useEffect(() => {
    translateX1.value = withSequence(
      withTiming(SCREEN_WIDTH / 2 - 250, { duration: 2000 }),
      withTiming(SCREEN_WIDTH / 2 + 650, { duration: 2000 }),
    );
    translateY1.value = withSequence(
      withTiming(SCREEN_WIDTH / 2 - 200, { duration: 2000 }),
      withTiming(SCREEN_WIDTH / 2 - 10, { duration: 2000 }),
    );
    translateX2.value = withSequence(
      withTiming(SCREEN_WIDTH / 2 - 100, { duration: 2000 }),
      withTiming(SCREEN_WIDTH / 2 - 1000, { duration: 2000 }),
    );
    translateY4.value = withSequence(
      withTiming(SCREEN_HEIGHT / 2 - 450, { duration: 2000 }),
      withTiming(SCREEN_HEIGHT / 2 + 2300, { duration: 2000 }),
    );
    translateX4.value = withSequence(
      withTiming(0, { duration: 2000 }),
      withTiming(SCREEN_WIDTH / 2 + 700, { duration: 2000 }),
    );
    translateY5.value = withSequence(
      withTiming(0, { duration: 2000 }),
      withTiming(SCREEN_HEIGHT / 2 - 2300, { duration: 2000 }),
    );
    translateX5.value = withSequence(
      withTiming(SCREEN_HEIGHT / 2 - 400, { duration: 2000 }),
      withTiming(SCREEN_WIDTH / 2 + 2000, { duration: 2000 }),
    );
    translateY6.value = withSequence(
      withTiming(SCREEN_HEIGHT / 2 - 350, { duration: 2000 }),
      withTiming(SCREEN_HEIGHT / 2 - 2300, { duration: 2000 }),
    );
    translateX6.value = withSequence(
      withTiming(10, { duration: 2000 }),
      withTiming(SCREEN_WIDTH / 2 + 400, { duration: 2000 }),
    );
    translateY7.value = withSequence(
      withTiming(SCREEN_HEIGHT / 2 - 400, { duration: 2000 }),
      withTiming(SCREEN_HEIGHT / 2 - 2300, { duration: 2000 }),
    );
    translateX7.value = withSequence(
      withTiming(20, { duration: 2000 }),
      withTiming(SCREEN_WIDTH / 2 - 900, { duration: 2000 }),
    );
    translateY9.value = withSequence(
      withTiming(SCREEN_HEIGHT / 2 - 350, { duration: 2000 }),
      withTiming(SCREEN_HEIGHT / 2 - 2300, { duration: 2000 }),
    );
    translateY11.value = withSequence(
      withTiming(SCREEN_HEIGHT / 2 - 400, { duration: 2000 }),
      withTiming(SCREEN_HEIGHT / 2 + 2300, { duration: 2000 }),
    );
    translateX11.value = withSequence(
      withTiming(20, { duration: 2000 }),
      withTiming(SCREEN_WIDTH / 2 - 2000, { duration: 2000 }),
    );
    translateY12.value = withSequence(
      withTiming(SCREEN_HEIGHT / 2 - 450, { duration: 2000 }),
      withTiming(SCREEN_HEIGHT / 2 + 400, { duration: 2000 }),
    );
    translateX12.value = withSequence(
      withTiming(+20, { duration: 2000 }),
      withTiming(SCREEN_WIDTH / 2 - 700, { duration: 2000 }),
    );
    const timeout = setTimeout(() => {
      if (user.sweetghar_user_id) {
        router.replace('/(main)/home');
      } else if (isOnboarding.isOnboarding) {
        router.replace('/(auth)/signup');
      } else {
        router.replace('/(auth)/welcome');
      }
    }, 5000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyle1 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX1.value },
        { translateY: translateY1.value },
      ],
    };
  });
  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX2.value }],
    };
  });
  const animatedStyle4 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY4.value },
        { translateX: translateX4.value },
      ],
    };
  });
  const animatedStyle5 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY5.value },
        { translateX: translateX5.value },
      ],
    };
  });
  const animatedStyle6 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY6.value },
        { translateX: translateX6.value },
      ],
    };
  });
  const animatedStyle7 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY7.value },
        { translateX: translateX7.value },
      ],
    };
  });
  const animatedStyle9 = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY9.value }],
    };
  });
  const animatedStyle11 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY11.value },
        { translateX: translateX11.value },
      ],
    };
  });
  const animatedStyle12 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY12.value },
        { translateX: translateX12.value },
      ],
    };
  });
  return (
    <ImageBackground
      className="flex-1 items-center justify-center"
      resizeMode="cover"
      source={splashbg}
    >
      <Animated.View
        className="rounded-full"
        style={[Styles.circle1, animatedStyle1]}
      />
      <Animated.View
        className="rounded-full"
        style={[Styles.circle2, animatedStyle2]}
      />
      <Animated.View
        className="rounded-full"
        style={[Styles.circle3, animatedStyle1]}
      />
      <Animated.View
        className="rounded-full"
        style={[Styles.circle4, animatedStyle4]}
      />
      <Animated.View
        className="rounded-full"
        style={[Styles.circle5, animatedStyle5]}
      />
      <Animated.View
        className="rounded-full"
        style={[Styles.circle6, animatedStyle6]}
      />
      <Animated.View
        className="rounded-full"
        style={[Styles.circle7, animatedStyle7]}
      />
      <Animated.View
        className="rounded-full"
        style={[Styles.circle8, animatedStyle7]}
      />
      <Animated.View
        className="rounded-full"
        style={[Styles.circle9, animatedStyle9]}
      />
      <Animated.View
        className="rounded-full"
        style={[Styles.circle10, animatedStyle7]}
      />
      <Animated.View
        className="rounded-full"
        style={[Styles.circle11, animatedStyle11]}
      />
      <Animated.View
        className="rounded-full shadow-black"
        style={[Styles.circle12, animatedStyle12]}
      />
      <Logo />
    </ImageBackground>
  );
};
const shadowStyle = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 10,
};

const Styles = StyleSheet.create({
  circle1: {
    ...shadowStyle,
    width: hs(260),
    height: hs(260), // Equal width and height for perfect circle
    position: 'absolute',
    left: hs(-20),
    zIndex: 11,
    overflow: 'visible',
    borderRadius: hs(130), // Half of width/height
    backgroundColor: Colors.light.circleblue,
  },
  circle2: {
    ...shadowStyle,
    overflow: 'visible',
    borderRadius: hs(110), // Half of width/height
    width: hs(220),
    height: hs(220), // Equal width and height
    position: 'absolute',
    top: vs(230),
    right: hs(-10),
    zIndex: 7,
    backgroundColor: Colors.light.circlewhite,
  },
  circle3: {
    ...shadowStyle,
    overflow: 'visible',
    borderRadius: hs(90), // Half of width/height
    width: hs(180),
    height: hs(180), // Equal width and height
    position: 'absolute',
    top: vs(170),
    left: hs(-15),
    zIndex: 12,
    backgroundColor: Colors.light.circlegreen,
  },
  circle4: {
    ...shadowStyle,
    overflow: 'visible',
    borderRadius: hs(155), // Half of width/height
    width: hs(310),
    height: hs(310), // Equal width and height
    position: 'absolute',
    top: vs(-40),
    left: hs(-30),
    zIndex: 1,
    backgroundColor: Colors.light.circlelightgrnn,
  },
  circle5: {
    ...shadowStyle,
    overflow: 'visible',
    borderRadius: hs(135), // Half of width/height
    width: hs(270),
    height: hs(270), // Equal width and height
    position: 'absolute',
    bottom: vs(30),
    left: hs(-60),
    zIndex: 2,
    backgroundColor: Colors.light.circlelightgrnn,
  },
  circle6: {
    ...shadowStyle,
    overflow: 'visible',
    borderRadius: hs(100), // Half of width/height
    width: hs(200),
    height: hs(200), // Equal width and height
    position: 'absolute',
    bottom: vs(-40),
    left: hs(-10),
    zIndex: 3,
    backgroundColor: Colors.light.circlegreen,
  },
  circle7: {
    ...shadowStyle,
    overflow: 'visible',
    borderRadius: hs(125), // Half of width/height
    width: hs(250),
    height: hs(250), // Equal width and height
    position: 'absolute',
    bottom: vs(-60),
    right: hs(-10),
    zIndex: 1,
    backgroundColor: Colors.light.circleblue,
  },
  circle8: {
    ...shadowStyle,
    overflow: 'visible',
    borderRadius: hs(90), // Half of width/height
    width: hs(180),
    height: hs(180), // Equal width and height
    position: 'absolute',
    bottom: vs(150),
    right: hs(-50),
    zIndex: 1,
    backgroundColor: Colors.light.circlelightgrnn,
  },
  circle9: {
    ...shadowStyle,
    overflow: 'visible',
    borderRadius: hs(90), // Half of width/height
    width: hs(180),
    height: hs(180), // Equal width and height
    position: 'absolute',
    bottom: vs(160),
    right: hs(60),
    zIndex: 11,
    backgroundColor: Colors.light.circlewhite,
  },
  circle10: {
    ...shadowStyle,
    overflow: 'visible',
    borderRadius: hs(90), // Half of width/height
    width: hs(180),
    height: hs(180), // Equal width and height
    position: 'absolute',
    bottom: vs(250),
    right: hs(-10),
    zIndex: 10,
    backgroundColor: Colors.light.circlegreen,
  },
  circle11: {
    ...shadowStyle,
    overflow: 'visible',
    borderRadius: hs(125), // Half of width/height
    width: hs(250),
    height: hs(250), // Equal width and height
    position: 'absolute',
    top: vs(0),
    right: hs(-50),
    zIndex: 1,
    backgroundColor: Colors.light.circlegreen,
  },
  circle12: {
    ...shadowStyle,
    overflow: 'visible',
    borderRadius: hs(90), // Half of width/height
    width: hs(180),
    height: hs(180), // Equal width and height
    position: 'absolute',
    top: vs(-50),
    right: hs(-10),
    zIndex: 8,
    backgroundColor: Colors.light.circleblue,
  },
});
export default Index;
