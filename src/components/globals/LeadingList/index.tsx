import Picture from "@assets/SideBar/agent.svg";
import { LegendList } from "@legendapp/list";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
const index = () => {
  const { width } = Dimensions.get("window");

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<any>(null);
  const data = [
    {
      id: 0,
      title: "Red Cap Plumbing. Air & Electric",
      name: "Tampa",
      picture: Picture,
    },
    {
      id: 1,
      title: "Red Cap Plumbing. Air & Electric",
      name: "Tampa",
      picture: Picture,
    },
    {
      id: 2,
      title: "Red Cap Plumbing. Air & Electric",
      name: "Tampa",
      picture: Picture,
    },
  ];
  const renderItem = ({ item }) => {
    return (
      <View className="flex-1 bg-white ">
        <View className="flex-row" style={styles.card}>
          <Picture />
          <View>
            <Text>{item.title}</Text>
            <Text>{item.name}</Text>
          </View>
        </View>
      </View>
    );
  };
  const onScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  return (
    <View>
      <LegendList
        ref={scrollRef}
        data={data}
        renderItem={renderItem}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
      <View style={styles.dotsContainer}>
        {data.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { backgroundColor: i === activeIndex ? "#000" : "#ccc" },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
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
    backgroundColor:Colors.light.lightGray,
    borderWidth:ms(1),
    borderColor:Colors.light.textGray
  },
});
