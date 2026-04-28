import { useLazyGetNotificationsQuery, useMarkAllAsSeenMutation, useMarkReadMutation } from "@/store/api/user/MainApi";
import { setNotificationCount } from "@/store/slices/Notification";
import { userdata } from "@/store/slices/selector/user";
import { LegendList } from "@legendapp/list";
import CircleImage from "@src/components/globals/CircleImage/CircleImage";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import { db } from "@src/utils/firebse";
import { vs } from "@utils/design/design";
import { ImageFormater } from "@utils/ImageFormat";
import { router } from "expo-router";
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
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
  const [triggerGetNotifications] = useLazyGetNotificationsQuery();

  useEffect(() => {
    dispatch(setNotificationCount(0));

    const markSeen = async () => {
      if (user?.id) {
        await markAllAsSeen({ user_id: user.id });
      }
    };

    markSeen();
  }, []);
  const [firebaseNotifications, setFirebaseNotifications] = useState<any[]>([]);
  const [sqlNotifications, setSqlNotifications] = useState<any[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  useEffect(() => {

    if (!user?.id) return;

    const messagesRef = collection(
      db,
      "Notification",
      String(user.id),
      "notifications"
    );

    const q = query(messagesRef, orderBy("created_at", "desc"), limit(20));

    const unsubscribe = onSnapshot(q, (snapshot) => {

      let list: any[] = [];

      snapshot.forEach(doc => {
        list.push({
          id: doc.id,
          ...doc.data()
        });
      });

      console.log("list", list);

      setFirebaseNotifications(list);
      setInitialLoading(false);

    });

    return () => unsubscribe();

  }, [user?.id]);
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
    }
    else {
      router.push({ pathname: item.app_url, params: { post_id: item.post_id, userId: item.sender_id, name: item.sender_name } });
    }

  };
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const fetchOlderNotifications = async () => {

    if (loadingMore || !hasMore) return;
    setLoadingMore(true);

    try {

      const res = await triggerGetNotifications({
        user_id: user.id,
        page: page
      }).unwrap();

      console.log("res", res);
      if (res.success || res.data) {
        const newMessages = res?.data?.data ? [...res.data.data] : res?.data ? [...res.data] : [];
        console.log("newMessages", newMessages);
        if (!newMessages || newMessages.length === 0) {
          setHasMore(false);
        } else {
          setSqlNotifications(prev => [
            ...prev,
            ...newMessages
          ]);
          setPage(prev => prev + 1);
        }
      }

    } catch (err) {
      console.error("SQL fetch error:", err);
    } finally {
      setLoadingMore(false);
    }

  };
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => handlePress(item)}
      style={{ marginVertical: vs(2) }}
      className={`flex-row items-center p-4 border-b border-gray-100 ${item.is_read ? "bg-white" : "bg-blue-50"
        }`}
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
            if (typeof timeObj === 'string') return timeObj;
            if (timeObj.toDate) return timeObj.toDate().toLocaleString();
            if (timeObj.seconds) return new Date(timeObj.seconds * 1000).toLocaleString();
            return String(timeObj);
          })()}
        </Text>
      </View>

      {!item.is_read && (
        <View className="w-3 h-3 bg-blue-500 rounded-full" />
      )}
    </TouchableOpacity>
  );

  const notifications = useMemo(() => {
    const combined = [...firebaseNotifications, ...sqlNotifications];
    const unique = [];
    const map = new Set();
    for (const item of combined) {
      if (!map.has(item.id)) {
        map.add(item.id);
        unique.push(item);
      }
    }
    return unique;
  }, [firebaseNotifications, sqlNotifications]);

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: "#F4F0F0" }}>
      <HeaderWithBack title="Current Alerts" />
      {initialLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>) : (
        <View className="mt-4 flex-1">
          <LegendList
            data={notifications}
            renderItem={renderItem}
            estimatedItemSize={80}
            refreshing={false}
            keyExtractor={(item) => item.id}
            onEndReached={() => fetchOlderNotifications()}
          />
        </View>)}
    </View>

  );
};

export default Index;