import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Constants from "expo-constants";
export const Google = createApi({
  reducerPath: "Google",
  baseQuery: fetchBaseQuery({ baseUrl: "https://maps.googleapis.com/maps/api/" }), 
  endpoints: (builder) => ({
 getAddressSuggestions: builder.query<any, { input: string }>({
      query: ({ input }) => ({
        url: "place/autocomplete/json",
           method: 'GET',
        params: {
          input,
          types: "address",
          components: "country:us",
          key:  Constants.expoConfig?.extra?.googleMapsApiKey ?? "",
        },
      }),
    }),

    
    getPlaceDetails: builder.query<any, { placeId: string }>({
      query: ({ placeId }) => ({
        url: "place/details/json",
           method: 'GET',
        params: {
          place_id: placeId,
          fields: "geometry,address_components,formatted_address",
          key:  Constants.expoConfig?.extra?.googleMapsApiKey ?? "",
        },
      }),
    }),
  }),
});

export const { useGetAddressSuggestionsQuery,useGetPlaceDetailsQuery } = Google;
