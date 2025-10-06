import { useGetContentpostQuery } from '@/store/api/user/MainApi';
import { userdata } from '@/store/slices/selector/user';
import { useIsFocused } from "@react-navigation/native";
import PostDesign from '@src/components/globals/PostDesign/PostDesign';
import { useAppSelector } from '@src/hooks/useReduxHooks';
import { hs, vs } from '@utils/design/design';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
const ContentFeed = () => {
  const [page,setpage]= useState(1);
   const isFocused = useIsFocused();
  const [Posts, setPosts] = useState<[]>([]);
const user = useAppSelector(userdata)
 const [showDropdown, setShowDropdown] = useState(false);
  const [type, setType] = useState<'all' | 'videos' | 'articles'>('all');
  const { data, isFetching,refetch, isError, error } = useGetContentpostQuery({ userid:475, page,type });
  useEffect(()=>{
refetch()
  },[page])
  
     useEffect(()=>{
 if (!data?.result?.feed) return;

  setPosts((prev) => {
    if (page === 1) {
     
      return data?.result?.feed;
    } else {
    
      return [...prev, ...data?.result?.feed];
    }
  });
    },[data])
      useEffect(() => {
    if (isFocused) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [isFocused]);

  return (
    <View>
     

     <PostDesign data={Posts} setPage={setpage} isfetching={isFetching}/>
    </View>
  )
}

export default ContentFeed;


const styles = StyleSheet.create({
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f8f8f8',
    paddingVertical: vs(8),
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  dropdownItem: {
    paddingHorizontal: hs(12),
    paddingVertical: vs(6),
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  activeItem: {
    backgroundColor: '#ff4b4b',
  },
  dropdownText: {
    color: 'black',
    fontSize: 13,
    fontWeight: '500',
  },
});