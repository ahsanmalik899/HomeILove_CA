import { useGetNotificationsQuery, useMarkAllAsSeenMutation, useMarkReadMutation } from "@/store/api/user/MainApi";
import { setNotificationCount } from "@/store/slices/Notification";
import { userdata } from "@/store/slices/selector/user";
import { LegendList } from "@legendapp/list";
import CircleImage from "@src/components/globals/CircleImage/CircleImage";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import { vs } from "@utils/design/design";
import { ImageFormater } from "@utils/ImageFormat";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const Index = () => {

  const user = useSelector(userdata);
  const [markAllAsSeen] = useMarkAllAsSeenMutation();
 const dispatch= useDispatch()
dispatch(setNotificationCount(0));
useEffect(() => {
  const markSeen = async () => {
    if (user?.id) {
      await markAllAsSeen({ user_id: user.id });
      refetch(); 
    }
  };

  markSeen();
}, []); 
  const {
    data,
    isLoading,
    refetch,
  } = useGetNotificationsQuery({
    user_id: user?.id,
    page: 1,
  });

  const [markRead] = useMarkReadMutation();

  const notifications = data?.data?.data || [];

  const handlePress = async (item: any) => {
    if (!item.is_read) {
      await markRead({
        id: item.id,
        user_id: user?.id,
      });
    }

    
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => handlePress(item)}
      style={{marginVertical:vs(2)}}
      className={`flex-row items-center p-4 border-b border-gray-100 ${
        item.is_read ? "bg-white" : "bg-blue-50"
      }`}
    >
    <CircleImage    source={{
          uri: ImageFormater( item.sender_logo),
        }} Size={40}/>

      {/* Text */}
      <View className="flex-1 ml-3">
        <Text className="font-semibold text-black" style={{fontFamily: "PopinRegula",}}>
          {item.sender_name}
        </Text>

        <Text className="text-gray-600" style={{fontFamily: "PopinRegula",}}>
          {item.data}
        </Text>

        <Text className="text-xs text-gray-400 mt-1" style={{fontFamily: "PopinRegula",}}>
          {item.created_at}
        </Text>
      </View>

      {!item.is_read && (
        <View className="w-3 h-3 bg-blue-500 rounded-full" />
      )}
    </TouchableOpacity>
  );

 

  return (
    <View className="flex-1 bg-white" style={{backgroundColor:"#F4F0F0"}}>
      <HeaderWithBack title="Current Alerts" />
 {isLoading?( 
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>):(
  <View className="mt-4 flex-1">
      <LegendList
        data={notifications}
        renderItem={renderItem}
        estimatedItemSize={80}
        onRefresh={refetch}
        refreshing={false}
      />
          </View>)}
    </View>
    
  );
};

export default Index;