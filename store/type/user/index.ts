export interface signuppost {
  name: string;
  email: string;
  mobile: string;
  user_type: string;
  business_logo?: {
    uri: string;
    name: string;
    type: string;
  } | null; // optional because user may not upload
}
export interface SignInResponse {
  sweetghar_user_id: unknown;
  id: number;
  email: string;
  user_type: string;
  name: string;
  mobile?: string;
  logo?: string;
  status:  string;
}

export interface siginpost {
  email: string;
  password: string;
}
export interface resetpass {
  email: string;
}
export interface verifyuser {
  token: string;
}
export interface changepassword {
  token: string;
  password: string;
}
export interface ContentPostType{
  userid:number;
  page:number;
  type:string;
}
export interface GetPostType{
  userid:number;
  page:number;
}
export interface FeedItem {
  id: number;
  type: string; 
  name: string | null;
  created_date: string; 
  connection_type: string | null;
  descripition: string; 
  title: string;
  price: number;
  likes: number;
  business_name: string | null;
  image_1: string | null;
  dealing_areas: string | null;
}
export interface CreateProfileType{
              business_name:string,
              contact:string,
              address:string,
              city: string,
              state: string,
              zip: string,
              user_lat: string,
              user_lng: string,
              web: string,
              license_no: string,
              lic_state: string,
              lic_expiry: string,
              dealing_areas:string,
              dealing_city: string,
              latitude: string,
              longitude: string,
              investor_type: string,
              invest_in: string,
              issuing_authority: string,
              min_invest: string,
              max_invest: string,
              advisory_service: string,
              remarks: string,
              youtube_link: string,
              services: string,
              users_id: number,
              post_type: string,
              logo: string,
              cover: string,
}
export interface CreateProfilePostType{
  profileType:string,
  data:CreateProfileType,

}
export interface GetMyPostsOnly{
type:string,
userid:number,
page?:string,
limit?:string

}
export interface FeedResponse {
  feed: FeedItem[];
  totalPages: number;
  currentPage: number;
}
export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Viewport {
  northeast: Location;
  southwest: Location;
}

export interface Geometry {
  location: Location;
  location_type: string;
  viewport: Viewport;
}

export interface NavigationPoint {
  location: {
    latitude: number;
    longitude: number;
  };
  restricted_travel_modes: string[];
}

export interface Result {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  navigation_points?: NavigationPoint[];
  place_id: string;
  types: string[];
}

export interface FeedResponse {
  results: Result[];
  status: string;
}
