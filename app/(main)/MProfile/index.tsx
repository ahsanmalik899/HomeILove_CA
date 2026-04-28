import {
  useDeletePastWorkMutation,
  useDeleteProfileMutation,
  useGetotherPastWorkQuery,
  useGetSingleProfileQuery,
  useGetUserWalletQuery,
  useSavePastWorkMutation,
  useUpgradeProfileApiMutation,
  useUserAgentPastPostsApiQuery,
} from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import Call from "@assets/Buy/call.svg";
import Heart from "@assets/icons/heart.svg";
import Delete from "@assets/icons/MypostListing/delet.svg";
import Edit from "@assets/icons/MypostListing/edit.svg";
import Share from "@assets/icons/share.svg";
import NoImage from "@assets/SideBar/no_images.png";
import Paypal from "@assets/SideBar/paypal-icon.svg";
import { MaterialIcons } from "@expo/vector-icons";
import { LegendList } from "@legendapp/list";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LargeButton from "@src/components/globals/LaregeButton";
import Loading from "@src/components/globals/Loading";
import PapPalPayment from "@src/components/globals/PapPalPayment";
import PastDealsagent from "@src/components/globals/PastDealsagent";
import PostPastWork from "@src/components/globals/PostPastWork";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { renderToastError, renderToastSuccess } from "@src/hooks/useToasty";
import { hs, ms, vs } from "@utils/design/design";
import { ImageFormater } from "@utils/ImageFormat";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Index = () => {
  const user = useAppSelector(userdata);
  const params = useLocalSearchParams();
  const [upgradeProfile, { isLoading: ugradeLoading }] =
    useUpgradeProfileApiMutation();
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [posts, setPosts] = useState<[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const Profiletype = params.profileType as string;
  const type = params.type as string;
  const [timePeriod, setTimeperiod] = useState("");
  const [SelectedAmount, setSelectedAmount] = useState("");
  const id = Number(params.id);
  const [showPastModal, setShowPastModal] = useState(false);
  const [editingPastWork, setEditingPastWork] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState("");
    const [orderId, setOrderid] = useState("");
  const {
    data: amount,
    isLoading: AmountLoading,
    isFetching,
  } = useGetUserWalletQuery({
    id: user.id,
  });
  const [savePastWork, { isLoading: SavePastLoading }] =
    useSavePastWorkMutation();
  const openPastWorkModal = (pastWork?: any) => {
    setEditingPastWork(pastWork || null);
    setShowPastModal(true);
  };

  const closePastWorkModal = () => {
    setEditingPastWork(null);
    setShowPastModal(false);
  };
  const advertiseOptions = [
    { id: "1", type: "15", price: "50" },
    { id: "2", type: "30", price: "100" },
    { id: "3", type: "60", price: "150" },
  ];
  const [showPast, setShowpast] = useState(false);
  const { data, isLoading } = useGetSingleProfileQuery({
    type: Profiletype,
    id,
  });
  const [visible, setvisible] = useState(false);
  const {
    data: othePastdata,
    isLoading: otherWorkLoding,
    refetch: pastRefetch,
  } = useGetotherPastWorkQuery(
    { user_id: user.id, work_section: Profiletype },
    { skip: Profiletype === "agent" }
  );
  const [deleteProfile, { isLoading: deleting }] = useDeleteProfileMutation();
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const [upgradeId, setUpgradeId] = useState(0);
  const [showoption, setShowoption] = useState(false);
  const [deletePastWork, { isLoading: deletPastLoading }] =
    useDeletePastWorkMutation();
  const {
    data: pastData,
    isLoading: pastLoading,
    refetch,
  } = useUserAgentPastPostsApiQuery(
    { page, per_page: perPage, user_id: user.id },
    { skip: Profiletype !== "agent" }
  );
  const handleDelete = () => {
    Alert.alert(
      "Delete Profile",
      "Are you sure you want to delete this profile?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteProfile({
                profileType: Profiletype,
                profile_id: id,
                users_id: user.id,
              }).unwrap();

              renderToastSuccess("Profile deleted");
              router.back();
            } catch (e) {
              Alert.alert("Error", "Delete failed");
            }
          },
        },
      ]
    );
  };
  const handelSubmit = async () => {
    try {
      const response = await upgradeProfile({
        profile_id: profile?.id,
      profileType: Profiletype,
        days: timePeriod,
     user_id:user.id,
        paymentMethod:paymentMethod,
        amount:SelectedAmount,
        
      }).unwrap();
setShowoption(false)
   renderToastSuccess(response?.message)
    } catch (e) {
      Alert.alert("Error", "Upgrade failed");
    }
  };
  const profile = data?.data;
  useEffect(() => {
    if (!pastData?.data) return;

    setHasMore(pastData?.has_more);

    setPosts((prev) =>
      page === 1 ? pastData.data : [...prev, ...pastData.data]
    );
    setInitialLoadDone(true);
  }, [pastData]);
  const handleDeletePastWork = (id: number) => {
    Alert.alert("Delete", "Delete this past work?", [
      {
        text: "Cancel",
        style: "cancel",
      },

      {
        text: "Delete",
        style: "destructive",

        onPress: async () => {
          try {
            const formatdata = new FormData();

            formatdata.append("user_past_work_id", id.toString());

            const res = await deletePastWork(formatdata).unwrap();

            if (res?.success) {
              renderToastSuccess("Deleted successfully");

              await pastRefetch(); // safer
            } else {
              renderToastError("Delete failed");
            }
          } catch (error) {
            console.log("Delete error", error);

            renderToastError("Something went wrong");
          }
        },
      },
    ]);
  };
  return (
    <>
      <ScrollView className="flex-1 bg-white">
        <View style={{ position: "relative" }}>
          <HeaderWithBack />
          <Image
            source={{
              uri: ImageFormater(profile?.cover),
            }}
            defaultSource={NoImage}
            style={styles.cover}
          />
        </View>

        <View style={styles.businessCard}>
          <Text style={[styles.title, { color: "white" }]}>
            {profile?.business_name}
          </Text>

          <Text style={styles.whiteText}>{profile?.address}</Text>

          <Text style={styles.whiteText}>
            {profile?.city}, {profile?.zip}, {profile?.state}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Service for</Text>
          <Text style={styles.text}>{profile?.services}</Text>

          <Text style={[styles.sectionTitle, { marginTop: 10 }]}>
            Dealing Areas
          </Text>

          <Text style={styles.text}>{profile?.dealing_areas}</Text>

          <View style={styles.rowBetween}>
            <View style={styles.row}>
              <Call />
              <Text style={styles.text}>{profile?.contact}</Text>
            </View>

            <Text style={styles.text}>{profile?.web}</Text>
          </View>

          <View style={styles.divider} />
          <View className="flex-row justify-between">
            <View style={styles.row}>
              <TouchableOpacity>
                <Heart />
              </TouchableOpacity>

              <TouchableOpacity>
                <Share />
              </TouchableOpacity>
            </View>
            {profile?.post_type === "Normal" ? (
              <LargeButton
                handleSubmit={() => {
                  setShowoption(true);
                  setUpgradeId(profile.id);
                }}
                text="Upgrade ad to trending"
              />
            ):profile?.post_type === "Trending"? (
               <LargeButton
                handleSubmit={() => {
                  setShowoption(true);
                  setUpgradeId(profile.id);
                }}
                text="Upgrade ad to Promoted"
              />
            ):(<></>)}
            <View style={styles.row}>
              <TouchableOpacity onPress={handleDelete}>
                <Delete />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  router.navigate({
                    pathname: "/CreateProfiles",
                    params: {
                      edit: "true",
                      id: id,
                      ProfileType: Profiletype,
                      type: type,
                    },
                  });
                }}
              >
                <Edit />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{ marginHorizontal: hs(20), marginTop: vs(10) }}
          className="flex-row justify-between"
        >
          <LargeButton
            handleSubmit={() => {
              setShowpast(!showPast);
            }}
            text={
              showPast
                ? "Hide my past jobs"
                : "Show my past jobs "
            }
          />
          {Profiletype !== "agent" && (
            <TouchableOpacity
              onPress={() => openPastWorkModal()}
              style={{backgroundColor:Colors.light.DarkGreen,paddingHorizontal:hs(10),paddingVertical:vs(10),borderRadius:hs(10),alignItems:"center",justifyContent:"center"}}
            >
              <Text style={{color:"white",fontSize:16,fontWeight:700}}>Add past jobs</Text>
            </TouchableOpacity>
          )}
        </View>
        {showPast && Profiletype === "agent" && (
          <View>
            <PastDealsagent
              data={posts}
              hasmore={hasMore}
              isfetching={pastLoading}
              setPage={setPage}
              type={type}
              setpost={setPosts}
              refetch={refetch}
              initialLoadDone={initialLoadDone}
            />
          </View>
        )}
        {showPast && Profiletype !== "agent" && (
          <View style={{ marginTop: vs(15) }}>
            <LegendList
              data={othePastdata?.data || []}
              keyExtractor={(item: any) => item.user_past_work_id.toString()}
              renderItem={({ item }: any) => {
                const firstImage = item.images?.length
                  ? ImageFormater(item.images[0])
                  : null;

                return (
                  <View style={styles.pastCard}>
                    <Image
                      source={firstImage ? { uri: firstImage } : NoImage}
                      style={styles.fullImage}
                    />

                    <View style={styles.pastContent}>
                      <View style={styles.rowBetween}>
                        <View>
                          <Text style={styles.pastTitle}>
                            {item.property_type}
                          </Text>

                          <Text style={styles.pastText}>
                            {item.property_sub_type}
                          </Text>
                        </View>

                        <View style={styles.row}>
                          <TouchableOpacity
                            onPress={() => openPastWorkModal(item)}
                            style={styles.iconBtn}
                          >
                            <Edit />
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() =>
                              handleDeletePastWork(item.user_past_work_id)
                            }
                            style={styles.iconBtn}
                          >
                            <Delete />
                          </TouchableOpacity>
                        </View>
                      </View>

                      <Text style={styles.pastText}>Beds : {item.beds}</Text>

                      <Text style={styles.pastText}>
                        {item.city} , {item.state}
                      </Text>

                      <Text style={styles.pastDesc}>
                        {item.job_description}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        )}
        <PostPastWork
          closeModal={closePastWorkModal}
          savePastWork={savePastWork}
          type={Profiletype}
          visible={showPastModal}
          refetch={pastRefetch}
          editData={editingPastWork}
          key={editingPastWork?.user_past_work_id || "new"}
          isLoading={SavePastLoading}
        />
      </ScrollView>
      <Loading
        isLoading={isLoading || deleting || SavePastLoading || deletPastLoading}
        text="Loading.."
      />
      <Modal visible={showoption} animationType="fade" transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(31, 31, 31, 0.5)", // semi-transparent background
            justifyContent: "center",
            paddingHorizontal: hs(5),
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: ms(10),
              padding: hs(5),
              maxHeight: "90%",
            }}
          >
            <TouchableOpacity
              style={{
                position: "absolute",
                top: hs(10),
                right: hs(10),
                zIndex: 10,
              }}
              onPress={() => setShowoption(false)}
            >
              <Text style={{ fontSize: ms(20), fontWeight: "bold" }}>×</Text>
            </TouchableOpacity>

            {/* LegendList */}
            <LegendList
              data={advertiseOptions}
              keyExtractor={(item) => item.id}
              estimatedItemSize={50}
              ListHeaderComponent={
                <View
                  className="flex-row justify-between items-center"
                  style={{
                    borderBottomWidth: 1,
                    borderColor: Colors.light.textGray,
                    borderRadius: ms(5),
                    paddingHorizontal: hs(10),
                    paddingVertical: vs(10),
                  }}
                >
                  <Text style={{ fontFamily: "PopinRegula" }}>
                    Advertise Time
                  </Text>
                  <Text style={{ fontFamily: "PopinRegula" }}>Price</Text>
                </View>
              }
              renderItem={({ item: valueitem }) => (
                <View
                  className="flex-row justify-between items-center"
                  style={{ paddingHorizontal: hs(10), paddingVertical: vs(10) }}
                >
                  <View className="flex-row items-center">
                    <TouchableOpacity
                      onPress={() => {
                        setTimeperiod(valueitem.type);
                        setSelectedAmount(valueitem.price);
                      }}
                    >
                      <MaterialIcons
                        size={20}
                        color={Colors.light.DarkGreen}
                        name={
                          timePeriod === valueitem.type
                            ? "radio-button-checked"
                            : "radio-button-unchecked"
                        }
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        marginLeft: hs(10),
                        fontFamily: "PopinRegula",
                      }}
                    >
                      For {valueitem.type} Days
                    </Text>
                  </View>
                  <Text style={{ fontFamily: "PopinRegula" }}>
                    ${valueitem.price}
                  </Text>
                </View>
              )}
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
                    handelSubmit();
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
         <Loading isLoading={ugradeLoading } text="Loading.." />
      </Modal>
         <PapPalPayment
              amount={SelectedAmount}
              onPress={(order_id, setApproveUrl) => {
                try {
                  setPaymentMethod("Paypal");
                  setOrderid(order_id);
                  handelSubmit();
                   setvisible(false);
                  setApproveUrl(null);
                } catch {
                  renderToastError("Some thing went rong");
                }
              }}
              setVisible={setvisible}
              visible={visible}
            />
    </>
  );
};

export default Index;
const styles = StyleSheet.create({
  cover: {
    height: vs(250),
    width: "100%",
    borderBottomLeftRadius: ms(20),
    borderBottomRightRadius: ms(20),
    resizeMode: "cover",
    backgroundColor: "gray",
  },
  paypalMainButton: {
    backgroundColor: Colors.light.Yellow,
    borderRadius: ms(8),
    height: vs(48),
    justifyContent: "center",
    alignItems: "center",
  },
  businessCard: {
    marginHorizontal: hs(10),
    padding: 15,
    backgroundColor: Colors.light.DarkGreen,
    borderRadius: 15,
    marginTop: vs(20),
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "PopinRegula",
  },

  whiteText: {
    color: "white",
    marginTop: 4,
    fontFamily: "PopinRegula",
  },

  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 10,
    marginTop: 10,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 5,
    fontFamily: "PopinRegula",
  },

  text: {
    fontFamily: "PopinRegula",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },

  aboutTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.DarkGreen,
    marginTop: 20,
    fontFamily: "PopinRegula",
  },
  pastCard: {
    backgroundColor: "white",
    marginHorizontal: hs(15),
    marginBottom: vs(15),
    borderRadius: 15,
    overflow: "hidden",
    elevation: 4,
  },

  fullImage: {
    width: "100%",
    height: vs(180),
    resizeMode: "cover",
  },

  pastContent: {
    padding: 12,
  },

  pastTitle: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "PopinRegula",
  },

  pastText: {
    fontSize: 13,
    marginTop: 3,
    fontFamily: "PopinRegula",
  },

  pastDesc: {
    fontSize: 13,
    marginTop: 6,
    color: "gray",
    fontFamily: "PopinRegula",
  },

  iconBtn: {
    marginLeft: 10,
  },
  paypalContent: {
    flexDirection: "row",
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
    paddingVertical: vs(10),
    paddingHorizontal: hs(15),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
});
