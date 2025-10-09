import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import { hs, ms, vs } from "@utils/design/design";
import { StyleSheet, Text, View } from "react-native";
const Message = () => {
  return (
    <View className="flex-1 bg-white">
      <HeaderWithBack />
      <View>
        <Text
          style={{
            marginTop: vs(30),
            fontSize: ms(18),
            fontWeight: "600",
            marginLeft: hs(20),
          }}
        >
          Your Messages
        </Text>
      </View>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({});
