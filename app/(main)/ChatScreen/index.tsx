import {
  useLazyGetMessagesApiQuery,
  useMarkAsReadApiMutation,
  useSendMessageApiMutation
} from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import Send from "@assets/icons/send.svg";
import { LegendList } from "@legendapp/list";
import AddSingleView from "@src/components/globals/AddSingleView";
import CircleImage from "@src/components/globals/CircleImage/CircleImage";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import ProfileSingleView from "@src/components/globals/ProfileSingleView";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { db } from "@src/utils/firebse";
import { hs, ms, vs } from "@utils/design/design";
import { ImageFormater } from "@utils/ImageFormat";
import { router, useLocalSearchParams } from "expo-router";
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";



const ChatScreen = () => {
  const { userId, name,logo,title,receiver_post_id,type} = useLocalSearchParams();
  const user = useAppSelector(userdata);
 console.log(title,receiver_post_id);
  const [markAsRead] = useMarkAsReadApiMutation();
  const [sendMessage,{isLoading:sending}] = useSendMessageApiMutation();
  const [getMessages, { isFetching }] = useLazyGetMessagesApiQuery();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

  const listRef = useRef<any>(null);
  const knownIds = useRef<Set<string>>(new Set());
  const isAtBottom = useRef(true);
 const [Showpost,setShowpost]=useState(false)
  const [Showprofile,setShowprofile]=useState(false)
  const chatId =
    Number(user.id) < Number(userId)
      ? `${user.id}-${userId}-${receiver_post_id}-${type}`
      : `${userId}-${user.id}-${receiver_post_id}-${type}`;

  useEffect(() => {
    markAsRead({ user_id: user.id, chat_user_id: userId,  receiver_post_id,
      type });
  }, []);
  useEffect(() => {
    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "desc"), limit(20));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const incoming: any[] = [];
    snapshot.forEach((doc) => {
  const data = doc.data();
  if (
    data.receiver_id == user.id &&
    data.receiver_deleted === true
  ) {
    return;
  }

  if (
    data.sender_id == user.id &&
    data.sender_deleted === true
  ) {
    return;
  }

  if (!knownIds.current.has(doc.id)) {
    knownIds.current.add(doc.id);
    incoming.push({
      id: doc.id,
      ...data,
    });
  }
});

      if (incoming.length === 0) {
        setInitialLoading(false);
        return;
      }
      incoming.sort((a, b) => a.timestamp - b.timestamp);

      setMessages((prev) => {
        const next = [...prev, ...incoming];
        if (isAtBottom.current) {
          requestAnimationFrame(() => {
            listRef.current?.scrollToEnd?.({ animated: prev.length > 0 });
          });
        }
        return next;
      });

      setInitialLoading(false);
    });

    return () => unsubscribe();
  }, [chatId]);

  const isFetchingOlder = useRef(false);

const fetchOlderMessages = useCallback(async () => {
  if (isFetchingOlder.current || !hasMore) return;
  isFetchingOlder.current = true;
  setLoadingMore(true);

  try {
    const res: any = await getMessages({
      userId: user.id,
      chatUserId: userId,
      per_page: 20,
      page,
      receiver_post_id,
      type
    }).unwrap();

    if (res.success) {
      const older: any[] = res?.data ?? [];

      if (older.length === 0) {
        setHasMore(false);
      } else {
      const fresh = older.filter((m) => {
  if (
    m.receiver_id == user.id &&
    Number(m.receiver_deleted) === 1
  ) {
    return false;
  }

  // Hide deleted messages for sender
  if (
    m.sender_id == user.id &&
    Number(m.sender_deleted) === 1
  ) {
    return false;
  }

  if (knownIds.current.has(String(m.id))) {
    return false;
  }

  knownIds.current.add(String(m.id));
  return true;
});

        if (fresh.length > 0) {
          setMessages((prev) =>
            [...fresh.slice().reverse(), ...prev].filter(Boolean)
          );
          setPage((p) => p + 1);
        } else {
          setHasMore(false);
        }
      }
    }
  } catch (err) {
    console.error("fetchOlderMessages error:", err);
  } finally {
    isFetchingOlder.current = false; 
    setLoadingMore(false);
  }
}, [hasMore, page, user.id, userId]);
  
  const handleSend = async () => {
    const content = message.trim();
    if (!content) return;
    setMessage(""); 
    await sendMessage({
      sender_id: user.id,
      sender_name: user.name,
      receiver_id: userId,
      receiver_name: name,
      content,
      title,
      receiver_post_id,
      type,
    });
  };

const renderItem = useCallback(({ item }: any) => {
  if (!item) return null;
  
  const isMe = item.sender_id == user.id;

  return (
    <View className={`px-4 py-2 ${isMe ? "items-end" : "items-start"}`}>
      <View className={`flex-row items-end gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}>

        {!isMe && (
          <CircleImage
            source={{ uri: logo ?  ImageFormater(logo?.toString()):"" }}
            Size={32}
          />
        )}

        <View
          className="px-3 py-2 rounded-lg"
          style={{
            backgroundColor: isMe ? "#02c785ff" : Colors.light.lightGray,
            maxWidth: "75%",  
          }}
        >
          <Text className={isMe ? "text-white" : "text-black"}>
            {item.content}
          </Text>
        </View>

      </View>
    </View>
  );
}, [user.id]);

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <HeaderWithBack  onBackpress={()=>{
        router.replace("/Home/Message")
      }}/>
<View className="bg-white"> 
   <View style={styles.headerContainer}>
      <CircleImage
        source={{ uri: logo ?  ImageFormater(logo?.toString()):"" }}
        Size={40}
      />
<View>
    <Text style={styles.headerTitle} numberOfLines={1}>
  Chat with{" "}
 {type==="community"||type==="property"?(
  <Text style={{color:Colors.light.red}}>
  {name?.length > 15 ? `${name.slice(0, 15)}...` : name}
  </Text>):(
    <TouchableOpacity
    style={{marginTop:vs(10)}}
    onPress={()=>{
      setShowprofile(true)
    }}
    >
       <Text style={[styles.headerTitle,{color:Colors.light.red}]}>
  {name?.length > 15 ? `${name.slice(0, 15)}...` : name}
  </Text>
    </TouchableOpacity>
  )}
 
</Text>
{type==="community"||type==="property"&&(
<TouchableOpacity onPress={()=>{
 
 setShowpost(true)
  
  
}}>
<Text style={{color:Colors.light.textGray,fontSize:ms(12),marginLeft:hs(10)}}>
    <Text style={{color:Colors.light.red}}>{type}:</Text>{title}
  </Text>
  </TouchableOpacity>
)}
 </View>
    </View>
    
</View>
      {initialLoading ? (
        <View
          className="flex-1 justify-center items-center"

          style={{ backgroundColor: "#F4F0F0" }}
        >
          <ActivityIndicator size="large" color={Colors.light.DarkGreen} />
        </View>
      ) : (
        <>
          {(loadingMore || isFetching) && (
            <View
              className="py-2 items-center justify-center"
              style={{ backgroundColor: "#F4F0F0" }}
            >
              <ActivityIndicator size="small" color={Colors.light.DarkGreen} />
            </View>
          )}

        <LegendList
  ref={listRef}
  data={messages.filter(Boolean)}
  keyExtractor={(item) => String(item?.id ?? Math.random())}
  renderItem={renderItem}
  estimatedItemSize={60}
  style={{ backgroundColor: "#F4F0F0" }}
  scrollEventThrottle={200}     
  onScroll={(e) => {
    const y = e.nativeEvent.contentOffset.y;
    const height = e.nativeEvent.layoutMeasurement.height;
    const contentHeight = e.nativeEvent.contentSize.height;

    isAtBottom.current = contentHeight - y - height < 100;

    if (y <= 100 && hasMore && !isFetchingOlder.current) {  // ✅ use ref, not state
      fetchOlderMessages();
    }
  }}
/>
        </>
      )}

      <View className="flex-row p-3 border-t border-gray-200 mb-1">
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type message..."
          placeholderTextColor={Colors.light.textGray}
          className="flex-1 rounded-full px-5 text-lg"
          style={{
            borderColor: Colors.light.DarkGreen,
            borderWidth: 1,
            height: vs(52),
          }}
        />
        {
          sending ? 
          <ActivityIndicator size={30} color={Colors.light.DarkGreen} />
          : 
        <TouchableOpacity
          onPress={handleSend}
          className="ml-2 px-3 justify-center rounded-full"
        >
          <Send height={30} width={30} />
        </TouchableOpacity>
        }
      </View>
      <Modal visible={Showprofile} 
      
            onRequestClose={() => setShowprofile(false)}
            transparent={true}
            statusBarTranslucent={true}>
         <ProfileSingleView id={receiver_post_id.toLocaleString()} type={type.toLocaleString()} setshowModel={setShowprofile}  />
      </Modal>
       <Modal visible={Showpost} 
      
            onRequestClose={() => setShowpost(false)}
            transparent={true}
            statusBarTranslucent={true}>
  
                    <AddSingleView id={Number(receiver_post_id.toLocaleString())} type={type.toLocaleString()} setshowModel={setShowpost} />
                  </Modal>

    </KeyboardAvoidingView>
  );
};
 const styles= StyleSheet.create({
    headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal:hs(20),
    paddingVertical:vs(10)
  },
  headerTitle: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    maxWidth: 200,
  },
 })
export default ChatScreen;