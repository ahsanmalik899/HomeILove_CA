import { MaterialIcons } from "@expo/vector-icons";
import { FormikInput } from "@src/components/globals/FormictInput";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { Formik } from "formik";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Yup from "yup";

const index = () => {
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

    user_lat: Yup.number().required("Latitude is required"),
    user_lng: Yup.number().required("Longitude is required"),

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

    advisory_service: Yup.boolean().nullable(),
    remarks: Yup.string().nullable(),

    youtube_link: Yup.string().url("Invalid YouTube URL").nullable(),

    users_id: Yup.number().required("User ID is required"),

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
          Create your{" "}
          <Text style={{ color: Colors.light.red }}>Electrician</Text> profile
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
              advisory_service: false,
              remarks: "",
              youtube_link: "",
              users_id: "",
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
                  touched={touched}
                  errors={errors}
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
                  touched={touched}
                  errors={errors}
                  required
                  errorText={errors.contact}
                />
                <FormikInput
                  title="Address"
                  placeholder="Enter Location"
                  onChangeText={handleChange("address")}
                  onBlur={handleBlur("address")}
                  value={values.address}
                  touched={touched}
                  errors={errors}
                  required
                  errorText={errors.address}
                />
                <FormikInput
                  title="State"
                  placeholder="Enter state"
                  onChangeText={handleChange("city")}
                  onBlur={handleBlur("city")}
                  value={values.city}
                  touched={touched}
                  errors={errors}
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
                    touched={touched}
                    errors={errors}
                    required
                    errorText={errors.state}
                  />
                  <FormikInput
                    title="Zip"
                    placeholder="Enter zip"
                    onChangeText={handleChange("zip")}
                    onBlur={handleBlur("zip")}
                    value={values.zip}
                    touched={touched}
                    errors={errors}
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
                  touched={touched}
                  errors={errors}
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
                  touched={touched}
                  errors={errors}
                  required={false}
                  errorText={errors.issuing_authority}
                />
                <FormikInput
                  title="License No"
                  placeholder="License number"
                  onChangeText={handleChange("license_no")}
                  onBlur={handleBlur("license_no")}
                  value={values.license_no}
                  touched={touched}
                  errors={errors}
                  required
                  errorText={errors.license_no}
                />
                <FormikInput
                  title="Dealing areas"
                  placeholder="Please enter City,Status or Zip Code"
                  onChangeText={handleChange("dealing_areas")}
                  onBlur={handleBlur("dealing_areas")}
                  value={values.dealing_areas}
                  touched={touched}
                  errors={errors}
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
                    <MaterialIcons
                      name="check-box-outline-blank"
                      size={18}
                      color={Colors.light.DarkGreen}
                    />

                    <Text style={{ marginLeft: hs(5) }}>Yes</Text>
                  </View>
                  <View
                    className="flex-row items-center"
                    style={{ marginLeft: hs(20) }}
                  >
                    <MaterialIcons
                      size={18}
                      name="check-box-outline-blank"
                      color={Colors.light.DarkGreen}
                    />
                  </View>

                  <Text style={{ marginLeft: hs(5) }}>No</Text>
                </View>
                <View>
                  <View className="flex-row " style={{ marginBottom: vs(10) }}>
                    <Text style={styles.title}>More Description</Text>
                    <Text> (5000 words)</Text>
                  </View>

                  <TextInput
                    placeholder="Write here (Upto 5000 characters)"
                    value={values.remarks}
                    onChangeText={handleChange}
                    onBlur={handleBlur}
                    placeholderTextColor={Colors.light.DarkGreen}
                    style={{
                      borderRadius: ms(18),
                      paddingVertical: vs(5),
                      backgroundColor: Colors.light.LightGreen,
                      paddingHorizontal: hs(5),
                      height:vs(200)
                    }}
                  />

                  {touched && errors && (
                    <Text style={{ color: Colors.light.red }}>
                      {errors.remarks}{" "}
                    </Text>
                  )}
                </View>
                <Button onPress={() => handleSubmit()} title={"ahsan"} />
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
