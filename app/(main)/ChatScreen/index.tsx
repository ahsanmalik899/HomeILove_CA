import {
    useGetMessagesApiQuery,
    useMarkAsReadApiMutation,
    useSendMessageApiMutation
} from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import { LegendList } from "@legendapp/list";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const ChatScreen = () => {

  const { userId, name } = useLocalSearchParams();
  const user = useAppSelector(userdata);
const [markAsRead] = useMarkAsReadApiMutation();
  const [message, setMessage] = useState("");

  const { data, refetch } = useGetMessagesApiQuery({
    userId: user.id,
    chatUserId: userId
  });
useEffect(() => {

  markAsRead({
    user_id: user.id,
    chat_user_id: userId
  });

}, []);
  const [sendMessage] = useSendMessageApiMutation();

 const messages = (data?.data?.data || []).slice().reverse();

  const handleSend = async () => {
    if (!message) return;

    await sendMessage({
      sender_id: user.id,
      sender_name: user.name,
      receiver_id: userId,
      receiver_name: name,
      content: message
    });

    setMessage("");
    refetch();
  };

  const renderItem = ({ item }: any) => {

    const isMe = item.sender_id == user.id;

    return (
      <View
        className={`px-4 py-2 ${
          isMe ? "items-end" : "items-start"
        }`}
      >
        <View
          className={`px-3 py-2 rounded-lg `}
          style={{backgroundColor: isMe ? Colors.light.DarkGreen : Colors.light.textGray}}
        >
          <Text className={`${isMe ? "text-white" : "text-black"}`}>
            {item.content}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
   <HeaderWithBack />
      <LegendList
        data={messages}
        renderItem={renderItem}
        estimatedItemSize={60}
       
      />

      <View className="flex-row p-3 border-t border-gray-200">
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type message..."
          className="flex-1 border rounded-full px-4 py-2"
        />

        <TouchableOpacity
          onPress={handleSend}
          className="ml-2  px-4 justify-center rounded-full"
          style={{backgroundColor:Colors.light.DarkGreen}}
        >
          <Text className="text-white">Send</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default ChatScreen;