import { useCreateProfileMutation } from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import ImageUpload from "@assets/CreateProfile/uploadimage.svg";
import Profilelogo from "@assets/CreateProfile/uploadprofilewithcircle.svg";
import { MaterialIcons } from "@expo/vector-icons";

import { AdressInput } from "@src/components/globals/AddressInput";
import { DealingAreas } from "@src/components/globals/DealingAreas";
import { FormikInput } from "@src/components/globals/FormictInput";
import { FormikDropdown } from "@src/components/globals/FormikDropdown/indes";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LargeButton from "@src/components/globals/LaregeButton";
import Loading from "@src/components/globals/Loading";
import SelecteAdType from "@src/components/globals/TablikeButton";
import UploadPic from "@src/components/globals/UploadPic";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { renderToastError, renderToastSuccess } from "@src/hooks/useToasty";
import { hs, ms, vs } from "@utils/design/design";

import { router, useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";
interface ProfileConfig {
  profileType: string;
  title: string;
  serviceTitle: string;
  licenceNoTitle: string;
  serviceDefault: string;
  serviceOption: string[];
  isService: Boolean;
  isLicenceIssue: Boolean;
  isInvestor: Boolean;
  servingas: boolean;
  institution: boolean;
  licExpiry: boolean;
  licState: boolean;
  valuation: boolean;
  licence: boolean;
  multilicence: boolean;
}
const Index = () => {
  let dataAccordingType: ProfileConfig = {
    profileType: "",
    title: "Profile",
    licenceNoTitle: "License No",
    serviceTitle: "",
    serviceDefault: "",
    serviceOption: [],
    isService: false,
    isLicenceIssue: true,
    isInvestor: false,
    servingas: false,
    institution: false,
    licExpiry: false,
    licState: false,
    valuation: false,
    multilicence: true,
    licence: true,
  };
  const investmentOptionsmin = [
  { label: "Up to 1 million", value: 1_000_000 },
  { label: "Up to 20 million", value: 20_000_000 },
  { label: "Up to 50 million", value: 50_000_000 },
  { label: "Up to 60 million", value: 60_000_000 },
];
  const user = useAppSelector(userdata);
  const { type } = useLocalSearchParams();
  const [valuationFor, setValuationFor] = useState(false);
  switch (type) {
    case "Builder Profile":
      dataAccordingType = {
        profileType: "Builder",
        title: "Builder",
        licenceNoTitle: "License No",
        serviceTitle: "Services for",
        serviceDefault: "All type of developments",
        serviceOption: [
          "All type of developments",
          "Home developments",
          "Commercial developments",
          "Housing estates developments",
          "Home renovation",
          "Home re-build",
          "Home extensions",
          "Other",
        ],
        multilicence: true,
        isLicenceIssue: true,
        isService: true,
        isInvestor: false,
        servingas: true,
        institution: false,
        licExpiry: false,
        licState: false,
        valuation: false,
        licence: true,
      };
      break;

    case "Mortgage Profile":
      dataAccordingType = {
        profileType: "Mortgage",
        title: "Mortgage Advisor",
        serviceTitle: "Serving as ",
        serviceDefault: "",
        isService: true,
        serviceOption: ["Loan officer", "Mortgage broker", "Mortgage lender"],
        isLicenceIssue: false,
        licenceNoTitle: "NMLS License No",
        isInvestor: false,
        servingas: false,
        institution: true,
        licExpiry: false,
        multilicence: false,
        licState: false,
        licence: true,
        valuation: false,
      };
      break;

    case "Decor Profile":
      dataAccordingType = {
        profileType: "Decore",
        title: "Home Decor",
        serviceTitle: "",
        serviceDefault: "",
        isService: false,
        licenceNoTitle: "License No",
        serviceOption: [],
        isLicenceIssue: true,
        isInvestor: false,
        servingas: false,
        multilicence: true,
        institution: false,
        licExpiry: false,
        licence: true,
        licState: false,
        valuation: false,
      };
      break;

    case "Plumber Profile":
      dataAccordingType = {
        profileType: "Plumber",
        title: "Plumber",
        serviceTitle: "",
        serviceDefault: "",
        licenceNoTitle: "License No",
        isService: false,
        serviceOption: [],
        isLicenceIssue: true,
        isInvestor: false,
        servingas: false,
        multilicence: true,
        licence: true,
        institution: false,
        licExpiry: false,
        licState: false,
        valuation: false,
      };
      break;

    case "Painter Profile":
      dataAccordingType = {
        profileType: "Painter",
        title: "Painter",
        serviceTitle: "",
        serviceDefault: "",
        licenceNoTitle: "License No",
        isService: false,
        serviceOption: [],
        isLicenceIssue: true,
        isInvestor: false,
        servingas: false,
        multilicence: true,
        institution: false,
        licExpiry: false,
        licence: true,
        licState: false,
        valuation: false,
      };
      break;

    case "Investor Profile":
      dataAccordingType = {
        profileType: "Investor",
        title: "Investor",
        serviceTitle: "",
        serviceDefault: "",
        licenceNoTitle: "License No",
        isService: false,
        serviceOption: [],
        isLicenceIssue: false,
        isInvestor: true,
        servingas: false,
        licence: false,
        institution: false,
        multilicence: true,
        licExpiry: false,
        licState: false,
        valuation: false,
      };
      break;

    case "Electrician Profile":
      dataAccordingType = {
        profileType: "Electrician",
        title: "Electrician",
        serviceTitle: "",
        serviceDefault: "",
        licenceNoTitle: "License No",
        isService: false,
        licence: true,
        serviceOption: [],
        isLicenceIssue: true,
        isInvestor: false,
        servingas: false,
        multilicence: true,
        institution: false,
        licExpiry: false,
        licState: false,
        valuation: false,
      };
      break;
    case "Agent Profile":
      dataAccordingType = {
        profileType: "Agent",
        title: "Agent",
        serviceTitle: "Services for",
        serviceDefault: "",
        licenceNoTitle: "License No",
        isService: true,
        licence: true,
        serviceOption: [
          "Listing agent",
          "Letting agent",
          "Relocation",
          "Foreclosure",
          "Short sale",
          "Consulting",
        ],
        isLicenceIssue: false,
        isInvestor: false,
        servingas: true,
        institution: false,
        licExpiry: true,
        multilicence: false,
        licState: true,
        valuation: true,
      };
      break;

    default:
      dataAccordingType = {
        profileType: "Builder",
        title: "Profile",
        serviceTitle: "",
        serviceDefault: "",
        isService: false,
        serviceOption: [],
        licenceNoTitle: "License No",
        isLicenceIssue: true,
        isInvestor: false,
        servingas: false,
        licence: true,
        institution: false,
        multilicence: true,
        licExpiry: false,
        licState: false,
        valuation: false,
      };
      break;
  }
  const [createprofile, { isLoading }] = useCreateProfileMutation();
  const ProfileSchema = Yup.object().shape({
    business_name: Yup.string()
      .min(2, "Too short!")
      .required("Business name is required"),

    contact: Yup.string()
      .matches(/^[0-9]+$/, "Must be a number")
      .min(10, "Too short!")
      .max(15, "Too long!")
      .required("Contact number is required"),

    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),

    zip: Yup.string()
      .matches(/^[0-9]+$/, "Invalid ZIP code")
      .nonNullable(),

    user_lat: Yup.number().required("Latituted is required"),
    user_lng: Yup.number().nullable("Longitude is required"),

    web: Yup.string().url("Invalid website URL").nullable(),
    license_no: dataAccordingType.licence
      ? Yup.string().required("License no is required")
      : Yup.string().nullable(),
    lic_state: dataAccordingType.licState
      ? Yup.string().required("License state is required")
      : Yup.string().nullable(),
    lic_expiry: dataAccordingType.licExpiry
      ? Yup.string().required("License expiry is required")
      : Yup.string().nullable(),

    dealing_areas: Yup.string().required("Dealing areas are required"),
    dealing_city: Yup.string().nullable(),

    latitude: Yup.string().nullable(),
    longitude: Yup.string().nullable(),
    issuing_authority: Yup.string().nullable(),
    investor_type: dataAccordingType.isInvestor
      ? Yup.string().required("Please select investor type")
      : Yup.string().nullable(),

    invest_in: dataAccordingType.isInvestor
      ? Yup.string().required("Please select where you invest")
      : Yup.string().nullable(),

    min_invest: dataAccordingType.isInvestor
      ? Yup.number()
          .typeError("Minimum investment must be a number")
          .required("Please enter minimum investment")
          .positive("Must be a positive number")
      : Yup.number().required("minimum invest is required"),

    max_invest: dataAccordingType.isInvestor
      ? Yup.number()
          .typeError("Maximum investment must be a number")
          .required("Please enter maximum investment")
          .moreThan(
            Yup.ref("min_invest"),
            "Must be greater than minimum investment"
          )
      : Yup.number().required("maximum invest is required"),

    advisory_service: dataAccordingType.valuation
      ? Yup.string().required(
          "Please select whether you offer valuation service"
        )
      : Yup.string().required(
          "Please select whether you offer advisory service"
        ),

    remarks: Yup.string()
      .nullable()
      .max(5000, "Maximum 5000 characters allowed"),

    youtube_link: Yup.string().url("Invalid YouTube URL").nullable(),
    institution: Yup.string().nullable(),
    users_id: Yup.number(),
    post_type: Yup.string().required("Please select add type"),
    logo: Yup.mixed().nullable(),
    cover: Yup.mixed().nullable(),
    valuation_for: valuationFor
      ? Yup.string().required("Valuation for is required")
      : Yup.string().nullable(),
    services: dataAccordingType.isService
      ? Yup.string().required("Please select a service")
      : Yup.string().nullable(),
  });
  return (
    <View className="bg-white flex-1">
      <ScrollView>
        <HeaderWithBack />
        <Text
          style={{
            marginTop: vs(30),
            marginHorizontal: hs(20),
            fontSize: ms(20),
            fontWeight: 500,
          }}
        >
          Create your{" "}
          <Text style={{ color: Colors.light.red }}>
            {dataAccordingType.title}
          </Text>{" "}
          profile
        </Text>

        <View style={{ marginHorizontal: hs(20), marginTop: vs(20) }}>
          <Formik
            initialValues={{
              business_name: "",
              contact: "",
              address: "",
              city: "",
              state: "",
              zip: "",
              user_lat: 1,
              user_lng: 1,
              web: "",
              license_no: "",
              lic_state: "",
              lic_expiry: "",
              dealing_areas: "",
              dealing_city: "",
              latitude: null,
              longitude: null,
              investor_type: "",
              invest_in: "",
              issuing_authority: "",
              min_invest: "",
              max_invest: "",
              advisory_service: "",
              remarks: "",
              youtube_link: "",
              services: dataAccordingType.serviceDefault,
              users_id: user.id,
              post_type: "Normal",
              logo: null,
              cover: null,
              institution: "",
              valuation_for: "",
            }}
            validationSchema={ProfileSchema}
            onSubmit={async (values) => {
              try {
                const formData = new FormData();

                // Append profile type
                formData.append("profileType", dataAccordingType.profileType);

                // Append all fields except files
                Object.entries(values).forEach(([key, value]) => {
                  if (
                    key !== "logo" &&
                    key !== "cover" &&
                    value != null &&
                    value !== ""
                  ) {
                    if (key === "services" && type === "Agent Profile") {
                      formData.append("agent_for", String(value));
                    } else {
                      formData.append(key, String(value));
                    }
                  }
                });

                // Append logo if selected
                if (values.logo?.uri) {
                  formData.append("logo", {
                    uri: values.logo.uri,
                    type: values.logo.type || "image/jpeg",
                    name: values.logo.name || "logo.jpg",
                  } as any);
                }

                // Append cover if selected
                if (values.cover?.uri) {
                  formData.append("cover", {
                    uri: values.cover.uri,
                    type: values.cover.type || "image/jpeg",
                    name: values.cover.name || "cover.jpg",
                  } as any);
                }

                // Call RTK Query mutation
                const res = await createprofile(formData).unwrap();

                if (res?.success) {
                  renderToastSuccess(
                    res?.message || "Profile created successfully"
                  );
                  router.replace("/BusenessProfiles");
                } else {
                  renderToastError(res?.message || "Profile creation failed");
                }
              } catch (err: any) {
                renderToastError(
                  err?.data?.message || err?.message || "Network error"
                );
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
            }) => (
              <>
                <Text>{errors.longitude}</Text>
                {dataAccordingType.isInvestor && (
                  <>
                    <FormikDropdown
                      title={"Investor Type"}
                      placeholder={"Nothing selected"}
                      value={values.investor_type}
                      options={[
                        "Private investor",
                        "REIT",
                        "Institude",
                        "Crowd fund",
                        "Others",
                      ]}
                      onSelect={(val) => setFieldValue("investor_type", val)}
                      touched={!!touched.investor_type}
                      errors={!!errors.investor_type}
                      errorText={errors.investor_type}
                      multipleFields
                      required
                    />

                    <FormikDropdown
                      title={"Invest in"}
                      placeholder={"Nothing selected"}
                      value={values.invest_in}
                      options={[
                        "Residential",
                        "Commercial",
                        "Institude",
                        "Residential & Commercial",
                        "Land",
                        "Community development",
                        "Others",
                      ]}
                      onSelect={(val) => setFieldValue("invest_in", val)}
                      touched={!!touched.invest_in}
                      errors={!!errors.invest_in}
                      errorText={errors.invest_in}
                      multipleFields
                      required
                    />
                    <View className="flex-row justify-between">
                      <View className="flex-1" style={{ marginRight: hs(5) }}>
                        <FormikDropdown
                          title={"Investment amount"}
                          placeholder={"From"}
                          value={values.min_invest}
                          options={[
                            "Any",
                            "from 1 million",
                            "from 20 million",
                            "from 50 million",
                            "from 60 million",
                          ]}
                          onSelect={(val) => setFieldValue("min_invest", val)}
                          touched={!!touched.min_invest}
                          errors={!!errors.min_invest}
                          errorText={errors.min_invest}
                          required
                        />
                      </View>

                      <View
                        className="flex-1"
                        style={{ marginLeft: hs(5), marginTop: vs(30) }}
                      >
                        <FormikDropdown
                          title={""}
                          placeholder={"To"}
                          value={values.max_invest}
                          options={[
                            "upto 1 million",
                            "upto 20 million",
                            "upto 50 million",
                            "upto 60 million",
                          ]}
                          onSelect={(val) => setFieldValue("max_invest", val)}
                          touched={!!touched.max_invest}
                          errors={!!errors.max_invest}
                          required
                          errorText={errors.max_invest}
                        />
                      </View>
                    </View>
                  </>
                )}

                <FormikInput
                  title="Display name"
                  placeholder="Name"
                  onChangeText={handleChange("business_name")}
                  onBlur={handleBlur("business_name")}
                  value={values.business_name}
                  touched={!!touched.business_name}
                  errors={!!errors.business_name}
                  additonalText="This will displayed on profile"
                  required
                  errorText={errors.business_name}
                />
                {dataAccordingType.isService && (
                  <>
                    <FormikDropdown
                      title={dataAccordingType.serviceTitle}
                      placeholder={dataAccordingType.serviceTitle}
                      value={values.services}
                      options={dataAccordingType.serviceOption}
                      onSelect={(val) => setFieldValue("services", val)}
                      touched={!!touched.services}
                      errors={!!errors.services}
                      errorText={errors.services}
                      required
                      multipleFields={dataAccordingType.servingas}
                      name="services"
                      setValue={setFieldValue}
                    />
                    {values.services === "Loan officer" && (
                      <FormikInput
                        title="Institution"
                        placeholder="institution"
                        onChangeText={handleChange("institution")}
                        onBlur={handleBlur("institution")}
                        value={values.institution}
                        touched={!!touched.institution}
                        errors={!!errors.institution}
                        required={false}
                        errorText={errors.institution}
                      />
                    )}
                  </>
                )}
                <FormikInput
                  title="Contact No"
                  placeholder="Contact"
                  onChangeText={handleChange("contact")}
                  onBlur={handleBlur("contact")}
                  value={values.contact}
                  touched={!!touched.contact}
                  errors={!!errors.contact}
                  required
                  errorText={errors.contact}
                />
                <AdressInput
                  city={"city"}
                  zip={"zip"}
                  state={"state"}
                  name="address"
                  setValue={setFieldValue}
                  onSelect={() => {}}
                  title="Address"
                  placeholder="Enter Location"
                  value={values.address}
                  touched={!!touched.address}
                  errors={!!errors.address}
                  required
                  errorText={errors.address}
                />

                <FormikInput
                  title="Web Address"
                  placeholder="Enter Location"
                  onChangeText={handleChange("web")}
                  onBlur={handleBlur("web")}
                  value={values.web}
                  touched={!!touched.web}
                  errors={!!errors.web}
                  required={false}
                  errorText={errors.web}
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
                {dataAccordingType.isLicenceIssue && (
                  <FormikInput
                    title="License Issuing authority"
                    placeholder="License"
                    additonalText="If any-optional"
                    onChangeText={handleChange("issuing_authority")}
                    onBlur={handleBlur("issuing_authority")}
                    value={values.issuing_authority}
                    touched={!!touched.issuing_authority}
                    errors={!!errors.issuing_authority}
                    required={false}
                    errorText={errors.issuing_authority}
                  />
                )}
                {dataAccordingType.licence && (
                  <FormikInput
                    title={dataAccordingType.licenceNoTitle}
                    placeholder="License number"
                    onChangeText={handleChange("license_no")}
                    onBlur={handleBlur("license_no")}
                    value={values.license_no}
                    touched={!!touched.license_no}
                    errors={!!errors.license_no}
                    required
                    mulipleFields={dataAccordingType.multilicence}
                    name="license_no"
                    setValue={setFieldValue}
                    errorText={errors.license_no}
                  />
                )}

                {!dataAccordingType.multilicence && (
                  <View className="flex-row justify-between">
                    <View className="flex-1" style={{ marginRight: hs(5) }}>
                      <FormikInput
                        title="State"
                        placeholder="License State"
                        onChangeText={handleChange("lic_state")}
                        onBlur={handleBlur("lic_state")}
                        value={values.lic_state}
                        touched={!!touched.lic_state}
                        errors={!!errors.lic_state}
                        required
                        errorText={errors.lic_state}
                      />
                    </View>
                    {dataAccordingType?.licExpiry && (
                      <View className="flex-1" style={{ marginLeft: hs(5) }}>
                        <FormikInput
                          title="License Expiry"
                          placeholder="License Expiry"
                          onChangeText={handleChange("lic_expiry")}
                          onBlur={handleBlur("lic_expiry")}
                          value={values.lic_expiry}
                          touched={!!touched.lic_expiry}
                          errors={!!errors.lic_expiry}
                          required
                          errorText={errors.lic_expiry}
                        />
                      </View>
                    )}
                  </View>
                )}
                <DealingAreas
                  city="dealing_city"
                  onSelect={() => {}}
                  state="state"
                  title="Dealin Areas"
                  value={values.dealing_areas}
                  touched={!!touched.dealing_areas}
                  errors={!!errors.dealing_areas}
                  name="dealing_areas"
                  zip="zip code"
                  setValue={setFieldValue}
                  errorText={errors.dealing_areas}
                  placeholder="Please enter City, State or Zip code"
                />

                <Text style={{ width: hs(250), marginTop: vs(10) }}>
                  {dataAccordingType.valuation
                    ? "Do you provide valuaition services in your locality?"
                    : "Do you provide advisory services in your locality?"}
                </Text>
                <View
                  className="flex-row"
                  style={{ marginTop: vs(10), marginBottom: vs(20) }}
                >
                  <View className="flex-row items-center">
                    <TouchableOpacity
                      onPress={() => {
                        setFieldValue(
                          "advisory_service",
                          values.advisory_service === "Yes" ? "" : "Yes"
                        );
                        setValuationFor(true);
                      }}
                    >
                      <MaterialIcons
                        size={18}
                        color={Colors.light.DarkGreen}
                        name={
                          values.advisory_service === "Yes"
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
                        setFieldValue(
                          "advisory_service",
                          values.advisory_service === "No" ? "" : "No"
                        );
                        setValuationFor(false);
                      }}
                    >
                      <MaterialIcons
                        size={18}
                        color={Colors.light.DarkGreen}
                        name={
                          values.advisory_service === "No"
                            ? "check-box"
                            : "check-box-outline-blank"
                        }
                      />
                    </TouchableOpacity>
                  </View>

                  <Text style={{ marginLeft: hs(5) }}>No</Text>
                </View>
                {touched.advisory_service && errors.advisory_service && (
                  <Text style={{ color: Colors.light.red }}>
                    {errors.advisory_service}
                  </Text>
                )}
                {valuationFor && (
                  <FormikDropdown
                    title="Valuation for"
                    placeholder="Valuation for"
                    value={values.valuation_for}
                    options={[
                      "Home buying/selling valuation",
                      "Home rent valuation",
                    ]}
                    onSelect={(val) => setFieldValue("valuation_for", val)}
                    touched={!!touched.valuation_for}
                    errors={!!errors.valuation_for}
                    errorText={errors.valuation_for}
                    required
                    multipleFields={true}
                    name="valuation_for"
                    setValue={setFieldValue}
                  />
                )}

                <FormikInput
                  title="More Description"
                  placeholder="Write here (Upto 5000 characters)"
                  onChangeText={handleChange("remarks")}
                  onBlur={handleBlur("remarks")}
                  value={values.remarks}
                  touched={!!touched.remarks}
                  errors={!!errors.remarks}
                  required={false}
                  additonalText={"5000 words"}
                  multiline
                  errorText={errors.remarks}
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

                <UploadPic
                  Logo={Profilelogo}
                  text1="Upload "
                  text2="Logo/Pic"
                  value={values.logo}
                  name="logo"
                  setValue={setFieldValue}
                />

                <UploadPic
                  Logo={ImageUpload}
                  text1="Upload "
                  text2="Cover "
                  text3="Image "
                  additionalText="Recommended size 760x300"
                  border
                  setValue={setFieldValue}
                  name={"cover"}
                  value={values.cover}
                />
                <FormikInput
                  title="Provide youtube video link"
                  placeholder="Enter link"
                  onChangeText={handleChange("youtube_link")}
                  onBlur={handleBlur("youtube_link")}
                  value={values.youtube_link}
                  touched={!!touched.youtube_link}
                  errors={!!errors.youtube_link}
                  required={false}
                  errorText={errors.youtube_link}
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
                <View style={{ marginTop: vs(10) }}>
                  <SelecteAdType
                    title1="Select Ad "
                    title2="Type"
                    btnTxt1="Normal Ad"
                    btnTxt2="Trending Ad"
                    btn1value="Normal"
                    btn2value="Promoted"
                    Componet1={
                      <Text
                        style={{
                          marginTop: vs(10),
                          fontSize: ms(11),
                          color: Colors.light.textGray,
                        }}
                      >
                        Post your ad for free.You can upgrade your ad to
                        trending from your dashboard any time to make deal done
                        more quickly
                      </Text>
                    }
                    Componet2={
                      <Text
                        style={{
                          marginTop: vs(10),
                          fontSize: ms(11),
                          color: Colors.light.textGray,
                        }}
                      >
                        Post your ad for free.You can upgrade your ad to
                        trending from your dashboard any time to make deal done
                        more quickly
                      </Text>
                    }
                    value={values.post_type}
                    onPress={(selected) => setFieldValue("post_type", selected)}
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
                <LargeButton text="Submit Ad" handleSubmit={handleSubmit} />
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
      <Loading isLoading={isLoading} text={`Creating ${type}....`} />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  title: { fontSize: ms(14), fontWeight: 600 },
});
