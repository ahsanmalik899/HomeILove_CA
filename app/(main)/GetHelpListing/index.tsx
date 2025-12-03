import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const Index = () => {
  const { type } = useLocalSearchParams();
  switch (type) {
    case "Mortgage":
      return (
        <View className="bg-white flex-1">
          <HeaderWithBack />
          <View style={{ marginHorizontal: hs(20) }}>
            <Text style={styles.mainHeading}>
              Experts to <Text style={{ color: Colors.light.red }}> MOVE </Text>
              you with {"\n"}love
            </Text>
            <Text>
              Find best mortgage advisors near you.They love to help you in
              finding best mortgage solution tailored to your financail
              position.
            </Text>
            <Text style={styles.subHeading}>Mortgage Experts</Text>
          </View>
        </View>
      );
      break;
    case "Agent":
      return (
        <View className="bg-white flex-1">
          <HeaderWithBack />
          <View style={{ marginHorizontal: hs(20) }}>
            <Text style={styles.mainHeading}>
              Always<Text style={{ color: Colors.light.red }}> BETTER </Text>
              to consult {"\n"}experts
            </Text>
            <Text>
              Our expert agents are always there to keep you loving your
              homing.Consult local agents for your home needs on simple clicks
            </Text>
          </View>
        </View>
      );
      break;
    case "Investor":
      return (
        <View className="bg-white flex-1">
          <HeaderWithBack />
          <View style={{ marginHorizontal: hs(20) }}>
            <Text style={styles.mainHeading}>
              Get<Text style={{ color: Colors.light.red }}> BETTER </Text>
              rates from {"\n"}investors
            </Text>
            <Text>
              Leading investors are always there to keep you loving your
              homing.Consult local or nationwide investors for your home needs
              on simple clicks.
            </Text>
            <Text style={styles.subHeading}>Property Investors</Text>
          </View>
        </View>
      );
      break;
  }
};

export default Index;

const styles = StyleSheet.create({
  mainHeading: {
    marginTop: vs(20),
    fontSize: ms(20),
    fontWeight: 500,
  },
  subHeading: {
    marginTop: vs(10),
    fontSize: ms(20),
    fontWeight: 500,
  },
});
