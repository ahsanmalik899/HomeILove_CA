import { useDeleteChatsMutation } from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import Delete from "@assets/SideBar/deletbaskit.svg";
import { Ionicons } from "@expo/vector-icons";
import { LegendList } from "@legendapp/list";
import CircleImage from "@src/components/globals/CircleImage/CircleImage";
import Loading from "@src/components/globals/Loading";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { db } from "@src/utils/firebse";
import { hs, ms, vs } from "@utils/design/design";
import { ImageFormater } from "@utils/ImageFormat";
import { router } from "expo-router";
import { collection, documentId, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const Index = () => {

  const user = useAppSelector(userdata);
  const [chats,setChats] = useState([]);
  const [deleteChat,{isLoading:Deleting}]=useDeleteChatsMutation()
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const handleDelete = async () => {
  try {
    if (selectedIds.length === 0) return;

    await deleteChat({
      user_id: user.id,
      ids: selectedIds,
    }).unwrap();

    setSelectedIds([]);
  } catch (error) {
    console.log(error);
  }
};
const toggleSelection = (id: string) => {
  setSelectedIds(prev => {
    const updated = prev.includes(id)
      ? prev.filter(item => item !== id)
      : [...prev, id];

    console.log(updated);

    return updated;
  });
};
useEffect(()=>{
  setLoading(true);
 const q = query(

   collection(db,"userChats"),

   where(documentId(),">=",user.id+"-"),

   where(documentId(),"<=",user.id+"-\uf8ff"),



 );

 const unsubscribe = onSnapshot(q,(snapshot)=>{

   let chatList=[];

   snapshot.forEach(doc=>{

     chatList.push({

       id:doc.id,
       ...doc.data()

     });

   });

   setChats(chatList);
    setLoading(false);
console.log("chatList",chatList);
 });

 return ()=>unsubscribe();

},[user.id]);


  const openChat = (item: any) => {
    router.push({
      pathname: "/ChatScreen",
      params: {
        userId: item.chat_user_id,
        name: item.chat_user_name,
        logo:item.profile_image,
        type:item.type,
        receiver_post_id:item.receiver_post_id,
        title:item.msg_title,
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
        Size={52}
      />

     
      <View className="flex-1 ml-3">
        <Text className="font-semibold text-base text-black" style={{fontFamily: "PopinRegula",}}>
          {item.chat_user_name}
        </Text>
        {item.msg_title&&(
          <Text
            
          style={{fontFamily: "PopinRegula",fontSize:ms(12)}}>
           {item.type}:<Text style={{color:Colors.light.red,}}>{item.msg_title}</Text>
          </Text>)}
        <Text
          numberOfLines={1}
          className="text-gray-500 mt-1"
          style={{fontFamily: "PopinRegula",}}
        >
          {item.last_message}
        </Text>
      </View>

  
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
     <TouchableOpacity onPress={() => toggleSelection(`${user?.id}-${item.chat_user_id}-${item.receiver_post_id}-${item.type}`)}>
  <Ionicons
    name={
      selectedIds.includes(`${user?.id}-${item.chat_user_id}-${item.receiver_post_id}-${item.type}`)
        ? "checkbox"
        : "square-outline"
    }
    size={22}
    color={Colors.light.DarkGreen}
  />
</TouchableOpacity>
    </TouchableOpacity>
  );
  if(loading){
return(
     <View
      className="flex-1 justify-center items-center"
      style={{ backgroundColor: "white" }}
    >
     
      <ActivityIndicator
        size="large"
        color={Colors.light.DarkGreen}
      />
     
    </View>
)
  }
else if (chats.length === 0) {
  return (
    <View
      className="flex-1 justify-center items-center"
      style={{ paddingHorizontal: ms(20) }}
    >
      <Text
        style={{
          fontFamily: "PopinMedium",
          fontSize: ms(18),
          color: Colors.light.DarkGreen,
        }}
      >
        No Chats Available
      </Text>

      <Text
        style={{
          fontFamily: "PopinRegula",
          fontSize: ms(14),
          color: Colors.light.red,
          marginTop: vs(8),
          textAlign: "center",
        }}
      >
        Start a conversation and your chats will appear here.
      </Text>
    </View>
  );
}

  return (
    <View className="flex-1 bg-white">
<TouchableOpacity
  onPress={handleDelete}
  disabled={Deleting || selectedIds.length === 0}
  style={{
    alignSelf: "flex-end",
    marginRight: hs(20),
    marginTop: vs(10),
  }}
>
  <Delete
    width={25}
    height={25}
    color={
      selectedIds.length > 0
        ? Colors.light.red
        : Colors.light.DarkGreen
    }
  />
</TouchableOpacity>
      <LegendList
        data={chats}
        renderItem={renderItem}
        estimatedItemSize={75}
          extraData={selectedIds}
       className="flex-1"
         contentContainerStyle={{
    paddingBottom: vs(100
    ),
  }}
        refreshing={false}
      />
      <Loading isLoading={Deleting} text="Deleting..."/>
    </View>
  );
};

export default Index;


