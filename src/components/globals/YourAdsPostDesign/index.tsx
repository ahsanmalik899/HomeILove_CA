import { useDeletePostMutation } from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import CommunitySatatus from "@assets/CreateProfile/construction-house.svg";
import Camera from "@assets/Feedimg/camera.svg";
import Area from "@assets/icons/MypostListing/area.svg";
import Bed from "@assets/icons/MypostListing/bed.svg";
import Delet from "@assets/icons/MypostListing/delet.svg";
import Edit from "@assets/icons/MypostListing/edit.svg";
import Shower from "@assets/icons/MypostListing/shower.svg";
import CommunityType from "@assets/SideBar/commercialGreen.svg";
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
  Alert,
  Image,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CircleImage from "../CircleImage/CircleImage";
import ImageSlider from "../ImageSlider";
import LargeButton from "../LaregeButton";
import Loading from "../Loading";
import { postDataType } from "./type";
const YourAdsPostDesign = ({
  data,
  setPage,
  isfetching,
  type,
  hasmore,
  refetch,
  setpost,
  initialLoadDone,
}: postDataType) => {
  const [showImages, setShowImages] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteType, setDeleteType] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const user = useAppSelector(userdata);
  const listRef = useRef<any>(null);
  const [deletePost, { isLoading }] = useDeletePostMutation();
  const insets = useSafeAreaInsets();
  const [scrollable, setscrollable] = useState(true);
  const handleDelete = async (post, type, postType) => {
    try {
      await deletePost({
        post_id: post.post_property_id || post.post_community_id,
        type: postType,
        delete_type: type,
      });

      refetch();
      setpost((prev) =>
        prev.filter(
          (item) =>
            (item.post_property_id || item.post_community_id) !==
            (post.post_property_id || post.post_community_id)
        )
      );
    } catch (e) {
      console.log(e);
    }
  };
  const renderItem = ({ item }) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <>
        <TouchableOpacity
          onPress={() => {
            router.navigate({
              pathname: "/AddSingleView",
              params: {
                type: type,
                id:
                  type === "community"
                    ? item.post_community_id
                    : item.post_property_id,
              },
            });
          }}
        >
          <View className="bg-white" style={styles.card}>
            <View className="flex-row justify-between items-center">
              {type === "community" ? (
                <Text
                  style={{
                    color: Colors.light.DarkGreen,
                    fontWeight: 600,
                    fontFamily: "PopinRegula",
                  }}
                >
                  From $ {item.price1}
                </Text>
              ) : (
                <Text
                  style={{
                    color: Colors.light.DarkGreen,
                    fontWeight: 600,
                    fontFamily: "PopinRegula",
                  }}
                >
                  $ {item.asking_price}{" "}
                  {type === "rent" && (
                    <Text
                      style={{
                        color: Colors.light.red,
                        fontFamily: "PopinRegula",
                      }}
                    >
                      /{item.rent_type}
                    </Text>
                  )}
                </Text>
              )}
              <View
                className="items-center"
                style={{ height: vs(40), width: hs(80) }}
              >
                <TouchableOpacity
                  className="justify-center"
                  style={{
                    height: vs(30),
                    width: hs(70),
                    backgroundColor: Colors.light.red,
                    borderRadius: 5,
                  }}
                  onPress={() => {}}
                >
                  <Text
                    className=" items-center text-white text-center"
                    style={{ fontFamily: "PopinRegula" }}
                  >
                    {type === "community" ? item.post_status : item.status}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {type === "community" ? (
              <Text
                style={{
                  color: Colors.light.textGray,
                  fontFamily: "PopinRegula",
                }}
              >
                {item.community_title}
              </Text>
            ) : (
              <Text
                style={{
                  color: Colors.light.textGray,
                  fontFamily: "PopinRegula",
                }}
              >
                {item.bedrooms} bedrooms {item.property_sub_type} for{" "}
                {item.property_for}
              </Text>
            )}
            <View>
              <Text style={styles.description}>
                {expanded
                  ? type === "community"
                    ? item.community_details
                    : item.property_details
                  : type === "community"
                  ? item.community_details?.slice(0, 70) +
                    (item.community_details?.length > 70 ? "...." : "")
                  : item.property_details?.slice(0, 70) +
                    (item.property_details?.length > 70 ? "...." : "")}

                {(type === "community"
                  ? item.community_details?.length
                  : item.property_details?.length) > 70 && (
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
                    alignItems: "center",
                  }}
                  className="flex-row"
                >
                  <Camera />
                  <Text
                    style={{
                      color: "white",
                      fontWeight: 600,
                      fontFamily: "PopinRegula",
                    }}
                  >
                    {" "}
                    {item.images ? item.images.length : 0}
                  </Text>
                </View>
              </TouchableOpacity>

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
                {type === "community" ? (
                  <>
                    <View className="flex-row items-center">
                      <CommunityType />
                      <Text
                        style={{ marginLeft: vs(5), fontFamily: "PopinRegula" }}
                      >
                        {item.community_type}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <CommunitySatatus />
                      <Text
                        style={{ marginLeft: vs(5), fontFamily: "PopinRegula" }}
                      >
                        {item.community_status}
                      </Text>
                    </View>
                  </>
                ) : (
                  <>
                    <View className="flex-row items-center">
                      <Bed />
                      <Text
                        style={{ marginLeft: vs(5), fontFamily: "PopinRegula" }}
                      >
                        {item.bedrooms}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Shower />
                      <Text
                        style={{ marginLeft: vs(5), fontFamily: "PopinRegula" }}
                      >
                        {item.bathrooms}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Area />
                      <Text
                        style={{ marginLeft: vs(5), fontFamily: "PopinRegula" }}
                      >
                        {item.land_area} sqft
                      </Text>
                    </View>
                  </>
                )}
              </View>

              <View
                className="flex-1 items-end"
                style={{
                  backgroundColor: Colors.light.cardgreenLight,
                  borderRadius: 8,
                  paddingRight: hs(20),
                  paddingVertical: vs(5),
                  marginTop: vs(8),
                  marginBottom: vs(10),
                }}
              >
                <CircleImage
                  source={{ uri: ImageFormater(item.profile_logo) }}
                  Size={35}
                />
              </View>
              <LargeButton
                handleSubmit={() => {}}
                text="Upgrade ad to trending"
              />
              <View
                className="flex-row justify-between items-center"
                style={{ marginTop: vs(10), paddingHorizontal: hs(10) }}
              >
                <Text
                  style={{
                    color: Colors.light.textGray,
                    fontFamily: "PopinRegula",
                  }}
                >
                  Learn about trending ads
                </Text>
                <View className="flex-row ">
                  <TouchableOpacity
                    style={{ marginRight: hs(10) }}
                    onPress={() => {
                      router.push({
                        params: {
                          edit: "true",
                          type: type,
                          id:
                            type === "community"
                              ? item.post_community_id
                              : item.post_property_id,
                        },
                        pathname:
                          type === "community"
                            ? "/(main)/postCommunity"
                            : "/(main)/PostProperty",
                      });
                    }}
                  >
                    <Edit />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if(item.ad_by==="agent"){

                      setSelectedPost(item);
                     setDeleteType("Deleted");
             

                Alert.alert("Confirm", "Are you sure you want to delete?", [
                  { text: "No" },
                  {
                    text: "Yes",
                    onPress: () => {
                      handleDelete(selectedPost, "Deleted", type);
                    },
                  },
                ]);
              
                    
                      }
                      else{
                          setSelectedPost(item);
                      setDeleteModal(true);
                      }
                    }}
                  >
                    <Delet />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
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
          onEndReachedThreshold={0.6}
          ListFooterComponent={
            isfetching ? <ActivityIndicator size="small" /> : null
          }
          refreshControl={
            <RefreshControl
              refreshing={isfetching}
              onRefresh={() => {
                setPage(1);
                refetch();
              }}
            />
          }
        />
      ) : (
        <Text
          style={{
            textAlign: "center",
            marginTop: 20,
            fontFamily: "PopinRegula",
          }}
        >
          No Data Found
        </Text>
      )}

      {showImages && (
        <ImageSlider
          images={selectedImages}
          setShowImage={(val: boolean) => {
            setShowImages(val);
            setscrollable(true);
          }}
        />
      )}
      <Modal visible={deleteModal} transparent={true} animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: "85%",
              borderRadius: 10,
              padding: 20,
            }}
          >
            <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 15 }}>
              Delete Ad Options
            </Text>

            <TouchableOpacity
              style={{ marginBottom: 15 }}
              onPress={() => {
                setDeleteType("Past");
                setDeleteModal(false);

                Alert.alert("Confirm", "Are you sure you want to delete?", [
                  { text: "No" },
                  {
                    text: "Yes",
                    onPress: () => {
                      handleDelete(selectedPost, "Past", type);
                    },
                  },
                ]);
              }}
            >
              <Text style={{ color: "black" }}>
                Delete but add to my profile as past deals
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setDeleteType("Deleted");
                setDeleteModal(false);

                Alert.alert("Confirm", "Are you sure you want to delete?", [
                  { text: "No" },
                  {
                    text: "Yes",
                    onPress: () => {
                      handleDelete(selectedPost, "Deleted", type);
                    },
                  },
                ]);
              }}
            >
              <Text style={{ color: "red" }}>
                Delete Ad & don't add to profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={() => setDeleteModal(false)}
            >
              <Text style={{ textAlign: "center", color: "gray" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Loading isLoading={isLoading} text="Deleting.." />
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
    fontFamily: "PopinRegula",
  },
  uperSection: {
    marginLeft: hs(10),
  },
  description: {
    marginVertical: vs(10),
    fontWeight: 500,
    fontFamily: "PopinRegula",
  },
  moreText: {
    color: Colors.light.DarkGreen,
    fontWeight: "600",
    fontFamily: "PopinRegula",
  },
});
