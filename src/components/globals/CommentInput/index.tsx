import Send from '@assets/icons/send.svg';
import image from '@assets/test/test.jpeg';
import Colors from '@src/constants/Colors';
import { hs, ms, vs } from '@utils/design/design';
import { TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import CircleImage from '../CircleImage/CircleImage';
const index = () => {
  return (
    <View className='flex-row items-center' >
        <CircleImage source={image} Size={'Small'} />
        <View className='flex-row items-center' style={{marginLeft:hs(5),borderRadius:ms(18),paddingVertical:vs(5),width:hs(285),backgroundColor:Colors.light.LightGreen,paddingHorizontal:hs(5)}}>
      <TextInput

      style={{width:hs(250)}}
      placeholderTextColor={Colors.light.DarkGreen}
      placeholder='Write Your Comment'
      />
      <TouchableOpacity><Send/></TouchableOpacity>

</View>
    </View>
  )
}

export default index;

