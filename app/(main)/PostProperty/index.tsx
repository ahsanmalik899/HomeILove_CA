import {
  useGetProfilesQuery,
  usePostPropertyMutation,
} from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import ImageUpload from "@assets/CreateProfile/uploadimage.svg";
import Profilelogo from "@assets/CreateProfile/uploadprofilewithcircle.svg";
import PayLater from "@assets/SideBar/pay-later.svg";
import Paypal from "@assets/SideBar/paypal-icon.svg";
import PowerdByPayPal from "@assets/SideBar/Powered by PayPal.svg";
import Volit from "@assets/SideBar/volit-white.svg";
import { MaterialIcons } from "@expo/vector-icons";
import { AdressInput } from "@src/components/globals/AddressInput";
import DatePickerField from "@src/components/globals/DatePickerField";
import { FormikInput } from "@src/components/globals/FormictInput";
import { FormikDropdown } from "@src/components/globals/FormikDropdown/indes";
import { FormikDropdownwithjson } from "@src/components/globals/FormikDropdownwithjson/indes";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LargeButton from "@src/components/globals/LaregeButton";
import Loading from "@src/components/globals/Loading";
import PropertyType from "@src/components/globals/PropertyType";
import RadioButton from "@src/components/globals/RadioButton";
import SelectRentAndSale from "@src/components/globals/SelectRentAndSale";
import SelecteAdType from "@src/components/globals/TablikeButton";
import TimePickerField from "@src/components/globals/TimePickerField";
import UploadPic from "@src/components/globals/UploadPic";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { renderToastError, renderToastSuccess } from "@src/hooks/useToasty";
import { hs, ms, vs } from "@utils/design/design";
import { Formik } from "formik";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Yup from "yup";
const index = () => {
  const user = useAppSelector(userdata);
  const [saleType, setSaleType] = useState(true);
  const [propertType, setpropertType] = useState("");
  const PostPropertySchema = Yup.object().shape({
    user_id: Yup.number().required("User ID is required"),

    user_type: Yup.string().required("User type is required"),

    property_for: Yup.string().required("Sale/Rent type is required"),

    sale_type: saleType
      ? Yup.string().required("Sale type is required")
      : Yup.string().nullable(),

    property_type: Yup.string().required("Property type is required"),
    furnishing_type: Yup.string().nullable(),
    property_sub_type: Yup.string().required("Property sub type is required"),

    address: Yup.string().required("Location is required"),

    city: Yup.string().required("City is required"),

    state: Yup.string().required("State is required"),

    zip: Yup.string().nullable(),

    lat: Yup.number()
      .typeError("Latitude must be a number")
      .required("Latitude is required"),

    lng: Yup.number()
      .typeError("Longitude must be a number")
      .required("Longitude is required"),

    land_area: Yup.string().required("Area is required"),

    bedroom:propertType==="House"? Yup.string()
      .typeError("Bedrooms must be a number")
      .required("Bedrooms are required"):Yup.string().nullable(),

    bathrooms:propertType==="House"?( Yup.number()
      .typeError("Bathrooms must be a number")
      .positive()
      .required("Bathrooms are required")):Yup.string().nullable(),

    purpose: Yup.string().nullable(),

    detail_property: Yup.string()
      .min(10, "Details must be at least 10 characters")
      .nullable(),

    asking_price: Yup.number()
      .typeError("Sale price must be a number")
      .positive("Price must be positive")
      .required("Sale price is required"),

    price_type: Yup.string().nullable(),

    rent_type: Yup.string().nullable(),

    yt_link: Yup.string().url("Enter a valid YouTube URL").nullable(),

    normal_trending: Yup.string()
      .oneOf(["Normal", "Trending"])
      .required("Post type is required"),

    time_period: Yup.number()
      .typeError("Time period must be a number")
      .required("Time period is required"),

    payment_method: Yup.string().required("Payment method is required"),

    tenure: saleType
      ? Yup.string().required("Ownership is required")
      : Yup.string().nullable(),

    tenancy_tenure: saleType
      ? Yup.string().nullable()
      : Yup.string().required("Tenanacy tenure is required"),

    property_condition: Yup.string().nullable(),

    reception: Yup.string().nullable(),

    home_age: Yup.string().nullable(),

    lot_size: Yup.number().typeError("Lot size must be a number").nullable(),

    house_charges: Yup.number()
      .typeError("House charges must be a number")
      .nullable(),

    pet_allowers: Yup.string().nullable(),

    imp_facts: Yup.string().nullable(),

    fees_conditions: Yup.string().nullable(),

    available_on: Yup.string().nullable(),

    visit_date: Yup.string().nullable(),

    visit_time: Yup.string().nullable(),
    ad_by:
      user.user_type === "Business"
        ? Yup.string().required("Ad by field is required")
        : Yup.string().nullable(),
  });

  const { data } = useGetProfilesQuery({ id: user.id });

  const [visit, setVisit] = useState("");
  const [postProperty, { isLoading }] = usePostPropertyMutation();
  return (
    <View className="bg-white flex-1 ">
      <ScrollView
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        className="bg-white flex-1"
      >
        <HeaderWithBack header="Sell Property" />
        <View style={{ marginHorizontal: hs(10), marginVertical: vs(20) }}>
          <Text style={{ fontWeight: 600, fontSize: ms(15) }}>
            Great! In simple steps
            <Text style={{ color: Colors.light.red }}> ADVERTISE </Text>
            your property For Sale
          </Text>
          <View
            style={{
              paddingHorizontal: hs(10),
              paddingTop: vs(20),
              marginTop: vs(10),
              borderRadius: 15,
              elevation: 4,
              backgroundColor: "white",
            }}
          >
            <Formik
              initialValues={{
                user_id: user.id,
                user_type: user.user_type,
                property_for: "Sale",
                sale_type: "",
                property_type: "",
                property_sub_type: "",
                address: "",
                city: "",
                state: "",
                zip: "",
                lat: 0,
                lng: 0,
                land_area: "",
                bedroom: "",
                bathrooms: "",
                purpose: "",
                detail_property: "",
                asking_price: "",
                price_type: "",
                rent_type: "",
                yt_link: "",
                normal_trending: "Normal",
                time_period: 2,
                payment_method: "wallet",
                tenure: "",
                tenancy_tenure: "",
                property_condition: "",
                reception: "",
                home_age: "",
                furnishing_type: "",
                lot_size: "",
                house_charges: "",
                pet_allowers: "",
                imp_facts: "",
                fees_conditions: "",
                available_on: "",
                visit_date: "",
                visit_time: "",
                ad_by: "",
                propertyimg: [],
                floorimg: [],
              }}
              validationSchema={PostPropertySchema}
              onSubmit={async (values) => {
                try {
                  const formData = new FormData();

                  Object.keys(values).forEach((key) => {
                    if (
                      key !== "propertyimg" &&
                      key !== "floorimg" &&
                      values[key] !== undefined &&
                      values[key] !== null
                    ) {
                      formData.append(key, String(values[key]));
                    }
                  });

                  if (Array.isArray(values.propertyimg)) {
                    values.propertyimg.forEach((img, index) => {
                      if (img.uri) {
                        formData.append("propertyimg[]", {
                          uri: img.uri,
                          name: img.name || `property_${index}.jpg`,
                          type: img.type || "image/jpeg",
                        } as any);
                      }
                    });
                  }

                  if (Array.isArray(values.floorimg)) {
                    values.floorimg.forEach((img, index) => {
                      if (img.uri) {
                        formData.append("floorimg[]", {
                          uri: img.uri,
                          name: img.name || `floor_${index}.jpg`,
                          type: img.type || "image/jpeg",
                        } as any);
                      }
                    });
                  }
                  for (const pair of formData.entries()) {
                    console.log(pair[0], pair[1]);
                  }

                  const result = await postProperty(formData);

                  if (result.data?.success) {
                    renderToastSuccess(result.data?.message);
                    console.log("Post ID:", result.data?.post_id);
                  } else {
                    console.log(result);
                  }
                } catch (error) {
                  console.log("Error:", error);
                  renderToastError(
                    "Failed to upload property. Please try again."
                  );
                }
              }}
            >
              {({
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                values,
                errors,
                touched,
              }) => (
                <>
                  <SelectRentAndSale
                    errorText={errors?.property_for || ""}
                    value={values.property_for}
                    onPress={async (value) => {
                      setFieldValue("property_for", value);

                      setSaleType(value === "sale" ? true : false);

                      setFieldValue("tenure", "");
                      setFieldValue("tenancy_tenure", "");
                      setFieldValue("price_type", "");
                      setFieldValue("rent_type", "");
                      setFieldValue("sale_type", "");
                    }}
                  />

                  {saleType && (
                    <>
                      <View className="flex-row" style={{ marginTop: vs(20) }}>
                        <View className="flex-row items-center">
                          <TouchableOpacity
                            onPress={() => setFieldValue("sale_type", "Normal")}
                          >
                            <MaterialIcons
                              size={18}
                              color={Colors.light.DarkGreen}
                              name={
                                values.sale_type === "Normal"
                                  ? "check-box"
                                  : "check-box-outline-blank"
                              }
                            />
                          </TouchableOpacity>
                          <Text style={{ marginLeft: hs(5) }}>Normal Sale</Text>
                        </View>
                        <View
                          className="flex-row items-center"
                          style={{ marginLeft: hs(10) }}
                        >
                          <TouchableOpacity
                            onPress={() =>
                              setFieldValue("sale_type", "Foreclosure")
                            }
                          >
                            <MaterialIcons
                              size={18}
                              color={Colors.light.DarkGreen}
                              name={
                                values.sale_type === "Foreclosure"
                                  ? "check-box"
                                  : "check-box-outline-blank"
                              }
                            />
                          </TouchableOpacity>
                          <Text style={{ marginLeft: hs(5) }}>Foreclosure</Text>
                        </View>
                      </View>
                      {touched && errors && (
                        <Text
                          style={{ color: Colors.light.red, marginTop: vs(5) }}
                        >
                          {errors.sale_type}
                        </Text>
                      )}
                    </>
                  )}

                  <View
                    style={{
                      height: vs(1),
                      marginTop: vs(20),
                      marginBottom: vs(10),
                      backgroundColor: Colors.light.textGray,
                      opacity: 0.2,
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: 600,
                      marginBottom: vs(10),
                      fontSize: ms(14),
                    }}
                  >
                    Property Type
                  </Text>
                  <PropertyType
                    onPress={(value) => {
                      setFieldValue("property_type", value);
                      setpropertType(value);
                      setFieldValue("property_sub_type", "");
                      if(value==="Farms/Lands"){
                        setFieldValue("bedroom","")
                         setFieldValue("bathrooms","")
                      }
                    }}
                    value={values.property_type}
                    errorText={errors.property_type || ""}
                  />
                  <FormikDropdown
                    title={""}
                    key={values.property_type}
                    setValue={setFieldValue}
                    placeholder="Property sub type"
                    value={values.property_sub_type}
                    options={
                      values.property_type === "House"
                        ? [
                            "Detached house",
                            "Semi-detached house",
                            "Town house Condo",
                            "Bungalow Co-op",
                            "Flats/ Apartments Condop",
                            "Penthouse",
                            "Park homes",
                            "Others",
                          ]
                        : values.property_type === "Commercials"
                        ? [
                            "office",
                            "office workspace",
                            "Retail properties",
                            "Leisure / Hospitality",
                            "Others",
                          ]
                        : [
                            "Land",
                            "Commercial development",
                            "Industrial development",
                            "Residential development",
                            "Farms",
                          ]
                    }
                    name="property_sub_type"
                    onSelect={() => {}}
                  />
                  <View
                    style={{
                      height: vs(1),
                      marginTop: vs(20),
                      marginBottom: vs(10),
                      backgroundColor: Colors.light.textGray,
                      opacity: 0.2,
                    }}
                  />

                  <AdressInput
                    city={"city"}
                    zip={"zip"}
                    state={"state"}
                    lat={"lat"}
                    long={"lng"}
                    latValue={values.lat}
                    longValue={values.lng}
                    name="address"
                    setValue={setFieldValue}
                    onSelect={() => {}}
                    title="Property Location"
                    placeholder="Enter complete address or street"
                    value={values.address}
                    touched={!!touched.address}
                    errors={!!errors.address}
                    required
                    errorText={errors.address}
                  />

                  <View
                    style={{
                      height: vs(1),
                      marginTop: vs(20),
                      marginBottom: vs(10),
                      backgroundColor: Colors.light.textGray,
                      opacity: 0.2,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: ms(15),
                      fontWeight: 500,
                      marginBottom: vs(10),
                    }}
                  >
                    Property Details
                  </Text>
                  <View className="flex-row justify-between gap-3">
                    <View className="flex-1">
                      <FormikInput
                        title="Area in Sqft"
                        placeholder="Area in Sqft*"
                        onChangeText={handleChange("land_area")}
                        onBlur={handleBlur("land_area")}
                        value={values.land_area}
                        touched={!!touched.land_area}
                        errors={!!errors.land_area}
                        required
                        errorText={errors.land_area}
                      />
                    </View>
                    {saleType ? (
                      <View className="flex-1">
                        <FormikDropdown
                          key={"sale-tenure"}
                          onSelect={() => {}}
                          options={[
                            "Freehold",
                            "Leasehold",
                            "Joint tenancy with rights of survivorship",
                            "Tenants by the entirety",
                            "Community property",
                            "Owning trust",
                            "Tenancy in common",
                            "Others",
                          ]}
                          title="Ownership"
                          placeholder="Select"
                          setValue={setFieldValue}
                          name="tenure"
                          value={values.tenure}
                          touched={!!touched.tenure}
                          errors={!!errors.tenure}
                          required
                          errorText={errors.tenure}
                        />
                      </View>
                    ) : (
                      <View className="flex-1">
                        <FormikDropdown
                          key={"rent-tenure"}
                          onSelect={() => {}}
                          options={[
                            "Open",
                            "Less than 6 months",
                            "6 months",
                            "1 year",
                            "More than 1 year",
                          ]}
                          title="Tenancy tenure"
                          placeholder="Select"
                          setValue={setFieldValue}
                          name="tenancy_tenure"
                          value={values.tenancy_tenure}
                          touched={!!touched.tenancy_tenure}
                          errors={!!errors.tenancy_tenure}
                          required
                          errorText={errors.tenancy_tenure}
                        />
                      </View>
                    )}
                  </View>
                {propertType!=="Farms/Lands"&&(
                  <View className="flex-row justify-between gap-3 mt-3">
                    <View className="flex-1">
                      <FormikDropdown
                        onSelect={() => {}}
                        options={[
                          "Studio",
                          "0",
                          "1",
                          "2",
                          "3",
                          "4",
                          "5",
                          "6",
                          "7",
                          "8",
                          "9",
                          "10",
                          "10+",
                        ]}
                        title="Beds"
                        name="bedroom"
                        setValue={setFieldValue}
                        placeholder="Beds"
                        value={values.bedroom}
                        touched={!!touched.bedroom}
                        errors={!!errors.bedroom}
                       required={propertType=== "House"}
                        errorText={errors.bedroom}
                      />
                    </View>
                    <View className="flex-1">
                      <FormikDropdown
                        onSelect={() => {}}
                        options={[
                          "0",
                          "1",
                          "2",
                          "3",
                          "4",
                          "5",
                          "6",
                          "7",
                          "8",
                          "9",
                          "10",
                          "10+",
                        ]}
                        title="Baths"
                        placeholder="Baths"
                        name="bathrooms"
                        setValue={setFieldValue}
                        value={values.bathrooms}
                        touched={!!touched.bathrooms}
                        errors={!!errors.bathrooms}
                          required={propertType=== "House"}
                        errorText={errors.bathrooms}
                      />
                    </View>
                  </View>
                )}
                  
                  <View className="flex-row justify-between gap-3 mt-3">
                    <View className="flex-1">
                      <FormikDropdown
                        onSelect={() => {}}
                        options={[
                          "Newly build",
                          "Total Re-build",
                          "Partial Re-build",
                          "Good condition",
                          "Moderate",
                          "Need Repairs",
                        ]}
                        title="Property condition"
                        placeholder=""
                        name="property_condition"
                        setValue={setFieldValue}
                        value={values.property_condition}
                        touched={!!touched.property_condition}
                        errors={!!errors.property_condition}
                        required={false}
                        errorText={errors.property_condition}
                      />
                    </View>
                    <View className="flex-1">
                      <FormikDropdown
                        onSelect={() => {}}
                        options={["0", "1", "2", "3", "4", "5", "5+"]}
                        title="Reception"
                        placeholder=""
                        name="reception"
                        setValue={setFieldValue}
                        value={values.reception}
                        touched={!!touched.reception}
                        errors={!!errors.reception}
                        required={false}
                        errorText={errors.reception}
                      />
                    </View>
                  </View>
                  <View className="flex-row justify-between gap-3 mt-3">
                    <View className="flex-1">
                      <FormikDropdown
                        onSelect={() => {}}
                        options={[
                          "No",
                          "Retirement homes",
                          "Student accomodation",
                        ]}
                        title="Purposeful property?"
                        placeholder=""
                        setValue={setFieldValue}
                        name="purpose"
                        value={values.purpose}
                        touched={!!touched.purpose}
                        errors={!!errors.purpose}
                        required={false}
                        errorText={errors.purpose}
                      />
                    </View>
                    <View className="flex-1">
                      <FormikDropdownwithjson
                        onSelect={() => {}}
                        options={[
                          { label: "Newly built", value: "Newly built" },
                          { label: "5 yrs", value: 5 },
                          { label: "10 yrs", value: 10 },
                          { label: "15 yrs", value: 15 },
                          { label: "20 yrs", value: 20 },
                          { label: "25 yrs", value: 25 },
                          { label: "30 yrs", value: 30 },
                          { label: "40 yrs", value: 40 },
                          { label: "50 yrs", value: 50 },
                          { label: "More than 50 yrs", value: "50+" },
                        ]}
                        title="Home age"
                        placeholder=""
                        name="home_age"
                        setValue={setFieldValue}
                        value={values.home_age}
                        touched={!!touched.home_age}
                        errors={!!errors.home_age}
                        required={false}
                        errorText={errors.home_age}
                      />
                    </View>
                  </View>
                  <View className="flex-row justify-between gap-3 mt-3">
                    <View className="flex-1">
                      <FormikInput
                        onBlur={handleBlur("lot_size")}
                        onChangeText={handleChange("lot_size")}
                        title="Lot size (acers)"
                        placeholder=""
                        value={values.lot_size}
                        touched={!!touched.lot_size}
                        errors={!!errors.lot_size}
                        required={false}
                        errorText={errors.lot_size}
                      />
                    </View>

                    <View className="flex-1">
                      {saleType ? (
                        <FormikInput
                          onBlur={handleBlur("house_charges")}
                          onChangeText={handleChange("house_charges")}
                          title="House charges /month"
                          placeholder=""
                          value={values.house_charges}
                          touched={!!touched.house_charges}
                          errors={!!errors.house_charges}
                          required={false}
                          errorText={errors.house_charges}
                        />
                      ) : (
                        <FormikDropdown
                          onSelect={() => {}}
                          options={["Yes", "No"]}
                          title="Pet allowed"
                          placeholder=""
                          name="pet_allowers"
                          setValue={setFieldValue}
                          value={values.pet_allowers}
                          touched={!!touched.pet_allowers}
                          errors={!!errors.pet_allowers}
                          required={false}
                          errorText={errors.pet_allowers}
                        />
                      )}
                    </View>
                  </View>
                  {!saleType && (
                    <FormikDropdown
                      onSelect={() => {}}
                      options={[
                        "Fully Furnished",
                        "Partly Furnished",
                        "Unfurnished",
                        "Under Construction",
                      ]}
                      title="Furnishing type"
                      placeholder=""
                      setValue={setFieldValue}
                      name="furnishing_type"
                      value={values.furnishing_type}
                      touched={!!touched.furnishing_type}
                      errors={!!errors.furnishing_type}
                      required={false}
                      errorText={errors.furnishing_type}
                    />
                  )}

                  <View>
                    <Text style={{ fontWeight: 600, marginTop: vs(10) }}>
                      Add main features
                    </Text>
                    <Text>
                      (Type property feature and hit + sign. To add more
                      features repeat process)
                    </Text>
                    <FormikInput
                      title=""
                      placeholder="e.g Garden, Parking, Pool etc"
                      onChangeText={handleChange("imp_facts")}
                      onBlur={handleBlur("imp_facts")}
                      value={values.imp_facts}
                      touched={!!touched.imp_facts}
                      errors={!!errors.imp_facts}
                      required={false}
                      mulipleFields
                      name="imp_facts"
                      setValue={setFieldValue}
                      errorText={errors.imp_facts}
                    />
                  </View>
                  <View
                    style={{
                      height: vs(1),
                      marginTop: vs(20),
                      marginBottom: vs(10),
                      backgroundColor: Colors.light.textGray,
                      opacity: 0.2,
                    }}
                  />
                  {!saleType && (
                    <>
                      <FormikInput
                        title="Fee & Condition"
                        placeholder=""
                        onChangeText={handleChange("fees_conditions")}
                        onBlur={handleBlur("fees_conditions")}
                        value={values.fees_conditions}
                        touched={!!touched.fees_conditions}
                        errors={!!errors.fees_conditions}
                        required={false}
                        additonalText={"Optional but give if there are any"}
                        multiline
                        errorText={errors.fees_conditions}
                      />
                      <Text style={{ fontWeight: 600 }}>
                        When property available for occupancy?
                        <Text style={{ color: Colors.light.red }}>*</Text>
                      </Text>
                      <View className="flex-row gap-3 items-center justify-between">
                        <TouchableOpacity
                          onPress={() => {
                            setFieldValue(
                              "available_on",
                              values.available_on === "Vacant now"
                                ? ""
                                : "Vacant now"
                            );
                          }}
                        >
                          <View className="flex-row mt-4 items-center">
                            <MaterialIcons
                              size={18}
                              color={Colors.light.DarkGreen}
                              name={
                                values.available_on === "Vacant now"
                                  ? "check-box"
                                  : "check-box-outline-blank"
                              }
                            />
                            <Text
                              style={{ marginLeft: hs(5), fontWeight: "500" }}
                            >
                              Vacant now
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <Text
                          style={{
                            color: Colors.light.red,
                            fontSize: ms(15),
                            fontWeight: 500,
                          }}
                        >
                          OR
                        </Text>
                        <View className="flex-1 ">
                          <DatePickerField
                            errorText={errors.available_on}
                            name="available_on"
                            value={values.available_on}
                            editable={values.available_on !== "Vacant now"}
                            setValue={setFieldValue}
                            title=""
                            placeholder="dd/mm//yy"
                            touched={!!touched}
                            errors={!!errors}
                            required={false}
                          />
                        </View>
                      </View>
                    </>
                  )}
                  <Text style={{ fontWeight: 600 }}>
                    Property Visit options
                  </Text>
                  <Text>Buyer can visit property physically?</Text>
                  <View
                    className="flex-row"
                    style={{ marginTop: vs(10), marginBottom: vs(20) }}
                  >
                    <View className="flex-row items-center">
                      <TouchableOpacity
                        onPress={() => {
                          setVisit(visit === "Yes" ? "" : "Yes");
                        }}
                      >
                        <MaterialIcons
                          size={18}
                          color={Colors.light.DarkGreen}
                          name={
                            visit === "Yes"
                              ? "check-box"
                              : "check-box-outline-blank"
                          }
                        />
                      </TouchableOpacity>
                      <Text style={{ marginLeft: hs(5) }}>Yes</Text>
                    </View>

                    <View
                      className="flex-row items-center"
                      style={{ marginLeft: hs(20) }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          setVisit(visit === "No" ? "" : "No");
                        }}
                      >
                        <MaterialIcons
                          size={18}
                          color={Colors.light.DarkGreen}
                          name={
                            visit === "No"
                              ? "check-box"
                              : "check-box-outline-blank"
                          }
                        />
                      </TouchableOpacity>
                    </View>

                    <Text style={{ marginLeft: hs(5) }}>No</Text>
                  </View>

                  <View
                    style={{
                      height: vs(1),
                      marginTop: vs(20),
                      marginBottom: vs(10),
                      backgroundColor: Colors.light.textGray,
                      opacity: 0.2,
                    }}
                  />
                  {visit === "Yes" && (
                    <View className="flex-row justify-between gap-3">
                      <View className="flex-1">
                        <View className="flex-1" style={{ marginLeft: hs(5) }}>
                          <DatePickerField
                            errorText={errors.visit_date}
                            name="visit_date"
                            required={false}
                            value={values.visit_date}
                            editable
                            setValue={setFieldValue}
                            title="Date for viewing"
                            placeholder="dd/mm/yy"
                            touched={!!touched}
                            errors={!!errors}
                          />
                        </View>
                      </View>
                      <View className="flex-1">
                        <TimePickerField
                          errorText={errors.visit_time}
                          name="visit_time"
                          required={false}
                          value={values.visit_time}
                          editable
                          setValue={setFieldValue}
                          title="Time for viewing"
                          placeholder="dd/mm/yy"
                          touched={!!touched}
                          errors={!!errors}
                        />
                      </View>
                    </View>
                  )}

                  <FormikInput
                    title="More Description"
                    placeholder="Write here (Upto 5000 characters)"
                    onChangeText={handleChange("detail_property")}
                    onBlur={handleBlur("detail_property")}
                    value={values.detail_property}
                    touched={!!touched.detail_property}
                    errors={!!errors.detail_property}
                    required={false}
                    additonalText={"5000 words"}
                    multiline
                    errorText={errors.detail_property}
                  />
                  <View
                    style={{
                      height: vs(1),
                      marginTop: vs(20),
                      marginBottom: vs(10),
                      backgroundColor: Colors.light.textGray,
                      opacity: 0.2,
                    }}
                  />
                  <View className="flex-row gap-3">
                    <View className="flex-1">
                      <FormikInput
                        title="Property Price"
                        placeholder=""
                        name="asking_price"
                        onChangeText={handleChange("asking_price")}
                        onBlur={handleBlur("asking_price")}
                        value={values.asking_price}
                        touched={!!touched.asking_price}
                        errors={!!errors.asking_price}
                        required
                        errorText={errors.asking_price}
                      />
                    </View>
                    <View style={{ marginTop: vs(30) }} className="flex-1">
                      {saleType ? (
                        <FormikDropdown
                          key={"sale-type"}
                          onSelect={() => {}}
                          options={[
                            "Guide price",
                            "Final asking price",
                            "Offers above this",
                            "Under offer",
                            "Reduced Price",
                          ]}
                          title=""
                          placeholder="Price Type"
                          name="price_type"
                          setValue={setFieldValue}
                          value={values.price_type}
                          touched={!!touched.price_type}
                          errors={!!errors.price_type}
                          required
                          errorText={errors.price_type}
                        />
                      ) : (
                        <FormikDropdownwithjson
                          key={"rent-type"}
                          onSelect={() => {}}
                          options={[{label:"Per week", value:"week"},{label:"per month",value:"month"}]}
                          title=""
                          placeholder="Rent Type"
                          name="rent_type"
                          value={values.rent_type}
                          touched={!!touched.rent_type}
                          errors={!!errors.rent_type}
                          required={false}
                          setValue={setFieldValue}
                          errorText={errors.rent_type}
                        />
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      height: vs(1),
                      marginTop: vs(20),
                      marginBottom: vs(10),
                      backgroundColor: Colors.light.textGray,
                      opacity: 0.2,
                    }}
                  />
                  <UploadPic
                    key="propertyimg"
                    Logo={Profilelogo}
                    text1="Upload IMAGES"
                    text2=""
                    additionalText={`Upload upto 30 images.\n More images get more attractions`}
                    value={values.propertyimg}
                    limt={30}
                    name="propertyimg"
                    border
                    setValue={setFieldValue}
                  />
                  <UploadPic
                    key="floorimg"
                    Logo={ImageUpload}
                    text1="Upload FLOOR plan"
                    text2=" "
                    text3=""
                    limt={5}
                    additionalText="Upload upto 5 floor images"
                    border
                    setValue={setFieldValue}
                    name={"floorimg"}
                    value={values.floorimg}
                  />
                  <FormikInput
                    title="Provide youtube video link"
                    placeholder="youtube video link"
                    onChangeText={handleChange("yt_link")}
                    onBlur={handleBlur("yt_link")}
                    value={values.yt_link}
                    touched={!!touched.yt_link}
                    errors={!!errors.yt_link}
                    required={false}
                    errorText={errors.yt_link}
                  />
                  {user.user_type === "Business" && (
                    <>
                      <Text className="font-bold">Advertise as</Text>
                      {data?.total_profiles !== 0 && (
                        <View>
                          {data?.profiles_exist?.agent && (
                            <TouchableOpacity
                              onPress={() => {
                                setFieldValue(
                                  "ad_by",
                                  values.ad_by === "Agent" ? "" : "Agent"
                                );
                              }}
                            >
                              <View className="flex-row mt-4 items-center">
                                <MaterialIcons
                                  size={18}
                                  color={Colors.light.DarkGreen}
                                  name={
                                    values.ad_by === "Agent"
                                      ? "check-box"
                                      : "check-box-outline-blank"
                                  }
                                />
                                <Text
                                  style={{
                                    marginLeft: hs(5),
                                    fontWeight: "500",
                                  }}
                                >
                                  Agent
                                </Text>
                              </View>
                            </TouchableOpacity>
                          )}
                          {data?.profiles_exist?.builder && (
                            <TouchableOpacity
                              onPress={() => {
                                setFieldValue(
                                  "ad_by",
                                  values.ad_by === "Builder" ? "" : "Builder"
                                );
                              }}
                            >
                              <View className="flex-row mt-4 items-center">
                                <MaterialIcons
                                  size={18}
                                  color={Colors.light.DarkGreen}
                                  name={
                                    values.ad_by === "Builder"
                                      ? "check-box"
                                      : "check-box-outline-blank"
                                  }
                                />
                                <Text
                                  style={{
                                    marginLeft: hs(5),
                                    fontWeight: "500",
                                  }}
                                >
                                  Builder
                                </Text>
                              </View>
                            </TouchableOpacity>
                          )}
                          {data?.profiles_exist?.decor && (
                            <TouchableOpacity
                              onPress={() => {
                                setFieldValue(
                                  "ad_by",
                                  values.ad_by === "Decor" ? "" : "Decor"
                                );
                              }}
                            >
                              <View className="flex-row mt-4 items-center">
                                <MaterialIcons
                                  size={18}
                                  color={Colors.light.DarkGreen}
                                  name={
                                    values.ad_by === "Decor"
                                      ? "check-box"
                                      : "check-box-outline-blank"
                                  }
                                />
                                <Text
                                  style={{
                                    marginLeft: hs(5),
                                    fontWeight: "500",
                                  }}
                                >
                                  Decor
                                </Text>
                              </View>
                            </TouchableOpacity>
                          )}
                          {data?.profiles_exist?.electrician && (
                            <TouchableOpacity
                              onPress={() => {
                                setFieldValue(
                                  "ad_by",
                                  values.ad_by === "Electrician"
                                    ? ""
                                    : "Electrician"
                                );
                              }}
                            >
                              <View className="flex-row mt-4 items-center">
                                <MaterialIcons
                                  size={18}
                                  color={Colors.light.DarkGreen}
                                  name={
                                    values.ad_by === "Electrician"
                                      ? "check-box"
                                      : "check-box-outline-blank"
                                  }
                                />
                                <Text
                                  style={{
                                    marginLeft: hs(5),
                                    fontWeight: "500",
                                  }}
                                >
                                  Electrician
                                </Text>
                              </View>
                            </TouchableOpacity>
                          )}
                          {data?.profiles_exist?.investor && (
                            <TouchableOpacity
                              onPress={() => {
                                setFieldValue(
                                  "ad_by",
                                  values.ad_by === "Investor" ? "" : "Investor"
                                );
                              }}
                            >
                              <View className="flex-row mt-4 items-center">
                                <MaterialIcons
                                  size={18}
                                  color={Colors.light.DarkGreen}
                                  name={
                                    values.ad_by === "Investor"
                                      ? "check-box"
                                      : "check-box-outline-blank"
                                  }
                                />
                                <Text
                                  style={{
                                    marginLeft: hs(5),
                                    fontWeight: "500",
                                  }}
                                >
                                  Investor
                                </Text>
                              </View>
                            </TouchableOpacity>
                          )}
                          {data?.profiles_exist?.mortgage && (
                            <TouchableOpacity
                              onPress={() => {
                                setFieldValue(
                                  "ad_by",
                                  values.ad_by === "Mortgage" ? "" : "Mortgage"
                                );
                              }}
                            >
                              <View className="flex-row mt-4 items-center">
                                <MaterialIcons
                                  size={18}
                                  color={Colors.light.DarkGreen}
                                  name={
                                    values.ad_by === "Mortgage"
                                      ? "check-box"
                                      : "check-box-outline-blank"
                                  }
                                />
                                <Text
                                  style={{
                                    marginLeft: hs(5),
                                    fontWeight: "500",
                                  }}
                                >
                                  Mortgage
                                </Text>
                              </View>
                            </TouchableOpacity>
                          )}
                          {data?.profiles_exist?.painter && (
                            <TouchableOpacity
                              onPress={() => {
                                setFieldValue(
                                  "ad_by",
                                  values.ad_by === "Painter" ? "" : "Painter"
                                );
                              }}
                            >
                              <View className="flex-row mt-4 items-center">
                                <MaterialIcons
                                  size={18}
                                  color={Colors.light.DarkGreen}
                                  name={
                                    values.ad_by === "Painter"
                                      ? "check-box"
                                      : "check-box-outline-blank"
                                  }
                                />
                                <Text
                                  style={{
                                    marginLeft: hs(5),
                                    fontWeight: "500",
                                  }}
                                >
                                  Painter
                                </Text>
                              </View>
                            </TouchableOpacity>
                          )}
                          {data?.profiles_exist?.plumber && (
                            <TouchableOpacity
                              onPress={() => {
                                setFieldValue(
                                  "ad_by",
                                  values.ad_by === "Plumber" ? "" : "Plumber"
                                );
                              }}
                            >
                              <View className="flex-row mt-4 items-center">
                                <MaterialIcons
                                  size={18}
                                  color={Colors.light.DarkGreen}
                                  name={
                                    values.ad_by === "Plumber"
                                      ? "check-box"
                                      : "check-box-outline-blank"
                                  }
                                />
                                <Text
                                  style={{
                                    marginLeft: hs(5),
                                    fontWeight: "500",
                                  }}
                                >
                                  Plumber
                                </Text>
                              </View>
                            </TouchableOpacity>
                          )}
                          {touched && errors && (
                            <Text
                              style={{
                                color: Colors.light.red,
                                marginTop: vs(5),
                              }}
                            >
                              {errors.ad_by}
                            </Text>
                          )}
                        </View>
                      )}
                    </>
                  )}
                  <View
                    style={{
                      height: vs(1),
                      marginTop: vs(20),
                      marginBottom: vs(10),
                      backgroundColor: Colors.light.textGray,
                      opacity: 0.2,
                    }}
                  />
                  <SelecteAdType
                    title1="Select Ad Type"
                    title2=""
                    btnTxt1="Free Ad"
                    btnTxt2="Trending Ad"
                    btn1value="Normal"
                    btn2value="Trending"
                    Componet1={
                      <Text
                        style={{
                          marginTop: vs(10),
                          color: Colors.light.textGray,
                        }}
                      >
                        Post your ad for free.You can upgrade your ad to
                        trending from your dashboard any time to make deal done
                        more quickly
                      </Text>
                    }
                    Componet2={
                      <View>
                        <View className="flex-row justify-between items-center mt-4">
                          <RadioButton
                            onPress={(value) =>
                              setFieldValue("advatize_time", value)
                            }
                            checkedValue="15 Days"
                            text="For 15 days"
                            value={values.advatize_time}
                          />
                          <Text>$50</Text>
                        </View>
                        <View className="flex-row justify-between items-center">
                          <RadioButton
                            onPress={(value) =>
                              setFieldValue("advatize_time", value)
                            }
                            checkedValue="30 Days"
                            text="For 30 days"
                            value={values.advatize_time}
                          />
                          <Text>$100</Text>
                        </View>
                        <View className="flex-row justify-between items-center">
                          <RadioButton
                            onPress={(value) =>
                              setFieldValue("advatize_time", value)
                            }
                            checkedValue="60 Days"
                            text="For 60 days"
                            value={values.advatize_time}
                          />
                          <Text>$150</Text>
                        </View>
                        <View
                          style={{
                            height: vs(1),
                            marginTop: vs(20),
                            marginBottom: vs(10),
                            backgroundColor: Colors.light.textGray,
                            opacity: 0.2,
                          }}
                        />
                        <Text style={{ fontSize: ms(15), fontWeight: "600" }}>
                          Select your payment method
                        </Text>
                        <View style={styles.card} className="items-center">
                          <Text style={{ fontSize: ms(15), fontWeight: "600" }}>
                            Your Homeilove account balance
                          </Text>
                          <Text
                            style={{
                              marginVertical: vs(10),
                              color: Colors.light.red,
                              fontSize: ms(15),
                              fontWeight: "600",
                            }}
                          >
                            $ 0
                          </Text>
                          <Text
                            className="text-center"
                            style={{ color: Colors.light.textGray }}
                          >
                            Have more ads to post then buy bundle and get extra
                            discount. You’ can use credit any time means no
                            expiry!
                          </Text>
                          <View></View>
                        </View>
                        <View>
                          <View style={styles.card}>
                            <Text style={styles.title}>
                              Your Homeilove account Balance
                            </Text>

                            <LargeButton
                              text="Add Credits"
                              handleSubmit={() => {}}
                            />

                            <View style={styles.paymentOptions}>
                              <TouchableOpacity
                                style={[
                                  styles.paymentButton,
                                  { backgroundColor: Colors.light.Yellow },
                                ]}
                              >
                                <View className="mt-2">
                                  <Paypal />
                                </View>
                              </TouchableOpacity>

                              <TouchableOpacity
                                style={[
                                  styles.paymentButton,
                                  { backgroundColor: Colors.light.Yellow },
                                ]}
                              >
                                <PayLater />
                              </TouchableOpacity>

                              <TouchableOpacity
                                style={[
                                  styles.paymentButton,
                                  { backgroundColor: "#2C2C2C" },
                                ]}
                              >
                                <Volit />
                                <Text style={styles.paymentText}>
                                  Debit or Credit Card
                                </Text>
                              </TouchableOpacity>
                            </View>
                            <View className="self-center mt-4">
                              <PowerdByPayPal />
                            </View>
                          </View>
                        </View>
                      </View>
                    }
                    value={values.sale_type}
                    onPress={(selected) => setFieldValue("sale_type", selected)}
                  />
                  <View className="my-4">
                    <LargeButton
                      handleSubmit={() => {
                        handleSubmit();
                        console.log(errors);
                      }}
                      text="Submit Ad"
                    />
                  </View>
                </>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
      <Loading isLoading={isLoading} text={"Creating Property Post"} />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  card: {
    marginVertical: vs(20),
    backgroundColor: "white",
    borderRadius: ms(8),
    elevation: 5,
    paddingVertical: vs(10),
    paddingHorizontal: hs(15),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  title: {
    fontSize: ms(14),
    textAlign: "center",
    fontWeight: "500",
    marginBottom: vs(15),
  },

  paymentOptions: {
    marginTop: vs(30),
  },
  paymentButton: {
    flexDirection: "row",
    borderRadius: ms(8),
    alignItems: "center",
    justifyContent: "center",
    height: vs(40),
    marginBottom: vs(10),
  },
  paymentText: {
    color: "white",
    fontSize: ms(14),
    fontWeight: "600",
    marginLeft: hs(8),
  },
});
