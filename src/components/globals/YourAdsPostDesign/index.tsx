import { userdata } from "@/store/slices/selector/user";
import Area from "@assets/icons/MypostListing/area.svg";
import Bed from "@assets/icons/MypostListing/bed.svg";
import Delet from "@assets/icons/MypostListing/delet.svg";
import Edit from "@assets/icons/MypostListing/edit.svg";
import Shower from "@assets/icons/MypostListing/shower.svg";
import image from "@assets/test/test.jpeg";
import { LegendList } from "@legendapp/list";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { hs, ms, vs } from "@utils/design/design";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CircleImage from "../CircleImage/CircleImage";
import LargeButton from "../LaregeButton";
import { postDataType } from "./type";
const YourAdsPostDesign = ({
  data,
  setPage,
  isfetching,
  setposts,
}: postDataType) => {
  const ratting = 3;
  const user = useAppSelector(userdata);
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <View className="bg-white" style={styles.card}>
        <View className="flex-row justify-between items-center">
          <Text style={{ color: Colors.light.DarkGreen, fontWeight: 600 }}>
            {"$ 300"}
          </Text>
          <View className="items-center"style={{ height: vs(40), width: hs(80) }}>
            <TouchableOpacity
              className="justify-center"
              style={{
                height: vs(30),
                width: hs(70),
                backgroundColor: Colors.light.red,
                borderRadius: 5,
              }}
              onPress={() => {}}
            >
              <Text className=" items-center text-white text-center">
                Active
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{ color: Colors.light.textGray }}>
          3 bedrooms Detached house for sale
        </Text>
        <View>
          <Text style={styles.description}>
            {expanded
              ? item.description
              : item.description?.slice(0, 70) +
                (item.description?.length > 70 ? "...." : " ")}
            {item.description?.length > 70 && (
              <Text
                style={styles.moreText}
                onPress={() => setExpanded(!expanded)}
              >
                {expanded ? " Show Less" : " Read More"}
              </Text>
            )}
          </Text>

          <Image
            source={image}
            style={{
              height: vs(180),
              width: hs(320),
              borderRadius: ms(10),
              resizeMode: "contain",
              alignSelf:'center',
              backgroundColor: "gray",
            }}
          />
          <View
            className=" bg-white flex-row  justify-between"
            style={{
              elevation: 5,
              borderRadius: 8,
              paddingRight: hs(20),
              paddingVertical: vs(5),
              paddingHorizontal: vs(15),
              marginTop: vs(10),
            }}
          >
            <View className="flex-row items-center">
              <Bed />
              <Text style={{ marginLeft: vs(5) }}>2</Text>
            </View>
            <View className="flex-row items-center">
              <Shower />
              <Text style={{ marginLeft: vs(5) }}>2</Text>
            </View>
            <View className="flex-row items-center">
              <Area />
              <Text style={{ marginLeft: vs(5) }}>2</Text>
            </View>
          </View>
          <View
            className="flex-1 items-end"
            style={{
              backgroundColor: Colors.light.cardgreenLight,
              borderRadius: 8,
              paddingRight: hs(20),
              paddingVertical: vs(5),
              marginTop: vs(8),
              marginBottom:vs(10)
            }}
          >
            <CircleImage source={image} Size={35} />
          </View>
          <LargeButton handleSubmit={() => {}} text="Upgrade ad to trending" />
          <View className="flex-row justify-between items-center" style={{marginTop:vs(10),paddingHorizontal:hs(10)}}>
            <Text style={{ color: Colors.light.textGray }}>
              Learn about trending ads
            </Text>
            <View className="flex-row ">
              <TouchableOpacity style={{ marginRight: hs(10) }}>
                <Edit />
              </TouchableOpacity>
              <TouchableOpacity>
                <Delet />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{ paddingBottom: insets.bottom }}>
      <LegendList
        className="flex-1 bg-red"
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.post_property_id}
        onEndReached={() => {
          if (data.length > 9) {
            setPage((prev) => prev + 1);
          }
        }}
        ListFooterComponent={
          isfetching ? <ActivityIndicator size="small" /> : null
        }
        refreshControl={
          <RefreshControl
            refreshing={isfetching}
            onRefresh={() => {
              setPage(1);
            }}
          />
        }
      />
    </View>
  );
};

export default YourAdsPostDesign;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: hs(10),
    marginVertical: vs(10),
    paddingHorizontal: hs(10),
    paddingVertical: vs(10),
    borderRadius: ms(20),
    elevation: 5,
  },
  name: {
    fontWeight: "bold",
  },
  uperSection: {
    marginLeft: hs(10),
  },
  description: {
    marginVertical: vs(10),
    fontWeight: 500,
  },
  moreText: {
    color: Colors.light.DarkGreen,
    fontWeight: "600",
  },
});
