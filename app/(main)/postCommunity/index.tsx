import Map from "@assets/icons/PostProperty/map.svg";
import PayLater from "@assets/SideBar/pay-later.svg";
import Paypal from "@assets/SideBar/paypal-icon.svg";
import PowerdByPayPal from "@assets/SideBar/Powered by PayPal.svg";
import Volit from "@assets/SideBar/volit-white.svg";
import { MaterialIcons } from "@expo/vector-icons";
import { FormikInput } from "@src/components/globals/FormictInput";
import { FormikDropdown } from "@src/components/globals/FormikDropdown/indes";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LargeButton from "@src/components/globals/LaregeButton";
import PropertyType from "@src/components/globals/PropertyType";
import RadioButton from "@src/components/globals/RadioButton";
import SelectRentAndSale from "@src/components/globals/SelectRentAndSale";
import SelecteAdType from "@src/components/globals/TablikeButton";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
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
    advatize_time: Yup.string(),
  });
  return (
    <ScrollView className="bg-white flex-1">
      <HeaderWithBack header="Sell Property" />
      <View style={{ marginHorizontal: hs(10), marginVertical: vs(20) }}>
        <Text style={{ fontWeight: 600, fontSize: ms(15) }}>
          Market your
          <Text style={{ color: Colors.light.red }}> COMMUNITY PROJECT</Text>
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
              property_for: "",
              sale_type: "Normal",
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
              advatize_time: "",
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
                  Property <Text>STATUS</Text>
                </Text>
                <PropertyType
                  onPress={(value) => {
                    setFieldValue("property_type", value);
                  }}
                  value={values.property_type}
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
                  Project Details
                </Text>
                <FormikInput
                  title="Title"
                  placeholder="Title"
                  onChangeText={handleChange("land_area")}
                  onBlur={handleBlur("land_area")}
                  value={values.land_area}
                  touched={!!touched.land_area}
                  errors={!!errors.land_area}
                  required
                  errorText={errors.land_area}
                />
                <FormikInput
                  title="Add main features"
                  additonalText="Type property feature and hit + sign. To add more features repeat process"
                  placeholder="e.g Garden, Parking, Pool etc"
                  onChangeText={handleChange("land_area")}
                  onBlur={handleBlur("land_area")}
                  value={values.land_area}
                  touched={!!touched.land_area}
                  errors={!!errors.land_area}
                  required
                  errorText={errors.land_area}
                />
                <FormikInput
                  title="More Description"
                  additonalText="5000 words"
                  placeholder="Write here (Upto 5000 characters)"
                  multiline
                  onChangeText={handleChange("land_area")}
                  onBlur={handleBlur("land_area")}
                  value={values.land_area}
                  touched={!!touched.land_area}
                  errors={!!errors.land_area}
                  required
                  errorText={errors.land_area}
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
                    fontSize: ms(14),
                    fontWeight: "500",
                    marginBottom: vs(15),
                  }}
                >
                  Add Community{" "}
                  <Text style={{ color: Colors.light.red }}>PROPERTIES</Text>{" "}
                </Text>
                 <FormikInput
                  title="Title"
                  placeholder="Title"
                  onChangeText={handleChange("land_area")}
                  onBlur={handleBlur("land_area")}
                  value={values.land_area}
                  touched={!!touched.land_area}
                  errors={!!errors.land_area}
                  required
                  errorText={errors.land_area}
                />
                <View className="flex-row justify-between gap-3">
                  <View className="flex-1">
                    <FormikDropdown
                      onSelect={() => {}}
                      options={["Select", "Select", "Select"]}
                      title="Property Type "
                      placeholder="Select"
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
                      title="Sub-type"
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
                      title="Area in Sqft"
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
                      title="Ownership"
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
                      title="Beds"
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
                      title="Baths"
                      placeholder=""
                      value={values.land_area}
                      touched={!!touched.land_area}
                      errors={!!errors.land_area}
                      required
                      errorText={errors.land_area}
                    />
                  </View>
                </View>
                <FormikInput
                  title="Price"
                  placeholder="Title"
                  onChangeText={handleChange("land_area")}
                  onBlur={handleBlur("land_area")}
                  value={values.land_area}
                  touched={!!touched.land_area}
                  errors={!!errors.land_area}
                  required
                  errorText={errors.land_area}
                />
                <View>
                  <Text>Add main features</Text>
                  <Text>
                    (Type property feature and hit + sign. To add more features
                    repeat process)
                  </Text>
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
                  <LargeButton handleSubmit={() => {}} text="Submit Ad" />
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
