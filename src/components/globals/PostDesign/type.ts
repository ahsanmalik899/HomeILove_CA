export type postDataType= {
    data :[];
    setPage: React.Dispatch<React.SetStateAction<number>>;
    isfetching:boolean;
    withCreatePost?:boolean;
}