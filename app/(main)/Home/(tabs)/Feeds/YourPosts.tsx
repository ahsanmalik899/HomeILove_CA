import { useGetYourpostQuery, useLikePostMutation, useUnlikePostMutation } from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import Cross from "@assets/CreateProfile/cross.svg";
import Camera from "@assets/Feedimg/camera.svg";
import Comment from "@assets/icons/Comment.svg";
import Like from "@assets/icons/Like.svg";
import Share from "@assets/icons/share.svg";
import ThreeDots from "@assets/icons/threedots.svg";
import Liked from "@assets/icons/ThumbUpRed.svg";
import { LegendList } from "@legendapp/list";
import CircleImage from "@src/components/globals/CircleImage/CircleImage";
import CommentInput from "@src/components/globals/CommentInput";
import CreatePost from "@src/components/globals/CreatePost/createPost";
import ImageSlider from "@src/components/globals/ImageSlider";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { renderToastError, renderToastSuccess } from "@src/hooks/useToasty";
import { hs, ms, vs } from "@utils/design/design";
import { ImageFormater } from "@utils/ImageFormat";
import { ViedioUrlFormat } from "@utils/ViedioUrlFormater";
import { Video } from "expo-av";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const YourPosts = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
   const [loading,setLoading]=useState(false);
  const [Posts, setPosts] = useState<[]>([]);
    const [likePost, { isLoading: liking }] = useLikePostMutation();
    const [unlikePost, { isLoading: unliking }] = useUnlikePostMutation();
    const [showImages, setShowImages] = useState(false);
      const [showViedio, setShowViedio] = useState(false);
      const [SelectedViedio,setSelectedViedio]=useState('');
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [scrollable, setscrollable] = useState(true);
  const user = useAppSelector(userdata);
  const renderItem = ({ item }) => {
    const [expanded, setExpanded] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
      const [alreadyLiked, setAlreadyLiked] = useState(item.is_liked);
        const [likeCount, setLikeCount] = useState(item.likes);
        const handleLikeToggle = async (item) => {
          try {
            if (alreadyLiked) {
             const res = await unlikePost({
                post_id: item.id,
                user_id: user.id,
              }).unwrap();
    if(res.success){
      renderToastSuccess(res.message)
      setAlreadyLiked(false)
      setLikeCount(likeCount - 1)
    }else{
      renderToastError(res.message) 
    }
              
            } else {
           const res =   await likePost({
                post_id: item.id,
                user_id: user.id,
                creater_id: item.post_creater_id,
              }).unwrap();
         if(res.success){
          renderToastSuccess(res.message)
          setAlreadyLiked(true)
          setLikeCount(likeCount + 1)
         }else{
          renderToastError(res.message)
         }
            }
          } catch (error) {
            renderToastError("Something went wrong");
          }
        };
  const Images = item.post_images
    ? item.post_images.split(',').filter(img => img.trim() !== '')
    : [];

    return (
          <TouchableOpacity
                className="bg-white"
                style={styles.card}
                onPress={() => {
                  router.navigate({
                    pathname: "/GeneralPostSingleView",
                    params: {
                      id: item.id,
                     
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
                            <Text style={{fontFamily: "PopinRegula",}}> ({item.connection_type})</Text>
                          )}
                        </View>
                        <Text style={{fontFamily: "PopinRegula",}}>{item.post_created_date || item.created_date}</Text>
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
   <View style={{ alignSelf: "center" }}>

  {Images.length > 0 && (
    <TouchableOpacity 
   onPress={() => {
    setSelectedImages(Images || []);
    setShowImages(true);
    setscrollable(false);
  }}
    >
    <Image
      source={{ uri: ImageFormater(Images[0]) }}
      style={{
        height: vs(200),
        width: hs(350),
        borderRadius: ms(12),
        resizeMode: "cover",
      }}
    />
    </TouchableOpacity>
  )}

  {/* Overlay Container */}
  <View
    style={{
      position: "absolute",
      bottom: vs(8),
      left: hs(8),
      right: hs(8),
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
    }}
  >
    {/* LEFT SIDE - Camera Count */}
    {Images.length>0 && (
    <View
      style={{
        backgroundColor: "rgba(0,0,0,0.6)",
        paddingHorizontal: hs(8),
        paddingVertical: vs(4),
        flexDirection: "row",
        alignItems: "center",
        borderRadius: ms(20),
      }}
    >
      <Camera />
      <Text
        style={{
          color: "white",
          marginLeft: 4,
          fontWeight: "600",
          fontFamily: "PopinRegula",
        }}
      >
        {Images.length}
      </Text>
    </View>)}

    {/* RIGHT SIDE - Auto Playing Muted Video */}
    {item.post_video && (
          <TouchableOpacity 
   onPress={() => {
    setSelectedViedio(ViedioUrlFormat(item.post_video) );
    setShowViedio(true);
    setscrollable(false);
  }}
    >
      <Video
        source={{ uri: ViedioUrlFormat(item.post_video) }}
        style={{
          width: hs(100),
          height: vs(100),
          borderRadius: ms(12),
        }}
        resizeMode="cover"
        shouldPlay
        isLooping
        isMuted
      />
      </TouchableOpacity>
    )}
  </View>

</View>

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
                                   { alreadyLiked?
                <Liked
                                      width={22}
                                      height={22}
                                    />
                                    :
                                    <Like
                                      width={22}
                                      height={22}
                                    
                                    />}
                                  </TouchableOpacity>
                  <Text
                    style={{
                      color: Colors.light.DarkGreen,
                      paddingLeft: hs(2),
                      fontFamily: "PopinRegula",
                    }}
                  >
                    {likeCount}
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
            <View>
        
            </View>
            <CommentInput postId={item.id} creatorId={item.post_creater_id} />
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
                  console.log("Edit clicked", item.id);
                }}
                style={{ paddingVertical: 12, paddingHorizontal: 15 }}
              >
                <Text style={{ fontSize: 15, fontWeight: "500",fontFamily: "PopinRegula", }}>
                  Edit
                </Text>
              </TouchableOpacity>

              <View style={{ height: 1, backgroundColor: "#eee" }} />

              <TouchableOpacity
                onPress={() => {
                  setMenuVisible(false);
                  console.log("Delete clicked", item.id);
                }}
                style={{ paddingVertical: 12, paddingHorizontal: 15 }}
              >
                <Text style={{ fontSize: 15, fontWeight: "500", color: "red",fontFamily: "PopinRegula", }}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
   </TouchableOpacity>
    );
  };

  const { data, isFetching, refetch, isError, error } = useGetYourpostQuery({
    userid: user.id,
    page,
  });
  useEffect(() => {
    refetch();
  }, [page]);
  useEffect(() => {
    if (!data?.data?.posts) return;

    setPosts((prev) => {
      if (page === 1) {
        return data?.data?.posts;
      } else {
        return [...prev, ...data?.data?.posts];
      }
    });
  }, [data]);

  return (
    <View>
      <LegendList
        className="flex-1 bg-red"
        contentContainerStyle={{
          paddingBottom: vs(100),
        }}
        data={Posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => {
          if (!isFetching && data?.data?.posts?.length > 9) {
            setPage((prev) => prev + 1);
          }
        }}
        ListFooterComponent={
          isFetching ? <ActivityIndicator size="small" /> : null
        }
        style={{backgroundColor: "#F4F0F0"}}
          ListHeaderComponent={ <CreatePost /> }
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => {
              setPage(1);
            }}
          />
        }
      />
          {showImages && (
              <ImageSlider
                
                images={selectedImages}
                setShowImage={(val: boolean) => {
                  setShowImages(val);
                  setscrollable(true);
                }}
              />
            )}
            {
              showViedio&&(
              <View
    style={{
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.9)",
      zIndex: 9999,
      elevation: 9999,
    }}
  >
    <Video
  source={{ uri: SelectedViedio }}
  style={{
    width: "100%",
    height: "80%",  
    borderRadius: ms(16),
    marginBottom:vs(50),
  }}
  resizeMode="contain"
  useNativeControls  
  shouldPlay         
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
         <TouchableOpacity onPress={()=>setShowViedio(false)} style={{position:'absolute',backgroundColor:'white',borderRadius:ms(10),zIndex:10,top:vs(50),right:hs(10)}}>
                   <Cross height={vs(30)} width={vs(30)} />
              </TouchableOpacity>
             
      </View>
              )
            }
    </View>
  );
};

export default YourPosts;
const styles = StyleSheet.create({
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
});
