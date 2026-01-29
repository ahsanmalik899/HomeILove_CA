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
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
interface BuyListing {
  mainHeading: String;
  redText: String;
  endText: String;
  subHeading: String;
  Picture: React.FC;
}
const index = () => {
  const { type,property_for } = useLocalSearchParams();
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
  const options =
    type && propertyOptions[type as keyof typeof propertyOptions]
      ? propertyOptions[type as keyof typeof propertyOptions]
      : [];
  const [propertysubType, setPropertysubType] = useState<string>("All");
  const [propertyType, setPropertyType] = useState(type.toString());
  const [address, setaddress] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [radius, setRadius] = useState("");
  return (
    <ScrollView>
      <View className="bg-white flex-1 pb-5">
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
                  property_for:property_for,
                },
              });
            }}
            value={address}
            latValue={lat}
            longValue={lng}
          />
          <View className="flex-1 mt-3">
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
              {options.map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => setPropertysubType(option)}
                  style={{
                    padding: 8,
                    borderRadius: 5,
                    paddingHorizontal: hs(10),
                    paddingVertical: vs(10),
                    backgroundColor:
                      propertysubType === option
                        ? Colors.light.DarkGreen
                        : "lightgray",
                  }}
                >
                  <Text
                    style={{
                      color: propertysubType === option ? "white" : "black",
                    }}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="items-center justify-center">
            <dataBuy.Picture />
          </View>
          <Text
            style={{
              fontSize: ms(20),
              fontWeight: 500,
              marginBottom: vs(10),
            }}
          >
            Quickly search your{" "}
            <Text style={{ color: Colors.light.red }}>dream</Text> living
          </Text>
        </View>
        <QuickSerchCard
          Image={ReducePrice}
          text="Reduced Price"
          onPress={() => {
            router.navigate({
              pathname:"/BuyListing",
              params:{
                saleprice_type:"Reduced Price",
                property_for:property_for,
              }
            });
          }}
        />
        <QuickSerchCard
          Image={Renovated}
          text="Newly renovated"
          onPress={() => {
            router.navigate({
              pathname:"/BuyListing",
              params:{
                condition:"Total Re-build",
                property_for:property_for,
              }
            });
          }}
        />
        <QuickSerchCard
          Image={Constructed}
          text="Newly Constructed"
            onPress={() => {
            router.navigate({
              pathname:"/BuyListing",
              params:{
                condition:"Newly build",
                property_for:property_for,
              }
            });
          }}
        />
      </View>
    </ScrollView>
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
