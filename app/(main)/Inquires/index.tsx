import Delete from "@assets/SideBar/deletbaskit.svg";
import { MaterialIcons } from "@expo/vector-icons";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import TablikeButton from "@src/components/globals/TablikeButton";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const index = () => {
  const [value, setValue] = useState("Sent");
  const [sellectAll, setSellectAll] = useState(false);
  const componenet1 = (
    <View style={{ marginTop: vs(10) }}>
      <Text>Your inquiries</Text>
      <View className="justify-between flex-row" style={{ marginTop: vs(10) }}>
        <View className="flex-row">
          <TouchableOpacity>
            <MaterialIcons
              size={18}
              color={Colors.light.DarkGreen}
              name={sellectAll ? "check-box" : "check-box-outline-blank"}
            />
          </TouchableOpacity>
          <Text>{"  Select all"}</Text>
        </View>
        <TouchableOpacity>
          <Delete />
        </TouchableOpacity>
      </View>
    </View>
  );
  const componenet2 = (
    <View style={{ marginTop: vs(10) }}>
      <Text>Your inquiries</Text>
      <Text style={{ fontSize: ms(20), fontWeight: 600 }}>
        Boost your <Text style={{ color: Colors.light.red }}>BUSINESS</Text> &
        to next level
      </Text>
      <Text style={{marginTop:vs(20)}}>
        Upgrade your business profile to Trending and receive unlimited queries
        relevant to your business such as if you upgrade your agent profile then
        you can receive queries for buying,selling or letting from your city No
        limit of receiving queries untill your profile remains trending you will
        keep receiving queries. Simply go to your business profiles and select
        the profile you want to upgrade and starting getting enquiries straight
        into your account. Increase your clientele base without spending too
        much on advertisement.
      </Text>
      <TouchableOpacity>
        <Text style={{color:Colors.light.DarkGreen}}>
          One place to boost your businesss
        </Text>
      </TouchableOpacity>
      <View className="justify-between flex-row" style={{ marginTop: vs(10) }}>
        <View className="flex-row">
          <TouchableOpacity>
            <MaterialIcons
              size={18}
              color={Colors.light.DarkGreen}
              name={sellectAll ? "check-box" : "check-box-outline-blank"}
            />
          </TouchableOpacity>
          <Text>{"  Select all"}</Text>
        </View>
        <TouchableOpacity>
          <Delete />
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View className="flex-1 bg-white">
      <HeaderWithBack title="Inquiries" />
      <View className="flex-1" style={{ marginHorizontal: hs(20) }}>
        <TablikeButton
          btn1value="Sent"
          btn2value="Received"
          btnTxt1="Sent"
          btnTxt2="Received"
          onPress={(value) => setValue(value)}
          value={value}
          Componet1={componenet1}
          Componet2={componenet2}
        />
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
