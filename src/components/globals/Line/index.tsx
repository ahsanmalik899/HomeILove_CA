import { vs } from "@utils/design/design";
import { View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const index = () => {
  return (
    <View
      style={{
        height: vs(1),
        marginBottom: vs(10),
        backgroundColor: Colors.light.textGray,
        opacity: 0.2,
      }}
    />
  );
};

export default index;
