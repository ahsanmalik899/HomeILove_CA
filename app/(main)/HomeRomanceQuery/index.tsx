import { FormikInput } from "@src/components/globals/FormictInput";
import { FormikDropdown } from "@src/components/globals/FormikDropdown/indes";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LargeButton from "@src/components/globals/LaregeButton";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { Formik } from "formik";

import { StyleSheet, Text, View } from "react-native";
import * as Yup from "yup";
const index = () => {
  const PropertyInquirySchema = Yup.object().shape({
    location: Yup.string()
      .trim()
      .min(3, "Location must be at least 3 characters")
      .required("Location is required"),

    miles: Yup.number()
      .typeError("Miles must be a number")
      .positive("Miles must be greater than 0")
      .max(500, "Miles cannot exceed 500")
      .required("Distance in miles is required"),

    propertyType: Yup.string().required("Property type is required"),

    propertySubType: Yup.string().nullable(),

    inquiry: Yup.string()
      .trim()
      .min(10, "Inquiry must be at least 10 characters")
      .max(500, "Inquiry cannot exceed 500 characters")
      .required("Inquiry message is required"),
  });

  return (
    <View className="flex-1">
      <HeaderWithBack />
      <View style={{ marginHorizontal: hs(20) }}>
        <Text style={{ marginTop: vs(20), fontSize: ms(20), fontWeight: 500 ,fontFamily: "PopinRegula",}}>
          Send your home
          <Text style={{ color: Colors.light.red,fontFamily: "PopinRegula", }}> Maintenance</Text> {"\n"}
          inquiry to experts
        </Text>
        <Text style={{ color: Colors.light.textGray, marginTop: vs(10),fontFamily: "PopinRegula", }}>
          Send free no obligation inquiry for your home maintenance to our
          reputed and experienced local homing experts in simple steps
        </Text>
        <Formik
          initialValues={{
            location: "",
            miles: "",
            propertyType: "",
            propertySubType: "",
            inquiry: "",
          }}
          onSubmit={() => {}}
          validationSchema={PropertyInquirySchema}
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
              <View className="flex-row justify-between items-start gap-3">
                <View className="flex-1">
                  <FormikInput
                    title={""}
                    placeholder="Please enter your location.."
                    onChangeText={handleChange("location")}
                    onBlur={handleBlur("location")}
                    value={values.location}
                    touched={!!touched.location}
                    errors={!!errors.location}
                    required={false}
                    errorText={errors.location}
                  />
                </View>

                <View className="flex-1 mt-3">
                  <FormikDropdown
                    title={""}
                    placeholder={"Radius (miles)"}
                    value={values.miles}
                    options={[
                      "Private investor",
                      "REIT",
                      "Institude",
                      "Crowd fund",
                      "Others",
                    ]}
                    onSelect={(val) => setFieldValue("miles", val)}
                    touched={!!touched.miles}
                    errors={!!errors.miles}
                    errorText={errors.miles}
                    required={false}
                  />
                </View>
              </View>
              <FormikDropdown
                title={"Inquiry for"}
                placeholder={"Select"}
                value={values.inquiry}
                options={[
                  "Private investor",
                  "REIT",
                  "Institude",
                  "Crowd fund",
                  "Others",
                ]}
                onSelect={(val) => setFieldValue("inquiry", val)}
                touched={!!touched.inquiry}
                errors={!!errors.inquiry}
                errorText={errors.inquiry}
                required
              />
              <View className="flex-row justify-between items-start gap-3">
                <View className="flex-1">
                  <FormikDropdown
                    title={"Property Type"}
                    placeholder={"No selection"}
                    value={values.propertyType}
                    options={[
                      "Private investor",
                      "REIT",
                      "Institude",
                      "Crowd fund",
                      "Others",
                    ]}
                    onSelect={(val) => setFieldValue("propertyType", val)}
                    touched={!!touched.propertyType}
                    errors={!!errors.propertyType}
                    errorText={errors.propertyType}
                    required
                  />
                </View>

                <View className="flex-1 ">
                  <FormikDropdown
                    title={"Property Sub-Type"}
                    placeholder={"No Selection"}
                    value={values.propertySubType}
                    options={[
                      "Private investor",
                      "REIT",
                      "Institude",
                      "Crowd fund",
                      "Others",
                    ]}
                    onSelect={(val) => setFieldValue("miles", val)}
                    touched={!!touched.propertySubType}
                    errors={!!errors.propertySubType}
                    errorText={errors.propertySubType}
                    required
                  />
                </View>
              </View>
              <View style={{ marginTop: vs(100) }}>
                <LargeButton
                  handleSubmit={() => {
                    handleSubmit;
                  }}
                  text="Next"
                />
              </View>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
