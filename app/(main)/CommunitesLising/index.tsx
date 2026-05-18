import { useGetCommunityListQuery } from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import Threedot from "@assets/Buy/threedotwhite.svg";
import CommunityFilter from "@src/components/globals/CommunityFilter";
import ComunityListingDesign from "@src/components/globals/ComunityListingDesign";
import SortDropdown from "@src/components/globals/DropDownField";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import * as Yup from "yup";

const index = () => {
  const params = useLocalSearchParams();
  const user = useSelector(userdata);
  const [page, setpage] = useState(1);
  const [properties, setProperties] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [name, setname] = useState(params.name || "");
  const [address, setAddress] = useState(params.address || "");
  const [lat, setLat] = useState(Number(params.lat) || 0);
  const [lng, setLng] = useState(Number(params.lng) || 0);
  const [state, setState] = useState(params.stateCode || "");
  const [city, setCity] = useState(params.city || "");
  const [zip, setZip] = useState(params.zip || "");
  const [showFilter, setShowFilter] = useState(false);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const [sort, setSort] = useState("");
  const sortOptions = [
    { label: "All", value: "" },
    { label: "Recent First", value: "post_property_id_desc" },
    { label: "Oldest First", value: "post_property_id_asc" },
    { label: "Price: High to Low", value: "asking_price_desc" },
    { label: "Price: Low to High", value: "asking_price_asc" },
  ];
  const [filterValues, setFilterValues] = useState({
    radius: params.radius || "",
    property_for: params.property_for || "community",
    estate_type: [],
    development_status: [],
  });

  const [apiFilters, setApiFilters] = useState({
    page,
    address,
    city,
    state,
    zip,
    lat,
    lng,
    name,
    sort,
    user_id: user?.id,
    radius: params.radius || undefined,
  });

  const {
    data: propertyList,
    isLoading,
    isFetching,
    refetch,
  } = useGetCommunityListQuery(apiFilters);
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
      name,
      sort,
      user_id: user?.id,
    }));
  }, [address, city, state, zip, lat, lng, page, sort]);

  const FilterSchema = Yup.object().shape({
    radius: Yup.string().nullable(),
    estate_type: Yup.array().of(Yup.string()),
    development_status: Yup.array().of(Yup.string()),
    minPrice: Yup.number().nullable().min(0, "Invalid price"),
    maxPrice: Yup.number()
      .nullable()
      .when("minPrice", (minPrice, schema) =>
        minPrice ? schema.min(minPrice, "Max must be ≥ Min") : schema
      ),
  });

  const mapToApiFilters = (values: any) => ({
    page,
    property_for: values.property_for || undefined,
    address,
    city,
    state,
    zip,
    lat,
    lng,
    name,
    sort,
    user_id: user?.id,
    radius: values.radius || undefined,
    development_status: values.development_status.length
      ? values.development_status.join(",")
      : undefined,
    estate_type: values.estate_type.length
      ? values.estate_type.join(",")
      : undefined,
    min_range: values.minPrice || undefined,
    max_range: values.maxPrice || undefined,
  });
  useEffect(() => {
    if (!propertyList) return;

    const newProperties = propertyList.data?.list ?? [];

    setHasMore(
      propertyList.pagination.current_page < propertyList.pagination.last_page
    );

    setProperties((prev) =>
      page === 1 ? newProperties : [...prev, ...newProperties]
    );
    setInitialLoadDone(true);
  }, [propertyList, page]);
useFocusEffect(
  useCallback(() => {
    const onBackPress = () => {
      if (params?.isSingleView === "true") {
        router.replace("/Home/Feeds/NewsFeed");
        return true;
      }

      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/");
      }

      return true;
    };

    const sub = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    return () => sub.remove();
  }, [params])
);
  return (
    <View className=" flex-1" style={{ backgroundColor: "#F4F0F0" }}>
       <HeaderWithBack onBackpress={()=>{params?.isSingleView=="true"? router.replace("/Home/Feeds/NewsFeed"): router.back()}} />
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
      <ComunityListingDesign
        data={properties}
        isfetching={isFetching}
        setPage={setpage}
        type="community"
        hasmore={hasMore}
        initialLoadDone={initialLoadDone}
         isSingleView={params?.isSingleView=="true"}
        post_id={params?.id?.toString()}
        post_type={params?.type?.toString()}
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
            <CommunityFilter
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
              name={name.toString()}
              setname={setname}
            />
          )}
        </Formik>
      )}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
