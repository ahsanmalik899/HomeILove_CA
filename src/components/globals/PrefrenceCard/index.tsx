import Add from "@assets/SideBar/addGreen.svg";
import { hs, ms, vs } from '@utils/design/design';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PrefrenceCardprops } from './typ';
const index = ({Svg,Heading,BtnText,OnSubmit}:PrefrenceCardprops) => {
  return (
    <TouchableOpacity  onPress={OnSubmit} style={{borderRadius:ms(10),width:"80%"}} className=' bg-white pt-1  '>
    <View className="absolute top-0 right-0">
<Add/>
    </View>
     <View  style={{ alignItems:'center', width: '100%',marginTop:vs(20)}}>
     <Svg height={vs(100)} width={hs(100)} />     
     <Text  style={{fontWeight:600, fontSize:ms(15),fontFamily: "PopinRegula",}}>{Heading}</Text>
    </View> 
    <View style={{paddingHorizontal:hs(20), marginVertical:vs(10)}}>
    {/* <LargeButton text={BtnText} handleSubmit={OnSubmit}/> */}
      </View>
    </TouchableOpacity>
  )
}

export default index

const styles = StyleSheet.create({})