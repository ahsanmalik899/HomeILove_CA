import { userdata } from "@/store/slices/selector/user";
import Call from "@assets/Buy/call.svg";
import Mail from "@assets/Buy/email-open.svg";
import CommunitySatatus from "@assets/CreateProfile/construction-house.svg";
import RedHeart from "@assets/CreateProfile/heart-red.svg";
import Camera from "@assets/Feedimg/camera.svg";
import UnSelecteHeart from "@assets/Feedimg/unselected_heart.svg";
import CommunityType from "@assets/SideBar/commercialGreen.svg";
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
import ImageSlider from "../ImageSlider";
import { postDataType } from "./type";
const YourAdsPostDesign = ({
  data,
  setPage,
  isfetching,
  setposts,
  type,
  hasmore,
  initialLoadDone
}: postDataType) => {
  const [showImages, setShowImages] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const user = useAppSelector(userdata);
  const listRef = useRef<any>(null);
  const [imageNo, setImageNo] = useState(0);
  const insets = useSafeAreaInsets();
  const [scrollable, setscrollable] = useState(true);
  const renderItem = ({ item }) => {
    const [expanded, setExpanded] = useState(false);
    const openslider = (index: number) => {
      setSelectedImages(item.images || []);
      setShowImages(true);
      setscrollable(false);
      setImageNo(index);
    };
      const facts = item.imp_facts ?? item.facts ?? "";
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            router.navigate({
              pathname: "/AddSingleView",
              params: {
                type: type,
                id: item.post_community_id,
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
                    item.post_type === "Trending"
                      ? Colors.light.DarkGreen
                      : "black",
                  fontWeight: 700,
                  fontSize:ms(18),
                  fontFamily: "PopinRegula",
                }}
              >
               From $ {item.price1}
                {type === "rent" && (
                  <Text style={{ color: Colors.light.red , fontSize:ms(18),fontFamily: "PopinRegula",}}>
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

            <Text style={{ color: "black",fontWeight:700,fontFamily: "PopinRegula", }}>
              {item.community_title}
            </Text>
            <Text style={{ color: Colors.light.textGray, marginTop: vs(5),fontFamily: "PopinRegula", }}>
              {item.address}
            </Text>
             <View
                                style={{
                                  height: vs(1),
                                  marginTop: vs(5),
                                  
                                  backgroundColor: Colors.light.textGray,
                                  opacity: 0.2,
                                }}
                              />
            <View>
              
              <View style={{marginTop:vs(5)}}>
             {item.post_type === "Trending" && facts && (
  facts
    .split(",",4)
    .filter(Boolean)
    .map((fact, index) => (
      <View
        key={index}
        style={[
          {
           
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: vs(3),
          },
        ]}
      >
        <View className="flex-row gap-3 items-center">
          <RedHeart height={vs(10)} width={vs(10)} />
          <Text
            style={{
              color: Colors.light.DarkGreen,
              fontWeight: "500",
              fontFamily: "PopinRegula",
              width: hs(250),
            }}
          >
            {fact.trim()}
          </Text>
        </View>
      </View>
    ))
)}</View>

              <Text style={styles.description}>
                {expanded
                  ? item.community_details
                  : item.community_details?.slice(0, 70) +
                    (item.community_details?.length > 70 ? "..." : "")}

                {item.community_details?.length > 70 && (
                  <Text
                    style={styles.moreText}
                    onPress={() => setExpanded(expanded ? false : true)}
                  >
                    {expanded ? " Show Less" : " Read More"}
                  </Text>
                )}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setSelectedImages(item.images || []);
                  setShowImages(true);
                  setscrollable(false);
                }}
              >
                <Image
                  source={
                    item.images && item.images.length > 0
                      ? { uri: ImageFormater(item.images[0]) }
                      : NoImage
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
                >
                  <View className="flex-row items-center">
                    <Camera />
                    <Text style={{ color: "white", fontWeight: 600 ,fontFamily: "PopinRegula",}}>
                      {" "}
                      {item.images ? item.images.length : 0}
                    </Text>
                  </View>
                  {item.saleprice_type === "Reduced Price" && (
                    <Text
                      style={{
                        backgroundColor: "rgba(241, 28, 28, 0.41)",
                        paddingHorizontal: hs(8),
                        paddingVertical: vs(8),
                        color: "white",
                        fontWeight: 600,
                        borderRadius: ms(10),
                        fontFamily: "PopinRegula",
                      }}
                    >
                      {item.saleprice_type}
                    </Text>
                  )}
                </View>
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
                  {item.property_condition === "Newly build" && (
                    <Text
                      style={{
                        backgroundColor: "rgba(241, 28, 28, 0.41)",
                        paddingHorizontal: hs(8),
                        paddingVertical: vs(8),
                        color: "white",
                        fontWeight: 600,
                        borderRadius: ms(10),
                        fontFamily: "PopinRegula",
                      }}
                    >
                      {item.property_condition}
                    </Text>
                  )}
                  <TouchableOpacity style={{ marginLeft: "auto" }}>
                    <UnSelecteHeart />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              {item.post_type==="Trending"&&(
                <>
                 <LegendList
                data={item.images || []}
                horizontal
                className="flex-1"
                keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    className="mt-4 mr-2"
                    onPress={() => {
                      openslider(index);
                    }}
                  >
                    <Image
                      source={{ uri: ImageFormater(item) }}
                      style={{
                        height: vs(80),
                        width: vs(80),
                        borderRadius: ms(10),
                        resizeMode: "cover",
                        backgroundColor: "gray",
                      }}
                    />
                  </TouchableOpacity>
                )}
              />
            
            </>
              )}
             
              <View
                className=" bg-white flex-row  justify-between"
                style={{
                  elevation: 5,
                  borderRadius: 8,
                  paddingRight: hs(20),
                  paddingVertical: vs(10),
                  paddingHorizontal: vs(15),
                  marginTop: vs(10),
                }}
              >
                <>
                  <View className="flex-row items-center">
                                       <CommunityType />
                                       <Text style={{ marginLeft: vs(5),fontFamily: "PopinRegula", }}>
                                         {item.community_type}
                                       </Text>
                                     </View>
                                     <View className="flex-row items-center">
                                       <CommunitySatatus />
                                       <Text style={{ marginLeft: vs(5),fontFamily: "PopinRegula", }}>
                                         {item.community_status}
                                       </Text>
                                     </View>
                </>
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
                  source={{ uri: ImageFormater(item.posted_by.logo) }}
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
          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
              fontFamily: "PopinRegular",
            }}
          >
            No Data Found
          </Text>
        )}
  
        {showImages && (
          <ImageSlider
            imageNo={imageNo}
            images={selectedImages}
            setShowImage={(val: boolean) => {
              setShowImages(val);
              setscrollable(true);
            }}
          />
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
    fontWeight: "bold",
    fontFamily: "PopinRegula",
  },
  uperSection: {
    marginLeft: hs(10),
  },
  description: {
    marginVertical: vs(10),
    fontWeight: 500,
    color:Colors.light.textGray,
    fontFamily: '',
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
