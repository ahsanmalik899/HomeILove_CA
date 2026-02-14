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
  tagTypes: [
    "PostEditData",
    "SinglePostData",
    "AlertPref",
    "ConnectionPref",
    "CommunityPref",
    "PropertyPref",
    "senderInquires"
  ],
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
        url: `getHomeFeed/?userid=${userid}&page=${page}`,
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
    getSinglePost: builder.query<any, GetMyPostsOnly>({
      query: ({ type, id }) => ({
        url: `getSinglePostapi?type=${type}&id=${id}`,
        method: "GET",
      }),
      providesTags: (r: any, e: any, arg: { id: any }) => [
        { type: "SinglePostData", id: arg.id },
      ],
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
      invalidatesTags: ["PropertyPref"],
    }),
    setCommunityPrefrence: builder.mutation<any, any>({
      query: (data) => ({
        url: `setCommunityPrefrence`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CommunityPref"],
    }),
    setConectionPrefrence: builder.mutation<any, any>({
      query: (data) => ({
        url: `setConnectionPrefrence`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ConnectionPref"],
    }),
    getInquieryAgent: builder.query<any, any>({
      query: (data) => ({
        url: `searchAgentForInquery?lat=${data.lat}&lng=${data.lng}&radius=${data.radius}&inquiry_type=${data.inquiry_type} &per_page=${data.per_page}&page=${data.page}&type=${data.type}`,
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
    getYorSalePosts: builder.query<any, any>({
      query: ({ page, per_page, type, user_id, profile_type }) => ({
        url: `get/userProperty?page=${page}&per_page=${per_page}&type=${type}&user_id=${user_id}&profile_type=${profile_type}`,
        method: "GET",
      }),
    }),
    SendVisistRequest: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: `sendVisitRequest`,
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      }),
    }),
    getPostCount: builder.query<any, any>({
      query: ({ user_id }) => ({
        url: `getPostCount?user_id=${user_id}`,
        method: "GET",
      }),
    }),
    getDataForEdit: builder.query<any, GetMyPostsOnly>({
      query: ({ type, id }) => ({
        url: `getDataForEditPost?type=${type}&id=${id}`,
        method: "GET",
      }),
      providesTags: (r: any, e: any, arg: { id: any }) => [
        { type: "PostEditData", id: arg.id },
      ],
    }),
    updateProperty: builder.mutation<any, FormData>({
      query: (formatData) => ({
        url: `property/update`,
        method: "POST",
        body: formatData,
      }),
      invalidatesTags: (result, error, formData) => {
        const id = formData.get("post_id");
        if (!id || typeof id !== "string") return [];
        return [
          { type: "PostEditData" as const, id },
          { type: "SinglePostData" as const, id },
        ];
      },
    }),
    getHomeFeeds: builder.query<any, GetMyPostsOnly>({
      query: ({ type, id, page, limit }) => ({
        url: `getHomeFeed?userid=${id}$page=${page}$limit=${limit}`,
        method: "GET",
      }),
    }),
    updateCommunity: builder.mutation<any, FormData>({
      query: (formatData) => ({
        url: `community/update`,
        method: "POST",
        body: formatData,
      }),
      invalidatesTags: (result, error, formData) => {
        const id = formData.get("post_id");
        if (!id || typeof id !== "string") return [];
        return [
          { type: "PostEditData" as const, id },
          { type: "SinglePostData" as const, id },
        ];
      },
    }),
    saveAllerts: builder.mutation<any, FormData>({
      query: (formatdata) => ({
        url: `/saveUpdateAlert`,
        method: "POST",
        body: formatdata,
      }),
      invalidatesTags: ["AlertPref"],
    }),
    getAlertPref: builder.query<any, GetMyPostsOnly>({
      query: ({ type, id }) => ({
        url: `GetAlertPref?user_id=${id}`,
        method: "GET",
      }),
      providesTags: ["AlertPref"],
    }),
    getConnectionPref: builder.query<any, GetMyPostsOnly>({
      query: ({ type, id }) => ({
        url: `GetConnectionPref?user_id=${id}`,
        method: "GET",
      }),
      providesTags: ["ConnectionPref"],
    }),
    getCommunityPref: builder.query<any, GetMyPostsOnly>({
      query: ({ type, id }) => ({
        url: `GetCommunityPref?user_id=${id}`,
        method: "GET",
      }),
      providesTags: ["CommunityPref"],
    }),
    getPropertyPref: builder.query<any, GetMyPostsOnly>({
      query: ({ type, id }) => ({
        url: `GetPropertyPref?user_id=${id}`,
        method: "GET",
      }),
      providesTags: ["PropertyPref"],
    }),
    getSingleProfile: builder.query<any, GetMyPostsOnly>({
      query: ({ type, id }) => ({
        url: `getSingleProfile?type=${type}&id=${id}`,
        method: "GET",
      }),
    }),
    getDeveloperNames: builder.query({
      query: () => ({
        url: "/getDeveloperNames",
        method: "GET",
      }),
    }),
    getProfileNames: builder.query<any, any>({
      query: ({ type }) => ({
        url: `/getProfileNames?type=${type}`,
        method: "GET",
      }),
    }),
    getTrendingProfiles: builder.query<any, any>({
      query: ({ type }) => ({
        url: `getTrendingProfiles/?type=${type}`,
        method: "GET",
      }),
    }),

    getPropertyList: builder.query<any, any>({
      query: ({
        page,
        property_for,
        property_type,
        property_sub_type,
        condition,
        address,
        city,
        state,
        zip,
        lat,
        lng,
        radius,
        available_on,
        pet_allowers,
        min_price_range,
        max_price_range,
        max_rent_range,
        no_of_baths,
        sale_type,
        min_beds,
        purposeful_type,
        max_beds,
        tenure,
        tinency_tenure,
        price_type,
        sort,
        furnishing_type,
      }) => ({
        url: "getPropertyListing",
        method: "GET",
        params: {
          page,
          purposeful_type,
          property_for,
          property_type,
          property_sub_type,
          condition,
          pet_allowers,
          address,
          city,
          state,
          zip,
          lat,
          lng,
          radius,
          min_price_range,
          max_price_range,
          max_rent_range,
          no_of_baths,
          sale_type,
          price_type,
          tenure,
          furnishing_type,
          tinency_tenure,
          available_on,
          min_beds,
          max_beds,
          sort,
        },
      }),
    }),
    getCommunityList: builder.query<any, any>({
      query: ({
        page,
        developer_name,
        estate_type,
        development_status,
        address,
        city,
        state,
        zip,
        lat,
        lng,
        radius,
        min_range,
        max_range,
        sort,
        user_id,
        name,
      }) => ({
        url: "getCommunityListing",
        method: "GET",
        params: {
          page,
          developer_name,
          estate_type,
          development_status,
          address,
          city,
          state,
          zip,
          lat,
          lng,
          radius,
          min_range,
          max_range,
          sort,
          user_id,
          name,
        },
      }),
    }),
    getProfileListing: builder.query<any, any>({
      query: ({
        id,
        type,
        page,
        address,
        city,
        state,
        zip,
        lat,
        lng,
        radius,
        sort,
      }) => ({
        url: `GetProfilesListing`,
        method: "GET",
        params: {
          id,
          type,
          page,
          address,
          city,
          state,
          zip,
          lat,
          lng,
          radius,
          sort,
        },
      }),
    }),
    insertInquiry: builder.mutation<any, any>({
      query: (formatdata: FormData) => ({
        url: "insertInquiry",
        method: "POST",
        body: formatdata,
      }),
    }),
     getsendedInquiery: builder.query<any, any>({
      query: ({ id,page }) => ({
        url: `/getInquries?user_id=${id}&page=${page}`,
        method: "GET",
      }),
       providesTags:[ "senderInquires"
      ],
    }),
      deletSendedInquiry: builder.mutation<any, any>({
      query: (formatdata: FormData) => ({
        url: "deletSendedInquries",
        method: "POST",
        body: formatdata,
      }),
       invalidatesTags: ["senderInquires"],
    }),
       getRecivedInquiery: builder.query<any, any>({
      query: ({ id,page }) => ({
        url: `/getRecivedInquiries?user_id=${id}&page=${page}`,
        method: "GET",
      }),
       providesTags:[ "senderInquires"
      ],
    }),
  }),
});

export const {
  useGetYourpostQuery,
  useGetContentpostQuery,
  useGetHomepostQuery,
  useCreateProfileMutation,
  useGetSinglePostQuery,
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
  useSendVisistRequestMutation,
  useGetPostCountQuery,
  useGetDataForEditQuery,
  useUpdatePropertyMutation,
  useUpdateCommunityMutation,
  useGetHomeFeedsQuery,
  useSaveAllertsMutation,
  useGetAlertPrefQuery,
  useGetConnectionPrefQuery,
  useGetCommunityPrefQuery,
  useGetPropertyPrefQuery,
  useGetPropertyListQuery,
  useGetCommunityListQuery,
  useGetProfileListingQuery,
  useGetSingleProfileQuery,
  useGetProfileNamesQuery,
  useGetDeveloperNamesQuery,
  useGetTrendingProfilesQuery,
  useInsertInquiryMutation,
  useGetsendedInquieryQuery,
  useDeletSendedInquiryMutation,
  useGetRecivedInquieryQuery,
} = MainApi;
