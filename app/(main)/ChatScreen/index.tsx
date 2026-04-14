import {
  useLazyGetMessagesApiQuery,
  useMarkAsReadApiMutation,
  useSendMessageApiMutation
} from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import Send from "@assets/icons/send.svg";
import { LegendList } from "@legendapp/list";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { db } from "@src/utils/firebse";
import { vs } from "@utils/design/design";
import { useLocalSearchParams } from "expo-router";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
const ChatScreen = () => {

  const { userId, name } = useLocalSearchParams();
  console.log("userId",userId);
  const user = useAppSelector(userdata);
const [markAsRead] = useMarkAsReadApiMutation();
  const [message, setMessage] = useState("");
const [page, setPage] = useState(2);
const [messages,setMessages]=useState<any[]>([]);
const [loadingMore, setLoadingMore] = useState(false);
const [initialLoading, setInitialLoading] = useState(true);
const [getMessages, { isFetching }] = useLazyGetMessagesApiQuery();
const [hasMore,setHasMore]=useState(true);
const listRef = useRef<any>(null);
useEffect(() => {

const chatId =
  Number(user.id) < Number(userId)
    ? `${user.id}-${userId}`
    : `${userId}-${user.id}`;

const messagesRef = collection(db,"chats",chatId,"messages");

const q = query(messagesRef);

const unsubscribe = onSnapshot(q,(snapshot)=>{

 let list:any[]=[];

 snapshot.forEach(doc=>{
   list.push({
     id:doc.id,
     ...doc.data()
   });
 });

 list.sort((a,b)=>a.timestamp - b.timestamp);

 setMessages(list);

 setTimeout(()=>{
   listRef.current?.scrollToEnd({animated:true});
 },100);

 setInitialLoading(false);

});

return ()=>unsubscribe();

},[user.id,userId]);
const fetchOlderMessages = async () => {

 if(loadingMore || isFetching || !hasMore) return;
  console.log("fetchOlderMessages");
 setLoadingMore(true);

 try {

   const res:any = await getMessages({
     userId: user.id,
     chatUserId: userId,
     per_page:20,
     page:page
   }).unwrap();

   if(res.success){
     const newMessages = res?.data ? [...res.data] : [];
 console.log("newMessages",newMessages);
     if(!newMessages || newMessages.length === 0){
       setHasMore(false);
     } else {
       setMessages(prev=>[
         ...newMessages.slice().reverse(),   
         ...prev
       ]);
       setPage(prev=>prev+1);
     }
   }

 } catch(err){
   console.error("SQL fetch error:",err);
 } finally {
   setLoadingMore(false);
 }

};

useEffect(() => {

  markAsRead({
    user_id: user.id,
    chat_user_id: userId
  });

}, [messages]);
  const [sendMessage] = useSendMessageApiMutation();



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
          style={{backgroundColor: isMe ? "#02c785ff" : Colors.light.lightGray}}
        >
          <Text className={`${isMe ? "text-white" : "text-black"}`}>
            {item.content}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-white" 
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <HeaderWithBack />
      
      {initialLoading ? (
        <View className="flex-1 justify-center items-center" style={{ backgroundColor: "#F4F0F0" }}>
          <ActivityIndicator size="large" color={Colors.light.DarkGreen} />
        </View>
      ) : (
        <>
          {(loadingMore || isFetching) && (
            <View className="py-2 items-center justify-center" style={{ backgroundColor: "#F4F0F0" }}>
              <ActivityIndicator size="small" color={Colors.light.DarkGreen} />
            </View>
          )}
          <LegendList
          style={{ backgroundColor: "#F4F0F0" }}
            ref={listRef}
            data={messages}
            renderItem={renderItem}
            estimatedItemSize={60}
            onEndReachedThreshold={0.1}
            onScroll={(e)=>{
              const offset = e.nativeEvent.contentOffset.y;

              if(offset <= 0){
                fetchOlderMessages();
              }
            }}
          />
        </>
      )}

      <View className="flex-row p-3 border-t border-gray-200 mb-1 ">
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type message..."
          placeholderTextColor={Colors.light.textGray}
          className="flex-1 rounded-full px-5 text-lg"
          style={{ borderColor:Colors.light.DarkGreen, borderWidth: 1, height: vs(52) }}
        />

        <TouchableOpacity
          onPress={handleSend}
          className="ml-2  px-3 justify-center rounded-full"
         
        >
      <Send height={30} width={30}/>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
};

export default ChatScreen;