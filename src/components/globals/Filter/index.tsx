import { default as Bedroom, default as Price } from "@assets/Buy/bedrooms.svg";
import More from "@assets/Buy/more.svg";
import Condition from "@assets/Buy/propertycondition.svg";
import PropertyTypee from "@assets/Buy/proprtyType.svg";
import Cross from "@assets/CreateProfile/cross.svg";
import PropertyType from "@src/components/globals/PropertyType";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FormikDropdown } from "../FormikDropdown/indes";
import { FormikDropdownwithjson } from "../FormikDropdownwithjson";
import LargeButton from "../LaregeButton";
import { filtertype } from "./type";
const index = ({
  errors,
  handleSubmit,
  resetForm,
  setFieldValue,
  touched,
  values,
  setFieldTouched,
  setshowFilter,
}: filtertype) => {
  const propertyConditions = [
    { label: "Newly build / new home", value: "Newly build" },
    { label: "Total Re-build", value: "Total Re-build" },
    { label: "Partial Re-build", value: "Partial Re-build" },
    { label: "Good condition", value: "Good condition" },
    { label: "Moderate", value: "Moderate" },
    { label: "Need Repairs", value: "Need Repairs" },
  ];

  const propertyOptions = {
    House: [
      "All",
      "Detached house",
      "Semi-detached house",
      "Town house Condo",
      "Bungalow Co-op",
      "Flats/ Apartments Condop",
      "Penthouse",
      "Park homes",
      "Others",
    ],
    Commercial: [
      "All",
      "Office",
      "Office workspace",
      "Retail properties",
      "Leisure / Hospitality",
      "Others",
    ],
    "Farms/Lands": [
      "All",
      "Land",
      "Commercial development",
      "Industrial development",
      "Farms",
      "Residential development",
    ],
  };
  const options =
    values.propertyType &&
    propertyOptions[values.propertyType as keyof typeof propertyOptions]
      ? propertyOptions[values.propertyType as keyof typeof propertyOptions]
      : [];
  const [cardshow, setcardShow] = useState("");
  return (
    <View>
      {cardshow === "" && (
        <View style={styles.card}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.light.lightGray,
              alignSelf: "flex-end",
              borderRadius: ms(20),
              paddingHorizontal: hs(2),
              paddingVertical: vs(2),
              marginTop: vs(5),
            }}
            onPress={() => setshowFilter(false)}
          >
            <Cross />
          </TouchableOpacity>
          <Text style={{ fontWeight: 600, alignSelf: "center" }}>Filter</Text>
          <View className="mt-3">
            <FormikDropdownwithjson
              title={""}
              placeholder={"Radius (miles)"}
              value={values.radius}
              options={[
                { label: "1 mile", value: "1" },
                { label: "5 miles", value: "5" },
                { label: "10 miles", value: "10" },
                { label: "20 miles", value: "20" },
                { label: "30 miles", value: "30" },
                { label: "40 miles", value: "40" },
                { label: "50 miles", value: "50" },
              ]}
              name="radius"
              touched={false}
              errors={false}
              errorText={""}
              onSelect={(val) => {}}
              setValue={setFieldValue}
            />
          </View>
          <View className="flex-row justify-between mt-4">
            <TouchableOpacity
              style={styles.Smallcard}
              onPress={() => setcardShow("Property Type")}
            >
              <PropertyTypee />
              <Text>Property Type</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.Smallcard}
              onPress={() => setcardShow("Condition")}
            >
              <Condition />
              <Text>Condition</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.Smallcard}
              onPress={() => setcardShow("Bedrooms")}
            >
              <Bedroom />
              <Text>Bedrooms</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center justify-center gap-3 mt-4 mb-4">
            <TouchableOpacity
              style={styles.Smallcard}
              onPress={() => setcardShow("Price")}
            >
              <Price />
              <Text>Price</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.Smallcard}
              onPress={() => setcardShow("More")}
            >
              <More />
              <Text>More</Text>
            </TouchableOpacity>
          </View>
          <LargeButton
            handleSubmit={() => {
              handleSubmit();
            }}
            text="Done"
          />
        </View>
      )}
      {cardshow === "Property Type" && (
        <View>
          <Text
            style={{
              fontWeight: 600,
              alignSelf: "center",
              marginVertical: vs(10),
            }}
          >
            Search Properties
          </Text>
          <PropertyType
            onPress={(value) => {
              setFieldValue("propertyType", value);
              setFieldValue("propertysubType", "All");
            }}
            value={values.propertyType}
            errorText={""}
          />
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 10,
              marginTop: vs(10),
            }}
          >
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => setFieldValue("propertysubType", option)}
                style={{
                  padding: 8,
                  borderRadius: 5,
                  paddingHorizontal: hs(10),
                  paddingVertical: vs(10),
                  backgroundColor:
                    values.propertysubType === option
                      ? Colors.light.DarkGreen
                      : "lightgray",
                }}
              >
                <Text
                  style={{
                    color:
                      values.propertysubType === option ? "white" : "black",
                  }}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="flex-row justify-between items-center mt-4">
            <TouchableOpacity>
              <Text style={{ fontWeight: 600 }}>Clear Selections</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingHorizontal: hs(20),
                paddingVertical: vs(10),
                backgroundColor: Colors.light.DarkGreen,
                borderRadius: ms(8),
              }}
              onPress={() => setcardShow("")}
            >
              <Text style={{ color: "white" }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {cardshow === "Condition" && (
        <View style={styles.card}>
          <Text
            style={{
              fontWeight: 600,
              alignSelf: "center",
              marginVertical: vs(10),
            }}
          >
            Condition
          </Text>
          {propertyConditions.map((item) => (
            <TouchableOpacity
              key={item.value}
              onPress={() => setFieldValue("propertyCondition", item.value)}
              style={{
                padding: 8,
                borderRadius: 5,
                marginVertical: vs(5),
                paddingHorizontal: hs(10),
                paddingVertical: vs(10),
                backgroundColor:
                  values.propertyCondition === item.value
                    ? Colors.light.DarkGreen
                    : "lightgray",
              }}
            >
              <Text
                style={{
                  color:
                    values.propertyCondition === item.value ? "white" : "black",
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}

          <View className="flex-row justify-between items-center mt-4">
            <TouchableOpacity
              onPress={() => setFieldValue("propertyCondition", "")}
            >
              <Text style={{ fontWeight: 600 }}>Clear Selections</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingHorizontal: hs(20),
                paddingVertical: vs(10),
                backgroundColor: Colors.light.DarkGreen,
                borderRadius: ms(8),
              }}
              onPress={() => setcardShow("")}
            >
              <Text style={{ color: "white" }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {cardshow === "Bedrooms" && (
        <View style={styles.card}>
          <View>
            <FormikDropdown
              onSelect={() => {}}
              options={[
                "Studio",
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "10+",
              ]}
              title="Minimum Beds"
              name="minBed"
              setValue={setFieldValue}
              placeholder="Beds"
              value={values.minBed}
              touched={!!touched.minBed}
              errors={!!errors.minBed}
              required
              errorText={errors.minBed}
            
            />
          </View>
          <View>
            <FormikDropdown
              onSelect={() => {}}
              options={[
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "10+",
              ]}
              title="Maximum Beds"
              placeholder="Beds"
              name="maxBed"
              setValue={setFieldValue}
              value={values.maxBed}
              touched={!!touched.maxBed}
              errors={!!errors.maxBed}
              required
              errorText={errors.maxBed}
            />
          </View>
          <View className="flex-row justify-between items-center mt-4">
            <TouchableOpacity
              onPress={() => {
                setFieldValue("maxBed", "");
                setFieldValue("minBed", "");
              }}
            >
              <Text style={{ fontWeight: 600 }}>Clear Selections</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingHorizontal: hs(20),
                paddingVertical: vs(10),
                backgroundColor: Colors.light.DarkGreen,
                borderRadius: ms(8),
              }}
              onPress={async () => {
                setFieldTouched("minBed", true);
                setFieldTouched("maxBed", true);

                if (!errors.minBed && !errors.maxBed) {
                  setcardShow("");
                }
              }}
            >
              <Text style={{ color: "white" }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {cardshow === "Price" && (
        <View style={styles.card}>
          <View>
            <FormikDropdownwithjson
              title="Minimun"
              placeholder="No Selection"
              value={values.minPrice}
              touched={!!touched.minPrice}
              errors={!!errors.minPrice}
              required
              errorText={errors.minPrice}
              options={[
               
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
                setFieldValue("minPrice", value);
              }}
            />
          </View>

          <View>
            <FormikDropdownwithjson
              title="Maximun"
              placeholder="No Selction"
              value={values.maxPrice}
              touched={!!touched.maxPrice}
              errors={!!errors.maxPrice}
              required
              errorText={errors.maxPrice}
              options={[
             
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
              onSelect={(value) => setFieldValue("maxPrice", value)}
            />
          </View>
          <View className="flex-row justify-between items-center mt-4">
            <TouchableOpacity
              onPress={() => {
                setFieldValue("minPrice", "");
                setFieldValue("maxPrice", "");
             
              }}
            >
              <Text style={{ fontWeight: 600 }}>Clear Selections</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingHorizontal: hs(20),
                paddingVertical: vs(10),
                backgroundColor: Colors.light.DarkGreen,
                borderRadius: ms(8),
              }}
              onPress={async () => {
                setFieldTouched("minPrice", true);
                setFieldTouched("maxPrice", true);

                if (!errors.minPrice && !errors.maxPrice) {
                  setcardShow("");
                }
              }}
            >
              <Text style={{ color: "white" }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {cardshow === "More" && (
        <View style={styles.card}>
          <Text
            style={{
              fontWeight: "600",
              textAlign: "center",
              marginVertical: vs(10),
            }}
          >
            Bathrooms
          </Text>

          <View style={styles.counterRow}>
            <TouchableOpacity
              style={styles.counterBtn}
              onPress={() => {
                const current = Number(values.bathrooms || 0);
                if (current > 0) {
                  setFieldValue("bathrooms", String(current - 1));
                }
              }}
            >
              <Text style={styles.counterText}>−</Text>
            </TouchableOpacity>

            <View style={styles.counterValue}>
              <Text style={styles.counterNumber}>{values.bathrooms || 0}</Text>
            </View>

            <TouchableOpacity
              style={styles.counterBtn}
              onPress={() => {
                const current = Number(values.bathrooms || 0);
                setFieldValue("bathrooms", String(current + 1));
              }}
            >
              <Text style={styles.counterText}>＋</Text>
            </TouchableOpacity>
          </View>
          <LargeButton
            handleSubmit={() => setFieldValue("bathrooms", "")}
            text="Reset"
          />
            <Text
            style={{
              fontWeight: "600",
              textAlign: "center",
              marginVertical: vs(10),
            }}
          >
            Tenure
          </Text>
   <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "space-between" }}>
  {[
    "Freehold",
    "Leasehold",
    "Joint ownership",
    "Commonhold", 
    "Others",
  ].map((option) => (
    <TouchableOpacity
      key={option}
      onPress={() => setFieldValue("tenure", option)}
      style={{
        width: "48%", // two per row
        padding: 8,
        borderRadius: 5,
        marginVertical: vs(5),
        backgroundColor:
          values.tenure === option
            ? Colors.light.DarkGreen
            : "lightgray",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: values.tenure === option ? "white" : "black",
        }}
      >
        {option === "Commonhold" ? "Under Construction" : option}
      </Text>
    </TouchableOpacity>
  ))}
</View>

          <View className="flex-row justify-between items-center mt-6">
            <TouchableOpacity
              onPress={() => {
                setFieldValue("bathrooms", "");
                setFieldValue("tenure", "");
              }}
            >
              <Text style={{ fontWeight: 600 }}>Clear Selections</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setcardShow("")}
              style={{
                paddingHorizontal: hs(20),
                paddingVertical: vs(10),
                backgroundColor: Colors.light.DarkGreen,
                borderRadius: ms(8),
              }}
            >
              <Text style={{ color: "white" }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: hs(5),
    width: hs(330),
    backgroundColor: "#fff",
    borderRadius: ms(5),
    paddingBottom: vs(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  Smallcard: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: ms(5),
    width: hs(100),
    paddingHorizontal: hs(3),
    paddingVertical: vs(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  counterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: vs(20),
  },

  counterBtn: {
    width: hs(40),
    height: hs(40),
    borderRadius: hs(10),
    backgroundColor: Colors.light.DarkGreen,
    alignItems: "center",
    justifyContent: "center",
  },

  counterText: {
    fontSize: ms(28),
    fontWeight: "600",
    color: "white",
  },

  counterValue: {
    width: hs(80),
    alignItems: "center",
    justifyContent: "center",
  },

  counterNumber: {
    fontSize: ms(24),
    fontWeight: "700",
  },
});
