import {
  ContentPostType,
  FeedResponse,
  GetMyPostsOnly,
  GetPostType,
  GetProfiles,
} from "@/store/type/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const MainApi = createApi({
  reducerPath: "MainApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://homeilove.us/api/" }),
  endpoints: (builder) => ({
    getYourpost: builder.query<FeedResponse, GetPostType>({
      query: ({ userid, page }) => ({
        url: `getYourFeeds/?userid=${userid}&page=${page}`,
        method: "GET",
      }),
    }),
    getHomepost: builder.query<FeedResponse, GetPostType>({
      query: ({ userid, page }) => ({
        url: `getHomeFeeds/?userid=${userid}&page=${page}`,
        method: "GET",
      }),
    }),
    getContentpost: builder.query<FeedResponse, ContentPostType>({
      query: ({ userid, page, type }) => ({
        url: `getContentFeeds/?userid=${userid}&page=${page}&type=${type}`,
        method: "GET",
      }),
    }),
    createProfile: builder.mutation<any, FormData>({
      query: (formatData) => ({
        url: `createProfile`,
        method: "POST",

        body: formatData,
      }),
    }),
    getMYPosts: builder.query<any, GetMyPostsOnly>({
      query: ({ page, limit, type, userid }) => ({
        url: `getSinglePost?type=${type}&userid=${userid}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    postProperty: builder.mutation<any, FormData>({
      query: (formatData) => ({
        url: `property/create`,
        method: "POST",
        body: formatData,
      }),
    }),
    postCommunity: builder.mutation<any, FormData>({
      query: (formatData) => ({
        url: `community/create`,
        method: "POST",
        body: formatData,
      }),
    }),
    getProfiles: builder.query<any, GetProfiles>({
      query: ({ id }) => ({
        url: `check-profiles?id=${id}`,
        method: "GET",
      }),
    }),

    postGeneralPost: builder.mutation<any, FormData>({
      query: (data) => ({
        url: `generalPost/create`,
        method: "POST",
        body: data,
      }),
    }),
    setPropertyPrefrence: builder.mutation<any, any>({
      query: (data) => ({
        url: `setPropertyPrefrence`,
        method: "POST",
        body: data,
      }),
    }),
    setCommunityPrefrence: builder.mutation<any, any>({
      query: (data) => ({
        url: `setCommunityPrefrence`,
        method: "POST",
        body: data,
      }),
    }),
    setConectionPrefrence: builder.mutation<any, any>({
      query: (data) => ({
        url: `setConnectionPrefrence`,
        method: "POST",
        body: data,
      }),
    }),
    getInquieryAgent: builder.query<any, any>({
      query: (data) => ({
        url: `searchAgentForInquery?lat=${data.lat}&lng=${data.lng}&radius=${data.radius}&inquiry_type=${data.inquiry_type} &per_page=${data.per_page}&page=${data.page}`,
        method: "GET",
      }),
    }),
        postAdvatizement: builder.mutation<any, FormData>({
      query: (data) => ({
        url: `postAdvatizement`,
        method: "POST",
        body: data,
    
      }),
    }),
          getYorSalePosts:builder.query<any, any>({
      query: ({page,per_page,type,user_id,profile_type}) => ({
        url: `get/userProperty?page=${page}&per_page=${per_page}&type=${type}&user_id=${user_id}&profile_type=${profile_type}`,
        method: "GET",
    
      }),
    }),
  }),
});

export const {
  useGetYourpostQuery,
  useGetContentpostQuery,
  useGetHomepostQuery,
  useCreateProfileMutation,
  useGetMYPostsQuery,
  usePostPropertyMutation,
  useGetProfilesQuery,
  usePostCommunityMutation,
  usePostGeneralPostMutation,
  useSetPropertyPrefrenceMutation,
  useSetCommunityPrefrenceMutation,
  useSetConectionPrefrenceMutation,
  useLazyGetInquieryAgentQuery,
  usePostAdvatizementMutation,
  useGetYorSalePostsQuery,
} = MainApi;
