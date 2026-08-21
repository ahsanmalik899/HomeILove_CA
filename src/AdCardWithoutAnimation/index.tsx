import { hs, ms, vs } from "@utils/design/design";
import { ImageFormater } from "@utils/ImageFormat";
import * as WebBrowser from "expo-web-browser";
import { Image, Text, TouchableOpacity, View } from "react-native";

export const AdCardWithoutAnimation = ({ ad ,isSqure=false}: { ad: any,isSqure?:boolean }) => {

  const openLink = async () => {
    if (ad?.ad_link) {
      const finalUrl = ad.ad_link.startsWith("http")
        ? ad.ad_link
        : `https://${ad.ad_link}`;

      await WebBrowser.openBrowserAsync(finalUrl);
    }
  };

  return (
    <View
      style={{
        marginHorizontal: hs(10),
        marginVertical: vs(10),
        borderRadius: ms(16),
        overflow: "hidden",
        backgroundColor: "#fff",

        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
      }}
    >
      <TouchableOpacity  activeOpacity={1} onPress={openLink}>
        <Image
      source={{
    uri:
      ad?.business_cover?.uri ||
      (typeof ad?.ad_image === "string"
        ? ImageFormater(ad.ad_image)
        : ad?.ad_image?.uri),
  }}
          style={{
            height: isSqure? vs(200) : vs(80),
            width: "100%",
          }}
          resizeMode="contain"
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
    </View>
  );
};