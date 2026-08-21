import { useGetTrendingProfilesQuery } from "@/store/api/user/MainApi";
import BuyAll from "@assets/icons/buy-all.svg";
import { FormikDropdownwithjson } from "@src/components/globals/FormikDropdownwithjson";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LeadingList from "@src/components/globals/LeadingList";
import SerchBar from "@src/components/globals/SerchBar";
import { SearchDeveloper } from "@src/components/globals/SerchDeveloper";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HomeListing {
  mainHeading: string;
  redText: string;
  endText: string;
  subHeading: string;
  Picture: React.FC;
}

const Index = () => {
  const { type, condition } = useLocalSearchParams();
  const [estateType, setestateType] = useState<string[]>(["All"]);
  const [address, setaddress] = useState("");
  const [name, setname] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [radius, setRadius] = useState("");

  let dataBuy: HomeListing = {
    mainHeading: "",
    redText: "",
    endText: "",
    subHeading: "",
    Picture: BuyAll,
  };

  const { data: profileList, isLoading, isFetching } = useGetTrendingProfilesQuery({ type: "builder" });

  const togglePropertySubType = (option: string) => {
    setestateType((prev) => {
      if (option === "All") return ["All"];
      const filtered = prev.filter((item) => item !== "All");
      if (filtered.includes(option)) return filtered.filter((item) => item !== option);
      return [...filtered, option];
    });
  };

  switch (type) {
    case "New Home":
      dataBuy = {
        mainHeading: "Get inspired & in love\nwith ",
        redText: "NEW",
        endText: "  built",
        subHeading: "New Housing For Sale",
        Picture: BuyAll,
      };
      break;
    case "Communities":
      dataBuy = {
        mainHeading: "Get romantic with ",
        redText: "NEW \n",
        endText: "community",
        subHeading: "New Housing Communities",
        Picture: BuyAll,
      };
      break;
  }

  return (
    <View style={{ flex: 1, backgroundColor:'white' }}>
      <HeaderWithBack />
      <ScrollView contentContainerStyle={{ paddingBottom: vs(10) }}>
        <View style={{ marginHorizontal: hs(20), marginTop: vs(10) }}>
          {/* Main Heading */}
          <Text style={styles.mainHeading}>
            {dataBuy.mainHeading}
            <Text style={{ color: Colors.light.red,fontFamily: "PopinRegula", }}>{dataBuy.redText}</Text>
            {dataBuy.endText}
          </Text>
          <Text style={styles.subHeading}>{dataBuy.subHeading}</Text>

          {/* Search Bar */}
          <View style={{ marginVertical: vs(10), }}>
            <SerchBar
              setAddress={setaddress}
              setCity={setCity}
              setLat={setLat}
              setLng={setLng}
              setState={setState}
              setZip={setZip}
              onpress={() =>
                router.navigate({
                  pathname: type === "New Home" ? "/BuyListing" : "/CommunitesLising",
                  params: {
                    address,
                    city,
                    zip: zip || "",
                    lat: lat?.toString(),
                    lng: lng?.toString(),
                    estateType,
                    stateCode: state,
                    radius,
                    name,
                    property_for: "sale",
                    condition,
                  },
                })
              }
              value={address}
              latValue={lat}
              longValue={lng}
            />
          </View>

          {/* Radius Dropdown */}
          <View style={{ marginVertical: vs(10) }}>
            <FormikDropdownwithjson
              title={""}
              placeholder={"Radius (miles)"}
              value={radius}
              options={[
                { label: "Radius (miles)", value: "0" },
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
              onSelect={(val) => setRadius(val)}
              setValue={setRadius}
            />
          </View>

          {/* Communities Subtype Selection */}
          {type === "Communities" && (
            <View style={{ marginTop: vs(15) }}>
              <View style={styles.subTypeContainer}>
                {["All", "Residential", "Commercial", "Mix"].map((option) => {
                  const isSelected = estateType.includes(option);
                  return (
                    <TouchableOpacity
                     activeOpacity={1}
                      key={option}
                      onPress={() => togglePropertySubType(option)}
                      style={[
                        styles.subTypeButton,
                        { backgroundColor: isSelected ? Colors.light.DarkGreen : "#E0E0E0" },
                      ]}
                    >
                      <Text style={{ color: isSelected ? "white" : "black", fontWeight: "500",fontFamily: "PopinRegula", }}>{option}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* OR Divider */}
              <View style={styles.orDivider}>
                <View style={styles.line} />
                <Text style={styles.orText}>OR</Text>
                <View style={styles.line} />
              </View>

              {/* Developer Search */}
              <SearchDeveloper
                onSelect={(val) => {
                  setname(val.name);
                  setCity("");
                  setLat(0);
                  setLng(0);
                  setRadius("");
                  setState("");
                  setZip("");
                  setaddress("");
                }}
                value={name}
              />
            </View>
          )}

          {/* Leading Developers */}
          <Text style={styles.sectionHeading}>
            Leading <Text style={{ color: Colors.light.red ,fontFamily: "PopinRegula",}}>DEVELOPERS</Text>
          </Text>
          <LeadingList data={profileList?.data}  isFetching={isFetching} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  mainHeading: {
    fontSize: ms(20),
    fontWeight: "700",
    lineHeight: vs(28),
    color: "#222",
    fontFamily: "PopinRegula",
  },
  subHeading: {
    fontSize: ms(16),
    fontWeight: "500",
    color: "#555",
    fontFamily: "PopinRegula",
  },
  sectionHeading: {
    fontSize: ms(20),
    fontWeight: "700",
    marginTop: vs(10),
    color: "#222",
    fontFamily: "PopinRegula",
  },
  subTypeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: hs(10),
  },
  subTypeButton: {
    paddingVertical: vs(8),
    paddingHorizontal: hs(12),
    borderRadius: 8,
  },
  orDivider: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: vs(10),
  },
  orText: {
    marginHorizontal: hs(10),
    color: "#555",
    fontWeight: "500",
    fontFamily: "PopinRegula",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#CCC",
  },
});
