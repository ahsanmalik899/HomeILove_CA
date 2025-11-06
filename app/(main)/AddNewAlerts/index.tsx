import { FormikInput } from "@src/components/globals/FormictInput";
import { FormikDropdown } from "@src/components/globals/FormikDropdown/indes";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LargeButton from "@src/components/globals/LaregeButton";
import Colors from "@src/constants/Colors";
import { hs, ms } from "@utils/design/design";
import { Formik } from "formik";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Yup from "yup";
const index = () => {
  const AddAlertSchema = Yup.object().shape({
    Location: Yup.string().required("Location is required"),

    end_date: Yup.string().required("End date is required"),

    community_type: Yup.string().required("Community type is required"),
    alert_for: Yup.string().required("Alert for is required"),
    minimu_price: Yup.number()
      .typeError("Please enter a valid minimum price")
      .positive("Minimum price must be positive")
      .required("Minimum price is required"),
    property_type: Yup.string().required("Property type is required"),
    beds: Yup.number()
      .typeError("Please enter a valid number of beds")
      .min(0, "Beds cannot be negative")
      .required("Number of beds is required"),

    property_sub_type: Yup.string().required("Property sub-type is required"),
    maximu_price: Yup.number()
      .typeError("Please enter a valid maximum price")
      .positive("Maximum price must be positive")
      .required("Maximum price is required"),
  });

  return (
    <ScrollView>
    <View className="flex-1 bg-white">
      <HeaderWithBack title="Add Alerts" />
      <View style={{ marginHorizontal: hs(20) }}>
        <Text style={{ fontSize: ms(20), fontWeight: 600 }}>
          Create<Text style={{ color: Colors.light.red }}> Alert </Text>for your
          home move
        </Text>
        <Formik
          initialValues={{
            Location: "",
            end_date: "",
            community_type: "",
            minimu_price: "",
            maximu_price: "",
            alert_for: "",
            property_type: "",
            property_sub_type: "",
            beds: "",
          }}
          validationSchema={AddAlertSchema}
          onSubmit={(values) => {
            console.log("Form Data:", values);
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
           
              <View className="flex-row justify-between items-start gap-3">
                <View className="flex-1">
                  <FormikInput
                    title="Location"
                    placeholder="Please enter your location.."
                    onChangeText={handleChange("Location")}
                    onBlur={handleBlur("Location")}
                    value={values.Location}
                    touched={!!touched.Location}
                    errors={!!errors.Location}
                    required
                    errorText={errors.Location}
                  />
                </View>

                <View className="flex-1">
                  <FormikDropdown
                    title="End Date"
                    placeholder="Select Radius (miles)"
                    value={values.end_date}
                    touched={!!touched.end_date}
                    errors={!!errors.end_date}
                    required
                    errorText={errors.end_date}
                    options={["1/2/3", "1/2/3", "1/2/3"]}
                    onSelect={(value) => setFieldValue("end_date", value)}
                  />
                </View>
              </View>
              <FormikDropdown
                title="Alert For"
                placeholder="Select Type"
                value={values.alert_for}
                touched={!!touched.alert_for}
                errors={!!errors.alert_for}
                required
                errorText={errors.alert_for}
                options={["Select Type", "SelectType"]}
                onSelect={(value) => {
                  setFieldValue("alert_for", value);
                }}
              />
              <FormikDropdown
                title="Community Type"
                placeholder="Select Type"
                value={values.community_type}
                touched={!!touched.community_type}
                errors={!!errors.community_type}
                required
                errorText={errors.community_type}
                options={["Select Type", "SelectType"]}
                onSelect={(value) => {
                  setFieldValue("community_type", value);
                }}
              />
              <View className="flex-row justify-between items-start gap-3">
                <View className="flex-1">
                  <FormikDropdown
                    title="Property Type"
                    placeholder="No Selection"
                    value={values.property_type}
                    touched={!!touched.property_type}
                    errors={!!errors.property_type}
                    required
                    errorText={errors.property_type}
                    options={["1/2/3", "1/2/3", "1/2/3"]}
                    onSelect={(value) => {
                      setFieldValue("property_type", value);
                    }}
                  />
                </View>

                <View className="flex-1">
                  <FormikDropdown
                    title="Prtoperty Sub-Type"
                    placeholder="No Selction"
                    value={values.property_sub_type}
                    touched={!!touched.property_sub_type}
                    errors={!!errors.property_sub_type}
                    required
                    errorText={errors.property_sub_type}
                    options={["1/2/3", "1/2/3", "1/2/3"]}
                    onSelect={(value) => setFieldValue("maximu_price", value)}
                  />
                </View>
              </View>
              <View className="flex-row justify-between items-start gap-3">
                <View className="flex-1">
                  <FormikDropdown
                    title="Minimum Price"
                    placeholder="No Selection"
                    value={values.minimu_price}
                    touched={!!touched.minimu_price}
                    errors={!!errors.minimu_price}
                    required
                    errorText={errors.minimu_price}
                    options={["1/2/3", "1/2/3", "1/2/3"]}
                    onSelect={(value) => {
                      setFieldValue("minimu_price", value);
                    }}
                  />
                </View>

                <View className="flex-1">
                  <FormikDropdown
                    title="Maximum Price*"
                    placeholder="No Selction"
                    value={values.maximu_price}
                    touched={!!touched.maximu_price}
                    errors={!!errors.maximu_price}
                    required
                    errorText={errors.maximu_price}
                    options={["1/2/3", "1/2/3", "1/2/3"]}
                    onSelect={(value) => setFieldValue("maximu_price", value)}
                  />
                </View>
              </View>

          
              <FormikDropdown
                title="Beds"
                placeholder="No Selection"
                value={values.beds}
                touched={!!touched.beds}
                errors={!!errors.beds}
                required
                errorText={errors.beds}
                options={["1/2/3", "1/2/3", "1/2/3"]}
                onSelect={(value) => {
                  setFieldValue("property_type", value);
                }}
              />
              <View className="my-4">
              <LargeButton handleSubmit={() => {}} text="View your Ad" />
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

const styles = StyleSheet.create({});
