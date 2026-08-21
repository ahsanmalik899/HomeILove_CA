import { useGetMyTrendingProfilesQuery } from '@/store/api/user/MainApi'
import { userdata } from '@/store/slices/selector/user'
import HeaderWithBack from '@src/components/globals/HeaderWithBack'
import Colors from '@src/constants/Colors'
import { useAppSelector } from '@src/hooks/useReduxHooks'
import { hs, ms, vs } from '@utils/design/design'
import { ImageFormater } from '@utils/ImageFormat'
import { router } from 'expo-router'
import { useState } from 'react'
import {
  FlatList,
  Image,
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


const AgentCard = ({ item }: { item: any }) => {
  const services = item.services?.split(",") ?? [];

  return (
    <TouchableOpacity
     activeOpacity={1}
      style={{ width: "100%", paddingHorizontal: hs(10), marginBottom: vs(20) }}
   
     
    >
      <View style={styles.card}>

        {/* ── Cover ── */}
        <View style={styles.cover}>
          <ImageBackground
            source={{ uri: ImageFormater(item.cover) }}
            style={StyleSheet.absoluteFill}
            imageStyle={{ borderTopLeftRadius: 18, borderTopRightRadius: 18 }}
          />
          {/* dark scrim so badge stays readable */}
          <View style={styles.coverScrim} />

          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>● {item.status}</Text>
          </View>

          <View style={styles.logoWrap}>
            <Image source={{ uri: ImageFormater(item.logo)||"" }} style={{ width: 56, height: 56 }} />
          </View>
        </View>

        {/* ── Body ── */}
        <View style={styles.body}>

          {/* Name + type pill */}
          <View style={styles.topRow}>
            <Text numberOfLines={1} style={styles.name}>
              {item.business_name}
            </Text>
            <View style={styles.typePill}>
              <Text style={styles.typePillText}>
                {item.user_type?.toUpperCase()}
              </Text>
            </View>
          </View>

          {/* Location */}
          <Text style={styles.location}>
            📍 {item.city}
            {item.state ? `, ${item.state}` : ""}
            {"  ·  "}
            {item.dealing_areas ?? "N/A"}
          </Text>

          {/* Stats row */}
          <View style={styles.statsRow}>
            {[
              { label: "Rating", value: `⭐ ${Number(item.rating).toFixed(1)}` },
              { label: "Reviews", value: item.total_reviews },
              { label: "Ad life", value: `${item.ad_life}d` },
            ].map((s) => (
              <View key={s.label} style={styles.statBox}>
                <Text style={styles.statVal}>{s.value}</Text>
                <Text style={styles.statLbl}>{s.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          {/* Service tags */}
          <View style={styles.tagsRow}>
            {services.slice(0, 3).map((svc: string) => (
              <View key={svc} style={styles.tag}>
                <Text style={styles.tagText} numberOfLines={1}>
                  {svc.trim()}
                </Text>
              </View>
            ))}
          </View>
        </View>
{/* Expiry row */}
<View style={styles.expiryRow}>
  <Text style={styles.expiryIcon}>🗓</Text>
  <Text style={styles.expiryText}>
    Expires on{" "}
    <Text style={styles.expiryDate}>
      {new Date(item.expiry_date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}
    </Text>
  </Text>
</View>
        {/* ── Footer ── */}
        <View style={styles.footer}>
         
          <TouchableOpacity style={styles.btnPrimary}  
           activeOpacity={1}
             onPress={() =>
        router.navigate({
          pathname: "/ProfileSigleView",
          params: { type: item.type, id: item.id },
        })
      }>
            <Text style={styles.btnPrimaryText}>View Profile</Text>
          </TouchableOpacity>
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
          renderItem={AgentCard}
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


  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: vs(5),
  },
expiryRow: {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
  marginHorizontal:hs(10),
  marginBottom: vs(10),
},
expiryIcon: { fontSize: 13 },
expiryText: { fontSize: 12, color: "#6B7280" },
expiryDate: { fontWeight: "600", color: "#111" },
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: "#E5E7EB",
  },

  /* cover */
  cover: {
    height: vs(110),
    backgroundColor: Colors.light.DarkGreen,
    position: "relative",
    justifyContent: "flex-end",
  },
  coverScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  statusBadge: {
    position: "absolute",
    top: 12, right: 12,
    backgroundColor: "rgba(255,255,255,0.22)",
    paddingHorizontal: 10, paddingVertical: 3,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.4)",
  },
  statusText: { color: "#fff", fontSize: 11, fontWeight: "500" },
  logoWrap: {
    position: "absolute",
    bottom: -28, left: 18,
    width: 60, height: 60,
    borderRadius: 14,
    backgroundColor: "#fff",
    padding: 2,
    borderWidth: 2,
    borderColor: "#fff",
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },

  /* body */
  body: { paddingTop: vs(36), paddingHorizontal: hs(16), paddingBottom: vs(12) },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  name: { fontSize: 17, fontWeight: "600", color: "#111", flex: 1, marginRight: 8 },
  typePill: {
    backgroundColor: "#E1F5EE", paddingHorizontal: 10,
    paddingVertical: 3, borderRadius: 20,
  },
  typePillText: { fontSize: 11, fontWeight: "600", color: "#0F6E56" },
  location: { fontSize: 13, color: "#6B7280", marginTop: 6, marginBottom: vs(14) },

  /* stats */
  statsRow: { flexDirection: "row", gap: 8 },
  statBox: {
    flex: 1, backgroundColor: "#F9FAFB",
    borderRadius: 10, padding: 10, alignItems: "center",
  },
  statVal: { fontSize: 15, fontWeight: "600", color: "#111" },
  statLbl: { fontSize: 11, color: "#9CA3AF", marginTop: 2 },

  divider: { height: 0.5, backgroundColor: "#E5E7EB", marginVertical: vs(12) },

  /* tags */
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  tag: {
    backgroundColor: "#F3F4F6", paddingHorizontal: 10,
    paddingVertical: 4, borderRadius: 20,
    borderWidth: 0.5, borderColor: "#E5E7EB",
  },
  tagText: { fontSize: 11, color: "#6B7280" },

  /* footer */
  footer: {
    flexDirection: "row", gap: 8,
    paddingHorizontal: hs(16), paddingVertical: vs(12),
    borderTopWidth: 0.5, borderTopColor: "#E5E7EB",
  },
  btnSecondary: {
    width: 44, height: 44,
    backgroundColor: "#F3F4F6",
    borderRadius: 10, alignItems: "center", justifyContent: "center",
    borderWidth: 0.5, borderColor: "#E5E7EB",
  },
  btnSecondaryText: { fontSize: 18 },
  btnPrimary: {
    flex: 1, height: 44,
    backgroundColor: Colors.light.DarkGreen,
    borderRadius: 10, alignItems: "center", justifyContent: "center",
  },
  btnPrimaryText: { color: "#fff", fontSize: 14, fontWeight: "600" },
});
export default Index