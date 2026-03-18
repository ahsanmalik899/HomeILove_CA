import { useGetHomeFeedsQuery } from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import PostDesign from "@src/components/globals/PostDesign/PostDesign";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const NewsFeeds = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [Posts, setPosts] = useState<[]>([]);
  const user = useAppSelector(userdata);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const filter = [
    { id: 1, name: "All" },
    { id: 2, name: "Community" },
    { id: 3, name: "Agents" },
    { id: 4, name: "Builders" },
    { id: 5, name: "Mortgages" },
    { id: 6, name: "Electricians" },
    { id: 7, name: "Decor" },
    { id: 8, name: "Plumbers" },
    { id: 9, name: "Painters" },
    { id: 10, name: "Investors" },
  ];

  const renderFilterItem = ({ item }) => {
    const isActive = selectedFilter === item.name;

    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedFilter(item.name);
          setPage(1);
        }}
        style={[styles.filterChip, isActive && styles.filterChipActive]}
      >
        <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const { data, isFetching, refetch, isError, error } = useGetHomeFeedsQuery({
    id: user.id,
    type: selectedFilter,
    page,
    limit,
  });

  useEffect(() => {
    if (!data?.data?.feed) return;

    setPosts((prev) => {
      if (page === 1) {
        return data?.data?.feed;
      } else {
        return [...prev, ...data?.data?.feed];
      }
    });
  }, [data]);
  return (
    <View className="bg-white flex-1">
      <View style={styles.filterContainer}>
        <Text style={styles.sortText}>Sort by</Text>

        <FlatList
          data={filter}
          renderItem={renderFilterItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}
        />
      </View>

      <PostDesign data={Posts} isfetching={isFetching} setPage={setPage} refetch={refetch} setData={setPosts} />
    </View>
  );
};
const styles = StyleSheet.create({
  filterContainer: {
    backgroundColor:  "#F4F0F0",
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
    fontFamily: "PopinRegula",
  },

  filterList: {
    paddingHorizontal: 12,
  },

  filterChip: {
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: Colors.light.lightGray,
    marginRight: 8,
  },

  filterChipActive: {
    backgroundColor: Colors.light.red,
  },
  filterText: {
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
    fontFamily: "PopinRegula",
  },

  filterTextActive: {
    color: "#fff",
    fontWeight: "600",
    fontFamily: "PopinRegula",
  },
});

export default NewsFeeds;
