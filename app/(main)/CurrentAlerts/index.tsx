import { useGetNotificationsQuery, useMarkAllAsSeenMutation, useMarkReadMutation } from "@/store/api/user/MainApi";
import { setNotificationCount } from "@/store/slices/Notification";
import { userdata } from "@/store/slices/selector/user";
import { LegendList } from "@legendapp/list";
import CircleImage from "@src/components/globals/CircleImage/CircleImage";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import Colors from "@src/constants/Colors";
import { socket } from "@src/socket";
import { vs } from "@utils/design/design";
import { ImageFormater } from "@utils/ImageFormat";
import { timeAgo } from "@utils/Timeago";
import { router } from "expo-router";
import { useEffect, useState } from "react";
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
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(setNotificationCount(0));

    const markSeen = async () => {
      if (user?.id) {
        await markAllAsSeen({ user_id: user.id });
      }
    };

    markSeen();
  }, []);

  const [sqlNotifications, setSqlNotifications] = useState<any[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);

  const [markRead] = useMarkReadMutation();

  const handlePress = async (item: any) => {
    if (!item.is_read) {
      await markRead({
        id: item.id,
        user_id: user?.id,
      });
    }
    if (item.app_url === "/(main)/Inquires/chat") {
      router.push({ pathname: "/(main)/Inquires", params: { post_id: item.post_id, userId: item.sender_id, name: item.sender_name, inquierychat: "1", sender_image: item.sender_logo } });
    }
    else if (item.app_url === "/NewsFeedSingelView") {
      router.push({ pathname: "/Home/Feeds/NewsFeed", params: { post_id: item.post_id,isPostSingle:"true"} });
    }else if(item.app_url === "/BuyListing"){
      router.push({ pathname: "/BuyListing", params: { id: item.post_id,isSingleView:"true",type:item.receiver_type} });
    }
    else if(item.app_url === "/CommunitesLising"){
      router.push({ pathname: "/CommunitesLising", params: { id: item.post_id,isSingleView:"true",type:item.receiver_type} });
    }
    else if(item.app_url==="/ChatScreen"){
       router.push({ pathname: "/Home/Message"});
    }
    else {
      router.push({ pathname: item.app_url, params: { post_id: item.post_id, userId: item.sender_id, name: item.sender_name } });
    }

  };

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
    const {data:notificationsdata,isLoading:notificationLiading}=  useGetNotificationsQuery({
        user_id: user.id,
        page: page
      });
useEffect(() => {
  if (!notificationsdata) return;

  if (notificationsdata.current_page === 1) {
    setSqlNotifications(notificationsdata.data.data);
  } else {
    setSqlNotifications(prev => [
      ...prev,
      ...notificationsdata.data.data,
    ]);
  }

  setHasMore(notificationsdata.has_more);
  setInitialLoading(false);
}, [notificationsdata]);
useEffect(() => {
    if (!user?.id) return;

    socket.emit("join", String(user.id));

    const onNotification = (notification: any) => {

        if (notification.receiver_id != user.id) return;

        setSqlNotifications(prev => {

            if (prev.some(x => x.id == notification.id)) {
                return prev;
            }

            return [notification, ...prev];
        });

        dispatch(setNotificationCount(prev => prev + 1));

    };

    socket.on("newNotification", onNotification);

    return () => {
        socket.off("newNotification", onNotification);
    };

}, [user?.id]);
useEffect(() => {
  console.log("notificationsdata", notificationsdata);
}, [notificationsdata]);
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => handlePress(item)}
      style={{ marginVertical: vs(2),backgroundColor:item.is_read? "white" : Colors.light.LightGreen }}
      className={`flex-row items-center p-4 border-b border-gray-100 `}
    >
      <CircleImage source={{
        uri: ImageFormater(item.sender_logo),
      }} Size={40} />

      {/* Text */}
      <View className="flex-1 ml-3">
        <Text className="font-semibold text-black" style={{ fontFamily: "PopinRegula", }}>
          {item.sender_name}
        </Text>

        <Text className="text-gray-600" style={{ fontFamily: "PopinRegula", }}>
          {item.data}
        </Text>

        <Text className="text-xs text-gray-400 mt-1" style={{ fontFamily: "PopinRegula", }}>
          {(() => {
            const timeObj = item.created_at || item.timestamp;
            if (!timeObj) return "";
            if (typeof timeObj === 'string') return timeAgo(timeObj);
            if (timeObj.toDate) return timeAgo(timeObj.toDate());
            if (timeObj.seconds) return timeAgo(new Date(timeObj.seconds * 1000));
            return String(timeAgo(timeObj));
          })()}
        </Text>
      </View>

      {!item.is_read && (
        <View className="w-3 h-3 rounded-full" style={{backgroundColor:Colors.light.red}} />
      )}
    </TouchableOpacity>
  );


  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: "white" }}>
      <HeaderWithBack title="Current Notifications" />
      {(initialLoading ||notificationLiading)? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>) : (
        <View className="mt-4 flex-1">
          <LegendList
            data={sqlNotifications}
            renderItem={renderItem}
            estimatedItemSize={80}
            refreshing={false}
            keyExtractor={(item) => item.id.toString()}
           onEndReached={() => {
  setPage(prev=>prev+1)
}}
          />
        </View>)}
    </View>

  );
};

export default Index;