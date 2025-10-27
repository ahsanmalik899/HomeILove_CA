import { useGetMYPostsQuery } from "@/store/api/user/MainApi";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import YourAdsPostDesign from "@src/components/globals/YourAdsPostDesign";
import { hs, vs } from "@utils/design/design";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const index = () => {
  const [page, setPage] = useState(1);
  const { type } = useLocalSearchParams();
  const [Posts, setPosts] = useState<[]>([]);
  const { data, isFetching, refetch, isError, error } = useGetMYPostsQuery({
    type,
    userid: 492,
  });
  console.log(data)
  useEffect(() => {
    refetch();
  }, [page]);
  useEffect(() => {
    if (!data?.result?.feed) return;

    setPosts((prev) => {
      if (page === 1) {
        return data?.result?.feed;
      } else {
        return [...prev, ...data?.result?.feed];
      }
    });
  }, [data]);
  return (
    <View className="flex-1 bg-white">
      <HeaderWithBack title={type + " Listing"} />
      <View>
        <View style={{ paddingHorizontal: hs(20) }}>
          <Text style={{ fontWeight: 500, marginTop: vs(10) }}>
            Your ads by:
          </Text>
          <Text>Agent</Text>
        </View>
        <YourAdsPostDesign
          data={Posts}
          isfetching={isFetching}
          setPage={setPage}
        />
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
