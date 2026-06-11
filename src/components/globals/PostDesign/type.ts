export type postDataType= {
    data :[];
    setPage: React.Dispatch<React.SetStateAction<number>>;
    isfetching:boolean;
    withCreatePost?:boolean;
      refetch: () => void;
      setData:(data:[])=>void;
      isPostSingle?:boolean;
      post_id:string;
      
}