import { useGetConnectedUsersApiQuery } from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import ThreeDots from "@assets/icons/threedots.svg";
import { LegendList } from "@legendapp/list";
import CircleImage from "@src/components/globals/CircleImage/CircleImage";
import FollowButton from "@src/components/globals/FollowButton";
import Loading from "@src/components/globals/Loading";
import StarRating from "@src/components/globals/StarRating";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { ImageFormater } from "@utils/ImageFormat";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Connected = () => {
  const user = useAppSelector(userdata);
  const { data, isLoading } = useGetConnectedUsersApiQuery({
    id: user.id,
  });
  const [menuVisibleId, setMenuVisibleId] = useState(null);

  const renderItem = ({ item }) => {
    const profile = item.profile || {};

    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <CircleImage source={{ uri:ImageFormater(profile.logo) }} Size={45} />
            <View style={styles.info}>
              <Text style={styles.name}>
                {profile.business_name || profile.name}
              </Text>
              <Text style={{fontFamily: "PopinRegula"}}>{profile.city}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setMenuVisibleId(item.connection_id)}
          >
            <ThreeDots />
          </TouchableOpacity>
        </View>

        <View style={styles.details}>
          <Text style={{fontFamily: "PopinRegula"}}>Dealing Areas: {profile.dealing_areas}</Text>
          <View style={styles.rating}>
            <StarRating rating={profile.rating} size={18} />
            <Text style={{ marginLeft: 8,fontFamily: "PopinRegula", }}>{profile.rating}/5</Text>
          </View>
        </View>

        <View style={styles.follow}>
          <FollowButton id={item.user_id} onPress={()=>{}} status="accepted" />
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <LegendList
        data={data?.data || []}
        renderItem={renderItem}
        estimatedItemSize={140} 
        keyExtractor={(item) => item.connection_id.toString()}
        showsVerticalScrollIndicator={false}
      />
      <Loading isLoading={isLoading} text="Loading..."/>
    </View>
  );
};

export default Connected;

const styles = StyleSheet.create({
  card: {
    padding: 12,
    margin: 8,
    backgroundColor: "white",
    borderRadius: 12,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: { flexDirection: "row", alignItems: "center" },
  info: { marginLeft: 10 },
  name: { fontSize: 16, fontWeight: "600" ,fontFamily: "PopinRegula",},
  details: { marginTop: 10 },
  rating: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  follow: { alignItems: "flex-end", marginTop: 10 },
});
