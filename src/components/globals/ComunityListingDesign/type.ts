export type postDataType= {
    data :[];
    setPage: React.Dispatch<React.SetStateAction<number>>;
    isfetching:boolean;
    type:string;
    hasmore:boolean;
    initialLoadDone:boolean;
    isSingleView:boolean;
    post_id:string;
    post_type:string;
 refetch: () => void;
}