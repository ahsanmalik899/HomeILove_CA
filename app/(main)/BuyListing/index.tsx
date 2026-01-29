import { useGetPropertyListQuery } from "@/store/api/user/MainApi";
import Threedot from "@assets/Buy/threedotwhite.svg";
import Filter from "@src/components/globals/Filter";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import PropertyListingDesign from "@src/components/globals/PropertyListingDesign";
import SerchBar from "@src/components/globals/SerchBar";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";

const index = () => {
  const params = useLocalSearchParams();
  const [page, setpage] = useState(1);
const [properties, setProperties] = useState<any[]>([]);
const [hasMore, setHasMore] = useState(true);
  const [address, setAddress] = useState(params.address || "");
  const [lat, setLat] = useState(Number(params.lat) || 0);
  const [lng, setLng] = useState(Number(params.lng) || 0);
  const [state, setState] = useState(params.stateCode || "");
  const [city, setCity] = useState(params.city || "");
  const [zip, setZip] = useState(params.zip || "");
  const [showFilter, setShowFilter] = useState(false);

  
  const [filterValues, setFilterValues] = useState({
    radius: params.radius || "",
    property_for: params.property_for||"sale",
    propertyType: params.propertyType || "House",
    propertysubType: params.propertysubType || "All",
    price_type:params.saleprice_type||"",
    propertyCondition: params.condition||"",
    minBed: "",
    maxBed: "",
    minPrice: "",
    maxPrice: "",
    bathrooms: "",
    tenure: "",
  });

  /** 🔹 API Filters */
  const [apiFilters, setApiFilters] = useState({
    page,
    property_for: params.property_for||undefined,
    address,
    city,
    state,
    zip,
    lat,
    lng,
   condition: params.condition||undefined,
    price_type:params.saleprice_type||undefined,
    radius: params.radius || undefined,
    property_type: params.propertyType,
    property_sub_type:
      params.propertysubType !== "All" ? params.propertysubType : undefined,
  });


  const { data: propertyList, isLoading, isFetching, refetch } =
    useGetPropertyListQuery(apiFilters);

  console.log(propertyList?.data?.properties)
  useEffect(() => {
    setApiFilters((prev) => ({
      ...prev,
      address,
      city,
      state,
      zip,
      lat,
      lng,
      page,
    }));
  }, [address, city, state, zip, lat, lng,page]);

  /** 🔹 Validation */
  const FilterSchema = Yup.object().shape({
    radius: Yup.string().nullable(),
    propertyType: Yup.string().nullable(),
    propertysubType: Yup.string().nullable(),
    propertyCondition: Yup.string().nullable(),
    minBed: Yup.number().nullable().min(0, "Invalid value"),
    maxBed: Yup.number()
      .nullable()
      .when("minBed", (minBed, schema) =>
        minBed ? schema.min(minBed, "Max must be ≥ Min") : schema
      ),
    minPrice: Yup.number().nullable().min(0, "Invalid price"),
    maxPrice: Yup.number()
      .nullable()
      .when("minPrice", (minPrice, schema) =>
        minPrice ? schema.min(minPrice, "Max must be ≥ Min") : schema
      ),
    bathrooms: Yup.number().nullable(),
    tenure: Yup.string().nullable(),
  });

  /** 🔹 Map Formik values to API */
  const mapToApiFilters = (values: any) => ({
    page,
    property_for:values.property_for||undefined,
    address,
    city,
    state,
    zip,
    lat,
    lng,
    price_type: values.saleprice_type || undefined,
    radius: values.radius || undefined,
    property_type: values.propertyType,
    property_sub_type:
      values.propertysubType !== "All" ? values.propertysubType : undefined,
    condition: values.propertyCondition || undefined,
    min_price_range: values.minPrice || undefined,
    max_price_range: values.maxPrice || undefined,
    no_of_baths: values.bathrooms || undefined,
    tenure: values.tenure || undefined,
     min_beds: values.minBed !== "" ? Number(values.minBed) : undefined,
  max_beds: values.maxBed !== "" ? Number(values.maxBed) : undefined,
  });
useEffect(() => {
  if (!propertyList) return; 

  const newProperties = propertyList.data?.properties ?? [];

  setHasMore(
    propertyList.pagination.current_page < propertyList.pagination.last_page
  );

  setProperties(prev =>
    page === 1
      ? newProperties 
      : [...prev, ...newProperties] 
  );
}, [propertyList, page]);


  return (
    <View className="bg-white flex-1" >
      <HeaderWithBack />
<View style={{paddingHorizontal:hs(20)}}>
      <View className="flex-row justify-between gap-2" style={{ marginTop: vs(20),paddingBottom:vs(5) }}>
        <View style={{ width: hs(300) }}>
          <SerchBar
            setAddress={setAddress}
            setCity={setCity}
            setLat={setLat}
            setLng={setLng}
            setState={setState}
            setZip={setZip}
            onpress={() => {}}
            latValue={lat}
            longValue={lng}
            value={address.toString()}
          />
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: Colors.light.red,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: hs(10),
            borderRadius: ms(10),
          }}
          onPress={() => setShowFilter(true)}
        >
          <Threedot />
        </TouchableOpacity>
      </View>

      
      {showFilter && (
        <Formik
          initialValues={filterValues} 
          enableReinitialize
          validationSchema={FilterSchema}
          onSubmit={(values) => {
            setFilterValues(values); 
            console.log(values);
            setpage(1); 
            setApiFilters(mapToApiFilters(values)); 
            setShowFilter(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            setFieldValue,
            handleSubmit,
            resetForm,
            setFieldTouched
          }) => (
            <Filter
            setFieldTouched={setFieldTouched}
              values={values}
              errors={errors}
              touched={touched}
              setFieldValue={setFieldValue}
              handleSubmit={handleSubmit}
              resetForm={resetForm}
              setshowFilter={setShowFilter}
            />
          )}
        </Formik>
      )}
      </View>
      <PropertyListingDesign data={properties} isfetching={isFetching} setPage={setpage} type="sale" hasmore={hasMore}/>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
