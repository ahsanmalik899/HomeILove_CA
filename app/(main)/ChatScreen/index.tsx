import {
  useGetMessagesApiQuery,
  useMarkAsReadApiMutation,
  useSendMessageApiMutation
} from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import Send from "@assets/icons/send.svg";
import AddSingleView from "@src/components/globals/AddSingleView";
import CircleImage from "@src/components/globals/CircleImage/CircleImage";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import ProfileSingleView from "@src/components/globals/ProfileSingleView";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { socket } from "@src/socket";
import { hs, ms, vs } from "@utils/design/design";
import { ImageFormater } from "@utils/ImageFormat";
import { router, useLocalSearchParams } from "expo-router";
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
import { FlatList } from "react-native-gesture-handler";



const ChatScreen = () => {
  const { userId, name,logo,title,receiver_post_id,type} = useLocalSearchParams();
  const user = useAppSelector(userdata);
 console.log(title,receiver_post_id);
  const [markAsRead] = useMarkAsReadApiMutation();
  const [sendMessage,{isLoading:sending}] = useSendMessageApiMutation();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const listRef = useRef<any>(null);
  const isAtBottom = useRef(true);
 const [Showpost,setShowpost]=useState(false)
  const [Showprofile,setShowprofile]=useState(false)
  const{data:msg,isLoading} = useGetMessagesApiQuery({
      userId: user.id,
      chatUserId: userId,
      per_page: 20,
      page,
      receiver_post_id,
      type
    },{
        refetchOnMountOrArgChange: true,
    });
    useEffect(() => {
  if (!msg) return;

if (page === 1) {
    setMessages(msg.data);
} else {
    setMessages(prev => {
        const ids = new Set(prev.map(i => i.id));

        const older = msg.data.filter(i => !ids.has(i.id));

        return [...prev, ...older];
    });
}

  setHasMore(msg.pagination.has_more);
  setInitialLoading(false);
  setLoadingMore(false);
}, [msg]);
useEffect(() => {
  socket.emit("join", user.id);

  const onNewMessage = (newMessage: any) => {

    const isCurrentChat =
      (
        (newMessage.sender_id == userId &&
          newMessage.receiver_id == user.id) ||
        (newMessage.sender_id == user.id &&
          newMessage.receiver_id == userId)
      ) &&
      newMessage.receiver_post_id == receiver_post_id &&
      newMessage.type == type;

    if (!isCurrentChat) return;

    setMessages(prev => {
      // Prevent duplicates
      if (prev.some(m => m.id == newMessage.id)) {
        return prev;
      }

      return [newMessage, ...prev];
    });

    // Mark as read immediately if this chat is open
    markAsRead({
      user_id: user.id,
      chat_user_id: userId,
      receiver_post_id,
      type,
    });
  };

  socket.on("newMessage", onNewMessage);

  return () => {
    socket.off("newMessage", onNewMessage);
  };
}, [user.id, userId, receiver_post_id, type]);
    useEffect(()=>{

    },[user.id])
  useEffect(() => {
    markAsRead({ user_id: user.id, chat_user_id: userId,  receiver_post_id,
      type });
  }, []);




const handleSend = async () => {
  const content = message.trim();
  if (!content) return;

  const tempId = Date.now();

  const myMessage = {
    id: tempId,
    msg_title: title,
    sender_id: user.id,
    sender_name: user.name,
    receiver_id: Number(userId),
    receiver_name: name,
    receiver_post_id: Number(receiver_post_id),
    type,
    content,
    is_read: 1,
    sender_deleted: 0,
    receiver_deleted: 0,
    last_activity: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    pending: true, // local only
  };

  // Show immediately
  setMessages(prev => [myMessage, ...prev]);

  setMessage("");

  try {
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
  } catch (e) {
    console.log(e);
  }
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
 {(type==="community"||type==="property")?(
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
{(type==="community"||type==="property")&&(
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
          {(loadingMore ) && (
            <View
              className="py-2 items-center justify-center"
              style={{ backgroundColor: "#F4F0F0" }}
            >
              <ActivityIndicator size="small" color={Colors.light.DarkGreen} />
            </View>
          )}

        <FlatList
  ref={listRef}
  data={messages.filter(Boolean)}
  keyExtractor={(item) => String(item?.id ?? Math.random())}
  renderItem={renderItem}
    inverted
  style={{ backgroundColor: "#F4F0F0" }} 
  onScroll={(e) => {
    const y = e.nativeEvent.contentOffset.y;
    const height = e.nativeEvent.layoutMeasurement.height;
    const contentHeight = e.nativeEvent.contentSize.height;

    isAtBottom.current = contentHeight - y - height < 100;

    if (y <= 100 && hasMore ) {  
       setPage(prev=> prev+1)
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