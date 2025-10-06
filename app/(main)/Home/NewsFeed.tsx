import { useGetHomepostQuery } from '@/store/api/user/MainApi';
import { userdata } from '@/store/slices/selector/user';
import PostDesign from '@src/components/globals/PostDesign/PostDesign';
import { useAppSelector } from '@src/hooks/useReduxHooks';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

const NewsFeeds = () => {
  const [page, setPage] = useState(1);
    const limit = 10;
const [Posts, setPosts] = useState<[]>([]);
    const user = useAppSelector(userdata);
  const { data, isFetching,refetch, isError, error } = useGetHomepostQuery({ userid:475, page});
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
  return (
    <View>
     <PostDesign data={Posts} isfetching={isFetching}setPage={setPage}/>
    </View>
  )
}

export default NewsFeeds;
