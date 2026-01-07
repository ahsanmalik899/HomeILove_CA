import { useLazyGetInquieryAgentQuery } from "@/store/api/user/MainApi";
import FilledStar from "@assets/icons/Star/star-filled.svg";
import HollowStar from "@assets/icons/Star/star-not-filled.svg";
import ThreeDots from "@assets/icons/threedots.svg";
import { LegendList } from "@legendapp/list";
import { AdressInput } from "@src/components/globals/AddressInput";
import CircleImage from "@src/components/globals/CircleImage/CircleImage";
import FollowButton from "@src/components/globals/FollowButton";
import { FormikInput } from "@src/components/globals/FormictInput";
import { FormikDropdown } from "@src/components/globals/FormikDropdown/indes";
import { FormikDropdownwithjson } from "@src/components/globals/FormikDropdownwithjson/indes";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LargeButton from "@src/components/globals/LaregeButton";
import Loading from "@src/components/globals/Loading";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { ImageFormater } from "@utils/ImageFormat";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Yup from "yup";
const Index = () => {
  const ValueValidation = Yup.object().shape({
    address: Yup.string().required("Address is required"),
    zip: Yup.string().required("Address is required"),
    lat: Yup.number().required("Address is required"),
    lng: Yup.number().required("Address is required"),
    state: Yup.string().required("Address is required"),
    radius: Yup.string().required("Radius is required"),
    inquiryType: Yup.string().required("Inquiry Type is required"),
  });
  const renderItem=({item})=>{
return(
  <View className="bg-white" style={styles.card}>
          <View className="flex-row items-center justify-between">
            <View className="flex-row">
              <CircleImage source={{uri:ImageFormater(item.logo)}} Size={40} />
              <View style={styles.uperSection}>
                <View className="flex-row">
                  <Text style={styles.name}>{item.name}</Text>
                  {item.connection_type && (
                    <Text> ({item.connection_type})</Text>
                  )}
                </View>
                <Text>Batimore</Text>
              </View>
            </View>
            <TouchableOpacity>
              <ThreeDots />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: vs(20) }}>
            <View className="flex-row justify-between">
              <Text className="font-bold">Dealing areas</Text>
              <Text>{item.dealing_areas}</Text>
            </View>
            <View
              className="flex-row justify-between"
              style={{ marginTop: vs(10) }}
            >
              <Text className="font-bold">Rating</Text>
              <Text>25 Count</Text>
            </View>
            <View
              className="flex-row items-center"
              style={{ marginTop: vs(10) }}
            >
              <View className="flex-row ">
                {[1, 2, 3, 4, 5].map((index) => {
                  if (item.distance >= index) {
                    return <FilledStar />;
                  } else {
                    return <HollowStar />;
                  }
                })}
              </View>
              <Text
                style={{ color: Colors.light.DarkGreen, marginLeft: hs(10) }}
              >
                {item.distance}/5
              </Text>
            </View>
          </View>
          <View
            style={{
              height: vs(1),
              backgroundColor: "black",
              width: "95%",
              marginTop: vs(10),
              marginHorizontal: hs(10),
            }}
          />
          <View style={{ alignItems: "flex-end", marginTop: vs(10) }}>
            <FollowButton id={112} />
          </View>
        </View>
)
  }
  const [fetch, { isFetching }] = useLazyGetInquieryAgentQuery();
  const [page, setPage] = useState(1);
  const [agents, setAgents] = useState([]);
  useEffect(() => {}, [page]);
  const [step, setStep] = useState(0);
 const insets = useSafeAreaInsets();
  if (step === 0) {
    return (
      <View className="flex-1 bg-white ">
        <HeaderWithBack />
        <Formik
          initialValues={{
            location: "",
            radius: "",
            inquiryType: "",
            lat: 0,
            lng: 0,
            zip: "",
            state: "",
            address: "",
          }}
          onSubmit={async (values) => {
            const result = await fetch({
              lat: values.lat,
              lng: values.lng,
              radius: values.radius,
              inquiry_type: values.inquiryType,
              per_page: 10,
              page,
            });
            if (result.data?.success) {
              setStep(1);
              if (page === 1) {
                setAgents(result.data?.locations);
              } else {
                setAgents((prev) => prev + result.data?.locations);
              }
            }
          }}
          validationSchema={ValueValidation}
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            errors,
            touched,
            values,
            setFieldValue,
          }) => (
            <>
              <View style={{ marginHorizontal: hs(20) }}>
                <Text style={styles.mainHeading}>
                  Get smart with{" "}
                  <Text style={{ color: Colors.light.red }}>BEST</Text>{" "}
                  valuation
                </Text>
                <Text
                  style={{ marginTop: vs(10), color: Colors.light.textGray }}
                >
                  Get authentic home valuation from our local expert agents for
                  FREE
                </Text>
                <View className="flex-row justify-between gap-2">
                  <View className="flex-1 mt-4">
                    <AdressInput
                      city={"city"}
                      zip={"zip"}
                      state={"state"}
                      name="address"
                      latValue={values.lat}
                      longValue={values.lng}
                      lat="lat"
                      long="lng"
                      setValue={setFieldValue}
                      onSelect={() => {}}
                      title=""
                      withmap={false}
                      placeholder="Enter Location"
                      value={values.address}
                      touched={!!touched.address}
                      errors={!!errors.address}
                      required
                      errorText={errors.address}
                    />
                  </View>
                  <View className="flex-1 mt-3">
                    <FormikDropdownwithjson
                      title={""}
                      placeholder={"Radius (miles)"}
                      value={values.radius}
                      options={[
                        { label: "Radius (miles)", value: "" },
                        { label: "1 mile", value: "1" },
                        { label: "5 miles", value: "5" },
                        { label: "10 miles", value: "10" },
                        { label: "20 miles", value: "20" },
                        { label: "30 miles", value: "30" },
                        { label: "40 miles", value: "40" },
                        { label: "50 miles", value: "50" },
                      ]}
                      name="radius"
                      touched={!!touched}
                      errors={!!errors}
                      errorText={errors.radius}
                      onSelect={() => {}}
                      setValue={setFieldValue}
                    />
                  </View>
                </View>
                <FormikDropdown
                  title={"Inquiry type"}
                  placeholder={"Select Type"}
                  value={values.inquiryType}
                  setValue={setFieldValue}
                  name="inquiryType"
                  options={[
                    "Home buying/selling valuation",
                    "Home rent valuation",
                  ]}
                  onSelect={() => {}}
                  touched={!!touched}
                  errors={!!errors}
                  errorText={errors.inquiryType}
                  required
                />
              </View>
              <View className="mt-auto mb-5 px-[20px]">
                <LargeButton
                  text="Next"
                  handleSubmit={() => {
                    handleSubmit();
                  }}
                />
              </View>
            </>
          )}
        </Formik>
        <Loading isLoading={isFetching} text="serching...." />
      </View>
    );
  } else {
    return (
      <View className="flex-1 bg-white ">
        <HeaderWithBack
          onBackpress={() => {
            setStep(0);
          }}
        />
        <View style={{ marginHorizontal: hs(20) }}>
          <Text style={styles.mainHeading}>Select agents for valuation</Text>
            <View
                            style={{
                              height: vs(1),
                              marginTop: vs(20),
                              marginBottom: vs(10),
                              backgroundColor: Colors.light.textGray,
                              opacity: 0.2,
                            }}
                          />
                           <View style={{ paddingBottom: insets.bottom }}>
      <LegendList
        className="flex-1 bg-red"
        data={agents}
        renderItem={renderItem}
        keyExtractor={(item) => item.agent_id}
        onEndReached={() => {
          if (data.length > 9) {
            setPage((prev) => prev + 1);
          }
        }}
       
        ListFooterComponent={
          isFetching ? <ActivityIndicator size="small" /> : null
        }
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => {
              setPage(1);
            }}
          />
        }
      />
    </View>
          <FormikInput
            title="Message"
            placeholder="Write..."
            onChangeText={() => {}}
            onBlur={() => {}}
            value={"sghfvdj"}
            touched={false}
            errors={false}
            required
            multiline
            errorText={"lskdnc"}
          />
          <Text className="mt-5">
            by proceeding,you consent to receive ccalls and texts at the number
            you provided, including marketing by autodialer and prerecorded and
            artificial voice, and email, from homeilove,agents,mortgage advisors
            and others about your inquiry and other home-related matters,but not
            as a condition or any purchase. You also agree to our Terms of Use,
            and to our Privacy Policy regarding the information relating to you.
            Message data rates may apply. This consent applies even if you are
            on a corporate, state or national Do Not Call list.
          </Text>
        </View>
        <View className="mt-auto mb-5 px-[20px]">
          <LargeButton
            text="Next"
            handleSubmit={() => {
              setStep(1);
            }}
          />
        </View>
      </View>
    );
  }
};

export default Index;

const styles = StyleSheet.create({
  mainHeading: {
    marginTop: vs(20),
    fontSize: ms(20),
    fontWeight: 500,
  },
   name: {
    fontWeight: "bold",
  },
  uperSection: {
    marginLeft: hs(10),
  },
});
