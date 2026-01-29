import { userdata } from "@/store/slices/selector/user";
import Call from "@assets/Buy/call.svg";
import Mail from "@assets/Buy/email-open.svg";
import RedHeart from "@assets/CreateProfile/heart-red.svg";
import Camera from "@assets/Feedimg/camera.svg";
import UnSelecteHeart from "@assets/Feedimg/unselected_heart.svg";
import Area from "@assets/icons/MypostListing/area.svg";
import Bed from "@assets/icons/MypostListing/bed.svg";
import Shower from "@assets/icons/MypostListing/shower.svg";
import NoImage from "@assets/SideBar/no_images.png";
import { LegendList } from "@legendapp/list";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { hs, ms, vs } from "@utils/design/design";
import { ImageFormater } from "@utils/ImageFormat";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CircleImage from "../CircleImage/CircleImage";
import ImageSlider from "../ImageSlider";
import { postDataType } from "./type";
const YourAdsPostDesign = ({
  data,
  setPage,
  isfetching,
  setposts,
  type,
  hasmore,
}: postDataType) => {
  const [showImages, setShowImages] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const user = useAppSelector(userdata);
  const listRef = useRef<any>(null);
  const [imageNo, setImageNo] = useState(0);
  const insets = useSafeAreaInsets();
  const [scrollable, setscrollable] = useState(true);
  const renderItem = ({ item }) => {
    const [expanded, setExpanded] = useState(false);
    const openslider = (index: number) => {
      setSelectedImages(item.images || []);
      setShowImages(true);
      setscrollable(false);
      setImageNo(index);
    };
      const facts = item.imp_facts ?? item.facts ?? "";
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            router.navigate({
              pathname: "/AddSingleView",
              params: {
                type: type,
                id: item.post_property_id,
              },
            });
          }}
        >
          <View className="bg-white" style={styles.card}>
            <View
              className="flex-row justify-between items-center"
              style={{
                backgroundColor:
                  item.post_type === "Trending"
                    ? Colors.light.LightGreen
                    : "white",
                paddingHorizontal: hs(10),
                paddingVertical: vs(10),
                borderRadius: ms(10),
                marginBottom: item.post_type === "Trending" ? vs(10) : vs(0),
              }}
            >
              <Text
                style={{
                  color:
                    item.post_type === "Trending"
                      ? Colors.light.DarkGreen
                      : "black",
                  fontWeight: 600,
                }}
              >
                $ {item.asking_price}{" "}
                {type === "rent" && (
                  <Text style={{ color: Colors.light.red }}>
                    /{item.rent_type}
                  </Text>
                )}
              </Text>
              {item.post_type === "Trending" && (
                <Text
                  style={{ fontWeight: 600, color: Colors.light.DarkGreen }}
                >
                  Trending
                </Text>
              )}
            </View>

            <Text style={{ color: "black" }}>
              {item.bedrooms} bedrooms {item.property_sub_type} for{" "}
              {item.property_for}
            </Text>
            <Text style={{ color: Colors.light.textGray, marginTop: vs(5) }}>
              {item.address}
            </Text>
            <View>
             {item.post_type === "Trending" && facts && (
  facts
    .split(",")
    .filter(Boolean)
    .map((fact, index) => (
      <View
        key={index}
        style={[
          {
           
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: vs(3),
          },
        ]}
      >
        <View className="flex-row gap-3 items-center">
          <RedHeart height={vs(10)} width={vs(10)} />
          <Text
            style={{
              color: Colors.light.DarkGreen,
              fontSize: ms(15),
              fontWeight: "500",
              width: hs(250),
            }}
          >
            {fact.trim()}
          </Text>
        </View>
      </View>
    ))
)}

              <Text style={styles.description}>
                {expanded
                  ? item.property_details
                  : item.property_details?.slice(0, 70) +
                    (item.property_details?.length > 70 ? "..." : "")}

                {item.property_details?.length > 70 && (
                  <Text
                    style={styles.moreText}
                    onPress={() => setExpanded(expanded ? false : true)}
                  >
                    {expanded ? " Show Less" : " Read More"}
                  </Text>
                )}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setSelectedImages(item.images || []);
                  setShowImages(true);
                  setscrollable(false);
                }}
              >
                <Image
                  source={
                    item.images && item.images.length > 0
                      ? { uri: ImageFormater(item.images[0]) }
                      : NoImage
                  }
                  style={{
                    height: vs(180),
                    width: hs(320),
                    borderRadius: ms(10),
                    resizeMode: "cover",
                    alignSelf: "center",
                    backgroundColor: "gray",
                  }}
                />

                <View
                  style={{
                    position: "absolute",
                    bottom: vs(5),
                    left: hs(10),
                    right: hs(10),
                    alignItems: "center",
                  }}
                  className="flex-row justify-between"
                >
                  <View className="flex-row items-center">
                    <Camera />
                    <Text style={{ color: "white", fontWeight: 600 }}>
                      {" "}
                      {item.images ? item.images.length : 0}
                    </Text>
                  </View>
                  {item.saleprice_type === "Reduced Price" && (
                    <Text
                      style={{
                        backgroundColor: "rgba(241, 28, 28, 0.41)",
                        paddingHorizontal: hs(8),
                        paddingVertical: vs(8),
                        color: "white",
                        fontWeight: 600,
                        borderRadius: ms(10),
                      }}
                    >
                      {item.saleprice_type}
                    </Text>
                  )}
                </View>
                <View
                  style={{
                    position: "absolute",
                    top: vs(5),
                    right: hs(10),
                    left: hs(10),
                    alignItems: "center",
                  }}
                  className="flex-row justify-between"
                >
                  {item.property_condition === "Newly build" && (
                    <Text
                      style={{
                        backgroundColor: "rgba(241, 28, 28, 0.41)",
                        paddingHorizontal: hs(8),
                        paddingVertical: vs(8),
                        color: "white",
                        fontWeight: 600,
                        borderRadius: ms(10),
                      }}
                    >
                      {item.property_condition}
                    </Text>
                  )}
                  <TouchableOpacity style={{ marginLeft: "auto" }}>
                    <UnSelecteHeart />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              {item.post_type==="Trending"&&(
                <>
                 <LegendList
                data={item.images || []}
                horizontal
                className="flex-1"
                keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    className="mt-4 mr-2"
                    onPress={() => {
                      openslider(index);
                    }}
                  >
                    <Image
                      source={{ uri: ImageFormater(item) }}
                      style={{
                        height: vs(80),
                        width: vs(80),
                        borderRadius: ms(10),
                        resizeMode: "cover",
                        backgroundColor: "gray",
                      }}
                    />
                  </TouchableOpacity>
                )}
              />
            
            </>
              )}
             
              <View
                className=" bg-white flex-row  justify-between"
                style={{
                  elevation: 5,
                  borderRadius: 8,
                  paddingRight: hs(20),
                  paddingVertical: vs(5),
                  paddingHorizontal: vs(15),
                  marginTop: vs(10),
                }}
              >
                <>
                  <View className="flex-row items-center">
                    <Bed />
                    <Text style={{ marginLeft: vs(5) }}>{item.bedrooms}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Shower />
                    <Text style={{ marginLeft: vs(5) }}>{item.bathrooms}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Area />
                    <Text style={{ marginLeft: vs(5) }}>
                      {item.land_area} sqft
                    </Text>
                  </View>
                </>
              </View>

              <View
                className="flex-row justify-between"
                style={{
                  backgroundColor: Colors.light.cardgreenLight,
                  borderRadius: 8,
                  paddingRight: hs(20),
                  paddingVertical: vs(5),
                  paddingHorizontal: hs(10),
                  marginTop: vs(8),
                  marginBottom: vs(10),
                }}
              >
                <TouchableOpacity>
                  <Mail />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Call />
                </TouchableOpacity>

                <CircleImage
                  source={{ uri: ImageFormater(item.posted_by.logo) }}
                  Size={35}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <View style={{ flex: 1, marginBottom: insets.bottom }}>
      {!data || (isfetching && data.length === 0) ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : data.length > 0 ? (
        <LegendList
          data={data}
          scrollEnabled={scrollable}
          ref={listRef}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            `${item.post_property_id || item.post_community_id}-${index}`
          }
          onEndReached={() => {
            if (!isfetching && hasmore) setPage((prev) => prev + 1);
          }}
          onEndReachedThreshold={0.8}
          ListFooterComponent={
            isfetching ? <ActivityIndicator size="small" /> : null
          }
          refreshControl={
            <RefreshControl
              refreshing={isfetching}
              onRefresh={() => setPage(1)}
            />
          }
        />
      ) : (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No Data Found
        </Text>
      )}

      {showImages && (
        <ImageSlider
          imageNo={imageNo}
          images={selectedImages}
          setShowImage={(val: boolean) => {
            setShowImages(val);
            setscrollable(true);
          }}
        />
      )}
    </View>
  );
};

export default YourAdsPostDesign;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: hs(10),
    marginVertical: vs(10),
    paddingHorizontal: hs(10),
    paddingVertical: vs(10),
    borderRadius: ms(20),
    elevation: 5,
  },
  name: {
    fontWeight: "bold",
  },
  uperSection: {
    marginLeft: hs(10),
  },
  description: {
    marginVertical: vs(10),
    fontWeight: 500,
  },
  moreText: {
    color: Colors.light.DarkGreen,
    fontWeight: "600",
  },
   card2: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: vs(15),
    paddingHorizontal: hs(15),
    marginTop: vs(10),
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
