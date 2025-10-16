import Add from '@assets/SideBar/addGreen.svg';
import { hs, ms, vs } from "@utils/design/design";
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SideBarCardprops } from './type';
const index = ({Svg,text}:SideBarCardprops) => {
  return <TouchableOpacity  style={styles.card}
  onPress={()=>router.navigate('/(main)/CreateProfiles')}
  >
    <Add/>
   <View className='items-center self-center '  >
    <Svg/>
    <Text style={{marginTop:vs(15),fontWeight:600}}>{text}</Text>
   </View>
  </TouchableOpacity>;
};

export default index;

const styles = StyleSheet.create({ card: {
    height:vs(140),
    width:hs(160),
    backgroundColor:'white',
    elevation:5,
    borderRadius:ms(10),
    paddingHorizontal:hs(5),
    paddingVertical:vs(10),
  marginBottom:vs(10)
}

});
