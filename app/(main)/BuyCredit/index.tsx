import { useGetUserWalletQuery } from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import Paypal from "@assets/SideBar/paypal-icon.svg";
import PowerdByPayPal from "@assets/SideBar/Powered by PayPal.svg";
import { MaterialIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { renderToastError } from "@src/hooks/useToasty";
import { hs, ms, vs } from "@utils/design/design";
import { formatPrice } from "@utils/PriceFormater";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const index = () => {
  const user = useAppSelector(userdata);
  const bundlesData = [
    { id: "1", type: "Basic", price: "200", amount: "650" },
    { id: "2", type: "Medium", price: "400", amount: "1300" },
    { id: "3", type: "Bulk", price: "700", amount: "2200" },
    { id: "4", type: "High Volume", price: "700", amount: "2200" },
  ];
  const [adType, setAdtype] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [upgradeAmount, setUpgradeAmout] = useState("");
  const { data, isLoading, isFetching } = useGetUserWalletQuery({
    id: user.id,
  });
  return (
    <View className="flex-1 bg-white">
      <ScrollView>
        <View>
          <HeaderWithBack title="Buy Credits" />
          <View style={{ marginTop: vs(10), marginHorizontal: hs(20) }}>
            <Text style={{ fontWeight: 600, fontFamily: "PopinRegula" }}>
              Bundles
            </Text>
            <Text
              style={{
                fontSize: ms(20),
                fontWeight: 600,
                fontFamily: "PopinRegula",
              }}
            >
              Have more
              <Text
                style={{ color: Colors.light.red, fontFamily: "PopinRegula" }}
              >
                {" "}
                PROPERTIES & BUSINESS{" "}
              </Text>
              to market?
            </Text>
            <View>
              <Text style={styles.text}>
                If you are looking to advertise more ads or boost your business?
                Then buy bundles to get extra discounts.
              </Text>
              <Text style={styles.text}>
                Simply select the bundle that best suits your financial &
                marketing needs and get extra discounts.
              </Text>
              <Text style={styles.text}>
                No time limits to consume credit balance means use it when you
                need it.
              </Text>
              <TouchableOpacity  activeOpacity={1}
              style={{ marginVertical: vs(20) }}>
                <Text
                  style={{
                    color: Colors.light.DarkGreen,
                    fontWeight: 600,
                    fontFamily: "PopinRegula",
                  }}
                >
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
                flex:1,
              }}
            >
             <FlashList
  data={bundlesData}
  keyExtractor={(item) => item.id}
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
      <Text style={{ fontFamily: "PopinRegula" }}>Bundles</Text>

      <Text style={{ fontFamily: "PopinRegula" }}>
        Bundle price
      </Text>

      <Text style={{ fontFamily: "PopinRegula" }}>
        Amount you get
      </Text>
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
      <View className="flex-row items-center">
        <TouchableOpacity
         activeOpacity={1}
          onPress={() => {
            setAdtype(adType === item.type ? "" : item.type);
            setSelectedAmount(item.price);
            setUpgradeAmout(item.amount);
          }}
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

        <Text
          style={{
            marginLeft: hs(10),
            fontFamily: "PopinRegula",
          }}
        >
          {item.type}
        </Text>
      </View>

      <Text style={{ fontFamily: "PopinRegula" }}>
        {formatPrice(item.price)}
      </Text>

      <Text style={{ fontFamily: "PopinRegula" }}>
        {item.amount}
      </Text>
    </View>
  )}
/>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Your Homeilove Account Balance</Text>

            <View style={styles.amountValue}>
              {isLoading || isFetching ? (
                <ActivityIndicator
                  size="small"
                  color={Colors.light.DarkGreen}
                />
              ) : (
                <Text
                  style={{
                    color: Colors.light.DarkGreen,
                    fontFamily: "PopinRegula",
                    fontWeight:"700",
                    fontSize:ms(15),
                  }}
                >
                  £{data?.amount ?? 0}
                </Text>
              )}
            </View>

            <View style={styles.paymentOptions}>
              <TouchableOpacity
               activeOpacity={1}
                style={styles.paypalMainButton}
                onPress={() => {
                  if (adType === "") {
                    renderToastError("Please select bundle first");
                    return;
                  }

                  router.navigate({
                    pathname: "/PaymentScreen",
                    params: {
                      amount: selectedAmount,
                      type:"Bundle",
                      upgrade_amount:upgradeAmount,
                    },
                  });
                }}
              >
                <View style={styles.paypalContent}>
                  <Paypal />

                  <Text style={styles.paypalText}>
                    Pay with PayPal or Debit/Credit Card
                  </Text>
                </View>
              </TouchableOpacity>

              <View className="self-center mt-3">
                <PowerdByPayPal />
              </View>
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
    fontFamily: "PopinRegula",
  },
  card: {
    marginVertical: vs(20),
    marginHorizontal: hs(15),
    backgroundColor: "white",
    borderRadius: ms(8),
    elevation: 5,
    paddingVertical: vs(10),
    paddingHorizontal: hs(15),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  title: {
    fontSize: ms(14),
    textAlign: "center",
    fontWeight: "700",
    marginBottom: vs(15),
    fontFamily: "PopinRegula",
  
  },

  amountLabel: {
    fontSize: ms(16),
    fontWeight: "600",
    marginBottom: vs(5),
    color: Colors.light.text,
    fontFamily: "PopinRegula",
  },
  amountValue: {
    marginTop: vs(5),
    paddingVertical: vs(10),
    paddingHorizontal: hs(10),
    backgroundColor: Colors.light.LightGreen,
    borderRadius: ms(10),
    marginBottom: vs(20),
    color: Colors.light.DarkGreen,
    fontFamily: "PopinRegula",
    alignItems:"center",
  },
  paymentOptions: {
    marginTop: vs(30),
  },
  paymentButton: {
    flexDirection: "row",
    borderRadius: ms(8),
    alignItems: "center",
    justifyContent: "center",
    height: vs(40),
    marginBottom: vs(10),
  },
  paymentText: {
    color: "white",
    fontSize: ms(14),
    fontWeight: "600",
    marginLeft: hs(8),
    fontFamily: "PopinRegula",
  },
  paypalMainButton: {
    backgroundColor: Colors.light.Yellow,
    borderRadius: ms(8),
    height: vs(48),
    justifyContent: "center",
    alignItems: "center",
  },

  paypalContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  paypalText: {
    marginLeft: hs(10),
    fontSize: ms(14),
    fontWeight: "600",
    color: "#003087",
    fontFamily: "PopinRegula",
  },
});
