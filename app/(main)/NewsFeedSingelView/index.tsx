import {
  useDeleteCommentApiMutation,
  useGetHomeFeedsQuery,
  useGetPostCommentsApiQuery,
  useGetSinglePostQuery,
  usePostReplyApiMutation,
} from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import CommunitySatatus from "@assets/CreateProfile/construction-house.svg";
import Camera from "@assets/Feedimg/camera.svg";
import Heart from "@assets/icons/heart.svg";
import Area from "@assets/icons/MypostListing/area.svg";
import Bed from "@assets/icons/MypostListing/bed.svg";
import Shower from "@assets/icons/MypostListing/shower.svg";
import Share from "@assets/icons/share.svg";
import CommunityType from "@assets/SideBar/commercialGreen.svg";
import Delete from "@assets/SideBar/deletbaskit.svg";
import NoImage from "@assets/SideBar/no_images.png";
import { LegendList } from "@legendapp/list";
import CircleImage from "@src/components/globals/CircleImage/CircleImage";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import ImageSlider from "@src/components/globals/ImageSlider";
import Loading from "@src/components/globals/Loading";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { ImageFormater } from "@utils/ImageFormat";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

const index = () => {
  const params = useLocalSearchParams();
  const type = params.type as string;
  const id = Number(params.id);
  const post_id = Number(params.post_id);
  const formatPdfUrl = (file: string) => {
    return ImageFormater(file);
  };

  const CommentItem = ({ item, refetch }) => {
    const user = useSelector(userdata);

    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replyText, setReplyText] = useState("");

    const [postReply] = usePostReplyApiMutation();
    const [deleteComment] = useDeleteCommentApiMutation();

    const {
      data,
      isFetching,
      refetch: refechfeeds,
      isError,
      error,
    } = useGetHomeFeedsQuery({
      id: user.id,
      type: "All",
      page: 1,
      limit: 10,
    });

    const handleReply = async () => {
      if (!replyText.trim()) return;

      await postReply({
        user_id: user?.id,
        creator_id: user?.id,
        comment_id: item.comment_id,
        content: replyText,
      });

      setReplyText("");
      setShowReplyInput(false);
      refetch();
    };

    return (
      <View style={styles.commentWrapper}>
        <CircleImage
          Size={38}
          source={{ uri: ImageFormater(item.profile_image) }}
        />

        <View style={{ flex: 1, marginLeft: 10 }}>
          <View style={styles.commentCard}>
            <View style={styles.commentHeader}>
              <Text style={styles.userName}>{item.name}</Text>

              {user?.id === item.sweetghar_user_id && (
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() =>
                    deleteComment(item.comment_id)
                      .unwrap()
                      .then(() => {
                        refetch();
                        refechfeeds();
                      })
                  }
                >
                  <Delete width={14} height={14} />
                </TouchableOpacity>
              )}
            </View>

            <Text style={styles.commentText}>{item.comment}</Text>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity
              onPress={() => setShowReplyInput(!showReplyInput)}
            >
              <Text style={styles.actionText}>Reply</Text>
            </TouchableOpacity>

            <Text style={styles.time}>{item.created_date}</Text>
          </View>

          {showReplyInput && (
            <View style={styles.replyInputBox}>
              <TextInput
                value={replyText}
                onChangeText={setReplyText}
                placeholder="Write a reply..."
                style={styles.replyInput}
              />

              <TouchableOpacity onPress={handleReply} style={styles.sendBtn}>
                <Text style={styles.sendText}>Send</Text>
              </TouchableOpacity>
            </View>
          )}

          {item.replies?.map((reply) => (
            <View key={reply.comment_id} style={styles.replyWrapper}>
              <CircleImage
                Size={28}
                source={{
                  uri: ImageFormater(reply.profile_image),
                }}
              />

              <View style={styles.replyCard}>
                <View style={styles.commentHeader}>
                  <Text style={styles.userName}>{reply.name}</Text>

                  {/* ✅ REPLY DELETE */}
                  {user?.id === reply.sweetghar_user_id && (
                    <TouchableOpacity
                      style={styles.deleteBtn}
                      onPress={() =>
                        deleteComment(reply.comment_id).unwrap().then(refetch)
                      }
                    >
                      <Delete width={12} height={12} />
                    </TouchableOpacity>
                  )}
                </View>

                <Text style={styles.commentText}>{reply.comment}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const [imageNo, setImageNo] = useState(0);
  const { data, isFetching, refetch } = useGetSinglePostQuery({ type, id });
  const { data: comments, isFetching: commentFetching } =
    useGetPostCommentsApiQuery({ post_id: post_id });
  const [showImages, setShowImages] = useState(false);
  const [showFloor, setShowFloor] = useState(false);
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <ScrollView className="flex-1 bg-white">
        <HeaderWithBack />
        <View
          className="flex-1"
          style={{ marginHorizontal: hs(10), paddingVertical: vs(20) }}
        >
          <View className="flex-row gap-3 mb-3">
            <CircleImage
              Size={40}
              source={{ uri: ImageFormater(data?.posted_by?.logo) }}
            />
            <Text style={[styles.heading, { color: Colors.light.red }]}>
              {data?.posted_by?.business_name}
            </Text>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/SinglePost",
                  params: {
                    id: data?.post?.id,
                    type: type,
                    post_id: data?.post?.post_id,
                  },
                })
              }
            >
              <Text style={styles.fullDetailText}>See Full Details</Text>
            </TouchableOpacity>
          </View>
          {type === "community" ? (
            <View className="flex-row justify-between">
              <Text style={{ color: "black", fontWeight: "600", flex: 1 }}>
                {data?.post?.community_title ?? ""}
              </Text>

              {data?.post?.community_price?.length > 0 && (
                <Text style={{ color: Colors.light.red, fontWeight: "600" }}>
                  From $ {data.post.community_price[0]} To ${" "}
                  {
                    data.post.community_price[
                      data.post.community_price.length - 1
                    ]
                  }
                </Text>
              )}
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Text style={{ color: "black", fontWeight: "600", flex: 1 }}>
                {data?.post?.bedrooms ?? 0} bedrooms{" "}
                {data?.post?.property_sub_type ?? ""} for{" "}
                {data?.post?.property_for ?? ""}
              </Text>

              <Text
                style={{
                  color: Colors.light.red,
                  fontWeight: "600",
                  marginLeft: 8,
                }}
              >
                $ {data?.post?.asking_price ?? 0}
                {type === "rent" ? `/${data?.post?.rent_type ?? ""}` : ""}
              </Text>
            </View>
          )}
          <Text style={styles.description}>
            {expanded
              ? type === "community"
                ? data?.post?.community_details
                : data?.post?.property_details
              : type === "community"
              ? data?.post.community_details?.slice(0, 300) +
                (data?.post?.community_details?.length > 300 ? "...." : "")
              : data?.post?.property_details?.slice(0, 300) +
                (data?.post?.property_details?.length > 300 ? "...." : "")}

            {(type === "Community"
              ? data?.post?.community_details?.length
              : data?.post?.property_details?.length) > 300 && (
              <Text
                style={styles.moreText}
                onPress={() => setExpanded(!expanded)}
              >
                {expanded ? " Show Less" : " Read More"}
              </Text>
            )}
          </Text>
          <TouchableOpacity
            className="mt-4"
            onPress={() => {
              setShowImages(true);
            }}
          >
            <Image
              source={
                data?.post_images && data?.post_images.length > 0
                  ? { uri: ImageFormater(data?.post_images[0]) }
                  : NoImage
              }
              style={{
                height: vs(200),
                width: "100%",
                borderRadius: ms(10),
                resizeMode: "cover",
                alignSelf: "center",
                backgroundColor: "gray",
              }}
            />
            {type !== "community" && data?.floor_images.length > 0 && (
              <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: vs(5),
                  right: hs(10),
                  paddingHorizontal: hs(8),
                  paddingVertical: vs(8),
                  borderRadius: ms(10),
                  alignItems: "center",
                  backgroundColor: "rgba(29, 29, 29, 0.27)",
                }}
                className="flex-row"
                onPress={() => setShowFloor(true)}
              >
                <Text style={{ color: "white", fontWeight: 600 }}>
                  Floor Images{" "}
                  {data?.floor_images ? data?.floor_images.length : 0}
                </Text>
              </TouchableOpacity>
            )}

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
              <Text style={{ color: "white", fontWeight: 600 }}>
                {data?.post_images ? data?.post_images.length : 0}
              </Text>
            </View>
          </TouchableOpacity>
          <LegendList
            data={data?.post_images || []}
            horizontal
            className="flex-1"
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                className="mt-4 mr-2"
                onPress={() => {
                  setImageNo(index);
                  setShowImages(true);
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
                  <Text style={{ marginLeft: vs(5) }}>
                    {data?.post.community_type}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <CommunitySatatus />
                  <Text style={{ marginLeft: vs(5) }}>
                    {data?.post?.community_status}
                  </Text>
                </View>
              </>
            ) : (
              <>
                <View className="flex-row items-center">
                  <Bed />
                  <Text style={{ marginLeft: vs(5) }}>
                    {data?.post?.bedrooms}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Shower />
                  <Text style={{ marginLeft: vs(5) }}>
                    {data?.post?.bathrooms}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Area />
                  <Text style={{ marginLeft: vs(5) }}>
                    {data?.post?.land_area} sqft
                  </Text>
                </View>
              </>
            )}
          </View>
          <View className="flex-row items-center justify-between mt-4">
            <Text
              className="flex-1 mr-2"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {data?.post?.address}
            </Text>

            <View className="flex-row gap-2">
              <TouchableOpacity>
                <Heart />
              </TouchableOpacity>
              <TouchableOpacity>
                <Share />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ marginTop: vs(20) }}>
          <Text style={styles.heading}>
            Comments ({comments?.data?.length || 0})
          </Text>

          <LegendList
            data={comments?.data || []}
            estimatedItemSize={80}
            keyExtractor={(item) => item.comment_id.toString()}
            renderItem={({ item }) => (
              <CommentItem item={item} refetch={refetch} />
            )}
          />
        </View>
      </ScrollView>
      {showImages && (
        <ImageSlider
          imageNo={imageNo}
          images={data?.post_images}
          setShowImage={(val: boolean) => {
            setShowImages(val);
          }}
        />
      )}

      {showFloor && (
        <ImageSlider
          imageNo={imageNo}
          images={data?.floor_images}
          setShowImage={(val: boolean) => {
            setShowFloor(val);
          }}
        />
      )}

      <Loading isLoading={isFetching} text="Loading..." />
    </>
  );
};

export default index;

const styles = StyleSheet.create({
  textred: {
    color: Colors.light.red,
    fontFamily: "PopinRegula",
  },
  description: {
    marginVertical: vs(10),
    fontWeight: 500,
    fontFamily: "PopinRegula",
  },
  fullDetailText: {
    color: Colors.light.red,
    fontSize: ms(13),
    fontWeight: "600",
    marginTop: vs(6),
    fontFamily: "PopinRegula",
  },
  moreText: {
    color: Colors.light.DarkGreen,
    fontWeight: "600",
    fontFamily: "PopinRegula",
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

  heading: {
    fontSize: ms(16),
    fontWeight: "600",
    color: Colors.light.DarkGreen,
    marginBottom: vs(15),
    fontFamily: "PopinRegula",
  },

  action: {
    fontSize: ms(12),
    color: Colors.light.textGray,
    fontWeight: "500",
    fontFamily: "PopinRegula",
  },

  commentWrapper: {
    flexDirection: "row",
    marginBottom: vs(18),
    marginHorizontal: hs(20),
  },

  commentCard: {
    backgroundColor: "#F4F6F8",
    padding: ms(12),
    borderRadius: 14,
  },

  replyCard: {
    backgroundColor: "#FAFAFA",
    padding: ms(10),
    borderRadius: 12,
    flex: 1,
  },

  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: vs(3),
  },

  userName: {
    fontWeight: "600",
    fontSize: ms(13),
    color: "#222",
    fontFamily: "PopinRegula",
  },

  commentText: {
    fontSize: ms(13),
    color: "#444",
    lineHeight: 18,
    fontFamily: "PopinRegula",
  },

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: vs(5),
    gap: 15,
  },

  actionText: {
    fontSize: ms(12),
    color: Colors.light.textGray,
    fontWeight: "600",
    fontFamily: "PopinRegula",
  },

  time: {
    fontSize: ms(11),
    color: "#999",
    fontFamily: "PopinRegula",
  },

  deleteBtn: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: "#FFECEC",
  },

  replyWrapper: {
    flexDirection: "row",
    marginTop: vs(10),
    marginLeft: hs(25),
    alignItems: "flex-start",
  },

  replyInputBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: vs(8),
    backgroundColor: "#F1F3F5",
    borderRadius: 25,
    paddingHorizontal: hs(12),
  },

  replyInput: {
    flex: 1,
    paddingVertical: vs(8),
    fontFamily: "PopinRegula",
  },

  sendBtn: {
    backgroundColor: Colors.light.red,
    paddingHorizontal: hs(14),
    paddingVertical: vs(6),
    borderRadius: 20,
  },

  sendText: {
    color: "white",
    fontWeight: "600",
    fontSize: ms(12),
    fontFamily: "PopinRegula",
  },
});
