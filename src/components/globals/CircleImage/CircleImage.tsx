import { hs, ms, vs } from '@utils/design/design';
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';

type CircleImageProps = {
  source: ImageSourcePropType;
  Size:String;
};
const CircleImage = ({source,Size}:CircleImageProps) => {
    const sizeStyle =
    Size === 'Medium'
      ? { height: vs(40), width: hs(40) }
      : Size === 'Small'
      ? { height: vs(30), width: hs(30) }
      : { height: vs(50), width: hs(50) };
  return (
  <Image style={[styles.Image,sizeStyle]} source={source}/>
  )
}

export default CircleImage;

const styles = StyleSheet.create({
    Image:{
       
        borderRadius:ms(20),
        resizeMode:'contain',
        backgroundColor:'black'
    }
});