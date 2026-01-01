
import Commercial from "@assets/icons/PostProperty/commercial-green.svg";
import Activecommercial from "@assets/icons/PostProperty/commercial-white.svg";
import ActiveMix from "@assets/icons/PostProperty/mix-white.svg";
import Residential from "@assets/icons/PostProperty/residential-green.svg";
import ActiveResidential from "@assets/icons/PostProperty/residential-white.svg";
import Mix from "@assets/SideBar/mixGreen.svg";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CommunityTypeprops } from "./type";
const index = ({ onPress, value }: CommunityTypeprops) => {
  return (
    <View className="flex-row justify-between">
      <TouchableOpacity className="items-center"
        style={[value === "Residential" ? styles.activeButton : styles.Button]}
        onPress={()=>onPress('Residential')}
      >
        {value === "Residential" ? <ActiveResidential/>:<Residential /> }
        <Text style={[value === "Residential" ? styles.TextActive : styles.Text]}>Residential</Text>
      </TouchableOpacity>

      <TouchableOpacity
      className="items-center"
        style={[value === "Commercial" ? styles.activeButton : styles.Button]}
       onPress={()=>onPress('Commercial')}
      >
        {value === "Commercial" ? <Activecommercial />:<Commercial/>}
        <Text style={[value === "Commercial" ? styles.TextActive : styles.Text]}>Commercial</Text>
      </TouchableOpacity>
       <TouchableOpacity
      className="items-center"
        style={[value === "Mix" ? styles.activeButton : styles.Button]}
       onPress={()=>onPress('Mix')}
      >
        {value === "Mix" ?  <ActiveMix />:<Mix /> }
        <Text style={[value === "Mix" ? styles.TextActive : styles.Text]}>Mix</Text>
      </TouchableOpacity>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  activeButton: {
    backgroundColor: Colors.light.DarkGreen,
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
    color: "white",
    marginTop:vs(5)
  },
  Text: {
    fontWeight: 400,
     marginTop:vs(5)
  },
});
