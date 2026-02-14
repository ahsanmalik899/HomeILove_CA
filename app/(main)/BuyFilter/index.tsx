import BuyAll from "@assets/icons/buy-all.svg";
import Constructed from "@assets/icons/newly-constructed.svg";
import Renovated from "@assets/icons/newly-renovated.svg";
import ReducePrice from "@assets/icons/price.svg";
import { FormikDropdownwithjson } from "@src/components/globals/FormikDropdownwithjson/indes";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import QuickSerchCard from "@src/components/globals/QuickSerchCard";
import SerchBar from "@src/components/globals/SerchBar";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
interface BuyListing {
  mainHeading: String;
  redText: String;
  endText: String;
  subHeading: String;
  Picture: React.FC;
}
const index = () => {
  const { type, property_for } = useLocalSearchParams();
  let dataBuy: BuyListing = {
    mainHeading: "",
    redText: "",
    endText: "",
    subHeading: "",
    Picture: BuyAll,
  };

  switch (type) {
    case "House":
      dataBuy = {
        mainHeading: "Helping homers to find their \n",
        redText: "LOVED",
        endText: " home",
        subHeading: `Home for ${property_for}`,
        Picture: BuyAll,
      };
      break;
    case "Re-Built":
      dataBuy = {
        mainHeading: "Rebuilt homes that ",
        redText: "INSPIRES \n",
        endText: "economical homing",
        subHeading: "Re-built for sale",
        Picture: BuyAll,
      };
      break;
    case "Foreclosure":
      dataBuy = {
        mainHeading: "Search below market ",
        redText: "FORCLOSURE\n",
        endText: "Properties",
        subHeading: "Foreclosure for sale",
        Picture: BuyAll,
      };
      break;
    case "Farms/Lands":
      dataBuy = {
        mainHeading: "Explore the Latest UK ",
        redText: "FARMS & \nLANDS ",
        endText: "to buy",
        subHeading: "Forms & Lands for sale",
        Picture: BuyAll,
      };
      break;
    case "Commercial":
      dataBuy = {
        mainHeading: "Explore new opportunities through\nour ",
        redText: "COMMERCIALS",
        endText: "",
        subHeading: `Commercial for  ${property_for}`,
        Picture: BuyAll,
      };
      break;
    case "Retirement":
      dataBuy = {
        mainHeading: "Assisted and friendly homing with our Loved ",
        redText: "RETIREMENT RESIDENCES",
        endText: "",
        subHeading: "Retirement Property for sale",
        Picture: BuyAll,
      };
      break;
  }
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
  const quickSearchSaleData = [
    {
      id: "1",
      image: ReducePrice,
      text: "Reduced Price",
      params: { saleprice_type: "Reduced Price" },
    },
    {
      id: "2",
      image: Renovated,
      text: "Newly renovated",
      params: { condition: "Total Re-build" },
    },
    {
      id: "3",
      image: Constructed,
      text: "Newly Constructed",
      params: { condition: "Newly build" },
    },
  ];
  const quickSearchRentData = [
    {
      id: "1",
      image: ReducePrice,
      text: "Below 2K",
      params: { max_rent_range: "2000" },
    },
    {
      id: "2",
      image: Renovated,
      text: "Pet Ok",
      params: { pet_allowers: "Yes" },
    },
    {
      id: "3",
      image: Constructed,
      text: "Vacant Now",
      params: { aivilable_on: "Vacant now" },
    },
  ];

  const options =
    type && propertyOptions[type as keyof typeof propertyOptions]
      ? propertyOptions[type as keyof typeof propertyOptions]
      : [];
  const [propertysubType, setPropertysubType] = useState<string[]>([]);
  const [propertyType, setPropertyType] = useState(type.toString());
  const [address, setaddress] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [radius, setRadius] = useState("");
  const quickSearchData =
    property_for === "rent" ? quickSearchRentData : quickSearchSaleData;
  const togglePropertySubType = (option: string) => {
    setPropertysubType((prev) => {
       if (option === "All") return ["All"]; 
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option); // remove
      } else {
        return [...prev, option]; // add
      }
    });
  };

  return (
    <View className="bg-white flex-1 ">
      <HeaderWithBack />
      <View style={{ marginHorizontal: hs(20) }}>
        <Text style={styles.mainHeading}>
          {dataBuy.mainHeading}
          <Text style={{ color: Colors.light.red }}>{dataBuy.redText}</Text>
          {dataBuy.endText}
        </Text>
        <Text style={styles.subHeading}>{dataBuy.subHeading}</Text>
        <SerchBar
          setAddress={setaddress}
          setCity={setCity}
          setLat={setLat}
          setLng={setLng}
          setState={setState}
          setZip={setZip}
          onpress={() => {
            router.navigate({
              pathname: "/BuyListing",
              params: {
                address: address,
                city: city,
                zip: zip || "",
                lat: lat?.toString(),
                lng: lng?.toString(),
                propertyType: propertyType,
                propertysubType: propertysubType,
                stateCode: state,
                radius: radius,
                property_for: property_for,
              },
            });
          }}
          value={address}
          latValue={lat}
          longValue={lng}
        />
        <View>
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
            onSelect={(val) => {
              setRadius(val);
            }}
            setValue={setRadius}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            {options.map((option) => {
              const isSelected = propertysubType.includes(option);

              return (
                <TouchableOpacity
                  key={option}
                  onPress={() => togglePropertySubType(option)}
                  style={{
                    padding: 8,
                    borderRadius: 5,
                    paddingHorizontal: hs(10),
                    paddingVertical: vs(10),
                    backgroundColor: isSelected
                      ? Colors.light.DarkGreen
                      : "lightgray",
                  }}
                >
                  <Text style={{ color: isSelected ? "white" : "black" }}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View
          style={{
            height: vs(1),
            marginTop: vs(20),

            backgroundColor: Colors.light.textGray,
            opacity: 0.2,
          }}
        />
        <Text
          style={{
            fontSize: ms(20),
            fontWeight: 500,
            marginBottom: vs(10),
            textAlign: "center",
          }}
        >
          Quickly search your{" "}
          <Text style={{ color: Colors.light.red, marginBottom: vs(20) }}>
            dream
          </Text>{" "}
          living
        </Text>
      </View>
      <FlatList
        data={quickSearchData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <QuickSerchCard
            Image={item.image}
            text={item.text}
            onPress={() => {
              router.navigate({
                pathname: "/BuyListing",
                params: {
                  ...item.params,
                  property_for: property_for,
                },
              });
            }}
          />
        )}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  mainHeading: {
    marginTop: vs(20),
    fontSize: ms(20),
    fontWeight: 500,
  },
  subHeading: {
    marginTop: vs(20),
    fontSize: ms(20),
    marginBottom: vs(10),
    fontWeight: 500,
  },
});
