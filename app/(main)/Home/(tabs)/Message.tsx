import { useGetChatListApiQuery } from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import { LegendList } from "@legendapp/list";
import CircleImage from "@src/components/globals/CircleImage/CircleImage";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { ImageFormater } from "@utils/ImageFormat";
import { router } from "expo-router";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const Index = () => {

  const user = useAppSelector(userdata);

  const { data, isLoading, refetch } =
    useGetChatListApiQuery({id:user.id});

  const chats = data?.data || [];

  const openChat = (item: any) => {
    router.push({
      pathname: "/ChatScreen",
      params: {
        userId: item.chat_user_id,
        name: item.chat_user_name,
      },
    });
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => openChat(item)}
      className="flex-row items-center px-4 py-3 border-b border-gray-100"
    >

      <CircleImage
       
       source={{
          uri: ImageFormater( item.profile_image)
        }}
        Size={40}
      />

      {/* Chat Info */}
      <View className="flex-1 ml-3">
        <Text className="font-semibold text-base text-black" style={{fontFamily: "PopinRegula",}}>
          {item.chat_user_name}
        </Text>

        <Text
          numberOfLines={1}
          className="text-gray-500 mt-1"
          style={{fontFamily: "PopinRegula",}}
        >
          {item.last_message}
        </Text>
      </View>

      {/* Right Side */}
      <View className="items-end">
        <Text className="text-xs text-gray-400" style={{fontFamily: "PopinRegula",}}>
          {item.last_activity}
        </Text>

        {item.unread_count > 0 && (
          <View className="bg-green-500 rounded-full min-w-[22px] h-[22px] justify-center items-center mt-1 px-1">
            <Text className="text-white text-xs" style={{fontFamily: "PopinRegula",}}>
              {item.unread_count}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">

      <LegendList
        data={chats}
        renderItem={renderItem}
        estimatedItemSize={75}
        onRefresh={refetch}
        refreshing={false}
      />
    </View>
  );
};

export default Index;


