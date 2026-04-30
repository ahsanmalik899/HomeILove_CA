import { useGetMyTrendingProfilesQuery } from '@/store/api/user/MainApi'
import { userdata } from '@/store/slices/selector/user'
import CircleImage from '@src/components/globals/CircleImage/CircleImage'
import HeaderWithBack from '@src/components/globals/HeaderWithBack'
import Colors from '@src/constants/Colors'
import { useAppSelector } from '@src/hooks/useReduxHooks'
import { hs, ms, vs } from '@utils/design/design'
import { ImageFormater } from '@utils/ImageFormat'
import { router } from 'expo-router'
import { useState } from 'react'
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

const Index = () => {

  const user = useAppSelector(userdata)

  const [page, setPage] = useState(1)

  const { data, isFetching } =
    useGetMyTrendingProfilesQuery({ id: user.id })


const renderItem = ({ item }: any) => {
  return (
    <TouchableOpacity
      style={{ width:"100%", paddingHorizontal: hs(10), height: vs(320),marginBottom:vs(30) }}
      onPress={() =>
        router.navigate({
          pathname: "/ProfileSigleView",
          params: {
            type: item.type,
            id: item.id,
          },
        })
      }
    >
      <View style={styles.mainCard}>
        {/* ===== COVER IMAGE ===== */}
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
          <Text numberOfLines={1} style={styles.businessName} >
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

          <Text style={styles.dealingArea}>
            Dealing Area: {item.dealing_areas ?? "N/A"}
          </Text>

     
        </View>
      </View>
    </TouchableOpacity>
  );
};
  return (
    <View style={{ flex: 1 }}>
      <HeaderWithBack title="Promotions" />

      {data?.data?.length > 0 ? (

        <FlatList
          data={data?.data}
          keyExtractor={(item, index) =>
            index.toString()
          }
          renderItem={renderItem}
          contentContainerStyle={{
           marginHorizontal:hs(5),
           marginVertical:vs(10)

          }}
          onEndReached={() => setPage(prev => prev + 1)}
          onEndReachedThreshold={0.5}
        />

      ) : (

           <View style={{marginHorizontal:hs(20)}}>
<Text style={{marginTop:vs(20),fontSize:ms(15),fontWeight:500,fontFamily: "PopinRegula",}}>You have not promoted any of your business!
</Text>
<Text style={{marginTop:vs(10),fontFamily: "PopinRegula",}}>Why not promote your business to wider range audience nationwide</Text>
<Text style={{marginTop:vs(10),fontFamily: "PopinRegula",color:Colors.light.red}}>Why not promote your business to wider range audience nationwide</Text>
      </View>

      )}
    </View>
  )
}
const styles = StyleSheet.create({
  mainCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    elevation: 4,
    overflow: "hidden",
  },

  coverContainer: {
    width: "100%",
    height: vs(140),
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: vs(0),
  },

  logoContainer: {
    position: "absolute",
    bottom: -vs(35),
    alignItems: "center",
  },

  content: {
    marginTop: vs(40),
    paddingHorizontal: hs(15),
    paddingBottom: vs(15),
  },

  businessName: {
    fontSize: ms(16),
    fontWeight: "700",
    color: "#000",
    fontFamily: "PopinRegula",
  },

  location: {
    fontSize: ms(13),
    color: "#666",
    marginTop: vs(3),
    fontFamily: "PopinRegula",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: vs(5),
  },

  star: {
    fontSize: ms(14),
    marginRight: hs(4),
  },

  ratingText: {
    fontSize: ms(13),
    color: "#333",
    fontFamily: "PopinRegula",
  },

  dealingArea: {
    fontSize: ms(13),
    color: "#666",
    marginTop: vs(5),
    fontFamily: "PopinRegula",
  },

  promoteBtn: {
    marginTop: vs(10),
    backgroundColor: Colors.light.red,
    paddingVertical: vs(12),
    borderRadius: 12,
    alignItems: "center",
  },

  promoteText: {
    color: "#fff",
    fontSize: ms(14),
    fontWeight: "700",
    fontFamily: "PopinRegula",
  },
   emptyTitle: {
    fontSize: ms(16),
    fontWeight: "700",
    color: Colors.light.red,
    marginTop: vs(20),
    fontFamily: "PopinRegula",
  },
  emptyDesc: {
    fontSize: ms(14),
    color: "#666",
    marginTop: vs(10),
    fontFamily: "PopinRegula",
  },
});
export default Index