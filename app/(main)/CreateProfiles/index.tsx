import { userdata } from "@/store/slices/selector/user";
import ImageUpload from "@assets/CreateProfile/uploadimage.svg";
import Profilelogo from "@assets/CreateProfile/uploadprofilewithcircle.svg";
import { MaterialIcons } from "@expo/vector-icons";
import { FormikInput } from "@src/components/globals/FormictInput";
import { FormikDropdown } from "@src/components/globals/FormikDropdown/indes";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LargeButton from "@src/components/globals/LaregeButton";
import SelecteAdType from "@src/components/globals/TablikeButton";
import UploadPic from "@src/components/globals/UploadPic";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { hs, ms, vs } from "@utils/design/design";
import { useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";
interface ProfileConfig {
  title: string;
  serviceTitle: string;
  serviceDefault: string;
  serviceOption: string[];
  isService: Boolean;
  isLicenceIssue: Boolean;
  isInvestor: Boolean;
}
const index = () => {
  let dataAccordingType: ProfileConfig = {
    title: "Profile",
    serviceTitle: "",
    serviceDefault: "",
    serviceOption: [],
    isService: false,
    isLicenceIssue: true,
    isInvestor: false,
  };
  const user = useAppSelector(userdata);
  const { type } = useLocalSearchParams();
  console.log(type);

  switch (type) {
    case "Builder Profile":
      dataAccordingType = {
        title: "Builder",
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
        isLicenceIssue: true,
        isService: true,
        isInvestor: false,
      };
      break;

    case "Mortgage Profile":
      dataAccordingType = {
        title: "Mortgage Advisor",
        serviceTitle: "Serving as ",
        serviceDefault: "",
        isService: true,
        serviceOption: ["Loan officer", "Mortgage broker", "Mortgage lender"],
        isLicenceIssue: false,
        isInvestor: false,
      };
      break;

    case "Decor Profile":
      dataAccordingType = {
        title: "Home Decor",
        serviceTitle: "",
        serviceDefault: "",
        isService: false,
        serviceOption: [],
        isLicenceIssue: true,
        isInvestor: false,
      };
      break;

    case "Plumber Profile":
      dataAccordingType = {
        title: "Plumber",
        serviceTitle: "",
        serviceDefault: "",
        isService: false,
        serviceOption: [],
        isLicenceIssue: true,
        isInvestor: false,
      };
      break;

    case "Painter Profile":
      dataAccordingType = {
        title: "Painter",
        serviceTitle: "",
        serviceDefault: "",
        isService: false,
        serviceOption: [],
        isLicenceIssue: true,
        isInvestor: false,
      };
      break;

    case "Investor Profile":
      dataAccordingType = {
        title: "Investor",
        serviceTitle: "",
        serviceDefault: "",
        isService: false,
        serviceOption: [],
        isLicenceIssue: true,
        isInvestor: true,
      };
      break;

    case "Electrician Profile":
      dataAccordingType = {
        title: "Electrician",
        serviceTitle: "",
        serviceDefault: "",
        isService: false,
        serviceOption: [],
        isLicenceIssue: true,
        isInvestor: false,
      };
      break;

    default:
      dataAccordingType = {
        title: "Profile",
        serviceTitle: "",
        serviceDefault: "",
        isService: false,
        serviceOption: [],
        isLicenceIssue: true,
        isInvestor: false,
      };
      break;
  }
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
      .required("ZIP code is required"),

    user_lat: Yup.number().nullable(),
    user_lng: Yup.number().nullable(),

    web: Yup.string().url("Invalid website URL").required(),
    license_no: Yup.string().required("License no is required"),
    lic_state: Yup.string().nullable(),
    lic_expiry: Yup.date().nullable(),

    dealing_areas: Yup.string().required("Dealing areas are required"),
    dealing_city: Yup.string().nullable(),

    latitude: Yup.number().nullable(),
    longitude: Yup.number().nullable(),
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
      : Yup.number().nullable(),

    max_invest: dataAccordingType.isInvestor
      ? Yup.number()
          .typeError("Maximum investment must be a number")
          .required("Please enter maximum investment")
          .moreThan(
            Yup.ref("min_invest"),
            "Must be greater than minimum investment"
          )
      : Yup.number().nullable(),

    advisory_service: Yup.string().required(
      "Please select whether you offer advisory service"
    ),

    remarks: Yup.string()
      .nullable()
      .max(5000, "Maximum 5000 characters allowed"),

    youtube_link: Yup.string().url("Invalid YouTube URL").nullable(),

    users_id: Yup.number(),
    post_type: Yup.string().required("Please select add type"),
    logo: Yup.mixed().nullable(),
    cover: Yup.mixed().nullable(),
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
              user_lat: "",
              user_lng: "",
              web: "",
              license_no: "",
              lic_state: "",
              lic_expiry: "",
              dealing_areas: "",
              dealing_city: "",
              latitude: "",
              longitude: "",
              investor_type: "",
              invest_in: "",
              issuing_authority: "",
              min_invest: "",
              max_invest: "",
              advisory_service: "",
              remarks: "",
              youtube_link: "",
              services: dataAccordingType.serviceDefault,
              users_id: user.sweetghar_user_id,
              post_type: "Normal",
              logo: null,
              cover: null,
            }}
            validationSchema={ProfileSchema}
            onSubmit={async (values) => console.log("values", values)}
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
                      required
                    />
                    <View className="flex-row justify-between">
                      <View className="flex-1" style={{marginRight:hs(5)}}>
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
                      <View className="flex-1" style={{marginLeft:hs(5)}}>
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
                  />
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
                <FormikInput
                  title="Address"
                  placeholder="Enter Location"
                  onChangeText={handleChange("address")}
                  onBlur={handleBlur("address")}
                  value={values.address}
                  touched={!!touched.address}
                  errors={!!errors.address}
                  required
                  errorText={errors.address}
                />
                <FormikInput
                  title="State"
                  placeholder="Enter state"
                  onChangeText={handleChange("state")}
                  onBlur={handleBlur("state")}
                  value={values.state}
                  touched={!!touched.state}
                  errors={!!errors.state}
                  required
                  errorText={errors.state}
                />
                <View className="flex-row justify-between items-start gap-3">
                  <View className="flex-1">
                    <FormikInput
                      title="City"
                      placeholder="Enter Location"
                      onChangeText={handleChange("state")}
                      onBlur={handleBlur("state")}
                      value={values.state}
                      touched={!!touched.state}
                      errors={!!errors.state}
                      required
                      errorText={errors.state}
                    />
                  </View>

                  <View className="flex-1">
                    <FormikInput
                      title="Zip"
                      placeholder="Enter zip"
                      onChangeText={handleChange("zip")}
                      onBlur={handleBlur("zip")}
                      value={values.zip}
                      touched={!!touched.zip}
                      errors={!!errors.zip}
                      required
                      errorText={errors.zip}
                    />
                  </View>
                </View>

                <FormikInput
                  title="Web Address"
                  placeholder="Enter Location"
                  onChangeText={handleChange("web")}
                  onBlur={handleBlur("web")}
                  value={values.web}
                  touched={!!touched.web}
                  errors={!!errors.web}
                  required
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

                <FormikInput
                  title="License No"
                  placeholder="License number"
                  onChangeText={handleChange("license_no")}
                  onBlur={handleBlur("license_no")}
                  value={values.license_no}
                  touched={!!touched.license_no}
                  errors={!!errors.license_no}
                  required
                  errorText={errors.license_no}
                />
                <View style={{ marginTop: vs(10) }}>
                  <View className="flex-row" style={{ marginBottom: vs(10) }}>
                    <Text style={styles.title}>Dealing areas</Text>

                    <Text
                      style={{
                        color: Colors.light.red,
                      }}
                    >
                      {" "}
                      *
                    </Text>
                  </View>
                  <View className="flex-row ">
                    <TouchableOpacity
                      onPress={() =>
                        setFieldValue(
                          "dealing_areas",
                          values.dealing_areas === "Nationwide"
                            ? ""
                            : "Nationwide"
                        )
                      }
                    >
                      <MaterialIcons
                        size={18}
                        color={Colors.light.DarkGreen}
                        name={
                          values.dealing_areas === "Nationwide"
                            ? "check-box"
                            : "check-box-outline-blank"
                        }
                      />
                    </TouchableOpacity>
                    <Text style={{ marginLeft: hs(5) }}>Nationwide</Text>
                  </View>

                  <View
                    style={{
                      borderRadius: ms(18),
                      paddingVertical: vs(5),
                      backgroundColor: Colors.light.LightGreen,
                      paddingHorizontal: hs(5),
                      marginTop: vs(5),
                    }}
                  >
                    <TextInput
                      placeholder={"Please enter City,Status or Zip Code"}
                      value={values.dealing_areas}
                      onChangeText={handleChange("dealing_areas")}
                      onBlur={handleBlur("dealing_areas")}
                      editable={
                        values.dealing_areas === "Nationwide" ? false : true
                      }
                      cursorColor={Colors.light.DarkGreen}
                      placeholderTextColor={Colors.light.DarkGreen}
                      style={{ color: Colors.light.DarkGreen }}
                    />
                  </View>
                  {touched.dealing_areas && errors.dealing_areas && (
                    <Text style={{ color: Colors.light.red }}>
                      {errors.dealing_areas}
                    </Text>
                  )}
                </View>

                <Text style={{ width: hs(250), marginTop: vs(10) }}>
                  Do you provide advisory services in your locality?
                </Text>
                <View
                  className="flex-row"
                  style={{ marginTop: vs(10), marginBottom: vs(20) }}
                >
                  <View className="flex-row items-center">
                    <TouchableOpacity
                      onPress={() =>
                        setFieldValue(
                          "advisory_service",
                          values.advisory_service === "Yes" ? "" : "Yes"
                        )
                      }
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
                      onPress={() =>
                        setFieldValue(
                          "advisory_service",
                          values.advisory_service === "No" ? "" : "No"
                        )
                      }
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
                  onPress={() => {}}
                />
                <UploadPic
                  Logo={ImageUpload}
                  text1="Upload "
                  text2="Cover "
                  text3="Image "
                  additionalText="Recommended size 760x300"
                  border
                  onPress={() => {}}
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
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  title: { fontSize: ms(14), fontWeight: 600 },
});
