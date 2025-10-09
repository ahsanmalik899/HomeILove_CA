import { hs, ms } from '@utils/design/design'
import { StyleSheet, Text, View } from 'react-native'
import LargeButton from '../LaregeButton'
import { PrefrenceCardprops } from './typ'

const index = ({Svg,Heading,BtnText,OnSubmit}:PrefrenceCardprops) => {
  return (
    <View  style={{borderRadius:ms(10)}} className=' bg-white pt-5  '>
     <View  style={{ alignItems:'center', width: '100%'}}>
     <Svg/>     
     <Text className='mt-10' style={{fontWeight:600, fontSize:ms(15)}}>{Heading}</Text>
    </View>
    <View style={{paddingHorizontal:hs(20)}}>
    <LargeButton text={BtnText} handleSubmit={OnSubmit}/>
      </View>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})