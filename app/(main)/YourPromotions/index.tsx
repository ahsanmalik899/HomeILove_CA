import HeaderWithBack from '@src/components/globals/HeaderWithBack'
import Colors from '@src/constants/Colors'
import { hs, ms, vs } from '@utils/design/design'
import { StyleSheet, Text, View } from 'react-native'

const index = () => {
  return (
    <View className='flex-1'>
      <HeaderWithBack title='Promotions' />
      <View style={{marginHorizontal:hs(20)}}>
<Text style={{marginTop:vs(20),fontSize:ms(15),fontWeight:500}}>You have not promoted any of your business!
</Text>
<Text style={{marginTop:vs(10)}}>Why not promote your business to wider range audience nationwide</Text>
<Text style={{marginTop:vs(10),color:Colors.light.red}}>Why not promote your business to wider range audience nationwide</Text>
      </View>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})