export interface PastWorkModalProps {
  visible: boolean;
  closeModal: () => void;
 refetch:()=>void;
  editData?: Partial<PastWorkFormValues>;
  savePastWork: (formatdata:FormData)=>void;
type:string;
isLoading:boolean;
}
export interface PastWorkFormValues {
  property_type: string;
  property_sub_type: string;
  beds: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: string | number;
  lng: string | number;
  deal_features: string;
  job_description: string;
  work_section: string;
  work_images: [];
  user_past_work_id?: string;

}