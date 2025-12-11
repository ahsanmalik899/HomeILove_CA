import HomeLogo from "@assets/Home/homeliogo.svg";
import NotificatioOutline from "@assets/Home/notificationOutline.svg";
import Back from "@assets/icons/BackArrow.svg";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { HeaderProps } from "./type";
const index = ({
  title,
  header,
  onBackpress,
  buttonTitile,
  onButtonPress,
  redButton = false,
}: HeaderProps) => {
  return (
    <View>
      <View
        className="flex-row justify-between items-center "
        style={{ marginTop: vs(50), marginHorizontal: hs(20) }}
      >
        <TouchableOpacity
          onPress={() => (onBackpress ? onBackpress() : router.back())}
        >
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
        <View
          className="flex-row justify-between"
          style={{ marginTop: vs(40), marginHorizontal: hs(20) }}
        >
          <Text
            style={{
              fontSize: ms(18),
              fontWeight: 600,
            }}
          >
            {title}
          </Text>

          {buttonTitile && (
            <TouchableOpacity
              style={{
                backgroundColor: redButton
                  ? Colors.light.red
                  : Colors.light.DarkGreen,
                paddingHorizontal: hs(5),
                paddingVertical: vs(10),
                borderRadius: ms(5),
              }}
              onPress={() => {
                onButtonPress();
              }}
            >
              <Text className="text-white" style={{fontSize:ms(10)}}>{buttonTitile}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default index;
