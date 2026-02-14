import { useGetSingleProfileQuery } from "@/store/api/user/MainApi";
import Call from "@assets/Buy/call.svg";
import Heart from "@assets/icons/heart.svg";
import Share from "@assets/icons/share.svg";
import NoImage from "@assets/SideBar/no_images.png";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import StarRating from "@src/components/globals/StarRating";
import VideoSection from "@src/components/globals/ViedioSection";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { ImageFormater } from "@utils/ImageFormat";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
const index = () => {
  const params = useLocalSearchParams();
  const type = params.type as string;
  const [expanded, setExpanded] = useState(false);
  const id = Number(params.id);

  const { data, isFetching } = useGetSingleProfileQuery({ type, id });
  const latitude = parseFloat(data?.data?.user_lat);
  const longitude = parseFloat(data?.data?.user_lng);
  const showMap = !isNaN(latitude) && !isNaN(longitude);
  return (
    <ScrollView className="flex-1 bg-white">
      <View style={{ position: "relative", width: "100%" }}>
        <HeaderWithBack />
        <Image
          source={{
            uri: ImageFormater(data?.data?.cover) || undefined,
          }}
          defaultSource={NoImage}
          style={{
            height: vs(250),
            width: "100%",
            borderBottomLeftRadius: ms(20),
            borderBottomRightRadius: ms(20),
            resizeMode: "cover",
            backgroundColor: "gray",
          }}
        />
      </View>
      <View
        style={{
          marginHorizontal: hs(5),
          paddingHorizontal: hs(10),
          paddingVertical: vs(20),
          backgroundColor: Colors.light.DarkGreen,
          marginTop: vs(20),
          borderRadius: ms(20),
        }}
      >
        <Text
          style={[styles.heading,{color:'white'}]}
        >
          {data?.data?.business_name}
        </Text>
        <Text   style={[styles.info,{color:'white'}]}>{data?.data?.address}</Text>
        <Text  style={[styles.info,{color:'white',marginVertical:vs(5)}]}>
          {data?.data?.city},{data?.data?.zip},{data?.data?.state}
        </Text>
      </View>
      <View style={styles.card}>
        <Text  style={[styles.heading]}>Service for</Text>
        <Text style={[styles.info]}>{data?.data?.services}</Text>
        <Text  style={[styles.heading]}>Dealing Areas</Text>
        <View style={[styles.card,{marginBottom:vs(5)}]}>
<Text>{data?.data?.dealing_areas}</Text>
        </View>
        <View className="flex-row justify-between items-center">
        <View className="flex-row justify-between items-center">
          <Call/><Text>{data?.data?.contact}</Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text>{data?.data?.web}</Text>
        </View>
        </View>
         <View
        style={{
          height: vs(1),
          marginTop: vs(20),
          marginBottom: vs(10),
          backgroundColor: Colors.light.textGray,
          opacity: 0.2,
        }}
      />

      <View className="flex-row gap-2">
        <TouchableOpacity>
          <Heart />
        </TouchableOpacity>
        <TouchableOpacity>
          <Share />
        </TouchableOpacity>
      </View>
      </View>
     <View style={{marginHorizontal:hs(10)}}>
      <Text style={[styles.heading,{color:Colors.light.DarkGreen,marginTop:vs(20)}]}>
        ABOUT <Text style={[styles.heading,{color:Colors.light.red}]}> {data?.data?.business_name}</Text>
      </Text>
      <Text style={styles.description}>
        {expanded
          ? data?.data?.remarks
          : data?.data?.remarks?.slice(0, 70) +
            (data?.data?.remarks?.length > 70 ? "..." : "")}

        {data?.data?.remarks?.length > 70 && (
          <Text
            style={styles.moreText}
            onPress={() => setExpanded(expanded ? false : true)}
          >
            {expanded ? " Show Less" : " Read More"}
          </Text>
        )}
      </Text>
  
      {showMap && (
        <MapView
          style={{ height: vs(250), width: "100%", marginVertical: vs(10) }}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude,
              longitude,
            }}
          />
        </MapView>
      )}
      <VideoSection url={data?.data?.youtube_link} />
      <Text style={[styles.heading,{color:Colors.light.red}]}>
        Rating<Text style={{color:Colors.light.DarkGreen}}> & </Text>Reviews
      </Text>
      <Text>Ratings</Text>
      <View>
        <Text>Reviews</Text>
        <StarRating rating={0} size={30} />
      </View>
      <TouchableOpacity>Write a Review</TouchableOpacity>
      <Text>
        DEALS BY <Text></Text>
      </Text>
          </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({
  description: {
    marginVertical: vs(10),
    fontWeight: 500,
  },
  moreText: {
    color: Colors.light.DarkGreen,
    fontWeight: "600",
  },
  card: {
        backgroundColor: "white",
          borderRadius: 12,
          paddingVertical: vs(15),
          paddingHorizontal: hs(15),
          marginTop: vs(10),
          marginHorizontal:hs(5),
          elevation: 3,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
    },
       heading:{ fontSize:ms(15), fontWeight: 700, fontFamily: "PopinRegula" },
       info:{  fontFamily: "PopinRegula" }
});
