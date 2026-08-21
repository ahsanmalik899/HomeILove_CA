import { useSaveNotificationTokenMutation } from "@/store/api/user/MainApi";
import { registerForPushNotificationsAsync } from "@/store/Notification/usePushNotification";
import { Onboarding } from "@/store/slices/selector/OnBoarding";
import { userdata } from "@/store/slices/selector/user";

import Logo from "@assets/logo/logo-black.svg";
import MascotWalk1 from "@assets/splash/mascot-walk-1.png";
import MascotWalk2 from "@assets/splash/mascot-walk-2.png";
import MascotWalk3 from "@assets/splash/mascot-walk-3.png";
import MascotWalk4 from "@assets/splash/mascot-walk-4.png";
import SplashProperty from "@assets/splash/splash-property.png";
import SplashBackground from "@assets/splash/splash-redesign-bg.png";

import { useAppSelector } from "@src/hooks/useReduxHooks";

import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const SPLASH_DURATION = 6000;
const SEARCH_TEXT = "Search homes in London";

const MASCOT_WALK_FRAMES: ImageSourcePropType[] = [
  MascotWalk1,
  MascotWalk2,
  MascotWalk3,
  MascotWalk4,
  MascotWalk3,
  MascotWalk2,
];

const CATEGORY_ITEMS = [
  { label: "Buy", symbol: "⌂", color: "#EE1768" },
  { label: "Rent", symbol: "R", color: "#12949E" },
  { label: "Agents", symbol: "A", color: "#21499A" },
  { label: "Explore", symbol: "⌖", color: "#F28A1A" },
] as const;

const Index = () => {
  const router = useRouter();

  const user = useAppSelector(userdata);
  const isOnboarding = useAppSelector(Onboarding);

  const [saveUserToken] = useSaveNotificationTokenMutation();

  const latestUserId = useRef(user?.id);
  const latestOnboarding = useRef(isOnboarding?.isOnboarding);

  const [typedSearch, setTypedSearch] = useState("");
  const [mascotFrame, setMascotFrame] = useState(0);

  // ============================================================
  // SHARED VALUES
  // ============================================================

  const backgroundScale = useSharedValue(1.05);

  const logoOpacity = useSharedValue(0);
  const logoTranslateY = useSharedValue(-120);
  const logoScale = useSharedValue(0.9);

  const findOpacity = useSharedValue(0);
  const findTranslateX = useSharedValue(-120);

  const loveOpacity = useSharedValue(0);
  const loveTranslateX = useSharedValue(SCREEN_WIDTH);

  const homeOpacity = useSharedValue(0);
  const homeTranslateX = useSharedValue(-120);

  const searchOpacity = useSharedValue(0);
  const searchTranslateX = useSharedValue(SCREEN_WIDTH);
  const searchButtonScale = useSharedValue(1);

  const chip1Opacity = useSharedValue(0);
  const chip1Scale = useSharedValue(0.7);
  const chip2Opacity = useSharedValue(0);
  const chip2Scale = useSharedValue(0.7);
  const chip3Opacity = useSharedValue(0);
  const chip3Scale = useSharedValue(0.7);
  const chip4Opacity = useSharedValue(0);
  const chip4Scale = useSharedValue(0.7);

  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(130);
  const cardScale = useSharedValue(0.92);
  const heartScale = useSharedValue(1);

  const mascotOpacity = useSharedValue(0);
  const mascotTranslateX = useSharedValue(-SCREEN_WIDTH * 0.6);
  const mascotTranslateY = useSharedValue(0);

  const footerOpacity = useSharedValue(0);
  const footerTranslateY = useSharedValue(30);

  // ============================================================
  // KEEP LATEST AUTH STATE FOR ROUTING TIMER
  // ============================================================

  useEffect(() => {
    latestUserId.current = user?.id;
  }, [user?.id]);

  useEffect(() => {
    latestOnboarding.current = isOnboarding?.isOnboarding;
  }, [isOnboarding?.isOnboarding]);

  // ============================================================
  // SPLASH ANIMATION + ROUTING
  // ============================================================

  useEffect(() => {
    backgroundScale.value = withTiming(1, {
      duration: SPLASH_DURATION,
      easing: Easing.out(Easing.ease),
    });

    // Logo drops from outside the screen.
    logoOpacity.value = withDelay(100, withTiming(1, { duration: 350 }));
    logoTranslateY.value = withDelay(
      100,
      withTiming(0, {
        duration: 700,
        easing: Easing.out(Easing.back(1.15)),
      }),
    );
    logoScale.value = withDelay(
      100,
      withSequence(
        withTiming(1.04, {
          duration: 550,
          easing: Easing.out(Easing.ease),
        }),
        withTiming(1, { duration: 180 }),
      ),
    );

    // Tagline words arrive from outside the image.
    findOpacity.value = withDelay(650, withTiming(1, { duration: 280 }));
    findTranslateX.value = withDelay(
      650,
      withTiming(0, {
        duration: 480,
        easing: Easing.out(Easing.back(1.05)),
      }),
    );

    loveOpacity.value = withDelay(820, withTiming(1, { duration: 280 }));
    loveTranslateX.value = withDelay(
      820,
      withTiming(0, {
        duration: 480,
        easing: Easing.out(Easing.back(1.05)),
      }),
    );

    homeOpacity.value = withDelay(990, withTiming(1, { duration: 280 }));
    homeTranslateX.value = withDelay(
      990,
      withTiming(0, {
        duration: 480,
        easing: Easing.out(Easing.back(1.05)),
      }),
    );

    // Search bar slides in.
    searchOpacity.value = withDelay(1250, withTiming(1, { duration: 300 }));
    searchTranslateX.value = withDelay(
      1250,
      withTiming(0, {
        duration: 600,
        easing: Easing.out(Easing.cubic),
      }),
    );

    searchButtonScale.value = withDelay(
      1700,
      withRepeat(
        withSequence(
          withTiming(1.08, { duration: 420 }),
          withTiming(1, { duration: 420 }),
        ),
        -1,
        true,
      ),
    );

    // Category chips pop in one after another.
    chip1Opacity.value = withDelay(1850, withTiming(1, { duration: 250 }));
    chip1Scale.value = withDelay(
      1850,
      withTiming(1, {
        duration: 430,
        easing: Easing.out(Easing.back(1.35)),
      }),
    );

    chip2Opacity.value = withDelay(1990, withTiming(1, { duration: 250 }));
    chip2Scale.value = withDelay(
      1990,
      withTiming(1, {
        duration: 430,
        easing: Easing.out(Easing.back(1.35)),
      }),
    );

    chip3Opacity.value = withDelay(2130, withTiming(1, { duration: 250 }));
    chip3Scale.value = withDelay(
      2130,
      withTiming(1, {
        duration: 430,
        easing: Easing.out(Easing.back(1.35)),
      }),
    );

    chip4Opacity.value = withDelay(2270, withTiming(1, { duration: 250 }));
    chip4Scale.value = withDelay(
      2270,
      withTiming(1, {
        duration: 430,
        easing: Easing.out(Easing.back(1.35)),
      }),
    );

    // Featured property card.
    cardOpacity.value = withDelay(2450, withTiming(1, { duration: 350 }));
    cardTranslateY.value = withDelay(
      2450,
      withTiming(0, {
        duration: 650,
        easing: Easing.out(Easing.back(1.12)),
      }),
    );
    cardScale.value = withDelay(
      2450,
      withTiming(1, {
        duration: 650,
        easing: Easing.out(Easing.ease),
      }),
    );

    heartScale.value = withDelay(
      3150,
      withRepeat(
        withSequence(
          withTiming(1.16, { duration: 300 }),
          withTiming(1, { duration: 300 }),
        ),
        -1,
        true,
      ),
    );

    // Mascot walks in from outside left.
    mascotOpacity.value = withDelay(2050, withTiming(1, { duration: 160 }));
    mascotTranslateX.value = withDelay(
      2050,
      withTiming(SCREEN_WIDTH * 0.54, {
        duration: 2500,
        easing: Easing.inOut(Easing.linear),
      }),
    );

    mascotTranslateY.value = withDelay(
      2050,
      withRepeat(
        withSequence(
          withTiming(-7, { duration: 120 }),
          withTiming(0, { duration: 120 }),
        ),
        10,
        false,
      ),
    );

    footerOpacity.value = withDelay(4550, withTiming(1, { duration: 450 }));
    footerTranslateY.value = withDelay(
      4550,
      withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.ease),
      }),
    );

    const routeTimer = setTimeout(() => {
      if (latestUserId.current) {
        router.replace("/(main)/Home");
        return;
      }

      if (latestOnboarding.current) {
        router.replace("/(auth)/signin");
        return;
      }

      router.replace("/(auth)/welcome");
    }, SPLASH_DURATION);

    return () => {
      clearTimeout(routeTimer);
    };
  }, []);

  // ============================================================
  // SEARCH TYPEWRITER + REAL WALK FRAME CYCLE
  // ============================================================

  useEffect(() => {
    let typeInterval: ReturnType<typeof setInterval> | undefined;
    let walkInterval: ReturnType<typeof setInterval> | undefined;

    const typeStart = setTimeout(() => {
      let index = 0;

      typeInterval = setInterval(() => {
        index += 1;
        setTypedSearch(SEARCH_TEXT.slice(0, index));

        if (index >= SEARCH_TEXT.length && typeInterval) {
          clearInterval(typeInterval);
        }
      }, 48);
    }, 1550);

    const walkStart = setTimeout(() => {
      walkInterval = setInterval(() => {
        setMascotFrame((current) =>
          current >= MASCOT_WALK_FRAMES.length - 1 ? 0 : current + 1,
        );
      }, 125);
    }, 2050);

    const walkStop = setTimeout(() => {
      if (walkInterval) {
        clearInterval(walkInterval);
      }

      // Last pose remains stable after reaching the destination.
      setMascotFrame(3);
    }, 4650);

    return () => {
      clearTimeout(typeStart);
      clearTimeout(walkStart);
      clearTimeout(walkStop);

      if (typeInterval) {
        clearInterval(typeInterval);
      }

      if (walkInterval) {
        clearInterval(walkInterval);
      }
    };
  }, []);

  // ============================================================
  // ANIMATED STYLES
  // ============================================================

  const backgroundStyle = useAnimatedStyle(() => ({
    transform: [{ scale: backgroundScale.value }],
  }));

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [
      { translateY: logoTranslateY.value },
      { scale: logoScale.value },
    ],
  }));

  const findStyle = useAnimatedStyle(() => ({
    opacity: findOpacity.value,
    transform: [{ translateX: findTranslateX.value }],
  }));

  const loveStyle = useAnimatedStyle(() => ({
    opacity: loveOpacity.value,
    transform: [{ translateX: loveTranslateX.value }],
  }));

  const homeStyle = useAnimatedStyle(() => ({
    opacity: homeOpacity.value,
    transform: [{ translateX: homeTranslateX.value }],
  }));

  const searchStyle = useAnimatedStyle(() => ({
    opacity: searchOpacity.value,
    transform: [{ translateX: searchTranslateX.value }],
  }));

  const searchButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: searchButtonScale.value }],
  }));

  const chip1Style = useAnimatedStyle(() => ({
    opacity: chip1Opacity.value,
    transform: [{ scale: chip1Scale.value }],
  }));

  const chip2Style = useAnimatedStyle(() => ({
    opacity: chip2Opacity.value,
    transform: [{ scale: chip2Scale.value }],
  }));

  const chip3Style = useAnimatedStyle(() => ({
    opacity: chip3Opacity.value,
    transform: [{ scale: chip3Scale.value }],
  }));

  const chip4Style = useAnimatedStyle(() => ({
    opacity: chip4Opacity.value,
    transform: [{ scale: chip4Scale.value }],
  }));

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [
      { translateY: cardTranslateY.value },
      { scale: cardScale.value },
    ],
  }));

  const heartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const mascotStyle = useAnimatedStyle(() => ({
    opacity: mascotOpacity.value,
    transform: [
      { translateX: mascotTranslateX.value },
      { translateY: mascotTranslateY.value },
    ],
  }));

  const footerStyle = useAnimatedStyle(() => ({
    opacity: footerOpacity.value,
    transform: [{ translateY: footerTranslateY.value }],
  }));

  const chipAnimatedStyles = [
    chip1Style,
    chip2Style,
    chip3Style,
    chip4Style,
  ];

  // ============================================================
  // PUSH NOTIFICATION TOKEN
  // ============================================================

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const setupPush = async () => {
      try {
        const token = await registerForPushNotificationsAsync();

        console.log("Expo Token:", token);

        if (token) {
          await saveUserToken({
            user_id: user.id,
            expo_token: token,
          }).unwrap();
        }
      } catch (error) {
        console.log("Push setup error:", error);
      }
    };

    setupPush();
  }, [user?.id, saveUserToken]);

  // ============================================================
  // NOTIFICATION CLICK
  // ============================================================

  useEffect(() => {
    const subscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data;

        console.log("Notification Clicked:", data);

        if (data) {
          setTimeout(() => {
            router.replace("/(auth)/CreateNewpass");
          }, 800);
        }
      });

    return () => {
      subscription.remove();
    };
  }, [router]);

  // ============================================================
  // UI
  // ============================================================

  return (
    <View style={styles.container}>
      <Animated.Image
        source={SplashBackground}
        resizeMode="cover"
        style={[styles.background, backgroundStyle]}
      />

      <View pointerEvents="none" style={styles.warmOverlay} />
      <View pointerEvents="none" style={styles.topHaze} />

      {/* BRAND */}
      <Animated.View pointerEvents="none" style={[styles.logoWrap, logoStyle]}>
        <Logo width={SCREEN_WIDTH * 0.58} height={SCREEN_HEIGHT * 0.11} />
      </Animated.View>

      {/* TAGLINE */}
      <View pointerEvents="none" style={styles.taglineRow}>
        <Animated.Text style={[styles.tagline, styles.findText, findStyle]}>
          Find.
        </Animated.Text>
        <Animated.Text style={[styles.tagline, styles.loveText, loveStyle]}>
          Love.
        </Animated.Text>
        <Animated.Text style={[styles.tagline, styles.homeText, homeStyle]}>
          Home.
        </Animated.Text>
      </View>

      {/* SEARCH */}
      <Animated.View pointerEvents="none" style={[styles.searchBar, searchStyle]}>
        <View style={styles.searchIcon}>
          <View style={styles.searchIconCircle} />
          <View style={styles.searchIconHandle} />
        </View>

        <Text numberOfLines={1} style={styles.searchText}>
          {typedSearch}
          {typedSearch.length < SEARCH_TEXT.length ? "|" : ""}
        </Text>

        <Animated.View style={[styles.searchButton, searchButtonStyle]}>
          <View style={styles.searchButtonCircle} />
          <View style={styles.searchButtonHandle} />
        </Animated.View>
      </Animated.View>

      {/* CATEGORY CHIPS */}
      <View pointerEvents="none" style={styles.categoryRow}>
        {CATEGORY_ITEMS.map((item, index) => (
          <Animated.View
            key={item.label}
            style={[styles.categoryChip, chipAnimatedStyles[index]]}
          >
            <View style={[styles.categoryIcon, { backgroundColor: item.color }]}>
              <Text style={styles.categorySymbol}>{item.symbol}</Text>
            </View>
            <Text style={styles.categoryLabel}>{item.label}</Text>
          </Animated.View>
        ))}
      </View>

      {/* FEATURED PROPERTY CARD */}
      <Animated.View pointerEvents="none" style={[styles.propertyCard, cardStyle]}>
        <View style={styles.propertyImageWrap}>
          <Image
            source={SplashProperty}
            resizeMode="cover"
            style={styles.propertyImage}
          />

          <Animated.View style={[styles.favoriteBubble, heartStyle]}>
            <Text style={styles.favoriteHeart}>♥</Text>
          </Animated.View>
        </View>

        <View style={styles.propertyContent}>
          <Text numberOfLines={1} style={styles.propertyTitle}>
            Charming Family Home
          </Text>

          <Text numberOfLines={1} style={styles.propertyLocation}>
            Battersea, London
          </Text>

          <Text style={styles.propertyPrice}>£875,000</Text>

          <View style={styles.propertyDivider} />

          <Text numberOfLines={1} style={styles.propertySpecs}>
            4 Bed  ·  2 Bath  ·  1,452 sq ft
          </Text>
        </View>
      </Animated.View>

      {/* REAL WALK-CYCLE MASCOT */}
      <Animated.View pointerEvents="none" style={[styles.mascotWrap, mascotStyle]}>
        <Image
          source={MASCOT_WALK_FRAMES[mascotFrame]}
          resizeMode="contain"
          style={styles.mascotImage}
        />
        <View style={styles.mascotShadow} />
      </Animated.View>

      {/* FINAL MESSAGE */}
      <Animated.View pointerEvents="none" style={[styles.footerPill, footerStyle]}>
        <Text style={styles.footerText}>Find your place. Love your home.</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF7EF",
    overflow: "hidden",
  },

  background: {
    ...StyleSheet.absoluteFillObject,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },

  warmOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 239, 217, 0.05)",
  },

  topHaze: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT * 0.34,
    backgroundColor: "rgba(255,255,255,0.16)",
  },

  // ============================================================
  // BRAND
  // ============================================================

  logoWrap: {
    position: "absolute",
    top: SCREEN_HEIGHT * 0.045,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
  },

  taglineRow: {
    position: "absolute",
    top: SCREEN_HEIGHT * 0.145,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    zIndex: 20,
  },

  tagline: {
    fontSize: Math.max(20, SCREEN_WIDTH * 0.058),
    fontWeight: "800",
    letterSpacing: -0.5,
    textShadowColor: "rgba(255,255,255,0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  },

  findText: {
    color: "#EE1768",
  },

  loveText: {
    color: "#12949E",
  },

  homeText: {
    color: "#21499A",
  },

  // ============================================================
  // SEARCH
  // ============================================================

  searchBar: {
    position: "absolute",
    top: SCREEN_HEIGHT * 0.205,
    left: SCREEN_WIDTH * 0.07,
    width: SCREEN_WIDTH * 0.86,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(255,255,255,0.96)",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 18,
    paddingRight: 8,
    zIndex: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 8,
  },

  searchIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },

  searchIconCircle: {
    position: "absolute",
    width: 14,
    height: 14,
    borderWidth: 2,
    borderColor: "#565B68",
    borderRadius: 7,
    top: 2,
    left: 2,
  },

  searchIconHandle: {
    position: "absolute",
    width: 9,
    height: 2,
    borderRadius: 1,
    backgroundColor: "#565B68",
    transform: [{ rotate: "45deg" }],
    top: 15,
    left: 14,
  },

  searchText: {
    flex: 1,
    color: "#5D616D",
    fontSize: 14,
    fontWeight: "500",
  },

  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EE1768",
    alignItems: "center",
    justifyContent: "center",
  },

  searchButtonCircle: {
    width: 14,
    height: 14,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 7,
    marginTop: -2,
    marginLeft: -2,
  },

  searchButtonHandle: {
    position: "absolute",
    width: 8,
    height: 2,
    borderRadius: 1,
    backgroundColor: "#FFFFFF",
    transform: [{ rotate: "45deg" }],
    top: 25,
    left: 24,
  },

  // ============================================================
  // CATEGORIES
  // ============================================================

  categoryRow: {
    position: "absolute",
    top: SCREEN_HEIGHT * 0.285,
    left: SCREEN_WIDTH * 0.055,
    right: SCREEN_WIDTH * 0.055,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 20,
  },

  categoryChip: {
    width: SCREEN_WIDTH * 0.205,
    minHeight: 58,
    paddingVertical: 7,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.95)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.11,
    shadowRadius: 7,
    elevation: 6,
  },

  categoryIcon: {
    width: 25,
    height: 25,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },

  categorySymbol: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },

  categoryLabel: {
    color: "#272A32",
    fontSize: 11,
    fontWeight: "700",
  },

  // ============================================================
  // PROPERTY CARD
  // ============================================================

  propertyCard: {
    position: "absolute",
    top: SCREEN_HEIGHT * 0.39,
    left: SCREEN_WIDTH * 0.055,
    width: SCREEN_WIDTH * 0.54,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.97)",
    overflow: "hidden",
    zIndex: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 10,
  },

  propertyImageWrap: {
    width: "100%",
    height: SCREEN_HEIGHT * 0.135,
    position: "relative",
  },

  propertyImage: {
    width: "100%",
    height: "100%",
  },

  favoriteBubble: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
  },

  favoriteHeart: {
    color: "#EE1768",
    fontSize: 18,
    lineHeight: 20,
  },

  propertyContent: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 12,
  },

  propertyTitle: {
    color: "#20232B",
    fontSize: 14,
    fontWeight: "800",
  },

  propertyLocation: {
    color: "#757985",
    fontSize: 10.5,
    marginTop: 4,
  },

  propertyPrice: {
    color: "#173F82",
    fontSize: 18,
    fontWeight: "900",
    marginTop: 7,
  },

  propertyDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(0,0,0,0.12)",
    marginVertical: 8,
  },

  propertySpecs: {
    color: "#555966",
    fontSize: 9.5,
    fontWeight: "600",
  },

  // ============================================================
  // MASCOT
  // ============================================================

  mascotWrap: {
    position: "absolute",
    left: 0,
    bottom: SCREEN_HEIGHT * 0.015,
    width: SCREEN_WIDTH * 0.43,
    height: SCREEN_HEIGHT * 0.36,
    zIndex: 25,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  mascotImage: {
    width: "100%",
    height: "100%",
    zIndex: 2,
  },

  mascotShadow: {
    position: "absolute",
    bottom: 7,
    width: "54%",
    height: 10,
    borderRadius: 999,
    backgroundColor: "rgba(28, 20, 15, 0.19)",
    transform: [{ scaleX: 1.15 }],
    zIndex: 1,
  },

  // ============================================================
  // FOOTER
  // ============================================================

  footerPill: {
    position: "absolute",
    bottom: SCREEN_HEIGHT * 0.025,
    left: SCREEN_WIDTH * 0.17,
    right: SCREEN_WIDTH * 0.17,
    minHeight: 36,
    paddingHorizontal: 15,
    borderRadius: 18,
    backgroundColor: "rgba(22, 31, 50, 0.72)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 18,
  },

  footerText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
  },
});

export default Index;