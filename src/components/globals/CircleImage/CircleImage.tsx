import { hs, ms, vs } from '@utils/design/design';
import { Image, ImageSourcePropType } from 'react-native';

type CircleImageProps = {
  source: ImageSourcePropType;
  Size:number;
};
const CircleImage = ({source,Size}:CircleImageProps) => {
   
  return (
  <Image style={{
     height:vs(Size),
     width:hs(Size),
        borderRadius:ms(Size/2),
        resizeMode:'contain',
        backgroundColor:'black'
  }} source={source}/>
  )
}

export default CircleImage;

