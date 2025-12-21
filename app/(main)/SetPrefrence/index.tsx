import { MaterialIcons } from "@expo/vector-icons";
import { DealingAreas } from "@src/components/globals/DealingAreas";
import { FormikDropdown } from "@src/components/globals/FormikDropdown/indes";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Yup from "yup";
const index = () => {
  const propertyPrefrenceSchema = Yup.object().shape({
    location: Yup.string().required("Location is required"),

    property_for: Yup.string().required("Property for is required"),

    property_type: Yup.string().required("Property type is required"),

    property_condition: Yup.string().required("Property condition is required"),

    price_min: Yup.number()
      .typeError("Min price must be a number")
      .required("Min price is required"),

    price_max: Yup.number()
      .typeError("Max price must be a number")
      .required("Max price is required")
      .min(Yup.ref("price_min"), "Max price must be greater than min price"),

    propertysize_min: Yup.number()
      .typeError("Min property size must be a number")
      .required("Min property size is required"),

    propertysize_max: Yup.number()
      .typeError("Max property size must be a number")
      .required("Max property size is required")
      .min(
        Yup.ref("propertysize_min"),
        "Max size must be greater than min size"
      ),

    lotsize_min: Yup.number()
      .typeError("Min lot size must be a number")
      .required("Min lot size is required"),

    lotsize_max: Yup.number()
      .typeError("Max lot size must be a number")
      .required("Max lot size is required")
      .min(Yup.ref("lotsize_min"), "Max lot size must be greater than min"),

    homeage_min: Yup.number()
      .typeError("Min home age must be a number")
      .required("Min home age is required"),

    homeage_max: Yup.number()
      .typeError("Max home age must be a number")
      .required("Max home age is required")
      .min(Yup.ref("homeage_min"), "Max home age must be greater than min"),
  });
  const communityPreferenceSchema = Yup.object().shape({
    location: Yup.string().required("Location is required"),

    property_for: Yup.string().required("Property for is required"),

    development_stage: Yup.string().required("Development stage is required"),

    price_min: Yup.number()
      .typeError("Minimum price must be a number")
      .required("Minimum price is required"),

    price_max: Yup.number()
      .typeError("Maximum price must be a number")
      .required("Maximum price is required")
      .min(Yup.ref("price_min"), "Max price must be greater than min price"),
  });

  const { type } = useLocalSearchParams();
  switch (type) {
    case "Property":
      return (
        <ScrollView className="flex-1 bg-white">
          <View>
            <HeaderWithBack title="Set Your Property Preferences" />
            <View style={styles.card}>
              <Formik
                initialValues={{
                  location: "",

                  property_for: "",
                  property_type: "House",
                  property_condition: "",

                  price_min: "",
                  price_max: "",

                  propertysize_min: "",
                  propertysize_max: "",

                  lotsize_min: "",
                  lotsize_max: "",

                  homeage_min: "",
                  homeage_max: "",
                }}
                onSubmit={(values) => {}}
                validationSchema={propertyPrefrenceSchema}
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
                        width: hs(250),
                        fontWeight: 500,
                        marginTop: vs(10),
                      }}
                    >
                      Property for
                    </Text>
                    <View
                      className="flex-row"
                      style={{ marginTop: vs(10), marginBottom: vs(20) }}
                    >
                      <View className="flex-row items-center">
                        <TouchableOpacity
                          onPress={() =>
                            setFieldValue(
                              "property_for",
                              values.property_for === "Sale" ? "" : "Sale"
                            )
                          }
                        >
                          <MaterialIcons
                            size={18}
                            color={Colors.light.DarkGreen}
                            name={
                              values.property_for === "Sale"
                                ? "check-box"
                                : "check-box-outline-blank"
                            }
                          />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: hs(5) }}>Sale</Text>
                      </View>
                      <View
                        className="flex-row items-center"
                        style={{ marginLeft: hs(20) }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            setFieldValue(
                              "property_for",
                              values.property_for === "Rent" ? "" : "Rent"
                            )
                          }
                        >
                          <MaterialIcons
                            size={18}
                            color={Colors.light.DarkGreen}
                            name={
                              values.property_for === "Rent"
                                ? "check-box"
                                : "check-box-outline-blank"
                            }
                          />
                        </TouchableOpacity>
                      </View>

                      <Text style={{ marginLeft: hs(5) }}>Rent</Text>
                    </View>
                    {touched.property_for && errors.property_for && (
                      <Text style={{ color: Colors.light.red }}>
                        {errors.property_for}
                      </Text>
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
                    <View className="flex-1">
                      <FormikDropdown
                        title="Property Type"
                        placeholder="Property Type"
                        value={values.property_type}
                        touched={!!touched.property_type}
                        errors={!!errors.property_type}
                        required
                        multipleFields
                        errorText={errors.property_type}
                        options={["House", "1/2/3", "1/2/3"]}
                        onSelect={(value) =>
                          setFieldValue("property_type", value)
                        }
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
                    <View className="flex-1">
                      <FormikDropdown
                        title="Property Conditions"
                        placeholder="Property Conditions"
                        value={values.property_type}
                        touched={!!touched.property_type}
                        errors={!!errors.property_type}
                        required
                        multipleFields
                        errorText={errors.property_type}
                        options={["House", "1/2/3", "1/2/3"]}
                        onSelect={(value) =>
                          setFieldValue("property_type", value)
                        }
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
                    <Text style={{ fontWeight: 500 }}>Price Range (Sale)</Text>
                    <View className="flex-row justify-between items-start gap-3">
                      <View className="flex-1">
                        <FormikDropdown
                          title="Minimun"
                          placeholder="No Selection"
                          value={values.price_min}
                          touched={!!touched.price_min}
                          errors={!!errors.price_min}
                          required
                          errorText={errors.price_min}
                          options={["1/2/3", "1/2/3", "1/2/3"]}
                          onSelect={(value) => {
                            setFieldValue("price_min", value);
                          }}
                        />
                      </View>

                      <View className="flex-1">
                        <FormikDropdown
                          title="Maximun"
                          placeholder="No Selction"
                          value={values.price_max}
                          touched={!!touched.price_max}
                          errors={!!errors.price_max}
                          required
                          errorText={errors.price_max}
                          options={["1/2/3", "1/2/3", "1/2/3"]}
                          onSelect={(value) =>
                            setFieldValue("price_max", value)
                          }
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
                    <Text style={{ fontWeight: 500 }}>
                      Property size (sqft)
                    </Text>
                    <View className="flex-row justify-between items-start gap-3">
                      <View className="flex-1">
                        <FormikDropdown
                          title="Minimun"
                          placeholder="No Selection"
                          value={values.price_min}
                          touched={!!touched.price_min}
                          errors={!!errors.price_min}
                          required
                          errorText={errors.price_min}
                          options={["1/2/3", "1/2/3", "1/2/3"]}
                          onSelect={(value) => {
                            setFieldValue("price_min", value);
                          }}
                        />
                      </View>

                      <View className="flex-1">
                        <FormikDropdown
                          title="Maximun"
                          placeholder="No Selction"
                          value={values.price_max}
                          touched={!!touched.price_max}
                          errors={!!errors.price_max}
                          required
                          errorText={errors.price_max}
                          options={["1/2/3", "1/2/3", "1/2/3"]}
                          onSelect={(value) =>
                            setFieldValue("price_max", value)
                          }
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
                    <Text style={{ fontWeight: 500 }}>Lot size (acres)</Text>

                    <View className="flex-row justify-between items-start gap-3">
                      <View className="flex-1">
                        <FormikDropdown
                          title="Minimun"
                          placeholder="No Selection"
                          value={values.price_min}
                          touched={!!touched.price_min}
                          errors={!!errors.price_min}
                          required
                          errorText={errors.price_min}
                          options={["1/2/3", "1/2/3", "1/2/3"]}
                          onSelect={(value) => {
                            setFieldValue("price_min", value);
                          }}
                        />
                      </View>

                      <View className="flex-1">
                        <FormikDropdown
                          title="Maximun"
                          placeholder="No Selction"
                          value={values.price_max}
                          touched={!!touched.price_max}
                          errors={!!errors.price_max}
                          required
                          errorText={errors.price_max}
                          options={["1/2/3", "1/2/3", "1/2/3"]}
                          onSelect={(value) =>
                            setFieldValue("price_max", value)
                          }
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
                    <Text style={{ fontWeight: 500 }}>Home age</Text>
                    <View className="flex-row justify-between items-start gap-3">
                      <View className="flex-1">
                        <FormikDropdown
                          title="Minimun"
                          placeholder="No Selection"
                          value={values.price_min}
                          touched={!!touched.price_min}
                          errors={!!errors.price_min}
                          required
                          errorText={errors.price_min}
                          options={["1/2/3", "1/2/3", "1/2/3"]}
                          onSelect={(value) => {
                            setFieldValue("price_min", value);
                          }}
                        />
                      </View>

                      <View className="flex-1">
                        <FormikDropdown
                          title="Maximun"
                          placeholder="No Selction"
                          value={values.price_max}
                          touched={!!touched.price_max}
                          errors={!!errors.price_max}
                          required
                          errorText={errors.price_max}
                          options={["1/2/3", "1/2/3", "1/2/3"]}
                          onSelect={(value) =>
                            setFieldValue("price_max", value)
                          }
                        />
                      </View>
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </View>
        </ScrollView>
      );
      break;
    case "Community":
      return (
        <ScrollView className="flex-1 bg-white">
          <View>
            <HeaderWithBack title="Set Your Community Preferences" />
            <View style={styles.card}>
              <Formik
                initialValues={{
                  location: "",
                  property_for: "",
                  development_stage: "",
                  price_min: "",
                  price_max: "",
                }}
                onSubmit={(values) => {}}
                validationSchema={communityPreferenceSchema}
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
                    <View
                      style={{
                        height: vs(1),
                        marginTop: vs(20),
                        marginBottom: vs(10),
                        backgroundColor: Colors.light.textGray,
                        opacity: 0.2,
                      }}
                    />
                    <Text style={{ width: hs(250), marginTop: vs(10) }}>
                      Property for
                    </Text>
                    <View
                      className="flex-row"
                      style={{ marginTop: vs(10), marginBottom: vs(20) }}
                    >
                      <View className="flex-row items-center">
                        <TouchableOpacity
                          onPress={() =>
                            setFieldValue(
                              "property_for",
                              values.property_for === "Sale" ? "" : "Sale"
                            )
                          }
                        >
                          <MaterialIcons
                            size={18}
                            color={Colors.light.DarkGreen}
                            name={
                              values.property_for === "Sale"
                                ? "check-box"
                                : "check-box-outline-blank"
                            }
                          />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: hs(5) }}>Sale</Text>
                      </View>
                      <View
                        className="flex-row items-center"
                        style={{ marginLeft: hs(20) }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            setFieldValue(
                              "property_for",
                              values.property_for === "Rent" ? "" : "Rent"
                            )
                          }
                        >
                          <MaterialIcons
                            size={18}
                            color={Colors.light.DarkGreen}
                            name={
                              values.property_for === "Rent"
                                ? "check-box"
                                : "check-box-outline-blank"
                            }
                          />
                        </TouchableOpacity>
                      </View>

                      <Text style={{ marginLeft: hs(5) }}>Rent</Text>
                    </View>
                    {touched.property_for && errors.property_for && (
                      <Text style={{ color: Colors.light.red }}>
                        {errors.property_for}
                      </Text>
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
                    <Text style={{ width: hs(250), marginTop: vs(10) }}>
                      Development Stage
                    </Text>
                    <View
                      className="flex-row"
                      style={{ marginTop: vs(10), marginBottom: vs(20) }}
                    >
                      <View className="flex-row items-center">
                        <TouchableOpacity
                          onPress={() =>
                            setFieldValue(
                              "development_stage",
                              values.development_stage === "Completed"
                                ? ""
                                : "Completed"
                            )
                          }
                        >
                          <MaterialIcons
                            size={18}
                            color={Colors.light.DarkGreen}
                            name={
                              values.development_stage === "Completed"
                                ? "check-box"
                                : "check-box-outline-blank"
                            }
                          />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: hs(5) }}>Completed</Text>
                      </View>
                      <View
                        className="flex-row items-center"
                        style={{ marginLeft: hs(20) }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            setFieldValue(
                              "development_stage",
                              values.development_stage === "Constructed"
                                ? ""
                                : "Constructed"
                            )
                          }
                        >
                          <MaterialIcons
                            size={18}
                            color={Colors.light.DarkGreen}
                            name={
                              values.development_stage === "Constructed"
                                ? "check-box"
                                : "check-box-outline-blank"
                            }
                          />
                        </TouchableOpacity>
                      </View>

                      <Text style={{ marginLeft: hs(5) }}>Constructed</Text>
                      <View className="flex-row items-center">
                        <TouchableOpacity
                          onPress={() =>
                            setFieldValue(
                              "property_for",
                              values.development_stage === "Inplanning"
                                ? ""
                                : "Inplanning"
                            )
                          }
                        >
                          <MaterialIcons
                            size={18}
                            color={Colors.light.DarkGreen}
                            name={
                              values.development_stage === "Inplanning"
                                ? "check-box"
                                : "check-box-outline-blank"
                            }
                          />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: hs(5) }}>Inplanning</Text>
                      </View>
                    </View>
                    {touched.property_for && errors.property_for && (
                      <Text style={{ color: Colors.light.red }}>
                        {errors.property_for}
                      </Text>
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
                      <Text style={{fontWeight:500 }}>Price Range (Sale)</Text>
                    <View className="flex-row justify-between items-start gap-3">
                      <View className="flex-1">
                        <FormikDropdown
                          title="Minimun"
                          placeholder="No Selection"
                          value={values.price_min}
                          touched={!!touched.price_min}
                          errors={!!errors.price_min}
                          required
                          errorText={errors.price_min}
                          options={["1/2/3", "1/2/3", "1/2/3"]}
                          onSelect={(value) => {
                            setFieldValue("price_min", value);
                          }}
                        />
                      </View>
                     
                      <View className="flex-1">
                        <FormikDropdown
                          title="Maximun"
                          placeholder="No Selction"
                          value={values.price_max}
                          touched={!!touched.price_max}
                          errors={!!errors.price_max}
                          required
                          errorText={errors.price_max}
                          options={["1/2/3", "1/2/3", "1/2/3"]}
                          onSelect={(value) =>
                            setFieldValue("price_max", value)
                          }
                        />
                      </View>
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </View>
        </ScrollView>
      );
      break;
    case "Connection":
      return (
        <ScrollView className="flex-1 bg-white">
          <View>
            <HeaderWithBack title="Set Your Connection Preferences" />
            <View style={styles.card}>
              <Formik
                initialValues={{
                  location: "",
                  property_for: "",
                  development_stage: "",
                  price_min: "",
                  price_max: "",
                }}
                onSubmit={(values) => {}}
                validationSchema={communityPreferenceSchema}
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
                      Property for
                    </Text>
                    <View className="flex-row items-center">
                      <TouchableOpacity
                        onPress={() =>
                          setFieldValue(
                            "property_for",
                            values.property_for === "Electricians"
                              ? ""
                              : "Electricians"
                          )
                        }
                      >
                        <MaterialIcons
                          size={18}
                          color={Colors.light.DarkGreen}
                          name={
                            values.property_for === "Electricians"
                              ? "check-box"
                              : "check-box-outline-blank"
                          }
                        />
                      </TouchableOpacity>
                      <Text style={{ marginLeft: hs(5) }}>Electricians</Text>
                    </View>
                    <View className="flex-row items-center">
                      <TouchableOpacity
                        onPress={() =>
                          setFieldValue(
                            "property_for",
                            values.property_for === "Builder" ? "" : "Builder"
                          )
                        }
                      >
                        <MaterialIcons
                          size={18}
                          color={Colors.light.DarkGreen}
                          name={
                            values.property_for === "Builder"
                              ? "check-box"
                              : "check-box-outline-blank"
                          }
                        />
                      </TouchableOpacity>
                      <Text style={{ marginLeft: hs(5) }}>Builder</Text>
                    </View>
                    <View className="flex-row items-center">
                      <TouchableOpacity
                        onPress={() =>
                          setFieldValue(
                            "property_for",
                            values.property_for === "Property agents"
                              ? ""
                              : "Property agents"
                          )
                        }
                      >
                        <MaterialIcons
                          size={18}
                          color={Colors.light.DarkGreen}
                          name={
                            values.property_for === "Property agents"
                              ? "check-box"
                              : "check-box-outline-blank"
                          }
                        />
                      </TouchableOpacity>
                      <Text style={{ marginLeft: hs(5) }}>Property agents</Text>
                    </View>
                    <View className="flex-row items-center">
                      <TouchableOpacity
                        onPress={() =>
                          setFieldValue(
                            "property_for",
                            values.property_for === "Plumbers" ? "" : "Plumbers"
                          )
                        }
                      >
                        <MaterialIcons
                          size={18}
                          color={Colors.light.DarkGreen}
                          name={
                            values.property_for === "Plumbers"
                              ? "check-box"
                              : "check-box-outline-blank"
                          }
                        />
                      </TouchableOpacity>
                      <Text style={{ marginLeft: hs(5) }}>Plumbers</Text>
                    </View>
                    <View className="flex-row items-center">
                      <TouchableOpacity
                        onPress={() =>
                          setFieldValue(
                            "property_for",
                            values.property_for === "Mortgage Advisors"
                              ? ""
                              : "Mortgage Advisors"
                          )
                        }
                      >
                        <MaterialIcons
                          size={18}
                          color={Colors.light.DarkGreen}
                          name={
                            values.property_for === "Mortgage Advisors"
                              ? "check-box"
                              : "check-box-outline-blank"
                          }
                        />
                      </TouchableOpacity>
                      <Text style={{ marginLeft: hs(5) }}>
                        Mortgage Advisors
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <TouchableOpacity
                        onPress={() =>
                          setFieldValue(
                            "property_for",
                            values.property_for === "Decors" ? "" : "Decors"
                          )
                        }
                      >
                        <MaterialIcons
                          size={18}
                          color={Colors.light.DarkGreen}
                          name={
                            values.property_for === "Decors"
                              ? "check-box"
                              : "check-box-outline-blank"
                          }
                        />
                      </TouchableOpacity>
                      <Text style={{ marginLeft: hs(5) }}>Decors</Text>
                    </View>
                    <View className="flex-row items-center">
                      <TouchableOpacity
                        onPress={() =>
                          setFieldValue(
                            "property_for",
                            values.property_for === "Painters" ? "" : "Painters"
                          )
                        }
                      >
                        <MaterialIcons
                          size={18}
                          color={Colors.light.DarkGreen}
                          name={
                            values.property_for === "Painters"
                              ? "check-box"
                              : "check-box-outline-blank"
                          }
                        />
                      </TouchableOpacity>
                      <Text style={{ marginLeft: hs(5) }}>Painters</Text>
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </View>
        </ScrollView>
      );
      break;
  }
};

export default index;
const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    marginTop: vs(20),
    elevation: 5,
    marginHorizontal: hs(10),
    borderRadius: ms(30),
    paddingHorizontal: hs(10),
    paddingVertical: vs(10),
    marginBottom: vs(10),
  },
});
