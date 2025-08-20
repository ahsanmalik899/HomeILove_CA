import { hs, ms, vs } from '@utils/design/design';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
type LableImageProps = {
  source: ImageSourcePropType;
};
const LableImage = ({source}:LableImageProps) => {
  return (
  <View>
    <Image  style ={styles.image}source={source}/>
<View className='flex-row justify-between' style={{position:'absolute',width:'100%',bottom:0, marginVertical:vs(5),backgroundColor:'rgba(76, 76, 76, 0.7)', paddingHorizontal:hs(20),paddingVertical:vs(10),borderBottomStartRadius:ms(50),borderBottomEndRadius:ms(50)}}>
    <Text style={{color:'white'}}>
   4 Bedroom House is for sale
    </Text>
    <Text style={{color:'white'}}>
$75000
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