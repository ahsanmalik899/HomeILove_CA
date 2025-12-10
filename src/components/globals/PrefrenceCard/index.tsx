import { hs, ms, vs } from '@utils/design/design'
import { StyleSheet, Text, View } from 'react-native'
import LargeButton from '../LaregeButton'
import { PrefrenceCardprops } from './typ'

const index = ({Svg,Heading,BtnText,OnSubmit}:PrefrenceCardprops) => {
  return (
    <View  style={{borderRadius:ms(10)}} className=' bg-white pt-1  '>
     <View  style={{ alignItems:'center', width: '100%'}}>
     <Svg/>     
     <Text  style={{fontWeight:600, fontSize:ms(15)}}>{Heading}</Text>
    </View>
    <View style={{paddingHorizontal:hs(20), marginVertical:vs(10)}}>
    <LargeButton text={BtnText} handleSubmit={OnSubmit}/>
      </View>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})