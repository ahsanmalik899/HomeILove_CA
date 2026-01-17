import Cross from "@assets/CreateProfile/cross.svg";
import SlideLeft from '@assets/Feedimg/leftSlide.svg';
import SlideRight from '@assets/Feedimg/rightSlide.svg';
import NoImage from "@assets/SideBar/no_images.png";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from '@utils/design/design';
import { ImageFormater } from '@utils/ImageFormat';
import { useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ImageSliderProps } from './type';
const ImageSlider = ({ images ,setShowImage,imageNo}: ImageSliderProps) => {
  const [imgNo, setImgNo] = useState(imageNo||0);
  const [loading,setLoading]=useState(false);
  const prevImage = () => {
    setImgNo((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setImgNo((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <View style={styles.overlay}>

     
   <Image
  source={
    images.length > 0
      ? { uri: ImageFormater(images[imgNo]) }
      : NoImage
  }

  style={styles.image}
  onLoadStart={() => setLoading(true)}
  onLoadEnd={() => setLoading(false)}
/>

{loading && (
  <ActivityIndicator
    size="large"
    color={Colors.light.DarkGreen}
    style={StyleSheet.absoluteFillObject}
  />
)}
   <TouchableOpacity onPress={()=>setShowImage(false)} style={{position:'absolute',backgroundColor:'white',borderRadius:ms(10),zIndex:10,top:vs(50),right:hs(10)}}>
             <Cross height={vs(30)} width={vs(30)} />
        </TouchableOpacity>
       
   
      <TouchableOpacity style={styles.leftArrow} onPress={prevImage}>
        <SlideLeft />
      </TouchableOpacity>

     
      <TouchableOpacity style={styles.rightArrow} onPress={nextImage}>
        <SlideRight />
      </TouchableOpacity>
    </View>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  overlay: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 10000,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  image: {
    width: '95%',
    height: '50%',
    borderRadius: ms(10),
    resizeMode: 'cover',
    backgroundColor: 'gray',
  },
  leftArrow: {
    position: 'absolute',
    left: hs(10),
    top: '50%',
    transform: [{ translateY: -vs(15) }], 
    zIndex: 10,
  },
  rightArrow: {
    position: 'absolute',
    right: hs(10),
    top: '50%',
    transform: [{ translateY: -vs(15) }], 
    zIndex: 10,
  },
});
