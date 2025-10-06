export interface signuppost {
  name: string;
  email: string;
  mobile: string;
  city: string;
  user_type: string;
  logo: string;
  status: string;
}
export interface siginresponce {
  sweetghar_user_id: number;
  name: string;
  email: string;
  mobile: string;
  city: string;
  user_type: string;
  logo: string;
  status: string;
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

export interface FeedResponse {
  feed: FeedItem[];
  totalPages: number;
  currentPage: number;
}
