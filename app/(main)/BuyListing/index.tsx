import { useGetPropertyListQuery } from "@/store/api/user/MainApi";
import Threedot from "@assets/Buy/threedotwhite.svg";
import SortDropdown from "@src/components/globals/DropDownField";
import Filter from "@src/components/globals/Filter";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import PropertyListingDesign from "@src/components/globals/PropertyListingDesign";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";

const index = () => {
  const params = useLocalSearchParams();
  const [initialLoadDone, setInitialLoadDone] = useState(false);
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
  const [sort, setSort] = useState("");

  const sortOptions = [
    { label: "All", value: "" },
    { label: "Recent First", value: "post_property_id_desc" },
    { label: "Oldest First", value: "post_property_id_asc" },
    { label: "Price: High to Low", value: "asking_price_desc" },
    { label: "Price: Low to High", value: "asking_price_asc" },
  ];

  const [filterValues, setFilterValues] = useState({
    propertysubType: params.propertysubType
      ? params.propertysubType.split(",")
      : [],
    propertyCondition: params.condition ? params.condition.split(",") : [],
    tenure: [],
    furnishing_type:[],
    tinency_tenure: [],
    purposeful_type: [],
    radius: params.radius || "",
    property_for: params.property_for || "sale",
    propertyType: params.propertyType || "House",
    price_type: params.saleprice_type || "",
    max_rent_range: params.max_rent_range,
    pet_allowers: params.pet_allowers,
    available_on: params.aivilable_on,
    minBed: "",
    maxBed: "",
    minPrice: "",
    maxPrice: "",
    bathrooms: "",
    sort: sort,
  });

  const [apiFilters, setApiFilters] = useState({
    page,
    property_for: params.property_for || undefined,
    address,
    city,
    state,
    zip,
    lat,
    lng,
    sort,
    available_on: params.aivilable_on||undefined,
    pet_allowers: params.pet_allowers,
    max_rent_range: params.max_rent_range,
    condition: params.condition || undefined,
    price_type: params.saleprice_type || undefined,
    radius: params.radius || undefined,
    property_type: params.propertyType,
    property_sub_type:
      params.propertysubType !== "All" ? params.propertysubType : undefined,
  });

  const {
    data: propertyList,
    isLoading,
    isFetching,
    refetch,
  } = useGetPropertyListQuery(apiFilters);
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
      sort,
    }));
  }, [address, city, state, zip, lat, lng, page, sort]);

  /** 🔹 Validation */
  const FilterSchema = Yup.object().shape({
    radius: Yup.string().nullable(),
    propertyType: Yup.string().nullable(),
    pet_allowers: Yup.string().nullable(),
    available_on:Yup.string().nullable(),
    propertyCondition: Yup.array().of(Yup.string()),
    tenure: Yup.array().of(Yup.string()),
    furnishing_type: Yup.array().of(Yup.string()),
    purposeful_type: Yup.array().of(Yup.string()),
    tinency_tenure: Yup.array().of(Yup.string()),
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
  });

  const mapToApiFilters = (values: any) => ({
    page,
    property_for: values.property_for || undefined,
    pet_allowers:values.pet_allowers||undefined,
    address,
    city,
    state,
    zip,
    lat,
    lng,
    sort,
    available_on:values.available_on||undefined,
    furnishing_type:values.furnishing_type.length ? values.furnishing_type.join(",") : undefined,
    tenure: values.tenure.length ? values.tenure.join(",") : undefined,
    purposeful_type: values.purposeful_type.length
      ? values.purposeful_type.join(",")
      : undefined,
    tinency_tenure: values.tinency_tenure.length
      ? values.tinency_tenure.join(",")
      : undefined,
    property_sub_type:
      values.propertysubType.length === 1 && values.propertysubType[0] === "All"
        ? undefined
        : values.propertysubType.filter((v: string) => v !== "All").join(",") ||
          undefined,

    condition: values.propertyCondition.length
      ? values.propertyCondition.join(",")
      : undefined,
    price_type: values.saleprice_type || undefined,
    radius: values.radius || undefined,
    property_type: values.propertyType,
    min_price_range: values.minPrice || undefined,
    max_price_range: values.maxPrice || undefined,
    no_of_baths: values.bathrooms || undefined,
    // no_of_baths: values.bathrooms && values.bathrooms !== "0" ? Number(values.bathrooms) : undefined,
    min_beds: values.minBed !== "" ? Number(values.minBed) : undefined,
    max_beds: values.maxBed !== "" ? Number(values.maxBed) : undefined,
  });
  useEffect(() => {
    if (!propertyList) return;

    const newProperties = propertyList.data?.properties ?? [];

    setHasMore(
      propertyList.pagination.current_page < propertyList.pagination.last_page
    );

    setProperties((prev) =>
      page === 1 ? newProperties : [...prev, ...newProperties]
    );
    setInitialLoadDone(true);
  }, [propertyList, page]);

  return (
    <View className=" flex-1" style={{ backgroundColor: "#F4F0F0" }}>
      <HeaderWithBack />

      <View
        className="flex-row justify-between gap-2"
        style={{
          marginTop: vs(20),
          paddingBottom: vs(5),
          paddingHorizontal: hs(20),
        }}
      >
        {!showFilter && (
          <View style={{ width: hs(250) }}>
            <SortDropdown
              value={sort}
              setValue={setSort}
              items={sortOptions}
              setpage={setpage}
            />
          </View>
        )}

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

      <PropertyListingDesign
        data={properties}
        isfetching={isFetching}
        setPage={setpage}
        type="sale"
        hasmore={hasMore}
        initialLoadDone={initialLoadDone}
      />
      {showFilter && (
        <Formik
          initialValues={filterValues}
          enableReinitialize
          validationSchema={FilterSchema}
          onSubmit={(values) => {
            setFilterValues(values);

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
            setFieldTouched,
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
              type={params.property_for.toString()}
            />
          )}
        </Formik>
      )}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
