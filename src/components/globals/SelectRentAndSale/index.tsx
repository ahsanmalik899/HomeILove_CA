import ActiveRent from "@assets/icons/PostProperty/active-rent.svg";
import ActiveSale from "@assets/icons/PostProperty/active-sale.svg";
import RentIcon from "@assets/icons/PostProperty/non-active-rent.svg";
import SaleIcon from "@assets/icons/PostProperty/non-active-sale.svg";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RentAndSaleProps } from "./type";
const index = ({ onPress, value }: RentAndSaleProps) => {
  return (
    <View className="flex-row justify-between">
      <TouchableOpacity className="items-center"
        style={[value === "Sale" ? styles.activeButton : styles.Button]}
        onPress={()=>onPress('Sale')}
      >
        {value === "Sale" ? <ActiveSale /> : <SaleIcon />}
        <Text style={[value === "Sale" ? styles.TextActive : styles.Text]}>For Sale</Text>
      </TouchableOpacity>

      <TouchableOpacity
      className="items-center"
        style={[value === "Rent" ? styles.activeButton : styles.Button]}
       onPress={()=>onPress('Rent')}
      >
        {value === "Rent" ? <ActiveRent /> : <RentIcon />}
        <Text style={[value === "Rent" ? styles.TextActive : styles.Text]}>For Rent</Text>
      </TouchableOpacity>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  activeButton: {
    backgroundColor: Colors.light.DarkGreen,
    width: hs(150),
    paddingVertical: vs(5),
    borderRadius:8,
  },
  Button: {
    borderWidth: ms(0.5),
    width: hs(150),
    paddingVertical: vs(5),
    borderColor:Colors.light.textGray,
    borderRadius:8,
  },

  TextActive: {
    fontWeight: 500,
    color: "white",
    marginTop:vs(5)
  },
  Text: {
    fontWeight: 400,
     marginTop:vs(5)
  },
});
