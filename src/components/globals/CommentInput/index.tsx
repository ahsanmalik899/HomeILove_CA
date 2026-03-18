import { usePostCommentApiMutation } from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import Send from "@assets/icons/send.svg";
import image from "@assets/test/test.jpeg";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import CircleImage from "../CircleImage/CircleImage";

const Index = ({
  postId,
  creatorId,
  refetch,
}: {
  postId: number;
  creatorId: number;
  refetch?: () => void;
}) => {

  const user = useSelector(userdata);

  const [comment, setComment] = useState("");

  const [postCommentApi, { isLoading }] =
    usePostCommentApiMutation();


  const handleSendComment = async () => {
    if (!comment.trim()) return;

    try {
      
      await postCommentApi({
        user_id: user?.id,
        post_id: postId,
        content: comment,
        creator_id: creatorId,
      });

      setComment("");
      refetch?.(); // refresh comments list
    } catch (error) {
      console.log("Comment Error:", error);
    }
  };

  return (
    <View className="flex-row items-center">

      <CircleImage source={image} Size={30} />

      <View
        className="flex-row items-center"
        style={{
          marginLeft: hs(5),
          borderRadius: ms(18),
          paddingVertical: vs(5),
          width: hs(285),
          backgroundColor: Colors.light.LightGreen,
          paddingHorizontal: hs(5),
        }}
      >
        <TextInput
          value={comment}
          onChangeText={setComment}
          style={{ width: hs(250),fontFamily: "PopinRegula", }}
          placeholderTextColor={Colors.light.DarkGreen}
          placeholder="Write Your Comment"
        />

        {/* ✅ SEND BUTTON */}
        <TouchableOpacity
          onPress={handleSendComment}
          disabled={isLoading}
        >
          <Send />
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default Index;