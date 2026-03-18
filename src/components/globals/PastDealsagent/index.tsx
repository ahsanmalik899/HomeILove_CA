import {
  useSaveItemApiMutation,
  useUnsaveItemApiMutation,
} from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import Camera from "@assets/Feedimg/camera.svg";
import { LegendList } from "@legendapp/list";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { hs, ms, vs } from "@utils/design/design";
import { ImageFormater } from "@utils/ImageFormat";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
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
const PastDealsagent = ({
  data,
  setPage,
  isfetching,
  setposts,
  type,
  hasmore,
  initialLoadDone,
}: postDataType) => {
  const [showImages, setShowImages] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const user = useAppSelector(userdata);
  const listRef = useRef<any>(null);
  const [imageNo, setImageNo] = useState(0);
  const insets = useSafeAreaInsets();
  const [saveItemApi] = useSaveItemApiMutation();
  const [unsaveItemApi] = useUnsaveItemApiMutation();
  const [savedItems, setSavedItems] = useState<{ [key: number]: boolean }>({});
  const [savingItems, setSavingItems] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const initialSaved: { [key: number]: boolean } = {};
    data.forEach((item) => {
      const id = item.post_property_id || item.post_community_id;
      initialSaved[id] = item.is_saved ?? false;
    });
    setSavedItems(initialSaved);
  }, [data]);

  const [scrollable, setscrollable] = useState(true);
  const renderItem = ({ item }) => {
    const itemId = item.post_property_id || item.post_community_id;
    const isSaved = savedItems[itemId] ?? false;

    const toggleSave = async () => {
      setSavedItems((prev) => ({ ...prev, [itemId]: !isSaved }));
      setSavingItems((prev) => ({ ...prev, [itemId]: true }));

      try {
        if (isSaved) {
          await unsaveItemApi({
            saved_id: itemId,
            user_id: user.id,
            type: item.property_for || "sale",
          }).unwrap();
        } else {
          await saveItemApi({
            saved_id: itemId,
            user_id: user.id,
            type: item.property_for || "sale",
          }).unwrap();
        }
      } catch (error) {
        console.log("Error saving/unsaving item:", error);
        setSavedItems((prev) => ({ ...prev, [itemId]: isSaved }));
      } finally {
        setSavingItems((prev) => ({ ...prev, [itemId]: false }));
      }
    };
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
          className="bg-white"
          style={styles.card}
          onPress={() => {
            router.navigate({
              pathname: "/NewsFeedSingelView",
              params: {
                id: item.id,
                type: item.post_type, // FIX
                post_id: item.id,
              },
            });
          }}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row">
              <CircleImage
                source={{ uri: ImageFormater(item.profile_logo) }}
                Size={40}
              />

              <View style={styles.uperSection}>
                <View className="flex-row">
                  <Text style={styles.name}>{item.ad_by}</Text>
                </View>

                <Text style={{ fontFamily: "PopinRegula" }}>
                  {item.property_for}
                </Text>
              </View>
            </View>
          </View>

          <View>
            <Text style={styles.description}>
              {expanded
                ? item.post_type === "property"
                  ? item.property_details
                  : item.community_details
                : (item.post_type === "property"
                    ? item.property_details?.slice(0, 70)
                    : item.community_details?.slice(0, 70)) +
                  ((item.post_type === "property"
                    ? item.property_details?.length
                    : item.community_details?.length) > 70
                    ? "...."
                    : "")}

              {(item.post_type === "property"
                ? item.property_details?.length
                : item.community_details?.length) > 70 && (
                <Text
                  style={styles.moreText}
                  onPress={() => setExpanded(!expanded)}
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
              style={{ alignSelf: "center" }}
            >
              <Image
                source={
                  item.images?.length > 0
                    ? { uri: ImageFormater(item.images[0]) }
                    : null
                }
                style={{
                  height: vs(200),
                  width: hs(350),
                  borderRadius: ms(12),
                  resizeMode: "cover",
                  backgroundColor: "gray",
                }}
              />

              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: hs(350),
                  backgroundColor: "rgba(0,0,0,0.55)",
                  paddingHorizontal: hs(10),
                  paddingVertical: vs(8),
                  borderBottomLeftRadius: ms(12),
                  borderBottomRightRadius: ms(12),
                }}
                className="flex-row justify-between items-center"
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "600",
                    width: "65%",
                    fontFamily: "PopinRegula",
                  }}
                >
                  {item.post_type === "property"
                    ? item.property_sub_type
                    : item.community_title}
                </Text>

                <Text
                  style={{
                    color: "white",
                    fontWeight: "700",
                    fontFamily: "PopinRegula",
                  }}
                >
                  {item.post_type === "property"
                    ? item.asking_price
                    : item.price1}
                </Text>
              </View>

              <View
                style={{
                  position: "absolute",
                  top: vs(8),
                  left: hs(8),
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  paddingHorizontal: hs(8),
                  paddingVertical: vs(4),
                  borderRadius: ms(20),
                }}
              >
                <Camera />

                <Text
                  style={{
                    color: "white",
                    marginLeft: 4,
                    fontWeight: "600",
                    fontFamily: "PopinRegular",
                  }}
                >
                  {item.images?.length || 0}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <View style={{ flex: 1, marginBottom: insets.bottom }}>
      {!initialLoadDone ? (
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
        <Text
          style={{
            textAlign: "center",
            marginTop: 20,
            fontFamily: "PopinRegular",
          }}
        >
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

export default PastDealsagent;

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
    color: Colors.light.textGray,
    fontFamily: "PopinRegular",
  },
  moreText: {
    color: Colors.light.DarkGreen,
    fontWeight: "600",
    fontFamily: "PopinRegular",
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
