import Serch from '@assets/icons/serch-icon.svg'
import Colors from '@src/constants/Colors'
import { hs, ms } from '@utils/design/design'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
const index = () => {
  return (
    <View className='flex-row justify-between '>
      <TextInput
        style={styles.inputField}
        placeholder='Please enter Address, City or Zip code.....'
      />
      <TouchableOpacity style={styles.serch}>
        <Serch />
      </TouchableOpacity>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  inputField: {
    borderWidth: ms(0.5),
    borderRadius: ms(5),
    width:"80%",
    borderColor: Colors.light.textGray
  },
  serch: {
    backgroundColor: Colors.light.red,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: hs(15),
    borderRadius: ms(5),
    
  }
})