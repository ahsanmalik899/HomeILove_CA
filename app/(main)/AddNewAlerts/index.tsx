import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import Colors from "@src/constants/Colors";
import { hs, ms } from "@utils/design/design";
import { StyleSheet, Text, View } from "react-native";

const index = () => {
  return (
    <View className="flex-1 bg-white">
      <HeaderWithBack title="Add Alerts" />
      <View style={{marginHorizontal:hs(20)}}>
      <Text style={{ fontSize: ms(20), fontWeight: 600 }}>
        Create<Text style={{ color: Colors.light.red }}> Alert </Text>for your
        home move
      </Text>
      
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
