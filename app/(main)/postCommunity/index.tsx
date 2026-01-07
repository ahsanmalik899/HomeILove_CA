import {
  useGetProfilesQuery,
  usePostCommunityMutation
} from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import Bunchers from "@assets/CreateProfile/broucher.svg";
import ImageUpload from "@assets/CreateProfile/uploadimage.svg";
import Profilelogo from "@assets/CreateProfile/uploadprofilewithcircle.svg";
import PayLater from "@assets/SideBar/pay-later.svg";
import Paypal from "@assets/SideBar/paypal-icon.svg";
import PowerdByPayPal from "@assets/SideBar/Powered by PayPal.svg";
import Volit from "@assets/SideBar/volit-white.svg";
import Uploadlogo from "@assets/signupbg/solar_upload-bold-duotone.svg";
import { MaterialIcons } from "@expo/vector-icons";
import { AdressInput } from "@src/components/globals/AddressInput";
import CommunityPropertys from "@src/components/globals/CommunityPropertys";
import CommunitySatatus from "@src/components/globals/CommunitySatatus";
import CommunityType from "@src/components/globals/CommunityType";
import DatePickerField from "@src/components/globals/DatePickerField";
import { FormikInput } from "@src/components/globals/FormictInput";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LargeButton from "@src/components/globals/LaregeButton";
import Loading from "@src/components/globals/Loading";
import PdfPicker from "@src/components/globals/PdfPicker";
import RadioButton from "@src/components/globals/RadioButton";
import SelecteAdType from "@src/components/globals/TablikeButton";
import TimePickerField from "@src/components/globals/TimePickerField";
import UploadPic from "@src/components/globals/UploadPic";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { renderToastError, renderToastSuccess } from "@src/hooks/useToasty";
import { hs, ms, vs } from "@utils/design/design";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Yup from "yup";
const index = () => {
  const user = useAppSelector(userdata);
  const [saleType, setSaleType] = useState(true);
  const [count, setCount] = useState(1);
  const PostCommunitySchema = Yup.object().shape({
    community_title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .required("Community title is required"),

    community_type: Yup.string().required("Community type is required"),

    community_status: Yup.string().required("Community status is required"),

    expected_delivery: Yup.string().nullable(),

    address: Yup.string().required("Address is required"),

    city: Yup.string().required("City is required"),

    state: Yup.string().required("State is required"),

    zip: Yup.string().required("Zip is not correct"),

    lat: Yup.number()
      .typeError("Latitude must be a number")
      .required("Latitude is required"),

    lng: Yup.number()
      .typeError("Longitude must be a number")
      .required("Longitude is required"),

    community_details: Yup.string()
      .min(10, "Details must be at least 10 characters")
      .required("Community details are required"),

    developer_name: Yup.string().required("Developer name is required"),

    project_logo: Yup.mixed().nullable(),

    developer_logo: Yup.mixed().nullable(),

    facts: Yup.string().nullable(),

    visit_date: Yup.string().nullable(),

    visit_time: Yup.string().nullable(),

    video_link: Yup.string().url("Enter a valid video URL").nullable(),

    user_id: Yup.number().required("User ID is required"),

    user_type: Yup.string().required("User type is required"),

    payment_method: Yup.string().required("Payment method is required"),

    ad_life: Yup.number()
      .typeError("Ad life must be a number")
      .required("Ad life is required"),

    ad_by: Yup.string().required("Ad by is required"),

    post_status: Yup.string().required("Post status is required"),

    post_type: Yup.string().required("Post type is required"),

    approved_by: Yup.string().nullable(),

    created_date: Yup.string().nullable(),

    updated_date: Yup.string().nullable(),

    expiry_date: Yup.string().nullable(),

    post_start_date: Yup.string().nullable(),

    post_end_date: Yup.string().nullable(),
    property_type1: Yup.string().required("Property type is required"),
    property_type2:
      count === 2
        ? Yup.string().required("Property type is required")
        : Yup.string().nullable(),
    property_type3:
      count === 3
        ? Yup.string().required("Property type is required")
        : Yup.string().nullable(),
    property_type4:
      count === 4
        ? Yup.string().required("Property type is required")
        : Yup.string().nullable(),
    property_type5:
      count === 5
        ? Yup.string().required("Property type is required")
        : Yup.string().nullable(),
    property_sub_type1: Yup.string().nullable(),
    property_sub_type2: Yup.string().nullable(),
    property_sub_type3: Yup.string().nullable(),
    property_sub_type4: Yup.string().nullable(),
    property_sub_type5: Yup.string().nullable(),
    property_title1: Yup.string().required("Title is required"),
    property_title2:
      count === 2
        ? Yup.string().required("Title is required")
        : Yup.string().nullable(),
    property_title3:
      count === 3
        ? Yup.string().required("Title is required")
        : Yup.string().nullable(),
    property_title4:
      count === 4
        ? Yup.string().required("Title is required")
        : Yup.string().nullable(),
    property_title5:
      count === 5
        ? Yup.string().required("Title is required")
        : Yup.string().nullable(),
    tenure1: Yup.string().required("Tenure is required"),
    tenure2:
      count === 2
        ? Yup.string().required("Tenure is required")
        : Yup.string().nullable(),
    tenure3:
      count === 3
        ? Yup.string().required("Tenure is required")
        : Yup.string().nullable(),
    tenure4:
      count === 4
        ? Yup.string().required("Tenure is required")
        : Yup.string().nullable(),
    tenure5:
      count === 5
        ? Yup.string().required("Tenure is required")
        : Yup.string().nullable(),
    land_area1: Yup.number()
      .required("Area is required")
      .typeError("Land area must be a number"),
    land_area5:
      count === 5
        ? Yup.number()
            .required("Area is required")
            .typeError("Land area must be a number")
        : Yup.string().nullable(),
    land_area2:
      count === 2
        ? Yup.number()
            .required("Area is required")
            .typeError("Land area must be a number")
        : Yup.string().nullable(),
    land_area3:
      count === 3
        ? Yup.number()
            .required("Area is required")
            .typeError("Land area must be a number")
        : Yup.string().nullable(),
    land_area4:
      count === 4
        ? Yup.number()
            .required("Area is required")
            .typeError("Land area must be a number")
        : Yup.string().nullable(),

    price1: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),

    price2:
      count === 2
        ? Yup.number()
            .required("Price is required")
            .positive("Price must be positive")
        : Yup.string().nullable(),

    price3:
      count === 3
        ? Yup.number()
            .required("Price is required")
            .positive("Price must be positive")
        : Yup.string().nullable(),

    price4:
      count === 4
        ? Yup.number()
            .required("Price is required")
            .positive("Price must be positive")
        : Yup.string().nullable(),

    price5:
      count === 5
        ? Yup.number()
            .required("Price is required")
            .positive("Price must be positive")
        : Yup.string().nullable(),
    bedroom1: Yup.string()
      .required("Bedroom is required"),
    bedroom2:
      count === 2
        ? Yup.string()
            .required("Bedroom is required")
        : Yup.string().nullable(),
    bedroom3:
      count === 3
        ? Yup.string()
            .required("Bedroom is required")
            
        : Yup.string().nullable(),
    bedroom4:
      count === 4
        ? Yup.string()
            .required("Bedroom is required")
            
        : Yup.string().nullable(),
    bedroom5:
      count === 5
        ? Yup.string()
            .required("Bedroom is required")
           
        : Yup.string().nullable(),
    bathroom1: Yup.number()
      .required("Bathroom is required")
      .min(0, "Invalid bathrooms"),
    bathroom2:
      count === 2
        ? Yup.number()
            .required("Bathroom is required")
            .min(0, "Invalid bathrooms")
        : Yup.string().nullable(),
    bathroom3:
      count === 3
        ? Yup.number()
            .required("Bathroom is required")
            .min(0, "Invalid bathrooms")
        : Yup.string().nullable(),
    bathroom4:
      count === 4
        ? Yup.number()
            .required("Bathroom is required")
            .min(0, "Invalid bathrooms")
        : Yup.string().nullable(),
    bathroom5:
      count === 5
        ? Yup.number()
            .required("Bathroom is required")
            .min(0, "Invalid bathrooms")
        : Yup.string().nullable(),
  });
  
  const pickImage = async (setFieldValue: any, name: string) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      const uri = asset.uri;
      const filename = uri.split("/").pop();
      const ext = filename?.split(".").pop();

    

      setFieldValue(name, {
        uri,
        name: filename,
        type: `image/${ext}`,
      });
    }
  };
  const { data } = useGetProfilesQuery({ id: user.id });

  const [visit, setVisit] = useState("");
  const [postCommunity, { isLoading }] = usePostCommunityMutation();
  return (
    <View className="bg-white flex-1 ">
      <ScrollView
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        className="bg-white flex-1"
      >
        <HeaderWithBack header="Sell Property" />
        <View style={{ marginHorizontal: hs(10), marginVertical: vs(20) }}>
          <Text
            style={{ fontWeight: 600, fontSize: ms(15), marginBottom: vs(10) }}
          >
            Market your
            <Text style={{ color: Colors.light.red }}> COMMUNITY PROJECT </Text>
            smartly across the US
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
                community_title: "",
                community_type: "",
                community_status: "",

                expected_delivery: "",

                address: "",
                city: "",
                state: "",
                zip: "",

                lat: 0,
                lng: 0,

                community_details: "",

                developer_name: "",

                project_logo: null,
                developer_logo: null,

                facts: "",

                visit_date: "",
                visit_time: "",

                video_link: "",

                user_id: user.id,
                user_type: user.user_type,

                payment_method: "Wallet",

                ad_life: 1,

                ad_by: "",

                post_status: "Pending",

                post_type: "",

                approved_by: "",

                created_date: "",
                updated_date: "",

                expiry_date: "",

                post_start_date: "",
                post_end_date: "",
                property_type1: "",
                property_type2: "",
                property_type3: "",
                property_type4: "",
                property_type5: "",

                property_sub_type1: "",
                property_sub_type2: "",
                property_sub_type3: "",
                property_sub_type4: "",
                property_sub_type5: "",

                property_title1: "",
                property_title2: "",
                property_title3: "",
                property_title4: "",
                property_title5: "",

                tenure1: "",
                tenure2: "",
                tenure3: "",
                tenure4: "",
                tenure5: "",

                land_area1: "",
                land_area2: "",
                land_area3: "",
                land_area4: "",
                land_area5: "",

                price1: "",
                price2: "",
                price3: "",
                price4: "",
                price5: "",

                bedroom1: "",
                bedroom2: "",
                bedroom3: "",
                bedroom4: "",
                bedroom5: "",

                bathroom1: "",
                bathroom2: "",
                bathroom3: "",
                bathroom4: "",
                bathroom5: "",
                propertyimg: [],
                floorimg: [],
                broucherimg: [],
              }}
              validationSchema={PostCommunitySchema}
              onSubmit={async (values) => {
                try {
                  const formData = new FormData();

                  Object.keys(values).forEach((key) => {
                    if (
                      key !== "propertyimg" &&
                      key !== "floorimg" &&
                      key !== "broucherimg" &&
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
if (Array.isArray(values.broucherimg)) {
  values.broucherimg.forEach((pdf, index) => {
    if (pdf?.uri) {
      formData.append("broucherimg[]", {
        uri: pdf.uri,
        name: pdf.name || `brochure_${index}.pdf`,
        type: "application/pdf",
      } as any);
    }
  });
}



 if (values.developer_logo?.uri) {
                  formData.append("developer_logo", {
                    uri: values.developer_logo?.uri,
                    type: values.developer_logo?.type || "image/jpeg",
                    name: values.developer_logo?.name || "logo.jpg",
                  } as any);
                }

                 if (values.project_logo?.uri) {
                  formData.append("project_logo", {
                    uri: values.project_logo?.uri,
                    type: values.project_logo?.type || "image/jpeg",
                    name: values.project_logo?.name || "logo.jpg",
                  } as any);
                }
                  for (const pair of formData.entries()) {
                    console.log(pair[0], pair[1]);
                  }

                  const result = await postCommunity(formData);

                  if (result.data?.success) {
                    renderToastSuccess(result.data?.message);
                    
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
                  <CommunityType
                    value={values.community_type}
                    onPress={async (value) => {
                      setFieldValue("community_type", value);
                    }}
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
                  <Text style={{ fontWeight: 600, marginVertical: vs(10) }}>
                    Property
                    <Text style={{ color: Colors.light.red }}> STATUS</Text>
                  </Text>
                  <CommunitySatatus
                    errorText={errors.community_status || ""}
                    onPress={(value) =>
                      setFieldValue("community_status", value)
                    }
                    value={values.community_status}
                  />
                  {values.community_status !== "" &&
                    values.community_status !== "Completed" && (
                      <DatePickerField
                        errorText={errors.expected_delivery}
                        name="expected_delivery"
                        value={values.expected_delivery}
                        editable={true}
                        setValue={setFieldValue}
                        title="Expected Delievery date"
                        placeholder="dd/mm//yy"
                        touched={!!touched}
                        errors={!!errors}
                        required={false}
                      />
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

                  <AdressInput
                    city={"city"}
                    zip={"zip"}
                    state={"state"}
                    lat={"lat"}
                    long="lng"
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
                  <FormikInput
                    title="Title"
                    placeholder="Title"
                    onChangeText={handleChange("community_title")}
                    onBlur={handleBlur("community_title")}
                    value={values.community_title}
                    touched={!!touched.community_title}
                    errors={!!errors.community_title}
                    required
                    errorText={errors.community_title}
                  />

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
                      onChangeText={handleChange("facts")}
                      onBlur={handleBlur("facts")}
                      value={values.facts}
                      touched={!!touched.facts}
                      errors={!!errors.facts}
                      required={false}
                      mulipleFields
                      name="facts"
                      setValue={setFieldValue}
                      errorText={errors.facts}
                    />
                  </View>
                  <FormikInput
                    title="More Description"
                    placeholder="Write here (Upto 5000 characters)"
                    onChangeText={handleChange("community_details")}
                    onBlur={handleBlur("community_details")}
                    value={values.community_details}
                    touched={!!touched.community_details}
                    errors={!!errors.community_details}
                    required={false}
                    additonalText={"5000 words"}
                    multiline
                    errorText={errors.community_details}
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
                  <Text style={{ fontWeight: 600 }}>
                    Add Community
                    <Text style={{ color: Colors.light.red }}> PROPERTIES</Text>
                  </Text>
                  <CommunityPropertys
                    key={"communitypropertys"}
                    values={values}
                    count={count}
                    setCount={setCount}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched}
                    errors={errors}
                    setFieldValue={setFieldValue}
                  />
                  <Text style={{ fontWeight: 600, marginTop: vs(10) }}>
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
                    <>
                      <View className="flex-row justify-between gap-3">
                        <View className="flex-1">
                          <View
                            className="flex-1"
                            style={{ marginLeft: hs(5) }}
                          >
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
                      <View
                        style={{
                          height: vs(1),
                          marginTop: vs(20),
                          marginBottom: vs(10),
                          backgroundColor: Colors.light.textGray,
                          opacity: 0.2,
                        }}
                      />
                    </>
                  )}

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
                  <PdfPicker
                    key="brochure"
                    Logo={Bunchers}
                    text1="Upload BROCHURE"
                    text2=" "
                    text3=""
                    limt={3}
                    additionalText="Can upload max 3"
                    border
                    setValue={setFieldValue}
                    name={"broucherimg"}
                    value={values.broucherimg}
                  />
                  <FormikInput
                    title="Provide youtube video link"
                    placeholder="youtube video link"
                    onChangeText={handleChange("video_link")}
                    onBlur={handleBlur("video_link")}
                    value={values.video_link}
                    touched={!!touched.video_link}
                    errors={!!errors.video_link}
                    required={false}
                    errorText={errors.video_link}
                  />
                  <Text style={{ fontWeight: 600 }}>
                    About
                    <Text style={{ color: Colors.light.red }}> DEVELOPER</Text>
                  </Text>
                  <FormikInput
                    title="Developer Name"
                    placeholder=""
                    onChangeText={handleChange("developer_name")}
                    onBlur={handleBlur("developer_name")}
                    value={values.developer_name}
                    touched={!!touched.developer_name}
                    errors={!!errors.developer_name}
                    required={false}
                    errorText={errors.developer_name}
                  />
                  <View className="flex-row justify-between gap-3 mt-5">
                    <View className="flex-1">
                      <TouchableOpacity
                        style={{
                          backgroundColor: values.developer_logo? Colors.light.DarkGreen: Colors.light.textGray,
                          height: vs(40),
                          width: "100%",
                          borderRadius: ms(10),
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onPress={() =>
                          pickImage(setFieldValue, "developer_logo")
                        }
                      >
                        <View
                          className="flex-row items-center justify-center self-center"
                          style={styles.uploadbutton}
                        >
                          <Uploadlogo />
                          <Text style={styles.buttonText}>
                            {values.developer_logo
                              ? "Logo Uploaded"
                              : "Developer Logo"}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View className="flex-1">
                      <TouchableOpacity
                        style={{
                          backgroundColor:values.project_logo?Colors.light.DarkGreen:Colors.light.textGray,
                          height: vs(40),
                          width: "100%",
                          borderRadius: ms(10),
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onPress={() => pickImage(setFieldValue, "project_logo")}
                      >
                        <View
                          className="flex-row items-center justify-center"
                          style={styles.uploadbutton}
                        >
                          <Uploadlogo />
                          <Text style={styles.buttonText}>
                            {values.project_logo
                              ? "Logo Uploaded"
                              : "Community Logo"}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {user.user_type === "Business" && (
                    <>
                      <Text className="font-bold mt-3">Advertise as</Text>
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
                    value={values.post_type}
                    onPress={(selected) => setFieldValue("post_type", selected)}
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
  input: {
    borderWidth: 1,
    borderRadius: ms(8),
    fontSize: ms(14),
  },
  textview: {
    marginVertical: "auto",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  uploadbutton: {
    color: "white",
    borderRadius: 8,
    alignItems: "center",
  },
});
