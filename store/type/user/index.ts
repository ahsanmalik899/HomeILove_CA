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
export interface MYPostType{
  id:number;
}