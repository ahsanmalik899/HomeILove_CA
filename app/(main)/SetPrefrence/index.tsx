import { useSetCommunityPrefrenceMutation, useSetConectionPrefrenceMutation, useSetPropertyPrefrenceMutation } from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import { MaterialIcons } from "@expo/vector-icons";
import { DealingAreas } from "@src/components/globals/DealingAreas";
import { FormikDropdown } from "@src/components/globals/FormikDropdown/indes";
import { FormikDropdownwithjson } from "@src/components/globals/FormikDropdownwithjson/indes";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import Loading from "@src/components/globals/Loading";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { renderToastError, renderToastSuccess } from "@src/hooks/useToasty";
import { hs, ms, vs } from "@utils/design/design";
import { useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Yup from "yup";
const index = () => {
  const user = useAppSelector(userdata)
  const [setPropertyPrefrence,{isLoading:PropertyLoading}]= useSetPropertyPrefrenceMutation()
  const [setCommunityPrefrence,{isLoading:CommunityLoading}]= useSetCommunityPrefrenceMutation()
   const [setConnectionPrefrence,{isLoading:ConnectionLoading}]= useSetConectionPrefrenceMutation()
  const toggleStatus = (
    currentvalue: string,
    value: string,
    setFieldValue: (name: string, value: string) => void,
    name: string
  ) => {
    const current = value ? value.split(",") : [];

    if (current.includes(currentvalue)) {
      const updated = current.filter((item) => item !== currentvalue);
      setFieldValue(name, updated.join(","));
    } else {
      setFieldValue(name, [...current, currentvalue].join(","));
    }
  };

  const propertyPrefrenceSchema = Yup.object().shape({
    location: Yup.string().required("Location is required"),
    user_id:Yup.string().nullable(),
    property_for: Yup.string().required("Property for is required"),

    property_type: Yup.string().required("Property type is required"),
    property_condition: Yup.string().required(
      "Property condition type is required"
    ),
    min_price: Yup.number()
      .typeError("Minimum price must be a number")
      .required("Minimum price is required"),

    max_price: Yup.number()
      .typeError("Maximum price must be a number")
      .required("Maximum price is required")
      .min(Yup.ref("min_price"), "Max rent must be greater than min price"),
    min_rent: Yup.number()
      .typeError("Minimum rent must be a number")
      .required("Minimum rent is required"),

    max_rent: Yup.number()
      .typeError("Maximum rent must be a number")
      .required("Maximum rent is required")
      .min(Yup.ref("min_rent"), "Max rent must be greater than min rent"),
    min_size: Yup.number()
      .typeError("Minimum size must be a number")
      .required("Minimum size is required"),

    max_size: Yup.number()
      .typeError("Maximum size must be a number")
      .required("Maximum size is required")
      .min(Yup.ref("min_size"), "Max size must be greater than size rent"),
    min_lot_size: Yup.number()
      .typeError("Minimum lot size must be a number")
      .required("Minimum lot size is required"),

    max_lot_size: Yup.number()
      .typeError("Maximum lot size must be a number")
      .required("Maximum lot size is required")
      .min(
        Yup.ref("min_lot_size"),
        "Max lot size must be greater than min lot size"
      ),

    min_age: Yup.number()
      .typeError("Minimum age must be a number")
      .required("Minimum age is required"),

    max_age: Yup.number()
      .typeError("Maximum age must be a number")
      .required("Maximum age is required")
      .min(Yup.ref("min_age"), "Max rent age be greater than min age"),
  });
  const communityPreferenceSchema = Yup.object().shape({
    location: Yup.string().required("Location is required"),
    zip: Yup.string().nullable(),
    state: Yup.string().nullable(),

    community_type: Yup.string().required("Community type is required"),
    community_status: Yup.string().required("Community type is required"),

    min_price: Yup.number()
      .typeError("Minimum price must be a number")
      .required("Minimum price is required"),

    max_price: Yup.number()
      .typeError("Maximum price must be a number")
      .required("Maximum price is required")
      .min(Yup.ref("min_price"), "Max rent must be greater than min price"),
  });
 const connectionPreferenceSchema = Yup.object().shape({
  user_id:Yup.string().required("id is required"),
    location: Yup.string().required("Location is required"),
  user_type:Yup.string().required("user prefrence is treguired")
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
                    user_id:user.id,
                  property_for: "",
                  property_type: "",
                  property_condition: "",
                  min_price: "",
                  max_price: "",

                  min_rent: "",
                  max_rent: "",

                  min_size: "",
                  max_size: "",

                  min_lot_size: "",
                  max_lot_size: "",

                  min_age: "",
                  max_age: "",
                }}
            onSubmit={async (values) => {
  try {
    const result = await setPropertyPrefrence(values);

    if (result?.data?.success) {
      renderToastSuccess(result.data.message);
    } else {
      renderToastError(
        result?.data?.message || "Something went wrong"
      );
    }
  } catch (error) {
    renderToastError("Server error");
  }
}}

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
                      title="Locations"
                      value={values.location}
                      touched={!!touched.location}
                      errors={!!errors.location}
                      name="location"
                      zip="zip"
                      setValue={setFieldValue}
                      errorText={errors.location}
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
                      className="flex-row flex-wrap"
                      style={{ marginTop: vs(10), marginBottom: vs(20) }}
                    >
                      {/*  Sale */}
                      <View className="flex-row items-center">
                        <TouchableOpacity
                          onPress={() =>
                            toggleStatus(
                              "Sale",
                              values.property_for,
                              setFieldValue,
                              "property_for"
                            )
                          }
                        >
                          <MaterialIcons
                            size={18}
                            color={Colors.light.DarkGreen}
                            name={
                              values.property_for?.includes("Sale")
                                ? "check-box"
                                : "check-box-outline-blank"
                            }
                          />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: hs(5) }}> Sale</Text>
                      </View>

                      {/* Rent */}
                      <View
                        className="flex-row items-center"
                        style={{ marginLeft: hs(20) }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            toggleStatus(
                              "Rent",
                              values.property_for,
                              setFieldValue,
                              "property_for"
                            )
                          }
                        >
                          <MaterialIcons
                            size={18}
                            color={Colors.light.DarkGreen}
                            name={
                              values.property_for?.includes("Rent")
                                ? "check-box"
                                : "check-box-outline-blank"
                            }
                          />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: hs(5) }}> Rent</Text>
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
                    <View className="flex-1">
                      <FormikDropdown
                        title="Property Type"
                        placeholder="Property Type"
                        value={values.property_type}
                        touched={!!touched.property_type}
                        errors={!!errors.property_type}
                        required
                        multipleFields
                        name="property_type"
                        setValue={setFieldValue}
                        errorText={errors.property_type}
                        options={["House", "Commercial", "Farms/Lands"]}
                        onSelect={() =>{}
                         
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
                        value={values.property_condition}
                        touched={!!touched.property_condition}
                        errors={!!errors.property_condition}
                        required
                        
                        multipleFields
                        errorText={errors.property_condition}
                        options={[
                          "Newly build",
                          "Total Re-build",
                          "Partial Re-build",
                          "Good condition",
                          "Moderate",
                          "Need Repairs",
                        ]}
                        onSelect={()=>{}
                        }
                        setValue={setFieldValue}
                        name="property_condition"
                      />
                    </View>

                    {values.property_for.includes("Sale") ||
                      (values.property_for.includes("Rent") && (
                        <>
                          <View
                            style={{
                              height: vs(1),
                              marginTop: vs(20),
                              marginBottom: vs(10),
                              backgroundColor: Colors.light.textGray,
                              opacity: 0.2,
                            }}
                          />
                          <Text style={{ fontWeight: 500 }}>Price Range </Text>
                        </>
                      ))}

                    {values.property_for.includes("Sale") && (
                      <View className="flex-row justify-between items-start gap-3">
                        <View className="flex-1">
                          <FormikDropdownwithjson
                            title="Minimun price"
                            placeholder="No Selection"
                            value={values.min_price}
                            touched={!!touched.min_price}
                            errors={!!errors.min_price}
                            required
                            errorText={errors.min_price}
                            options={[
                              { label: "No selection", value: "" },
                              { label: "below $ 50,000", value: "0" },
                              { label: "$ 50,000", value: "50000" },
                              { label: "$ 70,000", value: "70000" },
                              { label: "$ 100,000", value: "100000" },
                              { label: "$ 120,000", value: "120000" },
                              { label: "$ 150,000", value: "150000" },
                              { label: "$ 175,000", value: "175000" },
                              { label: "$ 200,000", value: "200000" },
                              { label: "$ 250,000", value: "250000" },
                              { label: "$ 300,000", value: "300000" },
                              { label: "$ 350,000", value: "350000" },
                              { label: "$ 400,000", value: "400000" },
                              { label: "$ 500,000", value: "500000" },
                              { label: "$ 600,000", value: "600000" },
                              { label: "$ 700,000", value: "700000" },
                              { label: "$ 900,000", value: "900000" },
                              { label: "$ 1,000,000", value: "1000000" },
                              { label: "$ 1,200,000", value: "1200000" },
                              { label: "$ 1,500,000", value: "1500000" },
                              { label: "$ 2,000,000", value: "2000000" },
                              { label: "$ 3,000,000", value: "3000000" },
                            ]}
                            onSelect={(value) => {
                              setFieldValue("min_price", value);
                            }}
                          />
                        </View>

                        <View className="flex-1">
                          <FormikDropdownwithjson
                            title="Maximun price"
                            placeholder="No Selction"
                            value={values.max_price}
                            touched={!!touched.max_price}
                            errors={!!errors.max_price}
                            required
                            errorText={errors.max_price}
                            options={[
                              { value: "", label: "No selection" },
                              { value: "50000", label: "$ 50,000" },
                              { value: "70000", label: "$ 70,000" },
                              { value: "100000", label: "$ 100,000" },
                              { value: "120000", label: "$ 120,000" },
                              { value: "150000", label: "$ 150,000" },
                              { value: "175000", label: "$ 175,000" },
                              { value: "200000", label: "$ 200,000" },
                              { value: "250000", label: "$ 250,000" },
                              { value: "300000", label: "$ 300,000" },
                              { value: "350000", label: "$ 350,000" },
                              { value: "400000", label: "$ 400,000" },
                              { value: "500000", label: "$ 500,000" },
                              { value: "600000", label: "$ 600,000" },
                              { value: "700000", label: "$ 700,000" },
                              { value: "900000", label: "$ 900,000" },
                              { value: "1000000", label: "$ 1,000,000" },
                              { value: "1200000", label: "$ 1,200,000" },
                              { value: "1500000", label: "$ 1,500,000" },
                              { value: "2000000", label: "$ 2,000,000" },
                              { value: "3000000", label: "$ 3,000,000" },
                              { value: "3000001", label: "Above $ 3,000,000" },
                            ]}
                            onSelect={(value) =>
                              setFieldValue("max_price", value)
                            }
                          />
                        </View>
                      </View>
                    )}

                    {values.property_for.includes("Rent") && (
                      <View className="flex-row justify-between items-start gap-3">
                        <View className="flex-1">
                          <FormikDropdownwithjson
                            title="Minimun rent"
                            placeholder="No Selection"
                            value={values.min_rent}
                            touched={!!touched.min_rent}
                            errors={!!errors.min_rent}
                            required
                            errorText={errors.min_rent}
                            options={[
                              { label: "No selection", value: "" },
                              { label: "below $ 50,000", value: "0" },
                              { label: "$ 50,000", value: "50000" },
                              { label: "$ 70,000", value: "70000" },
                              { label: "$ 100,000", value: "100000" },
                              { label: "$ 120,000", value: "120000" },
                              { label: "$ 150,000", value: "150000" },
                              { label: "$ 175,000", value: "175000" },
                              { label: "$ 200,000", value: "200000" },
                              { label: "$ 250,000", value: "250000" },
                              { label: "$ 300,000", value: "300000" },
                              { label: "$ 350,000", value: "350000" },
                              { label: "$ 400,000", value: "400000" },
                              { label: "$ 500,000", value: "500000" },
                              { label: "$ 600,000", value: "600000" },
                              { label: "$ 700,000", value: "700000" },
                              { label: "$ 900,000", value: "900000" },
                              { label: "$ 1,000,000", value: "1000000" },
                              { label: "$ 1,200,000", value: "1200000" },
                              { label: "$ 1,500,000", value: "1500000" },
                              { label: "$ 2,000,000", value: "2000000" },
                              { label: "$ 3,000,000", value: "3000000" },
                            ]}
                            onSelect={(value) => {
                              setFieldValue("min_rent", value);
                            }}
                          />
                        </View>

                        <View className="flex-1">
                          <FormikDropdownwithjson
                            title="Maximun rent"
                            placeholder="No Selction"
                            value={values.max_rent}
                            touched={!!touched.max_rent}
                            errors={!!errors.max_rent}
                            required
                            errorText={errors.max_rent}
                            options={[
                              { value: "", label: "No selection" },
                              { value: "50000", label: "$ 50,000" },
                              { value: "70000", label: "$ 70,000" },
                              { value: "100000", label: "$ 100,000" },
                              { value: "120000", label: "$ 120,000" },
                              { value: "150000", label: "$ 150,000" },
                              { value: "175000", label: "$ 175,000" },
                              { value: "200000", label: "$ 200,000" },
                              { value: "250000", label: "$ 250,000" },
                              { value: "300000", label: "$ 300,000" },
                              { value: "350000", label: "$ 350,000" },
                              { value: "400000", label: "$ 400,000" },
                              { value: "500000", label: "$ 500,000" },
                              { value: "600000", label: "$ 600,000" },
                              { value: "700000", label: "$ 700,000" },
                              { value: "900000", label: "$ 900,000" },
                              { value: "1000000", label: "$ 1,000,000" },
                              { value: "1200000", label: "$ 1,200,000" },
                              { value: "1500000", label: "$ 1,500,000" },
                              { value: "2000000", label: "$ 2,000,000" },
                              { value: "3000000", label: "$ 3,000,000" },
                              { value: "3000001", label: "Above $ 3,000,000" },
                            ]}
                            onSelect={(value) =>
                              setFieldValue("max_rent", value)
                            }
                          />
                        </View>
                      </View>
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
                    <Text style={{ fontWeight: 500 }}>
                      Property size (sqft)
                    </Text>
                    <View className="flex-row justify-between items-start gap-3">
                      <View className="flex-1">
                        <FormikDropdownwithjson
                          title="Minimun"
                          placeholder="No Selection"
                          value={values.min_size}
                          touched={!!touched.min_size}
                          errors={!!errors.min_size}
                          required
                          errorText={errors.min_size}
                          options={[
                            { label: "No selection", value: "" },
                            { label: "less than 100", value: "0" },
                            { label: "100 sqft", value: "100" },
                            { label: "200 sqft", value: "200" },
                            { label: "300 sqft", value: "300" },
                            { label: "400 sqft", value: "400" },
                            { label: "500 sqft", value: "500" },
                            { label: "600 sqft", value: "600" },
                            { label: "700 sqft", value: "700" },
                            { label: "800 sqft", value: "800" },
                            { label: "900 sqft", value: "900" },
                            { label: "1000 sqft", value: "1000" },
                            { label: "1500 sqft", value: "1500" },
                            { label: "2000 sqft", value: "2000" },
                          ]}
                          onSelect={(value) => {
                            setFieldValue("min_size", value);
                          }}
                        />
                      </View>

                      <View className="flex-1">
                        <FormikDropdownwithjson
                          title="Maximun"
                          placeholder="No Selction"
                          value={values.max_size}
                          touched={!!touched.max_size}
                          errors={!!errors.max_size}
                          required
                          errorText={errors.max_size}
                          options={[
                            { label: "200 sqft", value: "200" },
                            { label: "300 sqft", value: "300" },
                            { label: "400 sqft", value: "400" },
                            { label: "500 sqft", value: "500" },
                            { label: "600 sqft", value: "600" },
                            { label: "700 sqft", value: "700" },
                            { label: "800 sqft", value: "800" },
                            { label: "900 sqft", value: "900" },
                            { label: "1000 sqft", value: "1000" },
                            { label: "1500 sqft", value: "1500" },
                            { label: "2000 sqft", value: "2000" },
                            { label: "more than 2000 sqft", value: "2000+" },
                          ]}
                          onSelect={(value) => setFieldValue("max_size", value)}
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
                        <FormikDropdownwithjson
                          title="Minimun"
                          placeholder="No Selection"
                          value={values.min_lot_size}
                          touched={!!touched.min_lot_size}
                          errors={!!errors.min_lot_size}
                          required
                          errorText={errors.min_lot_size}
                          options={[
                            { label: "No selection", value: "" },
                            { label: "less than 1 acre", value: "0" },
                            { label: "1 acre", value: "1" },
                            { label: "2 acres", value: "2" },
                            { label: "3 acres", value: "3" },
                            { label: "4 acres", value: "4" },
                            { label: "5 acres", value: "5" },
                          ]}
                          onSelect={(value) => {
                            setFieldValue("min_lot_size", value);
                          }}
                        />
                      </View>

                      <View className="flex-1">
                        <FormikDropdownwithjson
                          title="Maximun"
                          placeholder="No Selction"
                          value={values.max_lot_size}
                          touched={!!touched.max_lot_size}
                          errors={!!errors.max_lot_size}
                          required
                          errorText={errors.max_lot_size}
                          options={[
                            { label: "No selection", value: "" },
                            { label: "less than 1 acre", value: "0" },
                            { label: "1 acre", value: "1" },
                            { label: "2 acres", value: "2" },
                            { label: "3 acres", value: "3" },
                            { label: "4 acres", value: "4" },
                            { label: "5 acres", value: "5" },
                            { label: "more than 5 acres", value: "5+" },
                          ]}
                          onSelect={(value) =>
                            setFieldValue("max_lot_size", value)
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
                        <FormikDropdownwithjson
                          title="Minimun"
                          placeholder="No Selection"
                          value={values.min_age}
                          touched={!!touched.min_age}
                          errors={!!errors.min_age}
                          required
                          errorText={errors.min_age}
                          options={[
                            { label: "No selection", value: "" },
                            { label: "5 yrs", value: "5" },
                            { label: "10 yrs", value: "10" },
                            { label: "15 yrs", value: "15" },
                            { label: "20 yrs", value: "20" },
                            { label: "25 yrs", value: "25" },
                            { label: "30 yrs", value: "30" },
                            { label: "40 yrs", value: "40" },
                            { label: "50 yrs", value: "50" },
                          ]}
                          onSelect={(value) => {
                            setFieldValue("min_age", value);
                          }}
                        />
                      </View>

                      <View className="flex-1">
                        <FormikDropdownwithjson
                          title="Maximun"
                          placeholder="No Selction"
                          value={values.max_age}
                          touched={!!touched.max_age}
                          errors={!!errors.max_age}
                          required
                          errorText={errors.max_age}
                          options={[
                            { label: "No selection", value: "" },
                            { label: "5 yrs", value: "5" },
                            { label: "10 yrs", value: "10" },
                            { label: "15 yrs", value: "15" },
                            { label: "20 yrs", value: "20" },
                            { label: "25 yrs", value: "25" },
                            { label: "30 yrs", value: "30" },
                            { label: "40 yrs", value: "40" },
                            { label: "50 yrs", value: "50" },
                            { label: "more than 50 yrs", value: "50+" },
                          ]}
                          onSelect={(value) => setFieldValue("max_age", value)}
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
                    <View className="flex-row justify-between">
                      <TouchableOpacity
                        style={{
                          backgroundColor: Colors.light.lightGray,
                          borderRadius: ms(10),
                          paddingHorizontal: hs(10),
                          paddingVertical: vs(10),
                        }}
                      >
                        <Text
                          style={{
                            color: Colors.light.DarkGreen,
                            fontWeight: 500,
                          }}
                        >
                          Reset all filters
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                      onPress={()=>handleSubmit()}
                        style={{
                          backgroundColor: Colors.light.red,
                          borderRadius: ms(10),
                          paddingHorizontal: hs(20),
                          paddingVertical: vs(10),
                        }}
                      >
                        <Text style={{ color: "white", fontWeight: 500 }}>
                          Apply
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </View>
          <Loading text="Prefrence setting" isLoading={PropertyLoading}/>
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
                    user_id:user.id,
                  location: "",
                  zip: "",
                  state: "",
                  community_type: "",
                  community_status: "",
                  min_price: "",
                  max_price: "",
                }}
                            onSubmit={async (values) => {
  try {
    const result = await setCommunityPrefrence(values);

    if (result?.data?.success) {
      renderToastSuccess(result.data.message);
    } else {
      renderToastError(
        result?.data?.message || "Something went wrong"
      );
    }
  } catch (error) {
    renderToastError("Server error");
  }
}}
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
                      title="Locations"
                      value={values.location}
                      touched={!!touched.location}
                      errors={!!errors.location}
                      name="location"
                      zip="zip"
                      setValue={setFieldValue}
                      errorText={errors.location}
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
                      Community type
                    </Text>
                    <View
                      className="flex-row flex-wrap"
                      style={{ marginTop: vs(10), marginBottom: vs(20) }}
                    >
                      {/*  Residential */}
                      <View className="flex-row items-center">
                        <TouchableOpacity
                          onPress={() =>
                            toggleStatus(
                              "Residential",
                              values.community_type,
                              setFieldValue,
                              "community_type"
                            )
                          }
                        >
                          <MaterialIcons
                            size={18}
                            color={Colors.light.DarkGreen}
                            name={
                              values.community_type?.includes("Residential")
                                ? "check-box"
                                : "check-box-outline-blank"
                            }
                          />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: hs(5) }}> Residential</Text>
                      </View>

                      {/* Commercial */}
                      <View
                        className="flex-row items-center"
                        style={{ marginLeft: hs(20) }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            toggleStatus(
                              "Commercial",
                              values.community_type,
                              setFieldValue,
                              "community_type"
                            )
                          }
                        >
                          <MaterialIcons
                            size={18}
                            color={Colors.light.DarkGreen}
                            name={
                              values.community_type?.includes("Commercial")
                                ? "check-box"
                                : "check-box-outline-blank"
                            }
                          />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: hs(5) }}> Commercial</Text>
                      </View>

                      {/*  Mix */}
                      <View
                        className="flex-row items-center"
                        style={{ marginLeft: hs(20) }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            toggleStatus(
                              "Mix",
                              values.community_type,
                              setFieldValue,
                              "community_type"
                            )
                          }
                        >
                          <MaterialIcons
                            size={18}
                            color={Colors.light.DarkGreen}
                            name={
                              values.community_type?.includes("Mix")
                                ? "check-box"
                                : "check-box-outline-blank"
                            }
                          />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: hs(5) }}> Mix</Text>
                      </View>
                    </View>
                    {touched.community_type && errors.community_type && (
                      <Text style={{ color: Colors.light.red }}>
                        {errors.community_type}
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
                      className="flex-row flex-wrap"
                      style={{ marginTop: vs(10), marginBottom: vs(20) }}
                    >
                      {/* Completed */}
                      <View className="flex-row items-center">
                        <TouchableOpacity
                          onPress={() =>
                            toggleStatus(
                              "Completed",
                              values.community_status,
                              setFieldValue,
                              "community_status"
                            )
                          }
                        >
                          <MaterialIcons
                            size={18}
                            color={Colors.light.DarkGreen}
                            name={
                              values.community_status?.includes("Completed")
                                ? "check-box"
                                : "check-box-outline-blank"
                            }
                          />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: hs(5) }}> Completed</Text>
                      </View>

                      {/* Constructed */}
                      <View
                        className="flex-row items-center"
                        style={{ marginLeft: hs(20) }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            toggleStatus(
                              "Constructed",
                              values.community_status,
                              setFieldValue,
                              "community_status"
                            )
                          }
                        >
                          <MaterialIcons
                            size={18}
                            color={Colors.light.DarkGreen}
                            name={
                              values.community_status?.includes("Constructed")
                                ? "check-box"
                                : "check-box-outline-blank"
                            }
                          />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: hs(5) }}> Constructed</Text>
                      </View>

                      {/* Inplanning */}
                      <View
                        className="flex-row items-center"
                        style={{ marginLeft: hs(20) }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            toggleStatus(
                              "Inplanning",
                              values.community_status,
                              setFieldValue,
                              "community_status"
                            )
                          }
                        >
                          <MaterialIcons
                            size={18}
                            color={Colors.light.DarkGreen}
                            name={
                              values.community_status?.includes("Inplanning")
                                ? "check-box"
                                : "check-box-outline-blank"
                            }
                          />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: hs(5) }}> Inplanning</Text>
                      </View>
                    </View>

                    {/* Error */}
                    {touched.community_status && errors.community_status && (
                      <Text style={{ color: Colors.light.red }}>
                        {errors.community_status}
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
                    <Text style={{ fontWeight: 500 }}>Price Range</Text>
                    <View className="flex-row justify-between items-start gap-3">
                      <View className="flex-1">
                        <FormikDropdownwithjson
                          title="Minimun"
                          placeholder="No Selection"
                          value={values.min_price}
                          touched={!!touched.min_price}
                          errors={!!errors.min_price}
                          required
                          errorText={errors.min_price}
                          options={[
                            { label: "No selection", value: "" },
                            { label: "below $ 50,000", value: "0" },
                            { label: "$ 50,000", value: "50000" },
                            { label: "$ 70,000", value: "70000" },
                            { label: "$ 100,000", value: "100000" },
                            { label: "$ 120,000", value: "120000" },
                            { label: "$ 150,000", value: "150000" },
                            { label: "$ 175,000", value: "175000" },
                            { label: "$ 200,000", value: "200000" },
                            { label: "$ 250,000", value: "250000" },
                            { label: "$ 300,000", value: "300000" },
                            { label: "$ 350,000", value: "350000" },
                            { label: "$ 400,000", value: "400000" },
                            { label: "$ 500,000", value: "500000" },
                            { label: "$ 600,000", value: "600000" },
                            { label: "$ 700,000", value: "700000" },
                            { label: "$ 900,000", value: "900000" },
                            { label: "$ 1,000,000", value: "1000000" },
                            { label: "$ 1,200,000", value: "1200000" },
                            { label: "$ 1,500,000", value: "1500000" },
                            { label: "$ 2,000,000", value: "2000000" },
                            { label: "$ 3,000,000", value: "3000000" },
                          ]}
                          onSelect={(value) => {
                            setFieldValue("min_price", value);
                          }}
                        />
                      </View>

                      <View className="flex-1">
                        <FormikDropdownwithjson
                          title="Maximun"
                          placeholder="No Selction"
                          value={values.max_price}
                          touched={!!touched.max_price}
                          errors={!!errors.max_price}
                          required
                          errorText={errors.max_price}
                          options={[
                            { value: "", label: "No selection" },
                            { value: "50000", label: "$ 50,000" },
                            { value: "70000", label: "$ 70,000" },
                            { value: "100000", label: "$ 100,000" },
                            { value: "120000", label: "$ 120,000" },
                            { value: "150000", label: "$ 150,000" },
                            { value: "175000", label: "$ 175,000" },
                            { value: "200000", label: "$ 200,000" },
                            { value: "250000", label: "$ 250,000" },
                            { value: "300000", label: "$ 300,000" },
                            { value: "350000", label: "$ 350,000" },
                            { value: "400000", label: "$ 400,000" },
                            { value: "500000", label: "$ 500,000" },
                            { value: "600000", label: "$ 600,000" },
                            { value: "700000", label: "$ 700,000" },
                            { value: "900000", label: "$ 900,000" },
                            { value: "1000000", label: "$ 1,000,000" },
                            { value: "1200000", label: "$ 1,200,000" },
                            { value: "1500000", label: "$ 1,500,000" },
                            { value: "2000000", label: "$ 2,000,000" },
                            { value: "3000000", label: "$ 3,000,000" },
                            { value: "3000001", label: "Above $ 3,000,000" },
                          ]}
                          onSelect={(value) =>
                            setFieldValue("max_price", value)
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
                    <View className="flex-row justify-between">
                      <TouchableOpacity
                        style={{
                          backgroundColor: Colors.light.lightGray,
                          borderRadius: ms(10),
                          paddingHorizontal: hs(10),
                          paddingVertical: vs(10),
                        }}
                      >
                        <Text
                          style={{
                            color: Colors.light.DarkGreen,
                            fontWeight: 500,
                          }}
                        >
                          Reset all filters
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                      onPress={()=>{handleSubmit();console.log(errors)}}
                        style={{
                          backgroundColor: Colors.light.red,
                          borderRadius: ms(10),
                          paddingHorizontal: hs(20),
                          paddingVertical: vs(10),
                        }}
                      >
                        <Text style={{ color: "white", fontWeight: 500 }}>
                          Apply
                        </Text>
                      </TouchableOpacity>
                    </View>
                   
                  </>
                )}
              </Formik>
            </View>
          </View>
           <Loading isLoading={CommunityLoading} text="Setting Prefrence"/>
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
                  user_type:"",
                  user_id:user.id,
                }}
                                    onSubmit={async (values) => {
  try {
    const result = await setConnectionPrefrence(values);

    if (result?.data?.success) {
      renderToastSuccess(result.data.message);
    } else {
      renderToastError(
        result?.data?.message || "Something went wrong"
      );
    }
  } catch (error) {
    renderToastError("Server error");
  }
}}
                validationSchema={connectionPreferenceSchema}
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
                      title="Locations"
                      value={values.location}
                      touched={!!touched.location}
                      errors={!!errors.location}
                      name="location"
                      zip="zip"
                      setValue={setFieldValue}
                      errorText={errors.location}
                      placeholder="Please enter City, State or Zip code"
                    />
                    <Text style={{ width: hs(250), marginTop: vs(10),fontWeight:600,fontSize:ms(18) }}>
                      Property for
                    </Text>
                   <View
                      className=" "
                      style={{  marginTop:vs(10),marginBottom: vs(20) }}
                    >
                      {/*  Electricians */}
                      <View className="flex-row items-center"    style={{ marginLeft: hs(20),marginVertical:vs(5) }}>
                        <TouchableOpacity
                          onPress={() =>
                            toggleStatus(
                              "electrician",
                              values.user_type,
                              setFieldValue,
                              "user_type"
                            )
                          }
                        >
                          <MaterialIcons
                            size={18}
                            color={Colors.light.DarkGreen}
                            name={
                              values.user_type?.includes("electrician")
                                ? "check-box"
                                : "check-box-outline-blank"
                            }
                          />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: hs(5),fontSize:ms(15) }}> Electricians</Text>
                      </View>

                      {/* Builder */}
                      <View
                        className="flex-row items-center"
                        style={{ marginLeft: hs(20),marginVertical:vs(5) }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            toggleStatus(
                              "builder",
                              values.user_type,
                              setFieldValue,
                              "user_type"
                            )
                          }
                        >
                          <MaterialIcons
                            size={18}
                            color={Colors.light.DarkGreen}
                            name={
                              values.user_type?.includes("builder")
                                ? "check-box"
                                : "check-box-outline-blank"
                            }
                          />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: hs(5),fontSize:ms(15) }}> Builder</Text>
                      </View>

                      {/*  Property agents */}
                      <View
                        className="flex-row items-center"
                        style={{ marginLeft: hs(20),marginVertical:vs(5) }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            toggleStatus(
                              "agent",
                              values.user_type,
                              setFieldValue,
                              "user_type"
                            )
                          }
                        >
                          <MaterialIcons
                            size={18}
                            color={Colors.light.DarkGreen}
                            name={
                              values.user_type?.includes("agent")
                                ? "check-box"
                                : "check-box-outline-blank"
                            }
                          />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: hs(5),fontSize:ms(15) }}> Property agents</Text>
                      </View>
                       {/*  Plumbers */}
                      <View
                        className="flex-row items-center"
                        style={{ marginLeft: hs(20),marginVertical:vs(5) }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            toggleStatus(
                              "plumber",
                              values.user_type,
                              setFieldValue,
                              "user_type"
                            )
                          }
                        >
                          <MaterialIcons
                            size={18}
                            color={Colors.light.DarkGreen}
                            name={
                              values.user_type?.includes("plumber")
                                ? "check-box"
                                : "check-box-outline-blank"
                            }
                          />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: hs(5),fontSize:ms(15) }}> Plumbers</Text>
                      </View>
                       {/*  Mortgage */}
                      <View
                        className="flex-row items-center"
                        style={{ marginLeft: hs(20),marginVertical:vs(5) }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            toggleStatus(
                              "mortgage",
                              values.user_type,
                              setFieldValue,
                              "user_type"
                            )
                          }
                        >
                          <MaterialIcons
                            size={18}
                            color={Colors.light.DarkGreen}
                            name={
                              values.user_type?.includes("mortgage")
                                ? "check-box"
                                : "check-box-outline-blank"
                            }
                          />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: hs(5),fontSize:ms(15) }}> Mortgage Advisors</Text>
                      </View>
                        {/*  Decors */}
                      <View
                        className="flex-row items-center"
                        style={{ marginLeft: hs(20),marginVertical:vs(5) }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            toggleStatus(
                              "decor",
                              values.user_type,
                              setFieldValue,
                              "user_type"
                            )
                          }
                        >
                          <MaterialIcons
                            size={18}
                            color={Colors.light.DarkGreen}
                            name={
                              values.user_type?.includes("decor")
                                ? "check-box"
                                : "check-box-outline-blank"
                            }
                          />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: hs(5),fontSize:ms(15) }}> Decors</Text>
                      </View>
                         {/*  Painters */}
                      <View
                        className="flex-row items-center"
                        style={{ marginLeft: hs(20),marginVertical:vs(5) }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            toggleStatus(
                              "painter",
                              values.user_type,
                              setFieldValue,
                              "user_type"
                            )
                          }
                        >
                          <MaterialIcons
                            size={18}
                            color={Colors.light.DarkGreen}
                            name={
                              values.user_type?.includes("painter")
                                ? "check-box"
                                : "check-box-outline-blank"
                            }
                          />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: hs(5),fontSize:ms(15) }}> Painters</Text>
                      </View>
                         {/*  Investors */}
                      <View
                        className="flex-row items-center"
                        style={{ marginLeft: hs(20),marginVertical:vs(5) }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            toggleStatus(
                              "investor",
                              values.user_type,
                              setFieldValue,
                              "user_type"
                            )
                          }
                        >
                          <MaterialIcons
                            size={18}
                            color={Colors.light.DarkGreen}
                            name={
                              values.user_type?.includes("investor")
                                ? "check-box"
                                : "check-box-outline-blank"
                            }
                          />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: hs(5),fontSize:ms(15) }}> Investors</Text>
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
                    <View className="flex-row justify-between">
                      <TouchableOpacity
                        style={{
                          backgroundColor: Colors.light.lightGray,
                          borderRadius: ms(10),
                          paddingHorizontal: hs(10),
                          paddingVertical: vs(10),
                        }}
                      >
                        <Text
                          style={{
                            color: Colors.light.DarkGreen,
                            fontWeight: 500,
                          }}
                        >
                          Reset all filters
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                      onPress={()=>{handleSubmit();console.log(errors)}}
                        style={{
                          backgroundColor: Colors.light.red,
                          borderRadius: ms(10),
                          paddingHorizontal: hs(20),
                          paddingVertical: vs(10),
                        }}
                      >
                        <Text style={{ color: "white", fontWeight: 500 }}>
                          Apply
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </View>
          <Loading isLoading={ConnectionLoading} text="Setting Prefrence ..."/>
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
    borderRadius: ms(20),
    paddingHorizontal: hs(10),
    paddingVertical: vs(20),
    marginBottom: vs(10),
  },
});
