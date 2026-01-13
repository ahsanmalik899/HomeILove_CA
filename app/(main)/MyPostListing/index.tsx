import { useGetProfilesQuery, useGetYorSalePostsQuery } from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import YourAdsPostDesign from "@src/components/globals/YourAdsPostDesign";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";


const index = () => {
  const user= useAppSelector(userdata)
    const { data:ProfilesData } = useGetProfilesQuery({ id: user.id });
  const rawType = useLocalSearchParams().type;
  const [ProfileType,SetProfilrType]=useState('');
const type = String(rawType).toLowerCase();
const [selectedFilter, setSelectedFilter] = useState(ProfileType);
const filter =
  ProfilesData?.profiles_exist
    ? Object.entries(ProfilesData.profiles_exist)
        .filter(([_, value]) => value === true)
        .map(([key], index) => ({
          id: index,
          name: key,
        }))
    : [];


 
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [posts, setPosts] = useState<[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, isFetching, isError } = useGetYorSalePostsQuery({
    type,
    per_page: perPage,
    page,
    user_id: user.id,
    profile_type:ProfileType,
  });
 const renderFilterItem = ({ item }) => {
  const isActive = selectedFilter === item.name;

  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedFilter(item.name);
        SetProfilrType(item.name);   
        setPage(1);          
      }}
      style={[
        styles.filterChip,
        isActive && styles.filterChipActive,
      ]}
    >
      <Text
        style={[
          styles.filterText,
          isActive && styles.filterTextActive,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

  useEffect(() => {
    if (!data?.data) return;

    setHasMore(data?.has_more);

    setPosts((prev) =>
      page === 1 ? data.data : [...prev, ...data.data]
    );
  }, [data]);
  return (
    <View className="flex-1 bg-white">
      <HeaderWithBack title={type + " Listing"} />
      <View className="flex-1">
        {filter.length > 0 && (
  <View style={styles.filterContainer}>
    <Text style={styles.sortText}> Your ads by:</Text>

    <FlatList
      horizontal
      data={filter}
      renderItem={renderFilterItem}
      keyExtractor={(item) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterList}
    />
  </View>
)}

      
        <YourAdsPostDesign
          data={posts}
          hasmore={hasMore}
          isfetching={isFetching}
          setPage={setPage}
          type={type}
        />
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  filterList: {
      paddingHorizontal: 12,
    },
  
    filterChip: {
      paddingVertical: 7,
      paddingHorizontal: 16,
      borderRadius: 20,
      backgroundColor: "#F2F2F2",
      marginRight: 8,
    },
  
    filterChipActive: {
      backgroundColor: Colors.light.red,
    },
    filterText: {
      fontSize: 13,
      color: "#333",
      fontWeight: "500",
    },
  
    filterTextActive: {
      color: "#fff",
      fontWeight: "600",
      
    },
     filterContainer: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  sortText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
    marginLeft: 16,
    marginBottom: 8,
  },
});
