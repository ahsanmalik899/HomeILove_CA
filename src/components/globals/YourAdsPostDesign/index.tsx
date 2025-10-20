import { userdata } from "@/store/slices/selector/user";
import Comment from "@assets/icons/Comment.svg";
import Like from "@assets/icons/Like.svg";
import Share from "@assets/icons/share.svg";
import FilledStar from '@assets/icons/Star/star-filled.svg';
import HollowStar from '@assets/icons/Star/star-not-filled.svg';
import ThreeDots from "@assets/icons/threedots.svg";
import image from "@assets/test/test.jpeg";
import { LegendList } from "@legendapp/list";
import CommentInput from "@src/components/globals/CommentInput";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { hs, ms, vs } from "@utils/design/design";
import { useState } from "react";
import { ActivityIndicator, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CircleImage from "../CircleImage/CircleImage";
import CreatePost from "../CreatePost/createPost";
import FollowButton from "../FollowButton";
import LableImage from "../LabelImage/LableImage";
import { postDataType } from "./type";
const YourAdsPostDesign = ({ data,setPage,isfetching,setposts }: postDataType) => {
  const ratting = 3;
  const user = useAppSelector(userdata);
  const insets = useSafeAreaInsets();
  

  const renderItem = ({ item }) => {
    const [expanded, setExpanded] = useState(false);

   if(item.type==='Shared Connection'){
   return(
      <View className="bg-white" style={styles.card}>
        <View className="flex-row items-center justify-between">
          <View className="flex-row">
            <CircleImage source={image} Size={40} />
            <View style={styles.uperSection}>
              <View className="flex-row">
                <Text style={styles.name}>{item.name}</Text>
                {item.connection_type &&(
                  <Text> ({item.connection_type })</Text>
                )}
                
              </View>
              <Text>Batimore</Text>
            </View>
          </View>
          <TouchableOpacity>
            <ThreeDots />
          </TouchableOpacity>
        </View>
        <View style={{marginTop:vs(20)}}>
        <View className="flex-row justify-between">
          <Text  className="font-bold">Dealing areas</Text>
          <Text>{item.dealing_areas}</Text>
        </View>
        <View className="flex-row justify-between" style={{marginTop:vs(10)}}>
          <Text className="font-bold">Rating</Text>
          <Text>25 Count</Text>
        </View>
        <View className="flex-row items-center" style={{marginTop:vs(10)}}>
        <View className="flex-row ">
          {
            [1,2,3,4,5].map((index)=>
            {
              if(ratting>=index){
                return<FilledStar/>
              }
              else{
                return<HollowStar/>
              }
            }
            )
          } 
        </View>
        <Text style={{color:Colors.light.DarkGreen, marginLeft:hs(10)}}>{ratting}/5</Text>
        </View>
        </View>
        <View style={{height:vs(1),backgroundColor:'black',width:'95%',marginTop:vs(10),marginHorizontal:hs(10)}}/>
        <View style={{alignItems: 'flex-end',marginTop:vs(10)}}>
          <FollowButton id={112}/>
        </View>
      </View>
   )
   }
   else{
     return(
      <View className="bg-white" style={styles.card}>
        <View className="flex-row items-center justify-between">
          <View className="flex-row">
            <CircleImage source={image} Size={40} />
            <View style={styles.uperSection}>
              <View className="flex-row">
                <Text style={styles.name}>{item.name}</Text>
                {item.connection_type &&(
                  <Text> ({item.connection_type })</Text>
                )}
                
              </View>
              <Text>{item.post_created_date || item.created_date}</Text>
            </View>
          </View>
          <TouchableOpacity>
            <ThreeDots />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.description}>
  {expanded
    ? item.description
    : item.description?.slice(0, 70) +(item.description?.length>70 ? "....":" ")}
  {item.description?.length > 70 && (
    <Text
      style={styles.moreText}
      onPress={() => setExpanded(!expanded)}
    >
      {expanded ? " Show Less" : " Read More"}
    </Text>
  )}
</Text>

          <LableImage price={item.price} title={item.title} source={image} />
          <View
            className="flex-row justify-between"
            style={{ marginTop: vs(20), marginBottom: vs(10) }}
          >
            <View className="flex-row">
              <View className="flex-row items-center ">
                <TouchableOpacity>
                  <Like />
                </TouchableOpacity>
                <Text
                  style={{ color: Colors.light.DarkGreen, paddingLeft: hs(2) }}
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
                  style={{ color: Colors.light.DarkGreen, paddingLeft: hs(2) }}
                >
                  16
                </Text>
              </View>
            </View>
            <TouchableOpacity>
              <Share />
            </TouchableOpacity>
          </View>
          <View></View>
          <CommentInput />
        </View>
      </View>
    )
    
   }
  };
  return (
    <View style={{ paddingBottom: insets.bottom }}>
      <LegendList
        className="flex-1 bg-red"
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.post_id}
        onEndReached={()=>{
          if(data.length>9){
          setPage((prev)=> prev+1)}}
        }
        ListHeaderComponent={<CreatePost />}
         ListFooterComponent={
          isfetching ? <ActivityIndicator size="small" /> : null
        }
       refreshControl={
    <RefreshControl
      refreshing={isfetching}
      onRefresh={() => {
        setPage(1);         }}
    />}
      />
    </View>
  );
};

export default YourAdsPostDesign;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: hs(10),
    marginVertical: vs(10),
    paddingHorizontal: hs(15),
    paddingVertical: vs(15),
    borderRadius: ms(20),
  },
  name: {
    fontWeight: "bold",
  },
  uperSection: {
    marginLeft: hs(10),
  },
  description: {
    marginVertical: vs(10),
  },
  moreText:{
    color:Colors.light.DarkGreen,
    fontWeight:'600'
  }
});
