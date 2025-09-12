import Comment from '@assets/icons/Comment.svg';
import Like from '@assets/icons/Like.svg';
import Share from '@assets/icons/share.svg';
import ThreeDots from '@assets/icons/threedots.svg';
import image from '@assets/test/test.jpeg';
import { LegendList } from '@legendapp/list';
import CommentInput from '@src/components/globals/CommentInput';
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from '@utils/design/design';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CircleImage from '../CircleImage/CircleImage';
import CreatePost from '../CreatePost/createPost';
import LableImage from '../LabelImage/LableImage';
import { postDataType } from './type';

const PostDesign = ({data}:postDataType) => {
   
const insets =useSafeAreaInsets();
  
const renderItem=({item})=>{
   
    return(
        <View className='bg-white' style={styles.card}>
          
             <View className='flex-row items-center justify-between'>
                <View className='flex-row'>
                <CircleImage source={image} Size={'Medium'}/>
                <View  style={styles.uperSection}>
                    <View className='flex-row'>
                    <Text style={styles.name}>{item.userData.name}</Text>
                    <Text> ({item.userData.business_type||item.userData.user_type})</Text>
                    </View>
                    <Text>{item.extraData.post_created_date}</Text>
                </View>
                </View>
                <TouchableOpacity >
                    <ThreeDots/>
                </TouchableOpacity>
                 
             </View>
             <View >
                <Text style={styles.description}>{item.property_details}</Text>
              <LableImage source={image}/>
              <View className='flex-row justify-between' style={{marginTop:vs(20),marginBottom:vs(10)}}>
                <View className='flex-row'>

              
                <View className='flex-row items-center ' >
                  <TouchableOpacity>
              <Like/>
              </TouchableOpacity>
              <Text style={{color:Colors.light.DarkGreen,paddingLeft:hs(2)}}>16</Text>
                </View>
                <View className='flex-row items-center'style={{paddingLeft:hs(10)}}>
                  <TouchableOpacity>
              <Comment/>
              </TouchableOpacity>
              <Text style={{color:Colors.light.DarkGreen,paddingLeft:hs(2)}}>16</Text>
                </View> 
              </View>
              <TouchableOpacity>
<Share/>
              </TouchableOpacity>
             </View>
             <View>
  </View>
  <CommentInput/>
             </View>
        </View>

    );
};
  return (
    <View style={{paddingBottom:insets.bottom}} >
  
        <LegendList

        className="flex-1 bg-red"
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.post_id.toString()}
      recycleItems
      ListHeaderComponent={<CreatePost/>}
    />
    </View>
  )
}

export default PostDesign

const styles = StyleSheet.create({
    card:{
        marginHorizontal:hs(10),
        marginVertical:vs(10),
         paddingHorizontal:hs(15),
        paddingVertical:vs(15),
        borderRadius:ms(20),
    },
    name:{
        fontWeight:'bold'
    },
    uperSection:{
    marginLeft:hs(10)
    },
    description:{
    marginVertical:vs(10),
    }
})