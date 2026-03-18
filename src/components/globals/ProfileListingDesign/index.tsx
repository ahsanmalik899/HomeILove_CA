import { userdata } from "@/store/slices/selector/user";
import Call from "@assets/Buy/call.svg";
import Mail from "@assets/Buy/email-open.svg";
import UnSelecteHeart from "@assets/Feedimg/unselected_heart.svg";
import NoImage from "@assets/SideBar/no_images.png";
import { LegendList } from "@legendapp/list";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { hs, ms, vs } from "@utils/design/design";
import { ImageFormater } from "@utils/ImageFormat";
import { router } from "expo-router";
import { useRef, useState } from "react";
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
import StarRating from "../StarRating";
import { postDataType } from "./type";
const YourAdsPostDesign = ({
  data,
  setPage,
  isfetching,
  setposts,
  type,
  hasmore,
   initialLoadDone,
}: postDataType) => {
 

  const user = useAppSelector(userdata);
  const listRef = useRef<any>(null);
  const [imageNo, setImageNo] = useState(0);
  const insets = useSafeAreaInsets();
  const [scrollable, setscrollable] = useState(true);
  const renderItem = ({ item }) => {
    const [expanded, setExpanded] = useState(false);
   
    const facts = item.imp_facts ?? item.facts ?? "";
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            router.navigate({
              pathname: "/ProfileSigleView",
              params: {
                type: item.type,
                id: item.id,
                userid:item.users_id,
              },
            });
          }}
        >
          <View className="bg-white" style={styles.card}>
            <View
              className="flex-row justify-between items-center"
              style={{
                backgroundColor:
                  item.post_type === "Trending"
                    ? Colors.light.LightGreen
                    : "white",
                paddingHorizontal: hs(10),
                paddingVertical: vs(10),
                borderRadius: ms(10),
                marginBottom: item.post_type === "Trending" ? vs(10) : vs(0),
              }}
            >
              <Text
                style={{
                  color:
                    item.post_type === "Trending" ||
                    item.post_type === "Promoted"
                      ? Colors.light.DarkGreen
                      : "black",
                  fontWeight: 700,
                  fontSize: ms(18),
                  fontFamily: "PopinRegula",
                }}
              >
                $ {item.contact}
                {item.property_for === "rent" && (
                  <Text style={{ color: Colors.light.red, fontSize: ms(18),fontFamily: "PopinRegula", }}>
                    /{item.rent_type}
                  </Text>
                )}
              </Text>
              {item.post_type === "Trending" && (
                <Text
                  style={{ fontWeight: 600, color: Colors.light.DarkGreen,fontFamily: "PopinRegula", }}
                >
                  Trending
                </Text>
              )}
            </View>
            <View className="flex-row justify-between">
              <Text style={{ color: "black", fontWeight: "700",fontFamily: "PopinRegula", }}>
                {item.business_name.length > 20
                  ? item.business_name.slice(0, 20) + "..."
                  : item.business_name}
              </Text>
              <View className="flex-row items-center gap-2">
                <StarRating rating={item.rating} size={10} />
                <Text style={{ color: Colors.light.textGray, fontWeight: 700,fontFamily: "PopinRegula", }}>
                  {item.total_reviews} reviews
                </Text>
              </View>
            </View>
            <View className="flex-row justify-between">
              <Text style={{ color: Colors.light.textGray, marginTop: vs(5),fontFamily: "PopinRegula", }}>
                {item.address.length > 25
                  ? item.address.slice(0, 25) + "..."
                  : item.address}
              </Text>

              <Text style={{ color: Colors.light.textGray, marginTop: vs(5) ,fontFamily: "PopinRegula",}}>
                License# {item.license_no}
              </Text>
            </View>
            <View
              style={{
                height: vs(1),
                marginTop: vs(5),

                backgroundColor: Colors.light.textGray,
                opacity: 0.2,
              }}
            />
            <View>
              {item.remarks&&(
              <Text style={styles.description}>
                {expanded
                  ? item.remarks
                  : item.remarks?.slice(0, 70) +
                    (item.remarks?.length > 70 ? "..." : "")}

                {item.remarks?.length > 70 && (
                  <Text
                    style={styles.moreText}
                    onPress={() => setExpanded(expanded ? false : true)}
                  >
                    {expanded ? " Show Less" : " Read More"}
                  </Text>
                )}
              </Text>)}

              <TouchableOpacity
                onPress={() => {
                  setscrollable(false);
                }}
              >
                <Image
                  source={
                    item.cover ? { uri: ImageFormater(item.cover) } : NoImage
                  }
                  style={{
                    height: vs(200),
                    width: hs(350),
                    borderRadius: ms(10),
                    resizeMode: "cover",
                    alignSelf: "center",
                    backgroundColor: "gray",
                  }}
                />

                <View
                  style={{
                    position: "absolute",
                    bottom: vs(5),
                    left: hs(10),
                    right: hs(10),
                    alignItems: "center",
                  }}
                  className="flex-row justify-between"
                ></View>
                <View
                  style={{
                    position: "absolute",
                    top: vs(5),
                    right: hs(10),
                    left: hs(10),
                    alignItems: "center",
                  }}
                  className="flex-row justify-between"
                >
                  <TouchableOpacity style={{ marginLeft: "auto" }}>
                    <UnSelecteHeart />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>

              <View
                className=" bg-white flex-row  justify-between"
                style={{
                  elevation: 5,
                  borderRadius: 8,
                  paddingRight: hs(20),
                  paddingVertical: vs(10),
                  paddingHorizontal: vs(25),
                  marginTop: vs(10),
                }}
              >
             <Text style={{fontWeight:600,fontSize:ms(15),fontFamily: "PopinRegula",}}>{item.sale_posts} Sale ads</Text>
             <Text style={{fontWeight:600,fontSize:ms(15),fontFamily: "PopinRegula",}}>{item.rent_posts} Rent ads</Text>
              </View>

              <View
                className="flex-row justify-between"
                style={{
                  backgroundColor: Colors.light.lightGray,
                  borderRadius: 8,
                  paddingRight: hs(20),
                  paddingVertical: vs(5),
                  paddingHorizontal: hs(10),
                  marginTop: vs(8),
                }}
              >
                <TouchableOpacity>
                  <Mail />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Call />
                </TouchableOpacity>

                <CircleImage
                  source={{ uri: ImageFormater(item.logo) }}
                  Size={40}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };
  return (
      <View style={{ flex: 1, marginBottom: insets.bottom }}>
         {!initialLoadDone ? (
            <ActivityIndicator size="large" style={{ marginTop: 20 }} />
          ) : data.length > 0 ? (
            <LegendList
              data={data}
              scrollEnabled={scrollable}
              ref={listRef}
              renderItem={renderItem}
              keyExtractor={(item, index) =>
                `${item.post_property_id || item.post_community_id}-${index}`
              }
              onEndReached={() => {
                if (!isfetching && hasmore) setPage((prev) => prev + 1);
              }}
              onEndReachedThreshold={0.8}
              ListFooterComponent={
                isfetching ? <ActivityIndicator size="small" /> : null
              }
              refreshControl={
                <RefreshControl
                  refreshing={isfetching}
                  onRefresh={() => setPage(1)}
                />
              }
            />
          ) : (
            <Text style={{ textAlign: "center", marginTop: 20, fontFamily: 'PopinRegular', }}>
              No Data Found
            </Text>
          )}
    
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
    fontWeight: "bold",fontFamily: "PopinRegula",
  },
  uperSection: {
    marginLeft: hs(10),
  },
  description: {
    marginVertical: vs(10),
    fontWeight: 500,
    color: Colors.light.textGray,
    fontFamily: "PopinRegula",
  },
  moreText: {
    color: Colors.light.DarkGreen,
    fontWeight: "600",
    fontFamily: "PopinRegula",
  },
  card2: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: vs(15),
    paddingHorizontal: hs(15),
    marginTop: vs(10),
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
