
import Compelet from "@assets/CreateProfile/completedhouse.svg"
import Constrution from "@assets/CreateProfile/construction-house.svg"
import Plaining from "@assets/CreateProfile/painting-house.svg"
import Colors from '@src/constants/Colors'
import { hs, ms, vs } from '@utils/design/design'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RentAndSaleProps } from '../SelectRentAndSale/type'
const index = ({value,onPress}:RentAndSaleProps) => {
  return (
    <View className="flex-row justify-between">
         <TouchableOpacity className="items-center"
           style={[value === "Completed" ? styles.activeButton : styles.Button]}
           onPress={()=>onPress('Completed')}
         >
          <Compelet/>
           <Text style={[value === "Completed" ? styles.TextActive : styles.Text]}>Completed</Text>
         </TouchableOpacity>
   
         <TouchableOpacity
         className="items-center"
           style={[value === "Constructing" ? styles.activeButton : styles.Button]}
          onPress={()=>onPress('Constructing')}
         >
          <Constrution/>
           <Text style={[value === "Constructing" ? styles.TextActive : styles.Text]}>Constructing</Text>
         </TouchableOpacity>
          <TouchableOpacity
         className="items-center"
           style={[value === "In Planning" ? styles.activeButton : styles.Button]}
          onPress={()=>onPress('In Planning')}
         >
          <Plaining/>
           <Text style={[value === "In Planning" ? styles.TextActive : styles.Text]}>In Planning</Text>
         </TouchableOpacity>
       </View>
  )
}

export default index

const styles = StyleSheet.create({
    activeButton: {
    backgroundColor: Colors.light.textGray,
    width: hs(100),
    paddingVertical: vs(5),
    borderRadius:8,
  },
  Button: {
    borderWidth: ms(0.5),
    width: hs(100),
    paddingVertical: vs(5),
    borderColor:Colors.light.textGray,
    borderRadius:8,
  },

  TextActive: {
    fontWeight: 500,
    color: Colors.light.red,
    marginTop:vs(5)
  },
  Text: {
    fontWeight: 400,
     marginTop:vs(5)
  },
})