import Electrician from "@assets/HomeRomance/electricianinfo.svg";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import InputMiles from "@src/components/globals/InputMiles";
import LeadingList from "@src/components/globals/LeadingList";
import SerchBar from "@src/components/globals/SerchBar";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
const index = () => {
  const { type } = useLocalSearchParams();
  switch (type) {
    case "Electricians":
      return (
        <ScrollView>
        <View className="bg-white flex-1">
          <HeaderWithBack />
          <View style={{ marginHorizontal: hs(20) }}>
            <Text style={styles.mainHeading}>
              Keep<Text style={{ color: Colors.light.red }}> LIGHTENING </Text>
              your home
            </Text>
            <Text>
              Keep maintaining your home electrifying equipment with our expert
              electricians.Simply search best & economical electricians around
              you.
            </Text>
            <Text style={styles.subHeading}>
              Search experienced Electricians
            </Text>
            <TextInput
              placeholder="Search by name"
              cursorColor={Colors.light.textGray}
              placeholderTextColor={Colors.light.textGray}
              style={{
                borderWidth: ms(1),
                borderRadius: ms(5),
                borderColor: Colors.light.textGray,
                marginVertical: vs(10),
              }}
            />
            <SerchBar />
            <View style={{ marginVertical: vs(10) }}>
              <InputMiles />
            </View>
            <Electrician />
            <Text style={styles.mainHeading}>
              Leading
              <Text style={{ color: Colors.light.red }}>ELECTRICIANS</Text>
            </Text>
            <LeadingList/>
          </View>
        </View>
        </ScrollView>
      );
      break;
    case "Plumbers":
      return (
        <View className="bg-white flex-1">
          <HeaderWithBack />
          <View style={{ marginHorizontal: hs(20) }}>
            <Text style={styles.mainHeading}>
              Fix home to<Text style={{ color: Colors.light.red }}> LIVE </Text>
              with comfort
            </Text>
            <Text>
              Keep maintaining your home with our expert plumbers.Simply search
              local plumbers around you.
            </Text>
            <Text style={styles.subHeading}>Search experienced Plumbers</Text>
            <TextInput
              placeholder="Search by name"
              cursorColor={Colors.light.textGray}
              placeholderTextColor={Colors.light.textGray}
              style={{
                borderWidth: ms(1),
                borderRadius: ms(5),
                borderColor: Colors.light.textGray,
                marginVertical: vs(10),
              }}
            />
            <SerchBar />
            <View style={{ marginVertical: vs(10) }}>
              <InputMiles />
            </View>
          </View>
        </View>
      );
      break;

    case "Decors":
      return (
        <View className="bg-white flex-1">
          <HeaderWithBack />
          <View style={{ marginHorizontal: hs(20) }}>
            <Text style={styles.mainHeading}>
              Home at<Text style={{ color: Colors.light.red }}> GLANCE </Text>
              with love
            </Text>
            <Text>
              Re-invent your home with our expert interior decors. Simply search
              local home stagers around you.
            </Text>
            <Text style={styles.subHeading}>
              Search shining Interior Decors
            </Text>
            <TextInput
              placeholder="Search by name"
              cursorColor={Colors.light.textGray}
              placeholderTextColor={Colors.light.textGray}
              style={{
                borderWidth: ms(1),
                borderRadius: ms(5),
                borderColor: Colors.light.textGray,
                marginVertical: vs(10),
              }}
            />
            <SerchBar />
            <View style={{ marginVertical: vs(10) }}>
              <InputMiles />
            </View>
          </View>
        </View>
      );
      break;
    case "Painters":
      return (
        <View className="bg-white flex-1">
          <HeaderWithBack />
          <View style={{ marginHorizontal: hs(20) }}>
            <Text style={styles.mainHeading}>
              Give new<Text style={{ color: Colors.light.red }}> LOOKS </Text>
              to your home
            </Text>
            <Text>
              Give new look to your home with our expert painters. Simply search
              local painters around you.
            </Text>
            <Text style={styles.subHeading}>
              Search experienced{" "}
              <Text style={{ color: Colors.light.red }}>Painters</Text>
            </Text>
            <TextInput
              placeholder="Search by name"
              cursorColor={Colors.light.textGray}
              placeholderTextColor={Colors.light.textGray}
              style={{
                borderWidth: ms(1),
                borderRadius: ms(5),
                borderColor: Colors.light.textGray,
                marginVertical: vs(10),
              }}
            />
            <SerchBar />
            <View style={{ marginVertical: vs(10) }}>
              <InputMiles />
            </View>
          </View>
        </View>
      );
      break;
    case "Builders":
      return (
        <View className="bg-white flex-1">
          <HeaderWithBack />
          <View style={{ marginHorizontal: hs(20) }}>
            <Text style={styles.mainHeading}>
              <Text style={{ color: Colors.light.red }}>BUILD</Text>or
              <Text style={{ color: Colors.light.red }}> RE-BUILD </Text>
              your home
            </Text>
            <Text>
              Give structural change or build your home with our leading expert
              builders. Simply search local home builders around you.
            </Text>
            <Text style={styles.subHeading}>
              Search experienced{" "}
              <Text style={{ color: Colors.light.red }}>Home Builders</Text>
            </Text>
            <TextInput
              placeholder="Search by name"
              cursorColor={Colors.light.textGray}
              placeholderTextColor={Colors.light.textGray}
              style={{
                borderWidth: ms(1),
                borderRadius: ms(5),
                borderColor: Colors.light.textGray,
                marginVertical: vs(10),
              }}
            />
            <SerchBar />
            <View style={{ marginVertical: vs(10) }}>
              <InputMiles />
            </View>
          </View>
        </View>
      );
      break;
  }
};

export default index;

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
