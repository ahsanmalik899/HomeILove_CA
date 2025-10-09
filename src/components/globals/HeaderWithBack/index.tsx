import HomeLogo from "@assets/Home/homeliogo.svg";
import NotificatioOutline from "@assets/Home/notificationOutline.svg";
import Back from '@assets/icons/BackArrow.svg';
import { hs, ms, vs } from '@utils/design/design';
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
const index = () => {
  return (
    <View
        className="flex-row justify-between items-center "
        style={{ marginTop: vs(50), marginHorizontal: hs(20) }}
      >
        <TouchableOpacity onPress={()=>router.back()}>
          <Back />
        </TouchableOpacity>
        <View style={{ marginTop: vs(-20) }}>
          <HomeLogo />
        </View>
        <TouchableOpacity>
          <NotificatioOutline />
        </TouchableOpacity>
      </View>
  )
}

export default index

const styles = StyleSheet.create({
      topBarText: {
    color: "black",
    fontSize: ms(16),
    fontWeight: "bold",
  },
  
topbar:{
marginTop:vs(40),
marginBottom:vs(20),
marginHorizontal:hs(20),
},
})