import { userdata } from "@/store/slices/selector/user";
import ImageUpload from "@assets/CreateProfile/uploadimage.svg";
import Profilelogo from "@assets/CreateProfile/uploadprofilewithcircle.svg";
import { MaterialIcons } from "@expo/vector-icons";
import { FormikInput } from "@src/components/globals/FormictInput";
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
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";

const index = () => {
  let title = "";

  const user = useAppSelector(userdata);
  const { type } = useLocalSearchParams();
  console.log(type);
  switch (type) {
    case "Builder Profile":
      title = "Builder";
      break;
    case "Mortgage Profile":
      title = "MORTGAGE ADVISOR ";
      break;
    case "Decor Profile":
      title = "Home Decor";
      break;
    case "Plumber Profile":
      title = "Plumber";
      break;
    case "Painter Profile":
      title = "Painter";
      break;
    case "Investor Profile":
      title = "Investor";
      break;
    case "Electrician Profile":
      title = "Electrician";
      break;
    default:
      title = "Profile";
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

    investor_type: Yup.string().nullable(),
    invest_in: Yup.string().nullable(),
    issuing_authority: Yup.string().nullable(),
    min_invest: Yup.number().min(0, "Invalid amount").nullable(),
    max_invest: Yup.number()
      .min(Yup.ref("min_invest"), "Must be greater than min investment")
      .nullable(),

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
          Create your <Text style={{ color: Colors.light.red }}>{title}</Text>{" "}
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
                  onChangeText={handleChange("city")}
                  onBlur={handleBlur("city")}
                  value={values.city}
                  touched={!!touched.city}
                  errors={!!errors.city}
                  required
                  errorText={errors.city}
                />
                <View
                  className="flex-row "
                  style={{ justifyContent: "space-between" }}
                >
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
                    marginBottom: vs(10),
                    backgroundColor: Colors.light.textGray,
                    opacity: 0.2,
                  }}
                />
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
                <FormikInput
                  title="Dealing areas"
                  placeholder="Please enter City,Status or Zip Code"
                  onChangeText={handleChange("dealing_areas")}
                  onBlur={handleBlur("dealing_areas")}
                  value={values.dealing_areas}
                  touched={!!touched.dealing_areas}
                  errors={!!errors.dealing_areas}
                  required
                  errorText={errors.dealing_areas}
                />
                <Text style={{ width: hs(250) }}>
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
                <View style={{marginTop:vs(10)}}>
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
                      Post your ad for free.You can upgrade your ad to trending
                      from your dashboard any time to make deal done more
                      quickly
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
                      Post your ad for free.You can upgrade your ad to trending
                      from your dashboard any time to make deal done more
                      quickly
                    </Text>
                  }
                  value={values.post_type}
                  onPress={(selected) => setFieldValue("post_type", selected)}
                />
                </View>
                <View
                  style={{
                    height: vs(1),
                    marginVertical: vs(10),
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
