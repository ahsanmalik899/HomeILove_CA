import HomeLogo from "@assets/Home/homeliogo.svg";
import NotificatioOutline from "@assets/Home/notificationOutline.svg";
import Back from "@assets/icons/BackArrow.svg";
import { hs, ms, vs } from "@utils/design/design";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HeaderProps } from "./type";
const index = ({ title, header }: HeaderProps) => {
  return (
    <View>
      <View
        className="flex-row justify-between items-center "
        style={{ marginTop: vs(50), marginHorizontal: hs(20) }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Back />
        </TouchableOpacity>

        {header ? (
          <Text style={{ fontSize: ms(20), fontWeight: 600 }}>{header}</Text>
        ) : (
          <View style={{ marginTop: vs(-20) }}>
            
            <HomeLogo />
          </View>
        )}

        <TouchableOpacity onPress={() => router.navigate("/CurrentAlerts")}>
          <NotificatioOutline />
        </TouchableOpacity>
      </View>
      {title && (
        <Text
          style={{
            marginTop: vs(40),
            fontSize: ms(18),
            fontWeight: 600,
            marginLeft: hs(20),
          }}
        >
          {title}
        </Text>
      )}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  topBarText: {
    color: "black",
    fontSize: ms(16),
    fontWeight: "bold",
  },

  topbar: {
    marginTop: vs(40),
    marginBottom: vs(20),
    marginHorizontal: hs(20),
  },
});
