import Profilelogo from "@assets/CreateProfile/uploadprofilewithcircle.svg";
import AdvatiseBaner from "@assets/SideBar/advertisementpic.svg";
import HomeFeed from "@assets/SideBar/homeFeed.svg";
import { FormikInput } from "@src/components/globals/FormictInput";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LargeButton from "@src/components/globals/LaregeButton";
import TablikeButton from "@src/components/globals/TablikeButton";
import UploadPic from "@src/components/globals/UploadPic";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { Formik } from "formik";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Yup from "yup";
const index = () => {
  const [showInfoPage, setShowInfopage] = useState(false);
  const [showAdvatizeFrom, setShowAdvatizeForm] = useState(false);
  const [advatizeinfoType, setAdvatizeinfoType] = useState("Homefeed");
  const [listingInfo, setListingInfo] = useState("ListingDetail");
  const AdvatizeSchema = Yup.object().shape({
    advertisement_type: Yup.string().required("Advertisement type is required"),

    start_date: Yup.string().required("Start date is required"),

    expiry_date: Yup.string().required("Expiry date is required"),

    ad_link: Yup.string()
      .url("Please enter a valid URL")
      .required("Ad link is required"),

    on_page: Yup.string().required("Page selection is required"),
  });
  const componenet1 = (
    <View style={{ marginTop: vs(10) }}>
      <HomeFeed height={vs(300)} width={hs(350)} />
      <Text
        style={{
          fontSize: ms(18),
          color: Colors.light.DarkGreen,
          fontWeight: "500",
        }}
      >
        Present your brand / business at most visited segment for
      </Text>
      <Text style={{ fontSize: ms(20), fontWeight: "600" }}>$ 5/ Day</Text>
      <View className="justify-between " style={{ marginTop: vs(10) }}>
        <Text>
          Most busiest section where every user see all the activities of
          connections and preferred properties & communities. {"\n"} No chance
          to miss your advertisement as your ad will be placed most prominent
          place of page.{"\n"} You can promote your business as per your budget
          requirements i.e. how many days you want to run your advertisement. (*
          Promotion is based on minimum 1 day and maximum days you want){"\n"}{" "}
          Far more reach of your business to get more connectivity with users
          means more engagements of your business.
        </Text>
      </View>
    </View>
  );
  const componenet2 = (
    <View style={{ marginTop: vs(10) }}>
      <HomeFeed height={vs(300)} width={hs(350)} />
      <Text
        style={{
          fontSize: ms(18),
          color: Colors.light.DarkGreen,
          fontWeight: "500",
        }}
      >
        Present your brand / business at most visited segment for
      </Text>
      <Text style={{ fontSize: ms(20), fontWeight: "600" }}>$ 5/ Day</Text>
      <View className="justify-between " style={{ marginTop: vs(10) }}>
        <Text>
          Most busiest section where every user see all the activities of
          connections and preferred properties & communities. {"\n"} No chance
          to miss your advertisement as your ad will be placed most prominent
          place of page.{"\n"} You can promote your business as per your budget
          requirements i.e. how many days you want to run your advertisement. (*
          Promotion is based on minimum 1 day and maximum days you want){"\n"}{" "}
          Far more reach of your business to get more connectivity with users
          means more engagements of your business.
        </Text>
      </View>
    </View>
  );
  const componenet3 = (
    <View style={{ marginTop: vs(10) }}>
      <HomeFeed height={vs(300)} width={hs(350)} />
      <Text
        style={{
          fontSize: ms(18),
          color: Colors.light.DarkGreen,
          fontWeight: "500",
        }}
      >
        Present your brand / business at most visited segment for
      </Text>
      <Text style={{ fontSize: ms(20), fontWeight: "600" }}>$ 5/ Day</Text>
      <View className="justify-between " style={{ marginTop: vs(10) }}>
        <Text>
          Most busiest section where every user see all the activities of
          connections and preferred properties & communities. {"\n"} No chance
          to miss your advertisement as your ad will be placed most prominent
          place of page.{"\n"} You can promote your business as per your budget
          requirements i.e. how many days you want to run your advertisement. (*
          Promotion is based on minimum 1 day and maximum days you want){"\n"}{" "}
          Far more reach of your business to get more connectivity with users
          means more engagements of your business.
        </Text>
      </View>
    </View>
  );
  if (showInfoPage) {
    return (
      <ScrollView>
        <View className="flex-1 bg-white">
          <HeaderWithBack />
          <View style={{ marginHorizontal: hs(20), marginTop: vs(30) }}>
            <Text className="font-bold">
              Market your Brand or Business on Nation's smartest real-estate
              platform Tranparent - Targeted- Economical
            </Text>
            <Text style={{ marginTop: vs(30), marginBottom: vs(10) }}>
              Advertisement options at different segments to give you targeted
              audiences right for your marketing needs.We have five major
              segements where you can market your business
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: ms(16),
              elevation: 5,
              marginHorizontal: hs(10),
              paddingBottom: vs(10),
              paddingHorizontal: hs(10),
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 5,
            }}
          >
            <TablikeButton
              btn1value="Homefeed"
              btn2value="Timeline"
              btn3value="Connections"
              btnTxt1="Homefeed"
              btnTxt2="Timeline"
              btnTxt3="Connections"
              Componet1={componenet1}
              Componet2={componenet2}
              Componet3={componenet3}
              value={advatizeinfoType}
              onPress={(value) => {
                setAdvatizeinfoType(value);
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: ms(16),
              elevation: 5,
              marginTop: vs(20),
              marginHorizontal: hs(10),
              paddingBottom: vs(10),
              paddingHorizontal: hs(10),
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 5,
            }}
          >
            <TablikeButton
              btn1value="ListingDetail"
              btn2value="ListingPage"
              btnTxt1="Listing details pages"
              btnTxt2="Listing pages"
              Componet1={componenet1}
              Componet2={componenet2}
              value={listingInfo}
              onPress={(value) => {
                setListingInfo(value);
              }}
            />
          </View>
          <Text
            style={{
              marginTop: vs(20),
              fontSize: ms(12),
              fontWeight: "500",
              marginHorizontal: hs(20),
            }}
          >
            Let's start rolling your brand's marketing.Select best placement for
            your brand with best results!
          </Text>
          <Text
            style={{
              marginTop: vs(10),
              color: Colors.light.red,
              fontWeight: "500",
              marginHorizontal: hs(20),
            }}
          >
            So give new shine to your brand
          </Text>
          <View style={{ marginHorizontal: hs(20), marginVertical: vs(20) }}>
            <LargeButton
              handleSubmit={() => {
                setShowAdvatizeForm(true);
                setShowInfopage(false);
              }}
              text="Place your Ad"
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  if (showAdvatizeFrom) {
    return (
      <ScrollView>
        <View className="flex-1 bg-white">
          <HeaderWithBack />
          <View style={{ marginHorizontal: hs(20), marginVertical: vs(20) }}>
            <Text style={{ fontSize: ms(20), fontWeight: "500" }}>
              Making your brand more
              <Text style={{ color: Colors.light.red }}>SHINING</Text> with us !
            </Text>
            <Formik
              initialValues={{
                advertisement_type: "",
                start_date: "",
                expiry_date: "",
                ad_link: "",
                on_page: "",
              }}
              validationSchema={AdvatizeSchema}
              onSubmit={(values) => {
                console.log("Form Data:", values);
              }}
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
                  <View
                    className="flex-row justify-between"
                    style={{ marginTop: vs(10), gap: hs(5) }}
                  >
                    <TouchableOpacity
                      style={[
                        styles.btn,
                        values.advertisement_type === "Newsfeed" &&
                          styles.btnselected,
                        { flex: 1 },
                      ]}
                      onPress={() => {
                        setFieldValue("advertisement_type", "Newsfeed");
                      }}
                    >
                      <Text
                        style={{
                          color:
                            values.advertisement_type === "Newsfeed"
                              ? "white"
                              : "black",
                          fontWeight: 600,
                        }}
                      >
                        Newsfeed
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.btn,
                        values.advertisement_type === "Timeline" &&
                          styles.btnselected,
                        { flex: 1 },
                      ]}
                      onPress={() => {
                        setFieldValue("advertisement_type", "Timeline");
                      }}
                    >
                      <Text
                        style={{
                          color:
                            values.advertisement_type === "Timeline"
                              ? "white"
                              : "black",
                          fontWeight: 600,
                        }}
                      >
                        Timeline
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.btn,
                        values.advertisement_type === "Connections" &&
                          styles.btnselected,
                        { flex: 1 },
                      ]}
                      onPress={() => {
                        setFieldValue("advertisement_type", "Connections");
                      }}
                    >
                      <Text
                        style={{
                          color:
                            values.advertisement_type === "Connections"
                              ? "white"
                              : "black",
                          fontWeight: 600,
                        }}
                      >
                        Connections
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    className="flex-row justify-between mt-4"
                    style={{ gap: hs(10) }}
                  >
                    <TouchableOpacity
                      style={[
                        styles.btn,
                        values.advertisement_type === "Listing Pages" &&
                          styles.btnselected,
                        { flex: 1 },
                      ]}
                      onPress={() => {
                        setFieldValue("advertisement_type", "Listing Pages");
                      }}
                    >
                      <Text
                        style={{
                          color:
                            values.advertisement_type === "Listing Pages"
                              ? "white"
                              : "black",
                          fontWeight: 600,
                        }}
                      >
                        Listing Pages
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.btn,
                        values.advertisement_type === "Listing details pages" &&
                          styles.btnselected,
                        { flex: 1 },
                      ]}
                      onPress={() => {
                        setFieldValue(
                          "advertisement_type",
                          "Listing details pages"
                        );
                      }}
                    >
                      <Text
                        style={{
                          color:
                            values.advertisement_type ===
                            "Listing details pages"
                              ? "white"
                              : "black",
                          fontWeight: 600,
                        }}
                      >
                        Listing details pages
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {errors.advertisement_type && (
                    <Text>{errors.advertisement_type}</Text>
                  )}
                  <View
                    style={{
                      borderLeftWidth: 1,
                      borderBottomWidth: 1,
                      borderRightWidth: 1,
                      marginTop: vs(20),
                      marginBottom:vs(10),
                      opacity: 0.15,
                      borderColor: Colors.light.textGray,
                      borderRadius: ms(5),
                    }}
                  />
                  <Text style={{fontSize:ms(15),fontWeight:'600'}}>Listing Pages</Text>
                  <View
                    className="flex-row justify-between"
                    style={{ marginTop: vs(10), gap: hs(5) }}
                  >
                    
                    <TouchableOpacity
                      style={[
                        styles.btn,
                        values.advertisement_type === "Newsfeed" &&
                          styles.btnselected,
                        { flex: 1 },
                      ]}
                      onPress={() => {
                        setFieldValue("advertisement_type", "Newsfeed");
                      }}
                    >
                      <Text
                        style={{
                          color:
                            values.advertisement_type === "forSale"
                              ? "white"
                              : "black",
                          fontWeight: 600,
                        }}
                      >
                        For Sale
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.btn,
                        values.advertisement_type === "Timeline" &&
                          styles.btnselected,
                        { flex: 1 },
                      ]}
                      onPress={() => {
                        setFieldValue("advertisement_type", "Timeline");
                      }}
                    >
                      <Text
                        style={{
                          color:
                            values.advertisement_type === "forRent"
                              ? "white"
                              : "black",
                          fontWeight: 600,
                        }}
                      >
                       For Rent
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.btn,
                        values.advertisement_type === "Connections" &&
                          styles.btnselected,
                        { flex: 1 },
                      ]}
                      onPress={() => {
                        setFieldValue("advertisement_type", "Connections");
                      }}
                    >
                      <Text
                        style={{
                          color:
                            values.advertisement_type === "newCommunity"
                              ? "white"
                              : "black",
                          fontWeight: 600,
                        }}
                      >
                        New Community
                      </Text>
                    </TouchableOpacity>
                  </View>
                    <View
                    className="flex-row justify-between"
                    style={{ marginTop: vs(10), gap: hs(5) }}
                  >
                    <TouchableOpacity
                      style={[
                        styles.btn,
                        values.advertisement_type === "Newsfeed" &&
                          styles.btnselected,
                        { flex: 1 },
                      ]}
                      onPress={() => {
                        setFieldValue("advertisement_type", "Newsfeed");
                      }}
                    >
                      <Text
                        style={{
                          color:
                            values.advertisement_type === "agents"
                              ? "white"
                              : "black",
                          fontWeight: 600,
                        }}
                      >
                       Agents
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.btn,
                        values.advertisement_type === "Timeline" &&
                          styles.btnselected,
                        { flex: 1 },
                      ]}
                      onPress={() => {
                        setFieldValue("advertisement_type", "Timeline");
                      }}
                    >
                      <Text
                        style={{
                          color:
                            values.advertisement_type === "developers"
                              ? "white"
                              : "black",
                          fontWeight: 600,
                        }}
                      >
                      Developers
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.btn,
                        values.advertisement_type === "Connections" &&
                          styles.btnselected,
                        { flex: 1 },
                      ]}
                      onPress={() => {
                        setFieldValue("advertisement_type", "Connections");
                      }}
                    >
                      <Text
                        style={{
                          color:
                            values.advertisement_type === "mortgage"
                              ? "white"
                              : "black",
                          fontWeight: 600,
                          fontSize:ms(11)
                        }}
                      >
                       Mortgage Providers
                      </Text>
                    </TouchableOpacity>
                  </View>
                    <TouchableOpacity
                      style={[
                        styles.btn,
                        values.advertisement_type === "Connections" &&
                          styles.btnselected,
                        {width:hs(200),marginTop:vs(10)}
                      ]}
                      onPress={() => {
                        setFieldValue("advertisement_type", "Connections");
                      }}
                    >
                      <Text
                        style={{
                          color:
                            values.advertisement_type === "HomeMaintenance"
                              ? "white"
                              : "black",
                          fontWeight: 600,
                        }}
                      >
                      Home maintenance
                      </Text>
                    </TouchableOpacity>
                     <View
                    style={{
                      borderLeftWidth: 1,
                      borderBottomWidth: 1,
                      borderRightWidth: 1,
                      marginVertical: vs(20),
                      opacity: 0.15,
                      borderColor: Colors.light.textGray,
                      borderRadius: ms(5),
                    }}
                  />
                  <View className="flex-row justify-between items-start gap-3">
                    <View className="flex-1">
                      <FormikInput
                        title="Start Date"
                        placeholder="mm/dd/yy"
                        onChangeText={handleChange("start_date")}
                        onBlur={handleBlur("start_date")}
                        value={values.start_date}
                        touched={!!touched.start_date}
                        errors={!!errors.start_date}
                        required
                        errorText={errors.start_date}
                      />
                    </View>

                    <View className="flex-1">
                      <FormikInput
                        title="End Date"
                        placeholder="mm/dd/yy"
                        onChangeText={handleChange("expiry_date")}
                        onBlur={handleBlur("expiry_date")}
                        value={values.expiry_date}
                        touched={!!touched.expiry_date}
                        errors={!!errors.expiry_date}
                        required
                        errorText={errors.expiry_date}
                      />
                    </View>
                  </View>
                  <FormikInput
                    title="Link of ad"
                    placeholder="www.abc.com"
                    onChangeText={handleChange("ad_link")}
                    onBlur={handleBlur("ad_link")}
                    value={values.ad_link}
                    touched={!!touched.ad_link}
                    errors={!!errors.ad_link}
                    required
                    errorText={errors.ad_link}
                  />
                  <View
                    style={{
                      borderLeftWidth: 1,
                      borderBottomWidth: 1,
                      borderRightWidth: 1,
                      marginVertical: vs(20),
                      borderColor: Colors.light.textGray,
                      borderRadius: ms(5),
                      opacity: 0.15,
                    }}
                  />
                  <UploadPic
                    Logo={Profilelogo}
                    text1="Upload "
                    text2="Ad"
                    additionalText={
                      "Recomended size 1based on selection\n above plz discuss"
                    }
                    border
                    onPress={() => {}}
                  />
                  <LargeButton handleSubmit={() => {}} text="View your Ad" />
                  <View
                    style={{
                      borderLeftWidth: 1,
                      borderBottomWidth: 1,
                      borderRightWidth: 1,
                      marginVertical: vs(20),
                      opacity: 0.15,
                      borderColor: Colors.light.textGray,
                      borderRadius: ms(5),
                    }}
                  />
                  <View
                    className="items-center"
                    style={{
                      backgroundColor: "white",
                      borderRadius: ms(8),
                      elevation: 5,
                      marginBottom:vs(20),
                      paddingBottom: vs(10),
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.15,
                      shadowRadius: 5,
                    }}
                  >
                    <Text style={{ fontWeight: "500", fontSize: ms(15) }}>
                      Total you are paying for your AD
                    </Text>
                    <Text
                      style={{
                        marginVertical: vs(10),
                        fontWeight: "600",
                        color: Colors.light.red,
                      }}
                    >
                      $
                    </Text>
                    <Text style={{fontSize:ms(12)}}>
                      * By proceeding you are agree with our
                      <Text style={{ color: Colors.light.red }}>
                       
                        advertisement policy
                      </Text>
                    </Text>
                   
                  </View>
                   <LargeButton handleSubmit={()=>{}} text="Pay & Submit"/>
                </>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    );
  }
  return (
    <ScrollView scrollEnabled>
      <View className="flex-1 bg-white">
        <HeaderWithBack title="Advertisements" />
        <View
          className="items-center"
          style={{ marginHorizontal: hs(20), marginTop: vs(20) }}
        >
          <AdvatiseBaner />
          <Text style={{ fontWeight: 600, marginTop: vs(30) }}>
            You have no advertisement.
          </Text>
          <Text style={{ marginTop: vs(20) }}>
            Why not advertise your business or brand at our website and expand
            in no time and cost effectively
          </Text>
        </View>
        <View style={{ marginHorizontal: hs(20), marginTop: vs(20) }}>
          <LargeButton
            text="Advertise now"
            handleSubmit={() => {
              setShowInfopage(true);
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({
  btn: {
    borderWidth: 0.5,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    borderColor: Colors.light.textGray,
    borderRadius: ms(5),
    paddingVertical: vs(10),
  },
  btnselected: {
    backgroundColor: Colors.light.DarkGreen,
  },
});
