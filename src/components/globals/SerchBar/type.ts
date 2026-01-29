export type SearchType = {
  setAddress: (val: string) => void;
  setCity: (val: string) => void;
  setLat: (val: number) => void;
  setLng: (val: number) => void;
  setState: (val: string) => void;
  setZip: (val: string) => void;
  onpress:()=>void;
  value:string;
  latValue:number;
  longValue:number;
};
