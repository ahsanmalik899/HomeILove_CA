
import { ContentPostType, CreateProfilePostType, FeedResponse, GetMyPostsOnly, GetPostType } from "@/store/type/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const MainApi = createApi({
  reducerPath: 'MainApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://homeilove.us/api/' }),
  endpoints: (builder) => ({
    getYourpost: builder.query< FeedResponse,GetPostType>({
      query: ({userid,page}) => ({
        url: `getYourFeeds/?userid=${userid}&page=${page}`,
        method: 'GET',
        
      }),
    }),
       getHomepost: builder.query< FeedResponse,GetPostType>({
      query: ({userid,page}) => ({
        url: `getHomeFeeds/?userid=${userid}&page=${page}`,
        method: 'GET',
        
      }),
    }),
     getContentpost: builder.query< FeedResponse,ContentPostType>({
      query: ({userid,page,type}) => ({
        url: `getContentFeeds/?userid=${userid}&page=${page}&type=${type}`,
        method: 'GET',
        
      }),
    }),
      createProfile: builder.mutation< any,CreateProfilePostType>({
      query: (data) => ({
        url: `createProfile`,
        method: 'POST',
              headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
        body:data,
      }),
    }),
      getMYPosts: builder.query< any,GetMyPostsOnly>({
      query: ({page,limit,type,userid}) => ({
        url: `getSinglePost?type=${type}&userid=${userid}&page=${page}&limit=${limit}`,
        method: 'GEt',
      
      }),
    }),
  }),
});


export const { useGetYourpostQuery ,
  useGetContentpostQuery,
  useGetHomepostQuery,
  useCreateProfileMutation,
  useGetMYPostsQuery,
} = MainApi;
