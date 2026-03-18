import {
  useGetProfilesForConectionQuery,
  useHidePostMutation,
  useLikePostMutation,
  useSendRequestMutation,
  useUnlikePostMutation,
} from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import Camera from "@assets/Feedimg/camera.svg";
import Comment from "@assets/icons/Comment.svg";
import Like from "@assets/icons/Like.svg";
import Share from "@assets/icons/share.svg";
import ThreeDots from "@assets/icons/threedots.svg";
import image from "@assets/test/test.jpeg";
import { LegendList } from "@legendapp/list";
import CommentInput from "@src/components/globals/CommentInput";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { renderToastError, renderToastSuccess } from "@src/hooks/useToasty";
import { hs, ms, vs } from "@utils/design/design";
import { ImageFormater } from "@utils/ImageFormat";
import { router } from "expo-router";
import { useState } from "react";
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
import CreatePost from "../CreatePost/createPost";
import FollowButton from "../FollowButton";
import ImageSlider from "../ImageSlider";
import Loading from "../Loading";
import StarRating from "../StarRating";
import { postDataType } from "./type";
const PostDesign = ({
  data,
  setPage,
  isfetching,
  withCreatePost = false,
  refetch,
  setData,
}: postDataType) => {
  const user = useAppSelector(userdata);
  const [sendRequest, { isLoading }] = useSendRequestMutation();
  const [hidePostApi, { isLoading: hiding }] = useHidePostMutation();
  const [hiddenPosts, setHiddenPosts] = useState<number[]>([]);
  const [selectedReceiver, setSelectedReceiver] = useState<any>(null);
  const [likePost, { isLoading: liking }] = useLikePostMutation();
  const [unlikePost, { isLoading: unliking }] = useUnlikePostMutation();
  const { data: Profiles, isLoading: ProfilesLoading } =
    useGetProfilesForConectionQuery({ id: user.id });
  const insets = useSafeAreaInsets();
  const [showConnection, setShowConnection] = useState(false);
  const [scrollable, setscrollable] = useState(true);
  const [showImages, setShowImages] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [imageNo, setImageNo] = useState(0);

  const handleHidePost = async (item) => {
    try {
      setHiddenPosts((prev) => [...prev, item.post_id]);

      await hidePostApi({
        post_id: item.post_id,
        post_of: item.type,
        user_id: user.id,
      }).unwrap();

      renderToastSuccess("Post hidden successfully");
    } catch (error) {
      renderToastError("Failed to hide post");

      // rollback if failed
      setHiddenPosts((prev) => prev.filter((id) => id !== item.post_id));
    }
  };
  const requestSend = async ({
    sender_type,
    sender_ProfileId,
    reciverProfile,
  }) => {
    try {
      const formData = new FormData();

      formData.append("sender_id", String(user?.id ?? ""));
      formData.append("receiver_id", String(reciverProfile?.users_id ?? ""));
      formData.append("sender_profile_id", String(sender_ProfileId ?? ""));
      formData.append("sender_profile_type", String(sender_type ?? ""));
      formData.append("receiver_profile_id", String(reciverProfile?.id ?? ""));
      formData.append(
        "receiver_profile_type",
        String(reciverProfile?.connection_type ?? "")
      );

      formData._parts?.forEach((p) => console.log(p[0], p[1]));

      const result = await sendRequest(formData).unwrap();
      if (result.success) {
        renderToastSuccess(result.message);
        setShowConnection(false);
      } else {
        renderToastError(result.message);
        setShowConnection(false);
      }
    } catch (error) {
      renderToastError(error.message);
    }
  };
  const renderItem = ({ item }) => {
    const [expanded, setExpanded] = useState(false);

    const alreadyLiked = false;
    const handleLikeToggle = async (item) => {
      try {
        if (alreadyLiked) {
          await unlikePost({
            post_id: item.post_id,
            user_id: user.id,
          }).unwrap();

          renderToastSuccess("Post unliked");
        } else {
          await likePost({
            post_id: item.post_id,
            user_id: user.id,
            creater_id: item.users_id,
          }).unwrap();

          renderToastSuccess("Post liked");
        }
      } catch (error) {
        renderToastError("Something went wrong");
      }
    };

    const [menuVisible, setMenuVisible] = useState(false);
    if (item.type === "Shared Connection") {
      return (
        <TouchableOpacity className="bg-white" style={styles.card} onPress={()=>{
          router.navigate({pathname:"/ProfileSigleView",
            params:{id:item.id,type:item.connection_type.toLowerCase()}
          })
        }}>
          <View className="flex-row items-center justify-between">
            <View className="flex-row">
              <CircleImage
                source={{ uri: ImageFormater(item.logo) }}
                Size={40}
              />
              <View style={styles.uperSection}>
                <View className="flex-row">
                  <Text style={styles.name}>
                    {item.business_name || item.name}
                  </Text>
                  {item.connection_type && (
                    <Text style={{ fontFamily: "PopinRegula" }}>
                      {" "}
                      ({item.connection_type})
                    </Text>
                  )}
                </View>
                <Text style={{ fontFamily: "PopinRegula" }}>{item.city}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
              <ThreeDots />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: vs(20) }}>
            <View className="flex-row justify-between">
              <Text style={{ fontFamily: "PopinRegula" }} className="font-bold">
                Dealing areas
              </Text>
              <Text style={{ fontFamily: "PopinRegula" }}>
                {item.dealing_areas}
              </Text>
            </View>
            <View
              className="flex-row justify-between"
              style={{ marginTop: vs(10) }}
            >
              <Text style={{ fontFamily: "PopinRegula" }} className="font-bold">
                Rating
              </Text>
              <Text style={{ fontFamily: "PopinRegula" }}>
                {item.total_reviews} Count
              </Text>
            </View>
            <View
              className="flex-row items-center"
              style={{ marginTop: vs(10) }}
            >
              <StarRating rating={item.rating} size={20} />
              <Text
                style={{
                  color: Colors.light.DarkGreen,
                  marginLeft: hs(10),
                  fontFamily: "PopinRegula",
                }}
              >
                {item.rating}/5
              </Text>
            </View>
          </View>
          <View
            style={{
              height: vs(1),
              backgroundColor: "black",
              width: "95%",
              marginTop: vs(10),
              marginHorizontal: hs(10),
            }}
          />
          <View style={{ alignItems: "flex-end", marginTop: vs(10) }}>
            <FollowButton
              id={112}
              onPress={() => {
                if (user.user_type === "Business") {
                  setSelectedReceiver(item);
                  setShowConnection(true);
                } else {
                  requestSend({
                    reciverProfile: item,
                    sender_ProfileId: "",
                    sender_type: "Private",
                  });
                }
              }}
            />
          </View>
          {menuVisible && (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setMenuVisible(false)}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                justifyContent: "flex-start",
                alignItems: "flex-end",
                paddingTop: vs(40),
                paddingRight: hs(15),
                zIndex: 999,
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 12,
                  width: 160,
                  paddingVertical: 10,
                  elevation: 8,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setMenuVisible(false);
                    handleHidePost(item);
                  }}
                  style={{ paddingVertical: 12, paddingHorizontal: 15 }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "500",
                      fontFamily: "PopinRegula",
                    }}
                  >
                    Hide Post
                  </Text>
                </TouchableOpacity>

                <View style={{ height: 1, backgroundColor: "#eee" }} />

                <TouchableOpacity
                  onPress={() => {
                    setMenuVisible(false);
                    console.log("Report clicked", item.id);
                  }}
                  style={{ paddingVertical: 12, paddingHorizontal: 15 }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "500",
                      color: "red",
                      fontFamily: "PopinRegula",
                    }}
                  >
                    Report
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          className="bg-white"
          style={styles.card}
          onPress={() => {
            router.navigate({
              pathname: "/NewsFeedSingelView",
              params: {
                id: item.id,
                type:
                  item.type === "Shared Property" ? "property" : "community",
                post_id: item.post_id,
              },
            });
          }}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row">
              <CircleImage
                source={{ uri: ImageFormater(item.logo) }}
                Size={40}
              />
              <View style={styles.uperSection}>
                <View className="flex-row">
                  <Text style={styles.name}>
                    {item.business_name || item.name}
                  </Text>
                  {item.connection_type && (
                    <Text style={{ fontFamily: "PopinRegula" }}>
                      {" "}
                      ({item.connection_type})
                    </Text>
                  )}
                </View>
                <Text style={{ fontFamily: "PopinRegula" }}>
                  {item.post_created_date || item.created_date}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
              <ThreeDots />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.description}>
              {expanded
                ? item.description
                : item.description?.slice(0, 70) +
                  (item.description?.length > 70 ? "...." : " ")}
              {item.description?.length > 70 && (
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
                  item.images && item.images.length > 0
                    ? { uri: ImageFormater(item.images[0]) }
                    : image
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
                  {item.title}
                </Text>

                <Text
                  style={{
                    color: "white",
                    fontWeight: "700",
                    fontFamily: "PopinRegula",
                  }}
                >
                  {item.price}
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
                  {item.images ? item.images.length : 0}
                </Text>
              </View>

              <View
                style={{
                  position: "absolute",
                  top: vs(8),
                  right: hs(8),
                  alignItems: "flex-end",
                  gap: vs(5),
                }}
              >
                {item.saleprice_type === "Reduced Price" && (
                  <Text
                    style={{
                      backgroundColor: "rgba(241,28,28,0.85)",
                      paddingHorizontal: hs(8),
                      paddingVertical: vs(5),
                      color: "white",
                      fontWeight: "600",
                      borderRadius: ms(8),
                      fontFamily: "PopinRegular",
                    }}
                  >
                    Reduced Price
                  </Text>
                )}
              </View>
            </TouchableOpacity>

            <View
              className="flex-row justify-between"
              style={{ marginTop: vs(20), marginBottom: vs(10) }}
            >
              <View className="flex-row">
                <View className="flex-row items-center ">
                  <TouchableOpacity
                    disabled={liking || unliking}
                    onPress={() => handleLikeToggle(item)}
                  >
                    <Like
                      width={22}
                      height={22}
                      fill={alreadyLiked ? Colors.light.DarkGreen : "none"}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: Colors.light.DarkGreen,
                      paddingLeft: hs(2),
                      fontFamily: "PopinRegula",
                    }}
                  >
                    {item.likes}
                  </Text>
                </View>
                <View
                  className="flex-row items-center"
                  style={{ paddingLeft: hs(10) }}
                >
                  <TouchableOpacity>
                    <Comment />
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: Colors.light.DarkGreen,
                      paddingLeft: hs(2),
                      fontFamily: "PopinRegula",
                    }}
                  >
                    {item.comment_count}
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <Share />
              </TouchableOpacity>
            </View>
            <View></View>
            <CommentInput
              creatorId={item.users_id}
              postId={item.post_id}
              refetch={refetch}
            />
          </View>
          {menuVisible && (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setMenuVisible(false)}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                justifyContent: "flex-start",
                alignItems: "flex-end",
                paddingTop: vs(40),
                paddingRight: hs(15),
                zIndex: 999,
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 12,
                  width: 160,
                  paddingVertical: 10,
                  elevation: 8,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setMenuVisible(false);
                    handleHidePost(item);
                  }}
                  style={{ paddingVertical: 12, paddingHorizontal: 15 }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "500",
                      fontFamily: "PopinRegula",
                    }}
                  >
                    Hide Post
                  </Text>
                </TouchableOpacity>

                <View style={{ height: 1, backgroundColor: "#eee" }} />

                <TouchableOpacity
                  onPress={() => {
                    setMenuVisible(false);
                    console.log("Report clicked", item.id);
                  }}
                  style={{ paddingVertical: 12, paddingHorizontal: 15 }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "500",
                      color: "red",
                      fontFamily: "PopinRegula",
                    }}
                  >
                    Report
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={{ paddingBottom: insets.bottom, flex: 1,backgroundColor: "#F4F0F0" }}>
      <LegendList
        className="flex-1 bg-red"
        contentContainerStyle={{
          paddingBottom: vs(100),
        }}
        data={data?.filter((item) => !hiddenPosts.includes(item.post_id))}
        renderItem={renderItem}
        keyExtractor={(item) => item.post_id.toString()}
        onEndReached={() => {
          if (!isfetching && data?.length > 9) {
            setPage((prev) => prev + 1);
          }
        }}
        ListHeaderComponent={withCreatePost ? <CreatePost /> : null}
        ListFooterComponent={
          isfetching ? <ActivityIndicator size="small" /> : null
        }
        refreshControl={
          <RefreshControl
            refreshing={isfetching}
            onRefresh={() => {
              setPage(1);
            }}
          />
        }
      />
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
      {showConnection && (
       
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setShowConnection(false)}
        >
          <View style={styles.profileContainer}>
            <Text style={{ fontFamily: "PopinRegula" }}>Connect As</Text>
            {Profiles?.profiles?.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.profileCard}
                onPress={() => {
                  requestSend({
                    reciverProfile: selectedReceiver,
                    sender_ProfileId: item.profile_id,
                    sender_type: item.profile_type,
                  });
                }}
              >
                <CircleImage
                  Size={50}
                  source={{ uri: ImageFormater(item.logo) }}
                />

                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.businessName}>{item.business_name}</Text>

                  <Text style={styles.profileType}>{item.profile_type}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
     
      )}
      <Loading isLoading={isLoading} text="Sending request..." />
    </View>
  );
};

export default PostDesign;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    
    position: "absolute",
    zIndex: 10000,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  card: {
    marginHorizontal: hs(10),
    marginVertical: vs(10),
    paddingHorizontal: hs(15),
    paddingVertical: vs(15),
    borderRadius: ms(20),
    elevation: 3,
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
    fontFamily: "PopinRegula",
  },
  moreText: {
    color: Colors.light.DarkGreen,
    fontWeight: "600",
    fontFamily: "PopinRegula",
  },
  profileContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
  },

  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
  },

  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  businessName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    fontFamily: "PopinRegula",
  },

  profileType: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
    fontFamily: "PopinRegula",
  },
});
