import { useSaveNotificationTokenMutation } from "@/store/api/user/MainApi";
import { registerForPushNotificationsAsync } from "@/store/Notification/usePushNotification";
import { Onboarding } from "@/store/slices/selector/OnBoarding";
import { userdata } from "@/store/slices/selector/user";
import { useAppSelector } from "@src/hooks/useReduxHooks";

import AgentImage from "@assets/splash/ca/agent.png";
import BuilderImage from "@assets/splash/ca/builder.png";
import HousePhone from "@assets/splash/ca/ca-house-phone.png";
import CaLogo from "@assets/splash/ca/ca-logo.png";
import HomePinLogo from "@assets/splash/ca/home-pin-logo.png";
import MapleLeaf from "@assets/splash/ca/maple-leaf.png";
import MortgageImage from "@assets/splash/ca/mortgage.png";
import NewHomesImage from "@assets/splash/ca/new-homes.png";

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
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

const SPLASH_DURATION = 6000;
const SEARCH_TEXT = "Search homes in Canada";

type ServiceCardProps = {
  image: ImageSourcePropType;
  title: string;
  subtitle?: string;
  side: "left" | "right";
  top: number;
  delay: number;
  width?: number;
};

const ServiceCard = ({
  image,
  title,
  subtitle,
  side,
  top,
  delay,
  width = SCREEN_WIDTH * 0.39,
}: ServiceCardProps) => {
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(side === "left" ? -90 : 90);
  const translateY = useSharedValue(12);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withTiming(1, {
        duration: 300,
      }),
    );

    translateX.value = withDelay(
      delay,
      withTiming(0, {
        duration: 600,
        easing: Easing.out(Easing.back(1.08)),
      }),
    );

    translateY.value = withDelay(
      delay + 350,
      withRepeat(
        withSequence(
          withTiming(-5, {
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(5, {
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
          }),
        ),
        -1,
        true,
      ),
    );
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      {
        translateX: translateX.value,
      },
      {
        translateY: translateY.value,
      },
    ],
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.serviceCard,
        {
          top,
          width,
          ...(side === "left"
            ? {
                left: SCREEN_WIDTH * 0.055,
              }
            : {
                right: SCREEN_WIDTH * 0.055,
              }),
        },
        cardStyle,
      ]}
    >
      <Image
        source={image}
        style={styles.serviceAvatar}
        resizeMode="cover"
      />

      <View style={styles.serviceTextWrap}>
        <Text numberOfLines={2} style={styles.serviceTitle}>
          {title}
        </Text>

        {subtitle ? (
          <Text
            numberOfLines={1}
            style={styles.serviceSubtitle}
          >
            {subtitle}
          </Text>
        ) : (
          <Text style={styles.stars}>
            ★★★★★
          </Text>
        )}
      </View>

      <Text style={styles.chevron}>
        ›
      </Text>
    </Animated.View>
  );
};

type LeafProps = {
  startX: number;
  size: number;
  delay: number;
  duration: number;
  rotate: number;
};

const FallingLeaf = ({
  startX,
  size,
  delay,
  duration,
  rotate,
}: LeafProps) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration,
          easing: Easing.linear,
        }),
        -1,
        false,
      ),
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      progress.value,
      [0, 0.1, 0.85, 1],
      [0, 1, 1, 0],
    ),

    transform: [
      {
        translateY: interpolate(
          progress.value,
          [0, 1],
          [-size * 2, SCREEN_HEIGHT + size * 2],
        ),
      },
      {
        translateX: interpolate(
          progress.value,
          [0, 0.5, 1],
          [0, 18, -12],
        ),
      },
      {
        rotate: `${rotate + progress.value * 220}deg`,
      },
    ],
  }));

  return (
    <Animated.Image
      source={MapleLeaf}
      resizeMode="contain"
      style={[
        {
          position: "absolute",
          left: startX,
          top: 0,
          width: size,
          height: size,
          zIndex: 7,
        },
        animatedStyle,
      ]}
    />
  );
};

const Index = () => {
  const router = useRouter();

  const user = useAppSelector(userdata);
  const isOnboarding = useAppSelector(Onboarding);

  const [saveUserToken] =
    useSaveNotificationTokenMutation();

  const latestUserId = useRef(user?.id);
  const latestOnboarding = useRef(
    isOnboarding?.isOnboarding,
  );

  const [typedSearch, setTypedSearch] =
    useState("");

  // ============================================================
  // BACKGROUND
  // ============================================================

  const backgroundScale =
    useSharedValue(1.08);

  const backgroundY =
    useSharedValue(0);

  // ============================================================
  // LOGO
  // ============================================================

  const logoOpacity =
    useSharedValue(0);

  const logoY =
    useSharedValue(-80);

  const logoScale =
    useSharedValue(0.88);

  // ============================================================
  // HEADLINE
  // ============================================================

  const headlineOpacity =
    useSharedValue(0);

  const headlineY =
    useSharedValue(30);

  // ============================================================
  // HOUSE / PHONE
  // ============================================================

  const heroOpacity =
    useSharedValue(0);

  const heroY =
    useSharedValue(150);

  const heroScale =
    useSharedValue(0.88);

  const heroFloat =
    useSharedValue(0);

  // ============================================================
  // LOCATION PIN
  // ============================================================

  const pinOpacity =
    useSharedValue(0);

  const pinScale =
    useSharedValue(0.5);

  const pinPulse =
    useSharedValue(1);

  // ============================================================
  // SEARCH
  // ============================================================

  const searchOpacity =
    useSharedValue(0);

  const searchY =
    useSharedValue(45);

  // ============================================================
  // PROGRESS
  // ============================================================

  const progress =
    useSharedValue(0);

  // ============================================================
  // FOOTER
  // ============================================================

  const footerOpacity =
    useSharedValue(0);

  // ============================================================
  // KEEP LATEST AUTH STATE
  // ============================================================

  useEffect(() => {
    latestUserId.current = user?.id;
  }, [user?.id]);

  useEffect(() => {
    latestOnboarding.current =
      isOnboarding?.isOnboarding;
  }, [isOnboarding?.isOnboarding]);

  // ============================================================
  // MAIN SPLASH ANIMATION
  // ============================================================

  useEffect(() => {
    // Background cinematic zoom.
    backgroundScale.value =
      withTiming(1, {
        duration: SPLASH_DURATION,
        easing: Easing.out(Easing.ease),
      });

    // Small vertical parallax movement.
    backgroundY.value =
      withRepeat(
        withSequence(
          withTiming(-8, {
            duration: 2600,
            easing:
              Easing.inOut(Easing.ease),
          }),

          withTiming(8, {
            duration: 2600,
            easing:
              Easing.inOut(Easing.ease),
          }),
        ),
        -1,
        true,
      );

    // Logo.
    logoOpacity.value =
      withDelay(
        100,
        withTiming(1, {
          duration: 350,
        }),
      );

    logoY.value =
      withDelay(
        100,
        withTiming(0, {
          duration: 700,
          easing:
            Easing.out(
              Easing.back(1.12),
            ),
        }),
      );

    logoScale.value =
      withDelay(
        100,
        withSequence(
          withTiming(1.04, {
            duration: 500,
          }),

          withTiming(1, {
            duration: 180,
          }),
        ),
      );

    // Headline.
    headlineOpacity.value =
      withDelay(
        650,
        withTiming(1, {
          duration: 400,
        }),
      );

    headlineY.value =
      withDelay(
        650,
        withTiming(0, {
          duration: 650,
          easing:
            Easing.out(
              Easing.cubic,
            ),
        }),
      );

    // House + phone.
    heroOpacity.value =
      withDelay(
        1200,
        withTiming(1, {
          duration: 420,
        }),
      );

    heroY.value =
      withDelay(
        1200,
        withTiming(0, {
          duration: 850,
          easing:
            Easing.out(
              Easing.back(1.08),
            ),
        }),
      );

    heroScale.value =
      withDelay(
        1200,
        withTiming(1, {
          duration: 850,
          easing:
            Easing.out(
              Easing.ease,
            ),
        }),
      );

    // Subtle house floating animation.
    heroFloat.value =
      withDelay(
        2200,
        withRepeat(
          withSequence(
            withTiming(-6, {
              duration: 1500,
              easing:
                Easing.inOut(
                  Easing.ease,
                ),
            }),

            withTiming(4, {
              duration: 1500,
              easing:
                Easing.inOut(
                  Easing.ease,
                ),
            }),
          ),
          -1,
          true,
        ),
      );

    // Center location pin.
    pinOpacity.value =
      withDelay(
        1650,
        withTiming(1, {
          duration: 260,
        }),
      );

    pinScale.value =
      withDelay(
        1650,
        withSequence(
          withTiming(1.15, {
            duration: 420,
            easing:
              Easing.out(
                Easing.back(1.4),
              ),
          }),

          withTiming(1, {
            duration: 180,
          }),
        ),
      );

    // Continuous pulse.
    pinPulse.value =
      withDelay(
        2200,
        withRepeat(
          withSequence(
            withTiming(1.12, {
              duration: 650,
            }),

            withTiming(1, {
              duration: 650,
            }),
          ),
          -1,
          true,
        ),
      );

    // Search bar.
    searchOpacity.value =
      withDelay(
        3000,
        withTiming(1, {
          duration: 300,
        }),
      );

    searchY.value =
      withDelay(
        3000,
        withTiming(0, {
          duration: 500,
          easing:
            Easing.out(
              Easing.cubic,
            ),
        }),
      );

    // Bottom loading bar.
    progress.value =
      withDelay(
        600,
        withTiming(1, {
          duration:
            SPLASH_DURATION - 900,
          easing:
            Easing.linear,
        }),
      );

    footerOpacity.value =
      withDelay(
        4400,
        withTiming(1, {
          duration: 450,
        }),
      );

    // Existing route logic preserved.
    const routeTimer =
      setTimeout(() => {
        if (latestUserId.current) {
          router.replace(
            "/(main)/Home",
          );

          return;
        }

        if (
          latestOnboarding.current
        ) {
          router.replace(
            "/(auth)/signin",
          );

          return;
        }

        router.replace(
          "/(auth)/welcome",
        );
      }, SPLASH_DURATION);

    return () => {
      clearTimeout(routeTimer);
    };
  }, []);

  // ============================================================
  // SEARCH TYPEWRITER
  // ============================================================

  useEffect(() => {
    let interval:
      | ReturnType<
          typeof setInterval
        >
      | undefined;

    const timer =
      setTimeout(() => {
        let index = 0;

        interval =
          setInterval(() => {
            index += 1;

            setTypedSearch(
              SEARCH_TEXT.slice(
                0,
                index,
              ),
            );

            if (
              index >=
                SEARCH_TEXT.length &&
              interval
            ) {
              clearInterval(
                interval,
              );
            }
          }, 48);
      }, 3200);

    return () => {
      clearTimeout(timer);

      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  // ============================================================
  // ANIMATED STYLES
  // ============================================================

  const backgroundStyle =
    useAnimatedStyle(() => ({
      transform: [
        {
          translateY:
            backgroundY.value,
        },
        {
          scale:
            backgroundScale.value,
        },
      ],
    }));

  const logoStyle =
    useAnimatedStyle(() => ({
      opacity:
        logoOpacity.value,

      transform: [
        {
          translateY:
            logoY.value,
        },
        {
          scale:
            logoScale.value,
        },
      ],
    }));

  const headlineStyle =
    useAnimatedStyle(() => ({
      opacity:
        headlineOpacity.value,

      transform: [
        {
          translateY:
            headlineY.value,
        },
      ],
    }));

  const heroStyle =
    useAnimatedStyle(() => ({
      opacity:
        heroOpacity.value,

      transform: [
        {
          translateY:
            heroY.value +
            heroFloat.value,
        },
        {
          scale:
            heroScale.value,
        },
      ],
    }));

  const pinStyle =
    useAnimatedStyle(() => ({
      opacity:
        pinOpacity.value,

      transform: [
        {
          scale:
            pinScale.value *
            pinPulse.value,
        },
      ],
    }));

  const searchStyle =
    useAnimatedStyle(() => ({
      opacity:
        searchOpacity.value,

      transform: [
        {
          translateY:
            searchY.value,
        },
      ],
    }));

  const progressStyle =
    useAnimatedStyle(() => ({
      width: `${
        progress.value * 100
      }%`,
    }));

  const footerStyle =
    useAnimatedStyle(() => ({
      opacity:
        footerOpacity.value,
    }));

  // ============================================================
  // PUSH NOTIFICATION TOKEN
  // ============================================================

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const setupPush =
      async () => {
        try {
          const token =
            await registerForPushNotificationsAsync();

          console.log(
            "Expo Token:",
            token,
          );

          if (token) {
            await saveUserToken({
              user_id: user.id,
              expo_token: token,
            }).unwrap();
          }
        } catch (error) {
          console.log(
            "Push setup error:",
            error,
          );
        }
      };

    setupPush();
  }, [
    user?.id,
    saveUserToken,
  ]);

  // ============================================================
  // NOTIFICATION CLICK
  // ============================================================

  useEffect(() => {
    const subscription =
      Notifications.addNotificationResponseReceivedListener(
        (response) => {
          const data =
            response.notification
              .request.content.data;

          console.log(
            "Notification Clicked:",
            data,
          );

          if (data) {
            setTimeout(() => {
              router.replace(
                "/(auth)/CreateNewpass",
              );
            }, 800);
          }
        },
      );

    return () => {
      subscription.remove();
    };
  }, [router]);

  // ============================================================
  // UI
  // ============================================================

  return (
    <View style={styles.container}>
      {/* ===================================================== */}
      {/* BACKGROUND */}
      {/* ===================================================== */}

      
      <View
        pointerEvents="none"
        style={styles.softOverlay}
      />

      {/* ===================================================== */}
      {/* FALLING MAPLE LEAVES */}
      {/* ===================================================== */}

      <FallingLeaf
        startX={
          SCREEN_WIDTH * 0.02
        }
        size={34}
        delay={200}
        duration={5600}
        rotate={-20}
      />

      <FallingLeaf
        startX={
          SCREEN_WIDTH * 0.77
        }
        size={27}
        delay={1100}
        duration={6500}
        rotate={25}
      />

      <FallingLeaf
        startX={
          SCREEN_WIDTH * 0.88
        }
        size={42}
        delay={2400}
        duration={7200}
        rotate={45}
      />

      <FallingLeaf
        startX={
          SCREEN_WIDTH * 0.18
        }
        size={24}
        delay={3200}
        duration={6100}
        rotate={10}
      />

      {/* ===================================================== */}
      {/* BRAND LOGO */}
      {/* ===================================================== */}

      <Animated.Image
        source={CaLogo}
        resizeMode="contain"
        style={[
          styles.logo,
          logoStyle,
        ]}
      />

      {/* ===================================================== */}
      {/* HEADLINE */}
      {/* ===================================================== */}

      <Animated.View
        pointerEvents="none"
        style={[
          styles.headlineWrap,
          headlineStyle,
        ]}
      >
        <Text
          style={styles.headline}
        >
          Find. Connect.
        </Text>

        <View
          style={
            styles.headlineSecondRow
          }
        >
          <Text
            style={
              styles.headline
            }
          >
            Move Forward.
          </Text>

          <Text
            style={
              styles.mapleText
            }
          >
            🍁
          </Text>
        </View>

        <View
          style={
            styles.redStroke
          }
        />

        <Text
          style={
            styles.supportingText
          }
        >
          A smarter, simpler
          way to{"\n"}
          find your place in
          Canada.
        </Text>
      </Animated.View>

      {/* ===================================================== */}
      {/* SERVICE CARDS */}
      {/* ===================================================== */}

      <ServiceCard
        image={AgentImage}
        title="Find Agents"
        side="left"
        top={
          SCREEN_HEIGHT *
          0.435
        }
        delay={2100}
      />

      <ServiceCard
        image={BuilderImage}
        title="Connect with Builders"
        side="right"
        top={
          SCREEN_HEIGHT *
          0.455
        }
        delay={2300}
      />

      <ServiceCard
        image={MortgageImage}
        title="Get Mortgage Advice"
        side="left"
        top={
          SCREEN_HEIGHT *
          0.555
        }
        delay={2500}
        width={
          SCREEN_WIDTH *
          0.42
        }
      />

      <ServiceCard
        image={NewHomesImage}
        title="Discover New Homes"
        subtitle="Explore listings"
        side="right"
        top={
          SCREEN_HEIGHT *
          0.575
        }
        delay={2700}
        width={
          SCREEN_WIDTH *
          0.43
        }
      />

      {/* ===================================================== */}
      {/* HOUSE + PHONE */}
      {/* ===================================================== */}

      <Animated.Image
        source={HousePhone}
        resizeMode="contain"
        style={[
          styles.heroImage,
          heroStyle,
        ]}
      />

      {/* ===================================================== */}
      {/* CENTER LOCATION PIN */}
      {/* ===================================================== */}

      <Animated.View
        pointerEvents="none"
        style={[
          styles.locationPin,
          pinStyle,
        ]}
      >
        <View
          style={
            styles.pinCircle
          }
        >
          <Image
            source={HomePinLogo}
            resizeMode="contain"
            style={
              styles.pinLogoImage
            }
          />
        </View>

        <View
          style={styles.pinTip}
        />
      </Animated.View>

      {/* ===================================================== */}
      {/* SEARCH BAR */}
      {/* ===================================================== */}

      <Animated.View
        pointerEvents="none"
        style={[
          styles.searchBar,
          searchStyle,
        ]}
      >
        <View
          style={
            styles.searchIcon
          }
        >
          <View
            style={
              styles.searchCircle
            }
          />

          <View
            style={
              styles.searchHandle
            }
          />
        </View>

        <Text
          numberOfLines={1}
          style={
            styles.searchText
          }
        >
          {typedSearch}

          {typedSearch.length <
          SEARCH_TEXT.length
            ? "|"
            : ""}
        </Text>

        <View
          style={
            styles.filterWrap
          }
        >
          <View
            style={
              styles.filterLine
            }
          />

          <View
            style={[
              styles.filterLine,
              {
                width: 18,
              },
            ]}
          />

          <View
            style={[
              styles.filterLine,
              {
                width: 12,
              },
            ]}
          />
        </View>
      </Animated.View>

      {/* ===================================================== */}
      {/* PROGRESS */}
      {/* ===================================================== */}

      <View
        pointerEvents="none"
        style={
          styles.progressTrack
        }
      >
        <Animated.View
          style={[
            styles.progressFill,
            progressStyle,
          ]}
        />
      </View>

      {/* ===================================================== */}
      {/* FOOTER */}
      {/* ===================================================== */}

      <Animated.View
        pointerEvents="none"
        style={[
          styles.footerWrap,
          footerStyle,
        ]}
      >
        <Text
          style={
            styles.footerText
          }
        >
          A BETTER PLACE TO CALL
          HOME
        </Text>

        <Text
          style={
            styles.footerLeaf
          }
        >
          🍁
        </Text>
      </Animated.View>
    </View>
  );
};

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#EEF3F8",
      overflow: "hidden",
    },

    // ==========================================================
    // BACKGROUND
    // ==========================================================

    background: {
      ...StyleSheet.absoluteFillObject,

      width: SCREEN_WIDTH,

      height:
        SCREEN_HEIGHT + 20,
    },

    softOverlay: {
      ...StyleSheet.absoluteFillObject,

      backgroundColor:
        "rgba(255,255,255,0.04)",
    },

    // ==========================================================
    // LOGO
    // ==========================================================

    logo: {
      position: "absolute",

      top:
        SCREEN_HEIGHT *
        0.045,

      alignSelf: "center",

      width:
        SCREEN_WIDTH *
        0.48,

      height:
        SCREEN_HEIGHT *
        0.14,

      zIndex: 20,
    },

    // ==========================================================
    // HEADLINE
    // ==========================================================

    headlineWrap: {
      position: "absolute",

      top:
        SCREEN_HEIGHT *
        0.185,

      left:
        SCREEN_WIDTH *
        0.08,

      right:
        SCREEN_WIDTH *
        0.08,

      zIndex: 20,

      alignItems: "center",
    },

    headline: {
      color: "#111827",

      fontSize:
        Math.max(
          29,
          SCREEN_WIDTH *
            0.078,
        ),

      lineHeight:
        Math.max(
          34,
          SCREEN_WIDTH *
            0.09,
        ),

      fontWeight: "700",

      fontStyle: "italic",

      letterSpacing: -1.4,

      textAlign: "center",

      textShadowColor:
        "rgba(255,255,255,0.82)",

      textShadowOffset: {
        width: 0,
        height: 2,
      },

      textShadowRadius: 10,
    },

    headlineSecondRow: {
      flexDirection: "row",

      alignItems: "center",

      justifyContent:
        "center",
    },

    mapleText: {
      fontSize: 27,

      marginLeft: 7,
    },

    redStroke: {
      marginTop: 4,

      width:
        SCREEN_WIDTH *
        0.25,

      height: 4,

      borderRadius: 99,

      backgroundColor:
        "#E21D2B",

      transform: [
        {
          rotate: "-7deg",
        },
      ],
    },

    supportingText: {
      marginTop: 15,

      color: "#202737",

      fontSize: 14,

      lineHeight: 20,

      fontWeight: "600",

      textAlign: "center",
    },

    // ==========================================================
    // SERVICE CARDS
    // ==========================================================

    serviceCard: {
      position: "absolute",

      minHeight: 66,

      borderRadius: 20,

      paddingHorizontal: 9,

      paddingVertical: 8,

      flexDirection: "row",

      alignItems: "center",

      backgroundColor:
        "rgba(255,255,255,0.92)",

      borderWidth: 1,

      borderColor:
        "rgba(255,255,255,0.92)",

      zIndex: 25,

      shadowColor:
        "#13233A",

      shadowOffset: {
        width: 0,
        height: 7,
      },

      shadowOpacity: 0.14,

      shadowRadius: 12,

      elevation: 8,
    },

    serviceAvatar: {
      width: 48,

      height: 48,

      borderRadius: 24,

      backgroundColor:
        "#E8EDF3",
    },

    serviceTextWrap: {
      flex: 1,

      marginLeft: 9,
    },

    serviceTitle: {
      color: "#151B26",

      fontSize: 11.8,

      lineHeight: 14,

      fontWeight: "800",
    },

    serviceSubtitle: {
      marginTop: 3,

      color: "#707784",

      fontSize: 9.5,

      fontWeight: "600",
    },

    stars: {
      marginTop: 2,

      color: "#FFB800",

      fontSize: 10,

      letterSpacing: -0.5,
    },

    chevron: {
      color: "#111827",

      fontSize: 27,

      lineHeight: 29,

      marginLeft: 3,
    },

    // ==========================================================
    // HOUSE + PHONE
    // ==========================================================

    heroImage: {
      position: "absolute",

      width:
        SCREEN_WIDTH *
        1.02,

      height:
        SCREEN_HEIGHT *
        0.42,

      alignSelf: "center",

      bottom:
        SCREEN_HEIGHT *
        0.095,

      zIndex: 14,
    },

    // ==========================================================
    // LOCATION PIN
    // ==========================================================

    locationPin: {
      position: "absolute",

      top:
        SCREEN_HEIGHT *
        0.495,

      alignSelf: "center",

      width: 66,

      height: 80,

      zIndex: 30,

      alignItems: "center",
    },

    pinCircle: {
      width: 62,

      height: 62,

      borderRadius: 31,

      backgroundColor:
        "#A71864",

      alignItems: "center",

      justifyContent:
        "center",

      borderWidth: 4,

      borderColor:
        "#FFFFFF",

      shadowColor:
        "#D72867",

      shadowOffset: {
        width: 0,
        height: 4,
      },

      shadowOpacity: 0.38,

      shadowRadius: 12,

      elevation: 10,

      overflow: "hidden",
    },

    pinLogoImage: {
      width: 54,

      height: 54,
    },

    pinTip: {
      position: "absolute",

      bottom: 5,

      width: 24,

      height: 24,

      backgroundColor:
        "#A71864",

      transform: [
        {
          rotate: "45deg",
        },
      ],

      borderBottomRightRadius: 4,

      zIndex: -1,
    },

    // ==========================================================
    // SEARCH
    // ==========================================================

    searchBar: {
      position: "absolute",

      left:
        SCREEN_WIDTH *
        0.14,

      right:
        SCREEN_WIDTH *
        0.14,

      bottom:
        SCREEN_HEIGHT *
        0.175,

      height: 50,

      borderRadius: 25,

      backgroundColor:
        "rgba(255,255,255,0.96)",

      flexDirection: "row",

      alignItems: "center",

      paddingHorizontal: 15,

      zIndex: 31,

      shadowColor:
        "#263A52",

      shadowOffset: {
        width: 0,
        height: 6,
      },

      shadowOpacity: 0.15,

      shadowRadius: 10,

      elevation: 8,
    },

    searchIcon: {
      width: 24,

      height: 24,

      marginRight: 8,
    },

    searchCircle: {
      position: "absolute",

      left: 1,

      top: 1,

      width: 15,

      height: 15,

      borderRadius: 8,

      borderWidth: 2.2,

      borderColor:
        "#153A70",
    },

    searchHandle: {
      position: "absolute",

      left: 14,

      top: 15,

      width: 9,

      height: 2.2,

      borderRadius: 2,

      backgroundColor:
        "#153A70",

      transform: [
        {
          rotate: "45deg",
        },
      ],
    },

    searchText: {
      flex: 1,

      color: "#737A8D",

      fontSize: 12.5,

      fontWeight: "600",
    },

    filterWrap: {
      width: 25,

      alignItems:
        "flex-end",

      gap: 3,
    },

    filterLine: {
      width: 23,

      height: 2,

      borderRadius: 10,

      backgroundColor:
        "#153A70",
    },

    // ==========================================================
    // PROGRESS
    // ==========================================================

    progressTrack: {
      position: "absolute",

      bottom:
        SCREEN_HEIGHT *
        0.073,

      alignSelf: "center",

      width:
        SCREEN_WIDTH *
        0.32,

      height: 7,

      borderRadius: 99,

      backgroundColor:
        "rgba(211,41,104,0.22)",

      overflow: "hidden",

      zIndex: 40,
    },

    progressFill: {
      height: "100%",

      borderRadius: 99,

      backgroundColor:
        "#C61665",
    },

    // ==========================================================
    // FOOTER
    // ==========================================================

    footerWrap: {
      position: "absolute",

      bottom:
        SCREEN_HEIGHT *
        0.027,

      left: 0,

      right: 0,

      flexDirection: "row",

      alignItems: "center",

      justifyContent:
        "center",

      zIndex: 40,
    },

    footerText: {
      color: "#1D2533",

      fontSize: 9.5,

      fontWeight: "700",

      letterSpacing: 3.2,
    },

    footerLeaf: {
      marginLeft: 8,

      fontSize: 16,
    },
  });

export default Index;