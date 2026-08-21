import FilledStar from "@assets/icons/Star/star-filled.svg";
import HollowStar from "@assets/icons/Star/star-not-filled.svg";
import { TouchableOpacity, View } from "react-native";

interface Props {
  rating: number;
  setRating: (rating: number) => void;
  size?: number;
}

const index = ({ rating, setRating, size }: Props) => {
  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= rating;

        return (
          <TouchableOpacity 
           activeOpacity={1}
           key={star} onPress={() => setRating(star)}>
            {filled ? (
              <FilledStar height={size} width={size} key={index} />
            ) : (
              <HollowStar height={size } width={size } key={index}/>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default index;
