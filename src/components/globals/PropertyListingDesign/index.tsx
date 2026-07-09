import {
  useSaveItemApiMutation,
  useUnsaveItemApiMutation
} from "@/store/api/user/MainApi";
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
import { AdCardWithoutAnimation } from "@src/AdCardWithoutAnimation";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { hs, ms, vs } from "@utils/design/design";
import { ImageFormater } from "@utils/ImageFormat";
import { makeCall } from "@utils/makeCall";
import { formatPrice } from "@utils/PriceFormater";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AddSingleView from "../AddSingleView";
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
  refetch,
  initialLoadDone,
  isSingleView,
  post_id,
  post_type,
}: postDataType) => {
  const [showImages, setShowImages] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const[singlePost,setSinglePost]=useState<any>(null);
  const[singleView,setSingleView]=useState(false);
  const user = useAppSelector(userdata);
  const listRef = useRef<any>(null);
  const [imageNo, setImageNo] = useState(0);
  const insets = useSafeAreaInsets();
  const [saveItemApi] = useSaveItemApiMutation();
  const [unsaveItemApi] = useUnsaveItemApiMutation();

  useEffect(() => {
    if (isSingleView) {
      setSingleView(true);
      setSinglePost({     type: post_type,
                id: post_id});
    }
  }, [isSingleView]);


  const [scrollable, setscrollable] = useState(true);

  const renderItem = ({ item }) => {
    const itemId = item?.data?.post_property_id || item?.data?.post_community_id;
    const [isSaved,setIsSaved]=useState(item?.data?.is_saved ?? false);
 const [expanded, setExpanded] = useState(false);
    const toggleSave = async () => {
     
      try {
        if (isSaved) {
          await unsaveItemApi({
            saved_id: itemId,
            user_id: user.id,
            type: item?.data?.property_for || "sale",
          }).unwrap();
        } else {
          await saveItemApi({
            saved_id: itemId,
            user_id: user.id,
            type: item?.data?.property_for || "sale",
          }).unwrap();
        }
      } catch (error) {
        console.log("Error saving/unsaving item:", error);

      } finally {
        setIsSaved((prev) => !prev);
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
      {item.type==="ad"?(<AdCardWithoutAnimation ad={item.data} />):    (    <TouchableOpacity
         onPress={() => {
            setSingleView(true);
           setSinglePost({     type: item?.data?.property_for,
                id: item?.data?.post_property_id});
          }}
        
        >
          <View className="bg-white" style={styles.card}>
            <View
              className="flex-row justify-between items-center"
              style={{
                backgroundColor:
                  item?.data?.post_type === "Trending"
                    ? Colors.light.LightGreen
                    : Colors.light.lightGray,
                paddingHorizontal: hs(10),
                paddingVertical: vs(10),
                borderRadius: ms(10),
                marginBottom: vs(10),
              }}
            >
              <Text
                style={{
                  color:
                    item?.data?.post_type === "Trending"
                      ? Colors.light.DarkGreen
                      : "black",
                  fontWeight: 700,
                  fontSize: ms(20),
                  fontFamily: "PopinRegular",
                }}
              >
                $ {formatPrice(item?.data?.asking_price)}
                {item?.data?.property_for === "rent" && (
                  <Text
                    style={{
                      color: Colors.light.red,
                      fontSize: ms(18),
                      fontFamily: "PopinRegular",
                    }}
                  >
                    /{item?.data?.rent_type}
                  </Text>
                )}
              </Text>
              {item?.data?.post_type === "Trending" && (
                <Text
                  style={{
                    fontWeight: 600,
                    color: Colors.light.DarkGreen,
                    fontFamily: "PopinRegular",
                  }}
                >
                  Trending
                </Text>
              )}
            </View>

            <Text
              style={{
                color: "black",
                fontWeight: 700,
                fontSize: ms(15),
                fontFamily: "PopinRegular",
              }}
            >
              {item?.data?.bedrooms} bedrooms {item?.data?.property_sub_type} for{" "}
              {item?.data?.property_for}
            </Text>
            <Text
              style={{
                color: Colors.light.textGray,
                marginTop: vs(5),
                fontFamily: "PopinRegular",
              }}
            >
              {item?.data?.address}
            </Text>
            <View
              style={{
                height: vs(1),
                marginTop: vs(5),

                backgroundColor: Colors.light.textGray,
                opacity: 0.2,
              }}
            />
            <View>
              <View style={{ marginTop: vs(5) }}>
                {item?.data?.post_type === "Trending" &&
                  facts &&
                  facts
                    .split(",", 4)
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
                              fontWeight: "500",
                              width: hs(250),
                              fontFamily: "PopinRegular",
                            }}
                          >
                            {fact.trim()}
                          </Text>
                        </View>
                      </View>
                    ))}
              </View>
        {item?.data?.property_details && (
              <Text style={styles.description}>
                {expanded
                  ? item?.data?.property_details
                  : item?.data?.property_details?.slice(0, 70) +
                    (item?.data?.property_details?.length > 70 ? "..." : "")}

                {item?.data?.property_details?.length > 70 && (
                  <Text
                    style={styles.moreText}
                    onPress={() => {
                      console.log(expanded,"expanded")
                      setExpanded(expanded ? false : true)}}>
                    {expanded ? " Show Less" : " Read More"}
                  </Text>
                )}
              </Text>)}

              <TouchableOpacity
                onPress={() => {
                  setSelectedImages(item?.data?.images || []);
                  setShowImages(true);
                  setscrollable(false);
                }}
              >
                <Image
                  source={
                    item?.data?.images && item?.data?.images?.length > 0
                      ? { uri: ImageFormater(item?.data?.images[0]) }
                      : NoImage
                  }
                  style={{
                    height: vs(250),
                    width: hs(350),
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
                    <Text
                      style={{
                        color: "white",
                        fontWeight: 600,
                        fontFamily: "PopinRegular",
                      }}
                    >
                      {" "}
                      {item?.data?.images ? item?.data?.images?.length : 0}
                    </Text>
                  </View>
                  {item?.data?.saleprice_type === "Reduced Price" && (
                    <Text
                      style={{
                        backgroundColor: "rgba(241, 28, 28, 0.41)",
                        paddingHorizontal: hs(8),
                        paddingVertical: vs(8),
                        color: "white",
                        fontWeight: 600,
                        borderRadius: ms(10),
                        fontFamily: "PopinRegular",
                      }}
                    >
                      {item?.data?.saleprice_type}
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
                  {item?.data?.property_condition === "Newly build" && (
                    <Text
                      style={{
                        backgroundColor: "rgba(241, 28, 28, 0.41)",
                        paddingHorizontal: hs(8),
                        paddingVertical: vs(8),
                        color: "white",
                        fontWeight: 600,
                        borderRadius: ms(10),
                        fontFamily: "PopinRegular",
                      }}
                    >
                      {item?.data?.property_condition}
                    </Text>
                  )}
                  <TouchableOpacity
                    style={{ marginLeft: "auto" }}
                    onPress={toggleSave}
                  >
                    { isSaved ? (
                      <RedHeart />
                    ) : (
                      <UnSelecteHeart />
                    )}
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              {item?.data?.post_type === "Trending" && (
                <>
                  <LegendList
                    data={item?.data?.images || []}
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
                  paddingVertical: vs(10),
                  paddingHorizontal: vs(15),
                  marginTop: vs(10),
                }}
              >
                <>
                  <View className="flex-row items-center">
                    <Bed />
                    <Text
                      style={{ marginLeft: vs(5), fontFamily: "PopinRegular" }}
                    >
                      {item?.data?.bedrooms}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Shower />
                    <Text
                      style={{ marginLeft: vs(5), fontFamily: "PopinRegular" }}
                    >
                      {item?.data?.bathrooms}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Area />
                    <Text
                      style={{ marginLeft: vs(5), fontFamily: "PopinRegular" }}
                    >
                      {item?.data?.land_area} sqft
                    </Text>
                  </View>
                </>
              </View>

              <View
                className="flex-row justify-between"
                style={{
                  backgroundColor: Colors.light.lightGray,
                  borderRadius: 8,
                  paddingRight: hs(20),
                  paddingVertical: vs(5),
                  paddingHorizontal: hs(10),
                  marginTop: vs(8),
                }}
              >
                <TouchableOpacity >
                  <Mail />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                  makeCall(item?.data?.posted_by.contact||item?.data?.posted_by.mobile)
                }}>
                  <Call />
                </TouchableOpacity>
                <CircleImage
                  source={
                    item?.data?.posted_by?.logo
                      ? { uri: ImageFormater(item?.data?.posted_by?.logo) }
                      : null
                  }
                  Size={40}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>)}
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
   keyExtractor={(item, index) => (item.type === "ad" ? `ad-${index}` : `${item.data.post_property_id || item.data.post_community_id}-${index}`) }
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
              onRefresh={() => {setPage(1)
              refetch()
              }}

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
       <Modal visible={singleView} animationType="slide" onRequestClose={() => {    setSingleView(false);
    setSinglePost(null);
  }} transparent={true}
                statusBarTranslucent={true}  >
                <AddSingleView id={singlePost?.id} type={singlePost?.type} setshowModel={setSingleView} />
              </Modal>
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
