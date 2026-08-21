import {
  useDeleteCommentApiMutation,
  useGetPostCommentsApiQuery,
  useGetSingleGeneralPostQuery,
  usePostReplyApiMutation
} from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import Camera from "@assets/Feedimg/camera.svg";
import Heart from "@assets/icons/heart.svg";
import Share from "@assets/icons/share.svg";
import Delete from "@assets/SideBar/deletbaskit.svg";
import NoImage from "@assets/SideBar/no_images.png";
import { FlashList } from "@shopify/flash-list";
import CircleImage from "@src/components/globals/CircleImage/CircleImage";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import ImageSlider from "@src/components/globals/ImageSlider";
import Loading from "@src/components/globals/Loading";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { ImageFormater } from "@utils/ImageFormat";
import { ViedioUrlFormat } from "@utils/ViedioUrlFormater";
import { Video } from "expo-av";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";

const index = () => {
  const params = useLocalSearchParams();
  const type = params.type as string;
  const id = Number(params.id);
  const user = useSelector(userdata);
     const [loading,setLoading]=useState(false);
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
                 activeOpacity={1}
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
             activeOpacity={1}
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

              <TouchableOpacity  activeOpacity={1}
              onPress={handleReply} style={styles.sendBtn}>
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
                     activeOpacity={1}
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
  const { data, isFetching, refetch } = useGetSingleGeneralPostQuery({ userid:user?.id, post_id:id });
  const { data: comments, isFetching: commentFetching } =
    useGetPostCommentsApiQuery({ post_id: id },{skip:!post_id});
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
         <View className="flex-row">
                               <CircleImage
                                 source={{ uri: ImageFormater(data?.posted_by?.logo) }}
                                 Size={40}
                               />
                               <View style={styles.uperSection}>
                                 <View className="flex-row">
                                   <Text style={styles.name}>
                                     {data?.posted_by?.business_name || data?.posted_by?.name}
                                   </Text>
                                   {data?.posted_by?.connection_type && (
                                     <Text style={{fontFamily: "PopinRegula",}}> ({data?.posted_by?.connection_type})</Text>
                                   )}
                                 </View>
                                 <Text style={{fontFamily: "PopinRegula",}}>{data?.post?.created_date}</Text>
                               </View>
                             </View>
        
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Text style={{ color: "black", fontWeight: "600", flex: 1 }}>
               {data?.post?.description}
              </Text>

           
            </View>
      
       
          <TouchableOpacity
           activeOpacity={1}
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
          <View className="flex-1">
        <FlashList
  data={data?.post_images || []}
  horizontal
  style={{ flex: 1 }}
  keyExtractor={(item, index) => `${item}-${index}`}
  showsHorizontalScrollIndicator={false}
  renderItem={({ item, index }) => (
    <TouchableOpacity
     activeOpacity={1}
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
</View>
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
              <TouchableOpacity
               activeOpacity={1}>
                <Heart />
              </TouchableOpacity>
              <TouchableOpacity  activeOpacity={1}>
                <Share />
              </TouchableOpacity>
            </View>
          </View>
        </View>
         
                          {data?.post?.post_video && (
                            <View
                  style={{
                   height:vs(400),
                   width:"95%",
                   backgroundColor:Colors.light.lightGray,
                   borderRadius:ms(10),
                   marginHorizontal:hs(10),
                  }}
                >
                  <Video
                source={{ uri: ViedioUrlFormat(data?.post?.post_video) }}
                style={{
                  width: "100%",
                  height: "90%",  
                  borderRadius: ms(16),
                  marginBottom:vs(50),
                }}
                resizeMode="contain"
                useNativeControls  
                shouldPlay ={false}        
                
                isLooping={false}   
                isMuted={false}
                onLoadStart={() => setLoading(true)}
                onLoad={() => setLoading(false)}
              />
                    {loading && (
                      <ActivityIndicator
                        size="large"
                        color={Colors.light.DarkGreen}
                        style={StyleSheet.absoluteFillObject}
                      />
                    )}
                      
                           
                    </View>
                          )}
                            
        <View style={{ marginTop: vs(20),flex:1 }}>
          <Text style={styles.heading}>
            Comments ({comments?.data?.length || 0})
          </Text>

         <FlashList
  data={comments?.data || []}
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
    color: Colors.light.DarkGreen,
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
    paddingVertical: vs(5),
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
    borderRadius: ms(18),
  },

  sendText: {
    color: "white",
    fontWeight: "600",
    fontSize: ms(14),
    fontFamily: "PopinRegula",
  },
    name: {
      fontWeight: "bold",
      fontFamily: "PopinRegula",
    },
    uperSection: {
      marginLeft: hs(10),
    },
});
