import { FlashList } from "@shopify/flash-list";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { ImageFormater } from "@utils/ImageFormat";
import { useRef, useState } from "react";
import { ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CircleImage from "../CircleImage/CircleImage";
import ProfileSingleView from "../ProfileSingleView";

const Index = ({ data = [] ,isFetching}: { data?: any[],isFetching:boolean }) => {
 

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<any>(null);
   const [singleView, setSingleView] = useState(false);
       const[profileData,setProfileData] = useState<any>({}) 
         const openProfileModal = async(item: any) => {
      setProfileData({
      type: item.type,
      id: item.id,
      userid:item.users_id,
      });
      setSingleView(true);
    };
const renderItem = ({ item }: any) => {
  return (
    <TouchableOpacity style={{ width:hs(330), paddingHorizontal: hs(10),height:vs(280) }} onPress={()=>{openProfileModal(item),console.log(item)}}>

      <View style={styles.mainCard}>

              <ImageBackground
          source={{ uri: ImageFormater(item.cover) }}
          style={styles.coverContainer}
          imageStyle={{ borderTopLeftRadius: 18, borderTopRightRadius: 18 }}
        >
        
          <View style={styles.logoContainer}>
            <CircleImage
              source={{ uri: ImageFormater(item.logo) }}
              Size={70}
            />
          </View>
       </ImageBackground>

        <View style={styles.content}>
          
          <Text numberOfLines={1} style={styles.businessName}>
            {item.business_name}
          </Text>

          <Text style={styles.location}>
            📍 {item.city}, {item.state}
          </Text>
          <View style={styles.ratingRow}>
            <Text style={styles.star}>⭐</Text>
            <Text style={styles.ratingText}>
              {Number(item.rating).toFixed(1)} ({item.total_reviews} reviews)
            </Text>
          </View>

        </View>
      </View>
    </TouchableOpacity>
  );
};
  const renderLoadingItem = (_, i: number) => {
    return (
      <View
        key={i}
        style={{
          width: hs(330),
          paddingHorizontal: hs(10),
          height: vs(280),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.skeletonCard}>
          <View style={styles.skeletonCover} />
          <View style={styles.skeletonLogo} />
          <View style={styles.skeletonText} />
          <View style={[styles.skeletonText, { width: "50%" }]} />
        </View>
      </View>
    );
  };

  const onScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / hs(300));
    setActiveIndex(index);
  };

  return (
    <View className="flex-1">
    <FlashList
  ref={scrollRef}
  data={
    isFetching
      ? Array(3).fill({})
      : Array.isArray(data)
      ? data
      : []
  }
  renderItem={renderItem}
  horizontal
  keyExtractor={(item, i) =>
    item?.id ? item.id.toString() : i.toString()
  }
  pagingEnabled
  showsHorizontalScrollIndicator={false}
  onScroll={onScroll}
/>

  
      <View style={styles.dotsContainer}>
        {(Array.isArray(data) ? data : []).map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { backgroundColor: i === activeIndex ? "#000" : "#ccc" },
            ]}
          />
        ))}
      </View>
       <Modal
                  visible={singleView}
                  animationType="slide"
                  onRequestClose={() => setSingleView(false)}
                  transparent={true}
                  statusBarTranslucent={true}
                >
                              <SafeAreaView
                                                                                                    style={{ flex: 1 }}
                                                                                                    edges={[ "bottom", "left", "right"]}
                                                                                                  >
           <ProfileSingleView id={profileData?.id} type={profileData?.type} setshowModel={setSingleView}/>
           </SafeAreaView>
                </Modal>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
   
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  card: {
    marginHorizontal: hs(10),
    marginVertical: vs(10),
    paddingHorizontal: hs(15),
    paddingVertical: vs(15),
    borderRadius: ms(8),
    backgroundColor: Colors.light.lightGray,
    borderWidth: ms(1),
    borderColor: Colors.light.textGray,
  },
   mainCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    marginVertical: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },

  coverContainer: {
    height: 120,
    backgroundColor: "#eee",
  },

  cover: {
    width: "100%",
    height: 120,
  },

  logoContainer: {
    position: "absolute",
    bottom: -35,
    left: 20,
    borderWidth: 3,
    borderColor: "#fff",
    borderRadius: 50,
  },

  content: {
    paddingTop: 45,
    paddingBottom: 18,
    paddingHorizontal: 18,
  },

  businessName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    fontFamily: "PopinRegula",
  },

  location: {
    color: "#666",
    marginTop: 4,
    fontFamily: "PopinRegula",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  star: {
    fontSize: 16,
    marginRight: 4,
  },

  ratingText: {
    color: "#444",
    fontWeight: "600",
    fontFamily: "PopinRegula",
  },

  services: {
    marginTop: 8,
    color: "#777",
    lineHeight: 18,
    fontFamily: "PopinRegula",
  },
  skeletonCard: {
    width: "100%",
    height: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 18,
    padding: 16,
  },
  skeletonCover: {
    height: 120,
    backgroundColor: "#ccc",
    borderRadius: 12,
  },
  skeletonLogo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#bbb",
    position: "absolute",
    bottom: 50,
    left: 20,
    borderWidth: 3,
    borderColor: "#e0e0e0",
  },
  skeletonText: {
    height: 16,
    backgroundColor: "#ccc",
    borderRadius: 8,
    marginTop: 8,
    fontFamily: "PopinRegula",
  },
});
