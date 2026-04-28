export type postDataType= {
    data :[];
    setPage: React.Dispatch<React.SetStateAction<number>>;
    isfetching:boolean;
    type:string;
    hasmore:boolean;
    initialLoadDone:boolean;
    refetch:()=>void;
    setpost:(data:any)=>void;
    isShowpost:boolean;
    id:string;
    post_type:string;
}