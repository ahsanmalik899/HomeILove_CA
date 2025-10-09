import Add from '@assets/SideBar/addGreen.svg';
import { hs, ms, vs } from "@utils/design/design";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SideBarCardprops } from './type';
const index = ({Svg,text}:SideBarCardprops) => {
  return <TouchableOpacity  style={styles.card}
  >
    <Add/>
   <View className='items-center  ' >
    <Svg/>
    <Text>{text}</Text>
   </View>
  </TouchableOpacity>;
};

export default index;

const styles = StyleSheet.create({ card: {
    height:vs(150),
    width:hs(150),
    backgroundColor:'white',
    elevation:10,
    borderRadius:ms(10)
}

});
