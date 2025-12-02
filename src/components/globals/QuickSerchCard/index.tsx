import Colors from '@src/constants/Colors'
import { hs, ms, vs } from '@utils/design/design'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { QuickSerchCardProps } from './type'

const index = ({ Image, text,onPress }: QuickSerchCardProps) => {
  return (
    <View style={styles.card}>
      <Image />
      <Text className='font-bold'>
{text}
      </Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text className='text-white'>Search</Text>
      </TouchableOpacity>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  card: {
    marginTop:vs(10),
    alignItems:'center',
    marginHorizontal: hs(20),
    paddingTop:vs(10),
    height: vs(160),
    backgroundColor: Colors.light.lightGray,
    borderColor: Colors.light.textGray,
    borderRadius: ms(5),
    borderWidth: ms(0.5),
  },
  button:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:Colors.light.DarkGreen,
    width:hs(100),
    marginTop:vs(10),
    borderRadius:ms(5),
    height:vs(30),
  }
})