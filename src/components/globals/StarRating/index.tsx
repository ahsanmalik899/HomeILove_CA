import FilledStar from "@assets/icons/Star/star-filled.svg";
import HollowStar from "@assets/icons/Star/star-not-filled.svg";
import React from "react";
import { StyleSheet, View } from "react-native";

type StarRatingProps = {
  rating: number;
  size: number;
};

const StarRating: React.FC<StarRatingProps> = ({ rating, size }) => {
  const validRating = Math.max(0, Math.min(5, rating));

  return (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((index) => {
        return index <= validRating ? (
          <FilledStar height={size } width={size } key={index} />
        ) : (
          <HollowStar key={index} height={ size } width={ size } />
        );
      })}
    </View>
  );
};

export default StarRating;

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: "row",
    gap: 4, 
  },
});
