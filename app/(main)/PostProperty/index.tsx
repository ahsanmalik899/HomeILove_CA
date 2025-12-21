import ImageUpload from "@assets/CreateProfile/uploadimage.svg";
import Profilelogo from "@assets/CreateProfile/uploadprofilewithcircle.svg";
import Map from "@assets/icons/PostProperty/map.svg";
import PayLater from "@assets/SideBar/pay-later.svg";
import Paypal from "@assets/SideBar/paypal-icon.svg";
import PowerdByPayPal from "@assets/SideBar/Powered by PayPal.svg";
import Volit from "@assets/SideBar/volit-white.svg";
import { MaterialIcons } from "@expo/vector-icons";
import { AdressInput } from "@src/components/globals/AddressInput";
import DatePickerField from "@src/components/globals/DatePickerField";
import { FormikInput } from "@src/components/globals/FormictInput";
import { FormikDropdown } from "@src/components/globals/FormikDropdown/indes";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LargeButton from "@src/components/globals/LaregeButton";
import PropertyType from "@src/components/globals/PropertyType";
import RadioButton from "@src/components/globals/RadioButton";
import SelectRentAndSale from "@src/components/globals/SelectRentAndSale";
import SelecteAdType from "@src/components/globals/TablikeButton";
import UploadPic from "@src/components/globals/UploadPic";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { Formik } from "formik";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Yup from "yup";
const index = () => {
  const PostPropertySchema = Yup.object().shape({
    user_id: Yup.number().required("User ID is required"),

    user_type: Yup.string().required("User type is required"),

    property_for: Yup.string()
      .oneOf(["Sale", "Rent"])
      .required("Sale/Rent type is required"),

    sale_type: Yup.string().required("Sale type is required"),

    property_type: Yup.string().required("Property type is required"),

    property_sub_type: Yup.string().required("Property sub type is required"),

    address: Yup.string().required("Location is required"),

    city: Yup.string().required("City is required"),

    state: Yup.string().required("State is required"),

    zip: Yup.string().required("ZIP code is required"),

    lat: Yup.number()
      .typeError("Latitude must be a number")
      .required("Latitude is required"),

    lng: Yup.number()
      .typeError("Longitude must be a number")
      .required("Longitude is required"),

    land_area: Yup.string().required("Area is required"),

    bedroom: Yup.number()
      .typeError("Bedrooms must be a number")
      .positive()
      .required("Bedrooms are required"),

    bathrooms: Yup.number()
      .typeError("Bathrooms must be a number")
      .positive()
      .required("Bathrooms are required"),

    purpose: Yup.string().required("Purpose is required"),

    detail_property: Yup.string()
      .min(10, "Details must be at least 10 characters")
      .required("Property details are required"),

    asking_price: Yup.number()
      .typeError("Sale price must be a number")
      .positive("Price must be positive")
      .required("Sale price is required"),

    price_type: Yup.string().required("Price type is required"),

    rent_type: Yup.string().required("Rent type is required"),

    yt_link: Yup.string().url("Enter a valid YouTube URL").nullable(),

    normal_trending: Yup.string()
      .oneOf(["Normal", "Trending"])
      .required("Post type is required"),

    time_period: Yup.number()
      .typeError("Time period must be a number")
      .required("Time period is required"),

    payment_method: Yup.string().required("Payment method is required"),

    tenure: Yup.string().nullable(),

    tenancy_tenure: Yup.string().nullable(),

    property_condition: Yup.string().nullable(),

    reception: Yup.string().nullable(),

    home_age: Yup.number().typeError("Home age must be a number").nullable(),

    lot_size: Yup.string().nullable(),

    house_charges: Yup.number()
      .typeError("House charges must be a number")
      .nullable(),

    pet_allowers: Yup.string().nullable(),

    imp_facts: Yup.string().nullable(),

    fees_conditions: Yup.string().nullable(),

    available_on: Yup.string().nullable(),

    visit_date: Yup.string().nullable(),

    visit_time: Yup.string().nullable(),

    ad_by: Yup.string().required("Ad by field is required"),
  });

  const [visit, setVisit] = useState("");
  return (
    <ScrollView className="bg-white flex-1">
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
              user_id: 5,
              user_type: "Agent",
              property_for: "",
              sale_type: "",
              property_type: "",
              property_sub_type: "",
              address: "",
              city: "",
              state: "",
              zip: "",
              lat: "",
              lng: "",
              land_area: "",
              bedroom: "",
              bathrooms: "",
              purpose: "",
              detail_property: "",
              asking_price: "",
              price_type: "PKR",
              rent_type: "",
              yt_link: "",
              normal_trending: "Trending",
              time_period: "",
              payment_method: "wallet",
              tenure: "",
              tenancy_tenure: "",
              property_condition: "",
              reception: "",
              home_age: "",
              lot_size: "",
              house_charges: "",
              pet_allowers: "",
              imp_facts: "",
              fees_conditions: "",
              available_on: "",
              visit_date: "",
              visit_time: "",
              ad_by: "Agent",
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
                    formData.append(key, values[key].toString());
                  }
                });

             
               // Append property images
    if (Array.isArray(values.propertyimg)) {
      values.propertyimg.forEach((img) => {
        if (img.uri) {
          formData.append("propertyimg", {
            uri: img.uri,
            name: img.name || `property_${Date.now()}.jpg`,
            type: img.type || "image/jpeg",
          } as any);
        }
      });
    }

    // Append floor images
    if (Array.isArray(values.floorimg)) {
      values.floorimg.forEach((img) => {
        if (img.uri) {
          formData.append("floorimg", {
            uri: img.uri,
            name: img.name || `floor_${Date.now()}.jpg`,
            type: img.type || "image/jpeg",
          } as any);
        }
      });
    }
                console.log(formData);
              } catch (error) {
                console.log("Error:", error);
                alert("Failed to upload property. Please try again.");
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
                  value={values.property_for}
                  onPress={(value) => {
                    setFieldValue("property_for", value);
                  }}
                />
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
                      onPress={() => setFieldValue("sale_type", "Foreclosure")}
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
                  }}
                  value={values.property_type}
                />
                <FormikDropdown
                  title={""}
                  setValue={setFieldValue}
                  value={"Detached House"}
                  options={["Detached House"]}
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
                  lat={"lng"}
                  long="lat"
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
                <View style={{ marginTop: vs(20) }}>
                  <Map />
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
                  <View className="flex-1">
                    <FormikDropdown
                      onSelect={() => {}}
                      options={["Select", "Select", "Select"]}
                      title="Ownership"
                      placeholder="Select"
                      setValue={setFieldValue}
                      value={values.land_area}
                      touched={!!touched.land_area}
                      errors={!!errors.land_area}
                      required
                      errorText={errors.land_area}
                    />
                  </View>
                </View>
                <View className="flex-row justify-between gap-3 mt-3">
                  <View className="flex-1">
                    <FormikDropdown
                      onSelect={() => {}}
                      options={["1", "2", "3"]}
                      title="Beds"
                      name="bedroom"
                      setValue={setFieldValue}
                      placeholder="Beds"
                      value={values.bedroom}
                      touched={!!touched.bedroom}
                      errors={!!errors.bedroom}
                      required
                      errorText={errors.bedroom}
                    />
                  </View>
                  <View className="flex-1">
                    <FormikDropdown
                      onSelect={() => {}}
                      options={["1", "2", "3"]}
                      title="Baths"
                      placeholder="Baths"
                      name="bathrooms"
                      setValue={setFieldValue}
                      value={values.bathrooms}
                      touched={!!touched.bathrooms}
                      errors={!!errors.bathrooms}
                      required
                      errorText={errors.bathrooms}
                    />
                  </View>
                </View>
                <View className="flex-row justify-between gap-3 mt-3">
                  <View className="flex-1">
                    <FormikDropdown
                      onSelect={() => {}}
                      options={["Select", "Select", "Select"]}
                      title="Property condition"
                      placeholder=""
                      value={values.property_condition}
                      touched={!!touched.property_condition}
                      errors={!!errors.property_condition}
                      required
                      errorText={errors.property_condition}
                    />
                  </View>
                  <View className="flex-1">
                    <FormikDropdown
                      onSelect={() => {}}
                      options={["Select", "Select", "Select"]}
                      title="Reception"
                      placeholder=""
                      value={values.reception}
                      touched={!!touched.reception}
                      errors={!!errors.reception}
                      required
                      errorText={errors.reception}
                    />
                  </View>
                </View>
                <View className="flex-row justify-between gap-3 mt-3">
                  <View className="flex-1">
                    <FormikDropdown
                      onSelect={() => {}}
                      options={["Select", "Select", "Select"]}
                      title="Purposeful property?"
                      placeholder=""
                      setValue={setFieldValue}
                      name="purpose"
                      value={values.purpose}
                      touched={!!touched.purpose}
                      errors={!!errors.purpose}
                      required
                      errorText={errors.purpose}
                    />
                  </View>
                  <View className="flex-1">
                    <FormikDropdown
                      onSelect={() => {}}
                      options={["Select", "Select", "Select"]}
                      title="Home age"
                      placeholder=""
                      value={values.home_age}
                      touched={!!touched.home_age}
                      errors={!!errors.home_age}
                      required
                      errorText={errors.home_age}
                    />
                  </View>
                </View>
                <View className="flex-row justify-between gap-3 mt-3">
                  <View className="flex-1">
                    <FormikDropdown
                      onSelect={() => {}}
                      options={["Select", "Select", "Select"]}
                      title="Lot size (acers)"
                      placeholder=""
                      value={values.lot_size}
                      touched={!!touched.lot_size}
                      errors={!!errors.lot_size}
                      required
                      errorText={errors.lot_size}
                    />
                  </View>
                  <View className="flex-1">
                    <FormikDropdown
                      onSelect={() => {}}
                      options={["Select", "Select", "Select"]}
                      title="House charges /month"
                      placeholder=""
                      value={values.house_charges}
                      touched={!!touched.house_charges}
                      errors={!!errors.house_charges}
                      required
                      errorText={errors.house_charges}
                    />
                  </View>
                </View>
                <View className="flex-row justify-between gap-3">
                  <View className="flex-1">
                    <FormikInput
                      title="Rent Type"
                      placeholder="Area in Sqft*"
                      onChangeText={handleChange("rent_type")}
                      onBlur={handleBlur("rent_type")}
                      value={values.rent_type}
                      touched={!!touched.rent_type}
                      errors={!!errors.rent_type}
                      required
                      errorText={errors.rent_type}
                    />
                  </View>
                  <View className="flex-1">
                    <FormikDropdown
                      onSelect={() => {}}
                      options={["1", "2", "3"]}
                      title="Time Period"
                      placeholder="Select"
                      name="time_period"
                      setValue={setFieldValue}
                      value={values.time_period}
                      touched={!!touched.time_period}
                      errors={!!errors.time_period}
                      required
                      errorText={errors.time_period}
                    />
                  </View>
                </View>
                <View>
                  <Text style={{ fontWeight: 600, marginTop: vs(10) }}>
                    Add main features
                  </Text>
                  <Text>
                    (Type property feature and hit + sign. To add more features
                    repeat process)
                  </Text>
                  <FormikInput
                    title=""
                    placeholder="e.g Garden, Parking, Pool etc"
                    onChangeText={handleChange("land_area")}
                    onBlur={handleBlur("land_area")}
                    value={values.imp_facts}
                    touched={!!touched.imp_facts}
                    errors={!!errors.imp_facts}
                    required={false}
                    mulipleFields
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
                {values.property_for === "Rent" && (
                  <>
                    <FormikInput
                      title="Fee & Condition"
                      placeholder=""
                      onChangeText={handleChange("property_details")}
                      onBlur={handleBlur("property_details")}
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
                      <Text style={{ color: Colors.light.red }}>or</Text>
                      <View className="flex-1 ">
                        <DatePickerField
                          errorText={errors.available_on}
                          name="available_on"
                          value={values.available_on}
                          editable
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
                <Text style={{ fontWeight: 600 }}>Property Visit options</Text>
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
                    <FormikDropdown
                      onSelect={() => {}}
                      options={["Select", "Select", "Select"]}
                      title=""
                      placeholder="Price Type"
                      value={values.price_type}
                      touched={!!touched.price_type}
                      errors={!!errors.price_type}
                      required
                      errorText={errors.price_type}
                    />
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
                <Text className="font-bold">Advertise as</Text>
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
                    <Text style={{ marginLeft: hs(5), fontWeight: "500" }}>
                      Agent
                    </Text>
                  </View>
                </TouchableOpacity>
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
                      Post your ad for free.You can upgrade your ad to trending
                      from your dashboard any time to make deal done more
                      quickly
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
