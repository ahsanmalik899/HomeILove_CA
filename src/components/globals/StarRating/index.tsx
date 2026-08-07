import FilledStar from "@assets/icons/Star/star-filled.svg";
import HollowStar from "@assets/icons/Star/star-not-filled.svg";
import React, { useMemo } from "react";
import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";

type StarRatingProps = {
  rating: number;
  size?: number;
  onRatingChange?: (rating: number) => void;
  disabled?: boolean;
};

const TOTAL_STARS = 5;

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 24,
  onRatingChange,
  disabled = false,
}) => {
  const validRating = useMemo(() => {
    if (!Number.isFinite(rating)) {
      return 0;
    }

    return Math.max(0, Math.min(TOTAL_STARS, Math.floor(rating)));
  }, [rating]);

  const handleRatingPress = (selectedRating: number) => {
    if (disabled || !onRatingChange) {
      return;
    }

    // User hamesha 1 se 5 ke darmiyan rating select karega.
    const safeRating = Math.max(1, Math.min(TOTAL_STARS, selectedRating));

    onRatingChange(safeRating);
  };

  return (
    <View
      style={styles.starContainer}
      accessibilityRole="radiogroup"
      accessibilityLabel="Select rating"
    >
      {Array.from({ length: TOTAL_STARS }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= validRating;

        return (
          <Pressable
            key={starValue}
            disabled={disabled || !onRatingChange}
            onPress={() => handleRatingPress(starValue)}
            hitSlop={8}
            accessibilityRole="radio"
            accessibilityLabel={`${starValue} star${
              starValue > 1 ? "s" : ""
            }`}
            accessibilityState={{
              checked: starValue === validRating,
              disabled: disabled || !onRatingChange,
            }}
            style={({ pressed }) => [
              styles.starButton,
              pressed &&
                !disabled &&
                onRatingChange &&
                styles.pressedStar,
            ]}
          >
            {isFilled ? (
              <FilledStar height={size} width={size} />
            ) : (
              <HollowStar height={size} width={size} />
            )}
          </Pressable>
        );
      })}
    </View>
  );
};

export default StarRating;

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  starButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  pressedStar: {
    opacity: 0.6,
    transform: [{ scale: 0.92 }],
  },
});