import { hs, ms, vs } from '@utils/design/design';
import { Image, StyleSheet, Text, View } from 'react-native';
import { LableImageProps } from './type';

const LableImage = ({source,title,price}:LableImageProps) => {
  return (
  <View>
    <Image  style ={styles.image}source={source}/>
<View className='flex-row justify-between' style={{position:'absolute',width:'100%',bottom:0, marginVertical:vs(5),backgroundColor:'rgba(76, 76, 76, 0.7)', paddingHorizontal:hs(20),paddingVertical:vs(10),borderBottomStartRadius:ms(50),borderBottomEndRadius:ms(50)}}>
    <Text style={{color:'white'}}>
   {title}
    </Text>
    <Text style={{color:'white'}}>
{price}
    </Text>
</View>
  </View>
  )
}

export default LableImage

const styles = StyleSheet.create({
    image:{
        height:vs(200),
        width:hs(325),
        borderRadius:ms(30),
        resizeMode:'contain',
        backgroundColor:'gray'
    }
})