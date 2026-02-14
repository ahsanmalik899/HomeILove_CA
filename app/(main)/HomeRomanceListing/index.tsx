import { useGetTrendingProfilesQuery } from "@/store/api/user/MainApi";
import { FormikDropdownwithjson } from "@src/components/globals/FormikDropdownwithjson";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LeadingList from "@src/components/globals/LeadingList";
import SerchBar from "@src/components/globals/SerchBar";
import { SearchProfile } from "@src/components/globals/SerchProfile";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
const index = () => {
  const { type } = useLocalSearchParams();
    const { data: profileList, isLoading, isFetching } =useGetTrendingProfilesQuery({type:type})
    const [name, setname] = useState("");
    const [propertyType, setPropertyType] = useState(type.toString());
    const [address, setaddress] = useState("");
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [radius, setRadius] = useState("");
  switch (type) {
    case "electrician":
      return (
        <ScrollView className="bg-white">
        <View className="bg-white flex-1">
          <HeaderWithBack />
          <View style={{ marginHorizontal: hs(20) }}>
            <Text style={styles.mainHeading}>
              Keep<Text style={{ color: Colors.light.red }}> LIGHTENING </Text>
              your home
            </Text>
            <Text>
              Keep maintaining your home electrifying equipment with our expert
              electricians.Simply search best & economical electricians around
              you.
            </Text>
            <Text style={styles.subHeading}>
              Search experienced Electricians
            </Text>
          
             <SerchBar
            setAddress={setaddress}
            setCity={setCity}
            setLat={setLat}
            setLng={setLng}
            setState={setState}
            setZip={setZip}
            onpress={() => {
              router.navigate({
                pathname: "/ProfileListings",
                params: {
                  address: address,
                  city: city,
                  zip: zip || "",
                  lat: lat?.toString(),
                  lng: lng?.toString(),
                  stateCode: state,
                  radius: radius,
                  name:name,
                  type:"electrician"
                },
              });
            }}
            value={address}
            latValue={lat}
            longValue={lng}
          />
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
                      <View className="flex-row justify-between items-center mt-3">
                        <View style={styles.line} />
                        <Text>OR</Text>
                        <View style={styles.line} />
                      </View>
                      <SearchProfile
                        type="electrician"
                        onSelect={(val) => {
                          setname(val.business_name);
                          setCity("");
                          setLat(0);
                          setLng(0);
                          setRadius(""), setState(""), setZip(""), setaddress("");
                        }}
                        value={name}
                      />
         
            <Text style={styles.mainHeading}>
              Leading 
              <Text style={{ color: Colors.light.red }}> ELECTRICIANS</Text>
            </Text>
              <LeadingList data={profileList?.data} isFetching={isFetching} />
          </View>
        </View>
        </ScrollView>
      );
      break;
    case "plumber":
      return (
         <ScrollView className="bg-white">
        <View className="bg-white flex-1">
          <HeaderWithBack />
          <View style={{ marginHorizontal: hs(20) }}>
            <Text style={styles.mainHeading}>
              Fix home to<Text style={{ color: Colors.light.red }}> LIVE </Text>
              with comfort
            </Text>
            <Text>
              Keep maintaining your home with our expert plumbers.Simply search
              local plumbers around you.
            </Text>
            <Text style={styles.subHeading}>Search experienced Plumbers</Text>
         
             <SerchBar
            setAddress={setaddress}
            setCity={setCity}
            setLat={setLat}
            setLng={setLng}
            setState={setState}
            setZip={setZip}
            onpress={() => {
              router.navigate({
                pathname: "/ProfileListings",
                params: {
                  address: address,
                  city: city,
                  zip: zip || "",
                  lat: lat?.toString(),
                  lng: lng?.toString(),
                  stateCode: state,
                  radius: radius,
                  name:name,
                  type:"plumber"
                },
              });
            }}
            value={address}
            latValue={lat}
            longValue={lng}
          />
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
                      <View className="flex-row justify-between items-center mt-3">
                        <View style={styles.line} />
                        <Text>OR</Text>
                        <View style={styles.line} />
                      </View>
                      <SearchProfile
                        type="plumber"
                        onSelect={(val) => {
                          setname(val.business_name);
                          setCity("");
                          setLat(0);
                          setLng(0);
                          setRadius(""), setState(""), setZip(""), setaddress("");
                        }}
                        value={name}
                      />
                         <Text style={styles.mainHeading}>
              Leading 
              <Text style={{ color: Colors.light.red }}> PLUMBERS</Text>
            </Text>
             <LeadingList data={profileList?.data} isFetching={isFetching} />
          </View>
        </View>
        </ScrollView>
      );
      break;

    case "decor":
      return (
         <ScrollView className="bg-white">
        <View className="bg-white flex-1">
          <HeaderWithBack />
          <View style={{ marginHorizontal: hs(20) }}>
            <Text style={styles.mainHeading}>
              Home at<Text style={{ color: Colors.light.red }}> GLANCE </Text>
              with love
            </Text>
            <Text>
              Re-invent your home with our expert interior decors. Simply search
              local home stagers around you.
            </Text>
            <Text style={styles.subHeading}>
              Search shining Interior Decors
            </Text>
             
             <SerchBar
            setAddress={setaddress}
            setCity={setCity}
            setLat={setLat}
            setLng={setLng}
            setState={setState}
            setZip={setZip}
            onpress={() => {
              router.navigate({
                pathname: "/ProfileListings",
                params: {
                  address: address,
                  city: city,
                  zip: zip || "",
                  lat: lat?.toString(),
                  lng: lng?.toString(),
                  stateCode: state,
                  radius: radius,
                  name:name,
                  type:"decor"
                },
              });
            }}
            value={address}
            latValue={lat}
            longValue={lng}
          />
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
                      <View className="flex-row justify-between items-center mt-3">
                        <View style={styles.line} />
                        <Text>OR</Text>
                        <View style={styles.line} />
                      </View>
                      <SearchProfile
                        type="decor"
                        onSelect={(val) => {
                          setname(val.business_name);
                          setCity("");
                          setLat(0);
                          setLng(0);
                          setRadius(""), setState(""), setZip(""), setaddress("");
                        }}
                        value={name}
                      />
                         <Text style={styles.mainHeading}>
              Leading 
              <Text style={{ color: Colors.light.red }}> DECORS</Text>
            </Text>
               <LeadingList data={profileList?.data} isFetching={isFetching} />
          </View>
        </View>
        </ScrollView>
      );
      break;
    case "painter":
      return (
         <ScrollView className="bg-white">
        <View className="bg-white flex-1">
          <HeaderWithBack />
          <View style={{ marginHorizontal: hs(20) }}>
            <Text style={styles.mainHeading}>
              Give new<Text style={{ color: Colors.light.red }}> LOOKS </Text>
              to your home
            </Text>
            <Text>
              Give new look to your home with our expert painters. Simply search
              local painters around you.
            </Text>
            <Text style={styles.subHeading}>
              Search experienced{" "}
              <Text style={{ color: Colors.light.red }}>Painters</Text>
            </Text>
           
             <SerchBar
            setAddress={setaddress}
            setCity={setCity}
            setLat={setLat}
            setLng={setLng}
            setState={setState}
            setZip={setZip}
            onpress={() => {
              router.navigate({
                pathname: "/ProfileListings",
                params: {
                  address: address,
                  city: city,
                  zip: zip || "",
                  lat: lat?.toString(),
                  lng: lng?.toString(),
                  stateCode: state,
                  radius: radius,
                  name:name,
                  type:"painter"
                },
              });
            }}
            value={address}
            latValue={lat}
            longValue={lng}
          />
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
                      <View className="flex-row justify-between items-center mt-3">
                        <View style={styles.line} />
                        <Text>OR</Text>
                        <View style={styles.line} />
                      </View>
                      <SearchProfile
                        type="painter"
                        onSelect={(val) => {
                          setname(val.business_name);
                          setCity("");
                          setLat(0);
                          setLng(0);
                          setRadius(""), setState(""), setZip(""), setaddress("");
                        }}
                        value={name}
                      />
                         <Text style={styles.mainHeading}>
              Leading 
              <Text style={{ color: Colors.light.red }}> PAINTERS</Text>
            </Text>
              <LeadingList data={profileList?.data} isFetching={isFetching} />
          </View>
        </View>
        </ScrollView>
      );
      break;
    case "builder":
      return (
         <ScrollView className="bg-white">
        <View className="bg-white flex-1">
          <HeaderWithBack />
          <View style={{ marginHorizontal: hs(20) }}>
            <Text style={styles.mainHeading}>
              <Text style={{ color: Colors.light.red }}>BUILD</Text>or
              <Text style={{ color: Colors.light.red }}> RE-BUILD </Text>
              your home
            </Text>
            <Text>
              Give structural change or build your home with our leading expert
              builders. Simply search local home builders around you.
            </Text>
            <Text style={styles.subHeading}>
              Search experienced{" "}
              <Text style={{ color: Colors.light.red }}>Home Builders</Text>
            </Text>
           
             <SerchBar
            setAddress={setaddress}
            setCity={setCity}
            setLat={setLat}
            setLng={setLng}
            setState={setState}
            setZip={setZip}
            onpress={() => {
              router.navigate({
                pathname: "/ProfileListings",
                params: {
                  address: address,
                  city: city,
                  zip: zip || "",
                  lat: lat?.toString(),
                  lng: lng?.toString(),
                  stateCode: state,
                  radius: radius,
                  name:name,
                  type:"builder"
                },
              });
            }}
            value={address}
            latValue={lat}
            longValue={lng}
          />
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
                      <View className="flex-row justify-between items-center mt-3">
                        <View style={styles.line} />
                        <Text>OR</Text>
                        <View style={styles.line} />
                      </View>
                      <SearchProfile
                        type="builder"
                        onSelect={(val) => {
                          setname(val.business_name);
                          setCity("");
                          setLat(0);
                          setLng(0);
                          setRadius(""), setState(""), setZip(""), setaddress("");
                        }}
                        value={name}
                      />
                         <Text style={styles.mainHeading}>
              Leading 
              <Text style={{ color: Colors.light.red }}> BUILDERS</Text>
            </Text>
               <LeadingList data={profileList?.data} isFetching={isFetching} />
          </View>
        </View>
        </ScrollView>
      );
      break;
  }
};

export default index;

const styles = StyleSheet.create({
  mainHeading: {
    marginTop: vs(20),
    fontSize: ms(20),
    fontWeight: 500,
  },
  subHeading: {
    marginTop: vs(10),
    fontSize: ms(20),
    fontWeight: 500,
  },
   line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
});
