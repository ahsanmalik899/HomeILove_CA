import { MaterialIcons } from "@expo/vector-icons";
import { LegendList } from "@legendapp/list";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LargeButton from "@src/components/globals/LaregeButton";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
const index = () => {
  const bundlesData = [
    { id: "1", type: "Basic", price: "200", amount: "650" },
    { id: "2", type: "Medium", price: "400", amount: "1300" },
    { id: "3", type: "Bulk", price: "700", amount: "2200" },
    { id: "4", type: "High Volume", price: "700", amount: "2200" },
  ];
  const [adType, setAdtype] = useState("");
  return (
    <View className="flex-back">
      <ScrollView>
        <View>
      <HeaderWithBack title="Buy Credits" />
      <View style={{ marginTop: vs(10), marginHorizontal: hs(20) }}>
        <Text style={{ fontWeight: 600 }}>Bundles</Text>
        <Text style={{ fontSize: ms(20), fontWeight: 600 }}>
          Have more
          <Text style={{color:Colors.light.red}}> PROPERTIES & BUSINESS </Text>
          to market?
        </Text>
        <View>
          <Text style={styles.text}>
            If you are looking to advertise more ads or boost your business?
            Then buy bundles to get extra discounts.
          </Text>
          <Text style={styles.text}>
            Simply select the bundle that best suits your financial & marketing
            needs and get extra discounts.
          </Text>
          <Text style={styles.text}>
            No time limits to consume credit balance means use it when you need
            it.
          </Text>
          <TouchableOpacity style={{ marginVertical: vs(20) }}>
            <Text style={{ color: Colors.light.DarkGreen, fontWeight: 600 }}>
              One place to boost your businesss
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderLeftWidth: 1,
            borderBottomWidth: 1,
            borderRightWidth: 1,
            borderColor: Colors.light.textGray,
            borderRadius: ms(5),
          }}
        >
          <LegendList
            data={bundlesData}
            keyExtractor={(item) => item.id}
            estimatedItemSize={50}
            ListHeaderComponent={
              <View
                className="flex-row justify-between items-center"
                style={{
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: Colors.light.textGray,
                  borderRadius: ms(5),
                  paddingHorizontal: hs(10),
                  paddingVertical: vs(10),
                }}
              >
                <Text>Bundles</Text>
                <Text>{"  "}Bundle price</Text>
                <Text>{"  "}Amount you get</Text>
              </View>
            }
            renderItem={({ item }) => (
              <View
                className="flex-row justify-between items-center"
                style={{
                  paddingHorizontal: hs(10),
                  paddingVertical: vs(10),
                }}
              >
                <View className="flex-row items-center ">
                  <TouchableOpacity
                    onPress={() =>
                      setAdtype(adType === item.type ? "" : item.type)
                    }
                  >
                    <MaterialIcons
                      size={18}
                      color={Colors.light.DarkGreen}
                      name={
                        adType === item.type
                          ? "check-box"
                          : "check-box-outline-blank"
                      }
                    />
                  </TouchableOpacity>
                  <Text style={{ marginLeft: hs(10) }}>{item.type}</Text>
                </View>
                <Text>
                  {item.price}
                </Text>
                <Text>{item.amount}</Text>
              </View>
            )}
          />
        </View>
        <View
        
          style={{
            marginTop:vs(10),
            elevation: 5,
            borderRadius:5,
           
          }}
        >
          <Text  style={{ marginTop: vs(10) }}>
            Your Homeilove account balance
          </Text>
          <Text>Amount</Text>
          <Text>$355.00</Text>
          <LargeButton text="Add Credits" handleSubmit={()=>{}}/>
        </View>
      </View>
      </View>
      </ScrollView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  text: {
    marginTop: vs(20),
  },
});
