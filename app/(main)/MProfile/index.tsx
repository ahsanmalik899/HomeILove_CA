import {
  useDeletePastWorkMutation,
  useDeleteProfileMutation,
  useGetotherPastWorkQuery,
  useGetSingleProfileQuery,
  useSavePastWorkMutation,
  useUserAgentPastPostsApiQuery,
} from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import Call from "@assets/Buy/call.svg";
import Heart from "@assets/icons/heart.svg";
import Delete from "@assets/icons/MypostListing/delet.svg";
import Edit from "@assets/icons/MypostListing/edit.svg";
import Share from "@assets/icons/share.svg";
import NoImage from "@assets/SideBar/no_images.png";
import { LegendList } from "@legendapp/list";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LargeButton from "@src/components/globals/LaregeButton";
import Loading from "@src/components/globals/Loading";
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
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Index = () => {
  const user = useAppSelector(userdata);
  const params = useLocalSearchParams();
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [posts, setPosts] = useState<[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const Profiletype = params.profileType as string;
  const type = params.type as string;
  const id = Number(params.id);
  const [showPastModal, setShowPastModal] = useState(false);
  const [editingPastWork, setEditingPastWork] = useState<any>(null);
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
  const [showPast, setShowpast] = useState(false);
  const { data, isLoading } = useGetSingleProfileQuery({
    type: Profiletype,
    id,
  });
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
                ? "Hide my past deals (jobs)"
                : "Show my past deals (jobs) "
            }
          />
          {Profiletype !== "agent" && (
            <LargeButton
              handleSubmit={() => openPastWorkModal()}
              text="Add Past Jobs"
            />
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
          isLoading={
            isLoading || deleting || SavePastLoading || deletPastLoading
          }
          text="Loading.."
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
});
