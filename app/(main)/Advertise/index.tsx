import AdvatiseBaner from "@assets/SideBar/advertisementpic.svg";
import { MaterialIcons } from "@expo/vector-icons";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LargeButton from "@src/components/globals/LaregeButton";
import TablikeButton from "@src/components/globals/TablikeButton";
import { hs, ms, vs } from "@utils/design/design";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
const index = () => {
  const [showInfoPage, setShowInfopage] = useState(false);
  const [showAdvatizeFrom, setShowAdvatizeForm] = useState(false);
  const [advatizeType, setAdvatizeType] = useState("Homefeed");
  const componenet1 = (
    <View style={{ marginTop: vs(10) }}>
      <Text>Your inquiries</Text>
      <View className="justify-between flex-row" style={{ marginTop: vs(10) }}>
        <View className="flex-row">
          <TouchableOpacity>
            <MaterialIcons
              size={18}
              color={Colors.light.DarkGreen}
              name={"check-box"}
            />
          </TouchableOpacity>
          <Text>{"  Select all"}</Text>
        </View>
        <TouchableOpacity></TouchableOpacity>
      </View>
    </View>
  );
  const componenet2 = (
    <View style={{ marginTop: vs(10) }}>
      <Text>Your inquiries</Text>
      <View className="justify-between flex-row" style={{ marginTop: vs(10) }}>
        <View className="flex-row">
          <TouchableOpacity>
            <MaterialIcons
              size={18}
              color={Colors.light.DarkGreen}
              name={"check-box"}
            />
          </TouchableOpacity>
          <Text>{"  Select all"}</Text>
        </View>
        <TouchableOpacity></TouchableOpacity>
      </View>
    </View>
  );
  const componenet3 = (
    <View style={{ marginTop: vs(10) }}>
      <Text>Your inquiries</Text>
      <View className="justify-between flex-row" style={{ marginTop: vs(10) }}>
        <View className="flex-row">
          <TouchableOpacity>
            <MaterialIcons
              size={18}
              color={Colors.light.DarkGreen}
              name={"check-box"}
            />
          </TouchableOpacity>
          <Text>{"  Select all"}</Text>
        </View>
        <TouchableOpacity></TouchableOpacity>
      </View>
    </View>
  );
  if (showInfoPage) {
    return (
      <View className="flex-1 bg-white">
        <HeaderWithBack />
        <View style={{ marginHorizontal: hs(20), marginTop: vs(30) }}>
          <Text className="font-bold">
            Market your Brand or Business on Nation's smartest real-estate
            platform Tranparent - Targeted- Economical
          </Text>
          <Text>
            Advertisement options at different segments to give you targeted
            audiences right for your marketing needs.We have five major
            segements where you can market your business
          </Text>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: ms(8),
              elevation: 5,
              paddingVertical: vs(10),
              paddingHorizontal: hs(10),
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 5,
            }}
          >
            <TablikeButton
              btn1value="Homefeed"
              btn2value="Timeline"
              btn3value="Connections"
              btnTxt1="Homefeed"
              btnTxt2="Timeline"
              btnTxt3="Connections"
              Componet1={componenet1}
              Componet2={componenet2}
              Componet3={componenet3}
              value={advatizeType}
              onPress={(value) => {
                setAdvatizeType(value);
              }}
            />
          </View>
        </View>
      </View>
    );
  }

  if (showAdvatizeFrom) {
    return (
      <View className="flex-1 bg-white">
        <HeaderWithBack title="Create Advertisement" />
      </View>
    );
  }
  return (
    <View className="flex-1 bg-white">
      <HeaderWithBack title="Advertisements" />
      <View
        className="items-center"
        style={{ marginHorizontal: hs(20), marginTop: vs(20) }}
      >
        <AdvatiseBaner />
        <Text style={{ fontWeight: 600, marginTop: vs(30) }}>
          You have no advertisement.
        </Text>
        <Text style={{ marginTop: vs(20) }}>
          Why not advertise your business or brand at our website and expand in
          no time and cost effectively
        </Text>
      </View>
      <View style={{ marginHorizontal: hs(20), marginTop: vs(20) }}>
        <LargeButton
          text="Advertise now"
          handleSubmit={() => {
            setShowInfopage(true);
          }}
        />
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
