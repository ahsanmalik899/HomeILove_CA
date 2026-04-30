import { useGetUserWalletQuery, useLazyGetAdvatizementPriceQuery, usePostAdvatizementMutation } from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import Profilelogo from "@assets/CreateProfile/uploadprofilewithcircle.svg";
import AdvatiseBaner from "@assets/SideBar/advertisementpic.svg";
import Connection from "@assets/SideBar/connection.svg";
import HomeFeed from "@assets/SideBar/homeFeed.svg";
import Listipage1 from "@assets/SideBar/listingPage1.svg";
import Listipage2 from "@assets/SideBar/listinpage2.svg";
import Paypal from "@assets/SideBar/paypal-icon.svg";
import TimeLine from "@assets/SideBar/timeline.svg";
import { FormikInput } from "@src/components/globals/FormictInput";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LargeButton from "@src/components/globals/LaregeButton";
import Loading from "@src/components/globals/Loading";
import PromotionPricingCard from "@src/components/globals/PromotionPricingCard";
import TablikeButton from "@src/components/globals/TablikeButton";
import UploadPic from "@src/components/globals/UploadPic";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { renderToastError, renderToastSuccess } from "@src/hooks/useToasty";
import { hs, ms, vs } from "@utils/design/design";
import { router } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Yup from "yup";
const index = () => {
  const [showInfoPage, setShowInfopage] = useState(false);
  const [showAdvatizeFrom, setShowAdvatizeForm] = useState(false);
  const [advatizeinfoType, setAdvatizeinfoType] = useState("Homefeed");
  const [listingInfo, setListingInfo] = useState("ListingDetail");
  const [timePeriod, setTimeperiod] = useState("");
  const [getprice, { data: promotionPrices, isFetching: pricesFetching }] = useLazyGetAdvatizementPriceQuery()
  const [PostAdvatizement, { isLoading }] = usePostAdvatizementMutation();
  const [visible, setvisible] = useState(false);
  const user = useAppSelector(userdata);
  const AdvatizeSchema = Yup.object().shape({
    start_date: Yup.string().required("Start date is required"),

    end_date: Yup.string().required("Expiry date is required"),

    ad_link: Yup.string()
      .url("Please enter a valid URL")
      .required("Ad link is required"),
    business_cover: Yup.mixed().nullable(),
    on_page: Yup.string().required("Page selection is required"),
  });
  const {
    data: amount,
    isLoading: AmountLoading,
    isFetching,
  } = useGetUserWalletQuery({
    id: user.id,
  });
  const [SelectedAmount, setSelectedAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const Listingcomponenet1 = (
    <View style={{ marginTop: vs(10) }}>
      <Listipage1 height={vs(300)} width={hs(350)} />
      <Text
        style={{
          fontSize: ms(18),
          color: Colors.light.DarkGreen,
          fontWeight: "500",
          fontFamily: "PopinRegula",
        }}
      >
        When user view his love home then he will view your ad
      </Text>
      <Text style={{ fontSize: ms(20), fontWeight: "600", fontFamily: "PopinRegula", }}>$ 15 / Day</Text>
      <View className="justify-between " style={{ marginTop: vs(10), }}>
        <Text style={{ fontFamily: "PopinRegula", }}>
          • Another busiest segment where users search their homing needs and
          that where we will present your ad at top most prominent place.
          {"\n\n"}• Target your audience as per your ad requirements e.g. if
          broker then place ad at sale & rent ad's detailing page, if developer
          then place ad at new communities listing segment.
          {"\n\n"}• You can advertise your ad as per your budget reuirements
          i.e. how many days you want to run your advertisement.( * Promotion is
          based on minimum 1 day and maximum days you want)
          {"\n\n"}• Your ad will be place at top of listings details page which
          gives your ad a Must See.
        </Text>
      </View>
    </View>
  );
  const Listingcomponenet2 = (
    <View style={{ marginTop: vs(10) }}>
      <Listipage2 height={vs(300)} width={hs(350)} />
      <Text
        style={{
          fontSize: ms(18),
          color: Colors.light.DarkGreen,
          fontWeight: "500",
          fontFamily: "PopinRegula",
        }}
      >
        Present your brand / business at core segment of portal
      </Text>
      <Text style={{ fontSize: ms(20), fontWeight: "600", fontFamily: "PopinRegula", }}>$ 10 / Day</Text>
      <View className="justify-between " style={{ marginTop: vs(10) }}>
        <Text style={{ fontFamily: "PopinRegula", }}>
          •You have 7 best choices to present your ad at Property for sale &
          rent , New communities, businesses profiles listing pages.
          {"\n\n"}•Target your audience as per your ad requirements e.g. if
          broker then place ad at sale & rent listing, if developer then place
          ad at new communities listing segment.
          {"\n\n"}• You can advertise your ad as per your budget reuirements
          i.e. how many days you want to run your advertisement.( * Promotion is
          based on minimum 1 day and maximum days you want)
          {"\n\n"}• Your ad will be place between listings which gives your
          brand projection to highly concerned viewership.
        </Text>
      </View>
    </View>
  );
  const componenet1 = (
    <View style={{ marginTop: vs(10) }}>
      <HomeFeed height={vs(300)} width={hs(350)} />
      <Text
        style={{
          fontSize: ms(18),
          color: Colors.light.DarkGreen,
          fontWeight: "500",
          fontFamily: "PopinRegula",
        }}
      >
        Present your brand / business at most visited segment for
      </Text>
      <Text style={{ fontSize: ms(20), fontWeight: "600", fontFamily: "PopinRegula", }}>$ 5/ Day</Text>
      <View className="justify-between " style={{ marginTop: vs(10) }}>
        <Text style={{ fontFamily: "PopinRegula", }}>
          • Most busiest section where every user see all the activities of
          connections and preferred properties & communities.
          {"\n\n"}• No chance to miss your advertisement as your ad will be
          placed most prominent place of page.
          {"\n\n"}• You can promote your business as per your budget
          requirements i.e. how many days you want to run your advertisement. (*
          Promotion is based on minimum 1 day and maximum days you want) .
          {"\n\n"}• Far more reach of your business to get more connectivity
          with users means more engagements of your business.
        </Text>
      </View>
    </View>
  );
  const componenet2 = (
    <View style={{ marginTop: vs(10) }}>
      <TimeLine height={vs(300)} width={hs(350)} />
      <Text
        style={{
          fontSize: ms(18),
          color: Colors.light.DarkGreen,
          fontWeight: "500",
          fontFamily: "PopinRegula",
        }}
      >
        Market your brand to user's own timeline page for
      </Text>
      <Text style={{ fontSize: ms(20), fontWeight: "600", fontFamily: "PopinRegula", }}>$ 25 / Day</Text>
      <View className="justify-between " style={{ marginTop: vs(10) }}>
        <Text style={{ fontFamily: "PopinRegula", }}>
          • Every user view its own activities and thats where your ad will be
          placed.{"\n\n"}• Prominent place for your advertisement at our another
          busiest segement.{"\n\n"}• You can promote your business as per your
          budget reuirements i.e. how many days you want to run your
          advertisement.( * Promotion is based on minimum 1 day and maximum days
          you want)
          {"\n\n"}• Far more reach of your business to get more connectivity
          with users means more engagements of your business .
        </Text>
      </View>
    </View>
  );
  const componenet3 = (
    <View style={{ marginTop: vs(10) }}>
      <Connection height={vs(300)} width={hs(350)} />
      <Text
        style={{
          fontSize: ms(18),
          color: Colors.light.DarkGreen,
          fontWeight: "500",
          fontFamily: "PopinRegula",
        }}
      >
        Most economical yet results producing place for your ad at
      </Text>
      <Text style={{ fontSize: ms(20), fontWeight: "600", fontFamily: "PopinRegula", }}>$ 20 / Day</Text>
      <View className="justify-between " style={{ marginTop: vs(10) }}>
        <Text style={{ fontFamily: "PopinRegula", }}>
          • Your ad will be placed at user's list of connections at very
          economical rates.
          {"\n\n"}• Prominent place for your advertisement at another decent
          traffic segment.
          {"\n\n"}• You can promote your business as per your budget reuirements
          i.e. how many days you want to run your advertisement.( * Promotion is
          based on minimum 1 day and maximum days you want).
          {"\n\n"}• Far more reach of your business to get more connectivity
          with users means more engagements of your business .
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
            <Text className="font-bold" style={{ fontFamily: "PopinRegula", }}>
              Market your Brand or Business on Nation's smartest real-estate
              platform Tranparent - Targeted- Economical
            </Text>
            <Text style={{ marginTop: vs(30), marginBottom: vs(10), fontFamily: "PopinRegula", }}>
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
              Componet1={Listingcomponenet1}
              Componet2={Listingcomponenet2}
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
              fontFamily: "PopinRegula",
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
              fontFamily: "PopinRegula",
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
  const pageTypeMap: Record<string, string> = {
    newsfeed: "Newsfeed",
    connections: "Connection",
    listing: "Listing",
    listing_details: "Single View",
    sale: "Listing",
    rent: "Listing",
    community: "Listing",
    agent: "Listing",
    developer: "Listing",
    mortgage: "Listing",
    maintenance: "Listing",
    timeline: "Timeline",
  };

  if (showAdvatizeFrom) {
    return (
      <>
        <ScrollView>
          <View className="flex-1 bg-white">
            <HeaderWithBack />
            <View style={{ marginHorizontal: hs(20), marginVertical: vs(20) }}>
              <Text style={{ fontSize: ms(20), fontWeight: "500", fontFamily: "PopinRegula", }}>
                Making your brand more
                <Text style={{ color: Colors.light.red, fontFamily: "PopinRegula", }}>SHINING</Text> with us !
              </Text>
              <Formik
                initialValues={{
                  start_date: "",
                  end_date: "",
                  ad_link: "",
                  on_page: "",
                  business_cover: null,
                  user_id: user.id,
                  total_price: 200,
                }}
                validationSchema={AdvatizeSchema}
                onSubmit={async (values) => {
                  try {
                    const formData = new FormData();

                    // Append normal fields
                    Object.keys(values).forEach((key) => {
                      if (
                        key !== 'business_cover' &&
                        values[key] !== undefined &&
                        values[key] !== null
                      ) {
                        formData.append(key, String(values[key]));
                      }
                    });

                    // Append image
                    if (values.business_cover?.uri) {
                      formData.append("business_cover", {
                        uri: values.business_cover.uri,
                        name: values.business_cover.name ?? "advertisement.jpg",
                        type: values.business_cover.type ?? "image/jpeg",
                      } as any);
                    }


                    // 🔥 unwrap() throws error automatically if API fails
                    const response = await PostAdvatizement(formData).unwrap();

                    // ✅ SUCCESS TOAST
                    renderToastSuccess(
                      response?.message || 'Advertisement submitted successfully'
                    );
                  } catch (error: any) {
                    console.log('Submit error:', error);

                    // ❌ Laravel validation errors
                    if (error?.data?.errors) {
                      const firstError = Object.values(error.data.errors)[0] as string[];
                      renderToastError(firstError[0]);
                      return;
                    }

                    // ❌ Server error
                    renderToastError(
                      error?.data?.message || 'Something went wrong. Try again.'
                    );
                  }
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
                          values.on_page === "newsfeed" && styles.btnselected,
                          { flex: 1 },
                        ]}
                        onPress={() => {

                          setFieldValue("on_page", "newsfeed");

                          getprice({ type: pageTypeMap["newsfeed"] });
                        }}
                      >
                        <Text
                          style={{
                            color:
                              values.on_page === "newsfeed" ? "white" : "black",
                            fontWeight: 600,
                            fontFamily: "PopinRegula",
                          }}
                        >
                          News Feed
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.btn,
                          values.on_page === "connections" && styles.btnselected,
                          { flex: 1 },
                        ]}
                        onPress={() => {
                          setFieldValue("on_page", "connections");
                          getprice({ type: pageTypeMap["connections"] });
                        }}
                      >
                        <Text
                          style={{
                            color:
                              values.on_page === "connections"
                                ? "white"
                                : "black",
                            fontWeight: 600,
                            fontFamily: "PopinRegula",
                          }}
                        >
                          Connections
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
                          values.on_page === "listing" && styles.btnselected,
                          { flex: 1 },
                        ]}
                        onPress={() => {
                          setFieldValue("on_page", "listing");
                          getprice({ type: pageTypeMap["listing"] });
                        }}
                      >
                        <Text
                          style={{
                            color:
                              values.on_page === "listing" ? "white" : "black",
                            fontWeight: 600,
                            fontFamily: "PopinRegula",
                          }}
                        >
                          Listing Pages
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.btn,
                          values.on_page === "listing_details" &&
                          styles.btnselected,
                          { flex: 1 },
                        ]}
                        onPress={() => {
                          setFieldValue("on_page", "listing_details");
                          getprice({ type: pageTypeMap["listing_details"] });
                        }}
                      >
                        <Text
                          style={{
                            color:
                              values.on_page === "listing_details"
                                ? "white"
                                : "black",
                            fontWeight: 600,
                            fontFamily: "PopinRegula",
                          }}
                        >
                          Listing deatil pages
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {values.on_page &&
                      values.on_page !== "newsfeed" &&
                      values.on_page !== "connections" && (
                        <>
                          <View
                            style={{
                              borderLeftWidth: 1,
                              borderBottomWidth: 1,
                              borderRightWidth: 1,
                              marginTop: vs(20),
                              marginBottom: vs(10),
                              opacity: 0.15,
                              borderColor: Colors.light.textGray,
                              borderRadius: ms(5),
                            }}
                          />
                          <Text style={{ fontSize: ms(15), fontWeight: "600", fontFamily: "PopinRegula", }}>
                            Listing Pages
                          </Text>
                          <View
                            className="flex-row justify-between"
                            style={{ marginTop: vs(10), gap: hs(5) }}
                          >
                            <TouchableOpacity
                              style={[
                                styles.btn,
                                values.on_page === "sale" && styles.btnselected,
                                { flex: 1 },
                              ]}
                              onPress={() => {
                                setFieldValue("on_page", "sale");
                                getprice({ type: pageTypeMap["sale"] });
                              }}
                            >
                              <Text
                                style={{
                                  color:
                                    values.on_page === "sale" ? "white" : "black",
                                  fontWeight: 600,
                                  fontFamily: "PopinRegula",
                                }}
                              >
                                For Sale
                              </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              style={[
                                styles.btn,
                                values.on_page === "rent" && styles.btnselected,
                                { flex: 1 },
                              ]}
                              onPress={() => {
                                setFieldValue("on_page", "rent");
                                getprice({ type: pageTypeMap["rent"] });
                              }}
                            >
                              <Text
                                style={{
                                  color:
                                    values.on_page === "rent" ? "white" : "black",
                                  fontWeight: 600,
                                  fontFamily: "PopinRegula",
                                }}
                              >
                                For Rent
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
                                values.on_page === "community" &&
                                styles.btnselected,
                                { flex: 1 },
                              ]}
                              onPress={() => {
                                setFieldValue("on_page", "community");
                                getprice({ type: pageTypeMap["community"] });
                              }}
                            >
                              <Text
                                style={{
                                  color:
                                    values.on_page === "community"
                                      ? "white"
                                      : "black",
                                  fontWeight: 600,
                                  fontFamily: "PopinRegula",
                                }}
                              >
                                New Community
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={[
                                styles.btn,
                                values.on_page === "agent" && styles.btnselected,
                                { flex: 1 },
                              ]}
                              onPress={() => {
                                setFieldValue("on_page", "agent");
                                getprice({ type: pageTypeMap["agent"] });
                              }}
                            >
                              <Text
                                style={{
                                  color:
                                    values.on_page === "agent"
                                      ? "white"
                                      : "black",
                                  fontWeight: 600,
                                  fontFamily: "PopinRegula",
                                }}
                              >
                                Agents
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
                                values.on_page === "developer" &&
                                styles.btnselected,
                                { flex: 1 },
                              ]}
                              onPress={() => {
                                setFieldValue("on_page", "developer");
                                getprice({ type: pageTypeMap["developer"] });
                              }}
                            >
                              <Text
                                style={{
                                  color:
                                    values.on_page === "developer"
                                      ? "white"
                                      : "black",
                                  fontWeight: 600,
                                  fontFamily: "PopinRegula",
                                }}
                              >
                                Developers
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={[
                                styles.btn,
                                values.on_page === "mortgage" &&
                                styles.btnselected,
                                { flex: 1 },
                              ]}
                              onPress={() => {
                                setFieldValue("on_page", "mortgage");
                                getprice({ type: pageTypeMap["mortgage"] });
                              }}
                            >
                              <Text
                                style={{
                                  color:
                                    values.on_page === "mortgage"
                                      ? "white"
                                      : "black",
                                  fontWeight: 600,
                                  fontSize: ms(11),
                                  fontFamily: "PopinRegula",
                                }}
                              >
                                Mortgage Providers
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <TouchableOpacity
                            style={[
                              styles.btn,
                              values.on_page === "maintenance" &&
                              styles.btnselected,
                              { width: hs(200), marginTop: vs(10) },
                            ]}
                            onPress={() => {
                              setFieldValue("on_page", "maintenance");
                              getprice({ type: pageTypeMap["maintenance"] });
                            }}
                          >
                            <Text
                              style={{
                                color:
                                  values.on_page === "maintenance"
                                    ? "white"
                                    : "black",
                                fontWeight: 600,
                                fontFamily: "PopinRegula",
                              }}
                            >
                              Home maintenance
                            </Text>
                          </TouchableOpacity>

                        </>
                      )}
                    {touched && errors && (
                      <Text
                        style={{
                          color: Colors.light.red,
                          marginTop: vs(5),
                          fontFamily: "PopinRegula",
                        }}
                      >
                        {errors.on_page}
                      </Text>
                    )}
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
                      limt={1}
                      name="business_cover"
                      setValue={setFieldValue}
                      value={values.business_cover}
                    />
                    <LargeButton handleSubmit={() => { }} text="View your Ad" />
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
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        paddingHorizontal: hs(5),
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "white",
                          borderRadius: ms(10),
                          padding: hs(5),
                        
                        }}
                      >

                        <PromotionPricingCard promotionPrices={promotionPrices} setSelectedtimeprd={setTimeperiod} setprice={setSelectedAmount} setfieldvalue={setFieldValue} />
                        {touched.start_date && touched.end_date && (errors.start_date || errors.end_date) && <Text style={{ color: Colors.light.red, marginTop: vs(5), fontFamily: "PopinRegula", }}>{errors.start_date || errors.end_date}</Text>}

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
                            fontSize: ms(15),
                            fontWeight: "600",
                            fontFamily: "PopinRegula",
                          }}
                        >
                          Select your payment method
                        </Text>
                        <View style={styles.card} className="items-center">
                          <Text
                            style={{
                              fontSize: ms(15),
                              fontWeight: "600",
                              fontFamily: "PopinRegula",
                            }}
                          >
                            Your Homeilove account balance
                          </Text>
                          {AmountLoading || isFetching ? (
                            <ActivityIndicator size="small" color={Colors.light.red} />
                          ) : (
                            <Text
                              style={{
                                marginVertical: vs(10),
                                color: Colors.light.red,
                                fontSize: ms(15),
                                fontWeight: "600",
                                fontFamily: "PopinRegula",
                              }}
                            >
                              {amount.amount}
                            </Text>
                          )}
                          <Text
                            className="text-center mb-5"
                            style={{
                              color: Colors.light.textGray,
                              fontFamily: "PopinRegula",
                            }}
                          >
                            Have more ads to post then buy bundle and get extra discount.
                            You’ can use credit any time means no expiry!
                          </Text>
                          <LargeButton
                            text="Add Credits"
                            handleSubmit={() => router.push("/BuyCredit")}
                          />
                        </View>

                        <View style={styles.card2}>
                          <Text style={styles.title}>Pay and Ad post Atomaticlly</Text>

                          <TouchableOpacity
                            className="mb-4"
                            style={styles.paypalMainButton}
                            onPress={async () => {
                              if (!SelectedAmount) {
                                renderToastError("Please select bundle first");
                                return;
                              }
                              setvisible(true);
                            }}
                          >
                            <View style={styles.paypalContent}>
                              <Paypal />
                              <Text style={styles.paypalText}>
                                Pay with PayPal or Debit/Credit Card
                              </Text>
                            </View>
                          </TouchableOpacity>

                          <LargeButton
                            handleSubmit={() => {
                              if (!SelectedAmount) {
                                renderToastError("Please select bundle first");
                                return;
                              }
                              if (amount.amount >= Number(SelectedAmount)) {
                                setPaymentMethod("Wallet");

                              } else {
                                renderToastError(
                                  "You don't have enough amount in wallet, please recharge"
                                );
                              }
                            }}
                            text="Pay with wallet"
                          />
                        </View>
                      </View>
                    </View>
                    {/* <Loading isLoading={ugradeLoading } text="Loading.." /> */}
                    <LargeButton handleSubmit={() => { handleSubmit(); console.log(errors, "erreor") }} text="Pay & Submit" />
                  </>
                )}
              </Formik>
            </View>
          </View>

        </ScrollView>
        <Loading isLoading={isLoading} text="Posting Ad..." />
      </>
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
          <Text style={{ fontWeight: 600, marginTop: vs(30), fontFamily: "PopinRegula", }}>
            You have no advertisement.
          </Text>
          <Text style={{ marginTop: vs(20), fontFamily: "PopinRegula", }}>
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
  paypalContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "PopinRegula",
  },
  paypalMainButton: {
    backgroundColor: Colors.light.Yellow,
    borderRadius: ms(8),
    height: vs(48),
    justifyContent: "center",
    alignItems: "center",
  },
  paypalText: {
    marginLeft: hs(10),
    fontSize: ms(14),
    fontWeight: "600",
    color: "#003087",
    fontFamily: "PopinRegula",
  },
  card2: {
    marginVertical: vs(20),
    backgroundColor: "white",
    borderRadius: ms(8),
    elevation: 5,


    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
});
