import Map from "@assets/icons/PostProperty/map.svg";
import { MaterialIcons } from "@expo/vector-icons";
import { FormikInput } from "@src/components/globals/FormictInput";
import { FormikDropdown } from "@src/components/globals/FormikDropdown/indes";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import PropertyType from "@src/components/globals/PropertyType";
import SelectRentAndSale from "@src/components/globals/SelectRentAndSale";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { Formik } from "formik";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Yup from "yup";
const index = () => {
  const PostPropert = Yup.object().shape({
    property_for: Yup.string().required("Property type is required"),
    sale_type: Yup.string().required("Sale type is required"),
    property_type: Yup.string().required("Property type is required"),
    property_title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .required("Property title is required"),
    asking_price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be positive")
      .required("Price is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    bedrooms: Yup.string().required("Bedrooms field is required"),
    bathrooms: Yup.string().required("Bathrooms field is required"),
    property_details: Yup.string().required("Property details are required"),
  });
  return (
    <ScrollView className="bg-white flex-1">
      <HeaderWithBack header="Sell Property" />
      <View style={{ marginHorizontal: hs(10), marginTop: vs(20) }}>
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
              property_for: "",
              sale_type: "",
              property_type: "",
              property_sub_type: "",
              address: "",
              city: "",
              state: "",
              zip: "",
              lat: 0,
              lng: 0,
              property_title: "",
              property_details: "",
              land_area: "",
              tenure: "",
              tenancy_tenure: "",
              bedrooms: "",
              bathrooms: "",
              property_condition: "",
              asking_price: "",
              saleprice_type: "",
              rent_type: "",
              reception: "",
              purpose: "",
              home_age: "",
              lot_size: "",
              house_charges: "",
              pet_allowers: "",
              imp_facts: "",
              fees_conditions: "",
              available_on: "",
              visit_date: "",
              visit_time: "",
              video_link: "",
              ad_by: "",
              user_id: 0,
              user_type: "",
              payment_method: "",
              ad_life: "",
              post_created_date: "",
              post_updated_date: "",
              post_expiry_date: "",
              post_start_date: "",
              post_end_date: "",
              post_type: "Property",
              status: "Pending",
              approved_by: "",
            }}
            validationSchema={PostPropert}
            onSubmit={async (values) => {
              console.log(values);
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
                  value={"Detached House"}
                  options={["Detached House"]}
                  onSelect={function (value: string): void {
                    throw new Error("Function not implemented.");
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
                <FormikInput
                  title="Property Location"
                  placeholder="Enter complete address or street*"
                  onChangeText={handleChange("address")}
                  onBlur={handleBlur("address")}
                  value={values.address}
                  touched={!!touched.address}
                  errors={!!errors.address}
                  required={false}
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
                      options={["Select", "Select", "Select"]}
                      title="Beds"
                      placeholder="Beds"
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
                      title="Baths"
                      placeholder="Baths"
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
                      options={["Select", "Select", "Select"]}
                      title="Property condition"
                      placeholder=""
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
                      title="Reception"
                      placeholder=""
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
                      options={["Select", "Select", "Select"]}
                      title="Purposeful property?"
                      placeholder=""
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
                      title="Home age"
                      placeholder=""
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
                      options={["Select", "Select", "Select"]}
                      title="Lot size (acers)"
                      placeholder=""
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
                      title="House charges /month"
                      placeholder=""
                      value={values.land_area}
                      touched={!!touched.land_area}
                      errors={!!errors.land_area}
                      required
                      errorText={errors.land_area}
                    />
                  </View>
                 
                </View>
                 <View>
                    <Text>Add main features</Text>
                    <Text>{`(Type property feature and hit + sign. To add more features repeat process)`}</Text>
                    <FormikInput
                      title=""
                      placeholder="e.g Garden, Parking, Pool etc"
                      onChangeText={handleChange("land_area")}
                      onBlur={handleBlur("land_area")}
                      value={values.land_area}
                      touched={!!touched.land_area}
                      errors={!!errors.land_area}
                      required={false}
                      errorText={errors.land_area}
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
                <Text></Text>
                
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
          </Formik>
        </View>
      </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({});
