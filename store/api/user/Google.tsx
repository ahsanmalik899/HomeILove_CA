import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Constants from "expo-constants";
export const Google = createApi({
  reducerPath: "Google",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://maps.googleapis.com/maps/api/",
  }),
  endpoints: (builder) => ({
    getAddressSuggestions: builder.query<any, { input: string }>({
      query: ({ input }) => ({
        url: "place/autocomplete/json",
        method: "GET",
        params: {
          input,
          types: "address",
          components: "country:us",
          key: Constants.expoConfig?.android?.config?.googleMaps?.apiKey ?? "",
        },
      }),
    }),
    reverseGeocode: builder.query<any, { lat: number; lng: number }>({
      query: ({ lat, lng }) => ({
        url: `https://maps.googleapis.com/maps/api/geocode/json`,
        params: {
          latlng: `${lat},${lng}`,
          key: Constants.expoConfig?.android?.config?.googleMaps?.apiKey ?? "",
        },
      }),
    }),

    getPlaceDetails: builder.query<any, { placeId: string }>({
      query: ({ placeId }) => ({
        url: "place/details/json",
        method: "GET",
        params: {
          place_id: placeId,
          fields: "geometry,address_components,formatted_address",
          key:Constants.expoConfig?.android?.config?.googleMaps?.apiKey ??  "",
        },
      }),
    }),
  }),
});

export const {
  useGetAddressSuggestionsQuery,
  useGetPlaceDetailsQuery,
  useLazyGetPlaceDetailsQuery,
  useLazyReverseGeocodeQuery,
} = Google;
