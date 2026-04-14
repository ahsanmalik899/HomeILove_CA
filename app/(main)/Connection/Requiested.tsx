import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useGetReceivedRequestsApiQuery, useGetSentRequestsApiQuery } from '@/store/api/user/MainApi';
import { userdata } from '@/store/slices/selector/user';
import { LegendList } from "@legendapp/list";
import CircleImage from "@src/components/globals/CircleImage/CircleImage";
import FollowButton from "@src/components/globals/FollowButton";
import Loading from "@src/components/globals/Loading";
import StarRating from '@src/components/globals/StarRating';
import TablikeButton from '@src/components/globals/TablikeButton';
import { useAppSelector } from '@src/hooks/useReduxHooks';
import { hs, vs } from '@utils/design/design';
import { ImageFormater } from "@utils/ImageFormat";

const RequestsScreen = () => {
  const user = useAppSelector(userdata);
  const [value, setValue] = useState("Recieved");

  const { data: sentData,isFetching:sentFetching } = useGetSentRequestsApiQuery({ id: user.id });
  const { data: recivedData,isFetching:recivedFetching } = useGetReceivedRequestsApiQuery({ id: user.id });

  /* ===== Render Each Request Item ===== */
  const renderRequestItem = ({ item }) => {
    const profile = item.profile || {};
    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <CircleImage source={{ uri: ImageFormater( profile.logo) }} Size={45} />
          <View style={{ marginLeft: hs(10), flex: 1 }}>
            <Text style={styles.name}>{profile.business_name || profile.name}</Text>
            <Text style={{fontFamily: "PopinRegula",}}>{profile.city}, {profile.zip}</Text>
            <Text style={{ marginTop: vs(3) ,fontFamily: "PopinRegula",}}>Dealing Areas: {profile.dealing_areas || "-"}</Text>
            <View style={styles.ratingRow}>
              <StarRating rating={parseFloat(profile.rating) || 0} size={16} />
              <Text style={{ marginLeft: hs(5) ,fontFamily: "PopinRegula",}}>{parseFloat(profile.rating).toFixed(1)}/5</Text>
            </View>
          
          </View>
        </View>

        <View style={{ marginTop: vs(10) }}>
          <FollowButton id={item.receiver_id} onPress={()=>{}} status={item.status} />
        </View>
      </View>
    );
  };

  const receivedComponent = (
    <LegendList
      data={recivedData?.data || []}
      renderItem={renderRequestItem}
      keyExtractor={(item) => item.connection_id.toString()}
      estimatedItemSize={140}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<Text style={{ marginTop: vs(10),fontFamily: "PopinRegula", }}>No Received Requests</Text>}
    />
  );

  const sentComponent = (
    <LegendList
      data={sentData?.data || []}
      renderItem={renderRequestItem}
      keyExtractor={(item) => item.connection_id.toString()}
      estimatedItemSize={140}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<Text style={{ marginTop: vs(10),fontFamily: "PopinRegula", }}>No Sent Requests</Text>}
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white", marginHorizontal: hs(10) }}>
      <TablikeButton
        btn1value="Recieved"
        btn2value="Sended"
        btnTxt1="Recieved"
        btnTxt2="Sended"
        onPress={(val) => setValue(val)}
        value={value}
        Componet1={receivedComponent}
        Componet2={sentComponent}
      />
      <Loading isLoading={recivedFetching||sentFetching} text="Loading..."/>
    </View>
  );
};

export default RequestsScreen;

const styles = StyleSheet.create({
  card: { padding: 12, marginVertical: 8, backgroundColor: "#fff", borderRadius: 12, elevation: 2 },
  row: { flexDirection: "row", alignItems: "center" },
  name: { fontSize: 16, fontWeight: "600",fontFamily: "PopinRegula", },
  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: vs(5) },
  button: {
    backgroundColor: "#0f9d58",
    paddingVertical: vs(8),
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600",fontFamily: "PopinRegula", },
});