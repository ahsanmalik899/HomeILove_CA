import { useGetYourpostQuery } from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import PostDesign from "@src/components/globals/PostDesign/PostDesign";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { useState } from "react";
import { View } from "react-native";

const YourPosts = () => {
  const [page, setPage] = useState(0);
  const limit = 10;
  const user = useAppSelector(userdata);
  
  const { data, isFetching, isError, error } = useGetYourpostQuery(698);

  return (

    <View>
      <PostDesign data={data?.result?.posts} />
    </View>
  );
};

export default YourPosts;