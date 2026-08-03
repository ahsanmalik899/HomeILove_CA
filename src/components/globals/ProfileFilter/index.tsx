import Cross from "@assets/CreateProfile/cross.svg";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FormikDropdownwithjson } from "../FormikDropdownwithjson";
import LargeButton from "../LaregeButton";
import SerchBar from "../SerchBar";
import { SearchProfile } from "../SerchProfile";
import { filtertype } from "./type";
const index = ({
  errors,
  handleSubmit,
  resetForm,
  setFieldValue,
  touched,
  values,
  setshowFilter,
  setAddress,
  setCity,
  setLat,
  setLng,
  setState,
  setZip,
  onpress,
  value,
  latValue,
  longValue,
  name,
  setname,
  type,
}: filtertype) => {
  const toggleValue = (
    field: string,
    value: string,
    values: any,
    setFieldValue: any
  ) => {
    const current = values[field] || [];

    if (value === "All") {
      setFieldValue(field, ["All"]);
      return;
    }

    const filtered = current.filter((v: string) => v !== "All");

    if (filtered.includes(value)) {
      setFieldValue(
        field,
        filtered.filter((v: string) => v !== value)
      );
    } else {
      setFieldValue(field, [...filtered, value]);
    }
  };

  const [cardshow, setcardShow] = useState("");
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.light.lightGray,
          alignSelf: "flex-end",
          borderRadius: ms(20),
          paddingHorizontal: hs(2),
          paddingVertical: vs(2),
          marginTop: vs(40),
        }}
        onPress={() => setshowFilter(false)}
      >
        <Cross />
      </TouchableOpacity>
      <Text
        style={{
          alignSelf: "center",
          fontWeight: 700,
          fontFamily: "PopinRegula",
          fontSize: ms(15),
          marginBottom: vs(20),
          
        }}
      >
        Filter
      </Text>

      <SerchBar
        setAddress={setAddress}
        setCity={setCity}
        setLat={setLat}
        setLng={setLng}
        setState={setState}
        setZip={setZip}
        onpress={() => {
          handleSubmit();
        }}
        latValue={latValue}
        longValue={longValue}
        value={value.toString()}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
         
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
           <SearchProfile
            onSelect={(val) => {
              setname(val.business_name);
              setCity("");
              setLat(0);
              setLng(0);
              setState("");
              setZip("");
              setAddress("");
              setFieldValue("radius", "");
            } }
            value={name} type={type}          />
        </View>
        <View>
         
        
        

         
          <View
            style={{
              height: vs(1),
              marginTop: vs(20),

              backgroundColor: Colors.light.textGray,
              opacity: 0.2,
            }}
          />
       

         
        </View>

        <LargeButton
  handleSubmit={() => {

    const empty = {
      radius: "",
    };

    resetForm({ values: empty });

    setname("");
    setAddress("");
    setCity("");
    setLat(0);
    setLng(0);
    setState("");
    setZip("");
  }}
  text="Reset Values"
/>

      </ScrollView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  card: {
    position: "absolute",

    top: vs(0),
    bottom: vs(0),
    left: hs(0),
    right: hs(0),
    paddingHorizontal: hs(20),
    backgroundColor: "#fff",
    borderRadius: ms(5),
    paddingBottom: vs(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    zIndex: 100,
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
