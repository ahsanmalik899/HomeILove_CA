import { hs, ms, vs } from "@utils/design/design";
import { ImageFormater } from "@utils/ImageFormat";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useRef } from "react";
import { Animated, Easing, Image, Text, TouchableOpacity, View } from "react-native";

export const AdCard = ({ ad }) => {
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // scale in animation
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    // floating 3D rotation loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: -1,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-3deg", "3deg"],
  });

  const openLink = async () => {
    if (ad?.ad_link) {
      const finalUrl = ad.ad_link.startsWith("http")
        ? ad.ad_link
        : `https://${ad.ad_link}`;

      await WebBrowser.openBrowserAsync(finalUrl);
    }
  };

  return (
    <Animated.View
      style={{
        marginHorizontal: hs(50),
        marginVertical: vs(10),
        borderRadius: ms(16),
        overflow: "hidden",
        backgroundColor: "#fff",

        // shadow (3D effect)
        elevation: 10,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },

        transform: [
          { scale: scaleAnim },
          { rotateZ: rotate },
        ],
      }}
    >
      <TouchableOpacity activeOpacity={0.9} onPress={openLink}>
        <Image
          source={{ uri: ImageFormater(ad?.ad_image) }}
          style={{
            height: vs(130),
            width: "100%",
          }}
          resizeMode="cover"
        />

        <View style={{ padding: ms(10) }}>
          <Text style={{ fontSize: ms(11), color: "#888" }}>
            Sponsored 
          </Text>

          {ad?.ad_link && (
            <Text
              numberOfLines={1}
              style={{
                fontSize: ms(13),
                color: "#333",
                marginTop: vs(4),
              }}
            >
              {ad.ad_link}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};