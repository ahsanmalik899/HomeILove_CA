import ChatIcon from '@assets/icons/chaticon.svg'
import ImageIcon from '@assets/icons/Image.svg'
import Seprater from '@assets/icons/seprater.svg'
import Veido from '@assets/icons/Viedio.svg'
import Colors from '@src/constants/Colors'
import { hs, ms, vs } from '@utils/design/design'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
const createPost = () => {
  return (
    <View className='bg-white' style={styles.card}>
    <Text  className='font-bold'style={{fontWeight:'600',}}>Create Post</Text>
    <View className='flex-row'style={{backgroundColor:Colors.light.LightGreen, paddingHorizontal:hs(10),paddingVertical:vs(10),borderRadius:ms(10) ,marginVertical:vs(20)}}>
        <ChatIcon/>
    <TextInput
    style={{marginLeft:vs(10),fontSize:ms(14),width:hs(265)}}
    placeholder="What's up, Name?"
    />
    </View>
    <View className='flex-row justify-between items-center'>
        <View className='flex-row'>

    <TouchableOpacity className='flex-row'>
    <ImageIcon/>
    <Text style={{color:Colors.light.DarkGreen}}>
        Image
    </Text>
    </TouchableOpacity>
    <View style={{marginHorizontal:hs(10)}}>
<Seprater />
</View>
<TouchableOpacity className='flex-row'>
    <Veido/>
    <Text style={{color:Colors.light.DarkGreen}}>
        Video
    </Text>
    </TouchableOpacity>
</View>
<TouchableOpacity style={{backgroundColor:Colors.light.red,paddingHorizontal:hs(50),paddingVertical:vs(10),borderRadius:ms(5)}}>
    <Text style={{color:'white', fontWeight:'600'}}>
        Post
    </Text>
</TouchableOpacity>
    </View>
    </View>
  )
}

export default createPost

const styles = StyleSheet.create({
       card:{
        marginHorizontal:hs(10),
        marginVertical:vs(10),
         paddingHorizontal:hs(15),
        paddingVertical:vs(15),
        borderRadius:ms(20),
     
    },
})