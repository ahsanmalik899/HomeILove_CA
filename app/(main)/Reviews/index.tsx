import {
  useDeletReviewMutation,
  useGetReviewsQuery,
  useReviseReviewMutation,
  useUpdateReviewApiMutation,
} from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import Delet from "@assets/icons/MypostListing/delet.svg";
import Edit from "@assets/icons/MypostListing/edit.svg";
import { LegendList } from "@legendapp/list";
import CircleImage from "@src/components/globals/CircleImage/CircleImage";
import { FormikInput } from "@src/components/globals/FormictInput";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LargeButton from "@src/components/globals/LaregeButton";
import Loading from "@src/components/globals/Loading";
import SetRating from "@src/components/globals/SetRating";
import StarRating from "@src/components/globals/StarRating";
import TablikeButton from "@src/components/globals/TablikeButton";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { renderToastError, renderToastSuccess } from "@src/hooks/useToasty";
import { hs, ms, vs } from "@utils/design/design";
import { ImageFormater } from "@utils/ImageFormat";
import { Formik } from "formik";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
const Index = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [value, setValue] = useState("Sent");
  const user = useAppSelector(userdata);
  const [editModal, setEditModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [postrating, setpostRating] = useState(0);
  const [isRevise, setIsRevise] = useState(false);
  const [updateReviewApi] = useUpdateReviewApiMutation();
    const [reviseReview,{isLoading}] = useReviseReviewMutation();
  const updateReview = async (values: any) => {
    try {
      await updateReviewApi({
        body: {
          review_id: selectedReview?.id,
          review: values.review,
          imp_facts: values.imp_facts,
          rating: postrating,
          isRevise,
        },
      }).unwrap();
      renderToastSuccess("Review updated");

      refetchSentReviews();
      setEditModal(false);
    } catch (e) {
      renderToastError("Failed to update review");
    }
  };
  const {
    data: sentData,
    isLoading: sentLoading,
    refetch: refetchSentReviews,
  } = useGetReviewsQuery({
    id: user.id,
    type: "given",
    profile_type: selectedFilter,
  });

  const {
    data: reciveData,
    isLoading: reciveLoading,
    refetch: refetchRecived,
  } = useGetReviewsQuery({
    id: user.id,
    type: "received",
    profile_type: selectedFilter,
  });

  const filter = [
    { id: 1, name: "All" },
    { id: 2, name: "Agents" },
    { id: 3, name: "Builders" },
    { id: 4, name: "Mortgages" },
    { id: 5, name: "Electricians" },
    { id: 6, name: "Decor" },
    { id: 7, name: "Plumbers" },
    { id: 8, name: "Painters" },
    { id: 9, name: "Investors" },
    { id: 10, name: "Business" },
  ];

  const renderFilterItem = ({ item }) => {
    const isActive = selectedFilter === item.name;

    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedFilter(item.name);
        }}
        style={[styles.filterChip, isActive && styles.filterChipActive]}
      >
        <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  const ReviewCard = ({ item, type, refetch }: any) => {
    const name = type === "sent" ? item.receiver_name : item.sender_name;
    const logo = type === "sent" ? item.receiver_logo : item.sender_logo;

    const [reviseModalVisible, setReviseModalVisible] = useState(false);
    const [reviseReason, setReviseReason] = useState("");
    const [deletReview] = useDeletReviewMutation();
  
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
      Alert.alert(
        "Delete Review",
        "Are you sure you want to delete this review?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              try {
                setLoading(true);
                await deletReview({ review_id: item.id }).unwrap();
                renderToastSuccess("Review deleted successfully");
                refetch?.();
              } catch (error: any) {
                renderToastError(
                  error?.data?.message || "Failed to delete review"
                );
              } finally {
                setLoading(false);
              }
            },
          },
        ],
        { cancelable: true }
      );
    };

    return (
      <View style={styles.card}>
        <Modal
          transparent
          visible={reviseModalVisible}
          animationType="slide"
          onRequestClose={() => setReviseModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View
              style={{
                width: "90%",
                backgroundColor: "white",
                padding: 20,
                borderRadius: 12,
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}
              >
                Ask for Revision
              </Text>
              <TextInput
                placeholder="Enter reason"
                value={reviseReason}
                onChangeText={setReviseReason}
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 8,
                  padding: 10,
                  marginBottom: 20,
                  height: 100,
                  textAlignVertical: "top",
                }}
                multiline
              />
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <TouchableOpacity
                  onPress={() => setReviseModalVisible(false)}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    backgroundColor: "#ccc",
                    borderRadius: 8,
                  }}
                >
                  <Text style={{ color: "#000", fontWeight: "600" }}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <View style={{ width: 10 }} />

                <TouchableOpacity
                  onPress={async () => {
                    try {
                      setLoading(true);
                      await reviseReview({
                        review_id: item.id,
                        requested_by: user.id,
                        reason: reviseReason || "No reason provided",
                       sender_profile_type: item.receiver_profile_type,
                       sender_profile_id:item.receiver_profile_id,
                       
                       
                      }).unwrap();
                      renderToastSuccess("Revision request sent successfully");
                      refetch?.();
                      setReviseModalVisible(false);
                      setReviseReason("");
                    } catch (error: any) {
                      renderToastError(
                        error?.data?.message || "Failed to request revision"
                      );
                    } finally {
                      setLoading(false);
                    }
                  }}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    backgroundColor: Colors.light.red,
                    borderRadius: 8,
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "600" }}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.row}>
          <CircleImage source={{ uri: ImageFormater(logo) }} Size={40} />
          <View style={{ flex: 1, marginLeft: ms(10) }}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.rating}>
              <StarRating rating={item.rating} size={10} /> {item.rating}/5
            </Text>
          </View>

          {type === "sent" ? (
            <View className="flex-row justify-between gap-3">
              <TouchableOpacity onPress={handleDelete} disabled={loading}>
                <Delet />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedReview(item);
                  setpostRating(item.rating);
                  setEditModal(true);
                  setIsRevise(false);
                }}
              >
                <Edit />
              </TouchableOpacity>
            </View>
          ) : (
           <>
  {item.revision_status === "Pending" ? (
    <Text style={{color:Colors.light.DarkGreen}}>You asked for a revision</Text>
  ) : (
    <LargeButton
      handleSubmit={() => setReviseModalVisible(true)}
      text="Ask for revision"
    />
  )}
</>
          )}
        </View>

        <Text style={styles.review}>{item.review}</Text>
        {item.imp_facts ? (
          <Text style={styles.facts}>💬 {item.imp_facts}</Text>
        ) : null}
        <Text style={styles.date}>{item.timestamp}</Text>

        {type === "sent" && item.revision_status === "Pending" && (
          <View style={styles.revisionBox}>
            <Text style={styles.reasonText}>
              ⚠️ Revision Requested: {item.reason}
            </Text>

            <TouchableOpacity
              style={styles.reviseBtn}
              onPress={() => {
                setEditModal(true), setIsRevise(true), setSelectedReview(item);
                setpostRating(item.rating);
              }}
            >
              <Text style={styles.reviseText}>Revise Review</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const componenet1 = (
    <View style={{ flex: 1, marginTop: vs(10),backgroundColor:"#F4F0F0",paddingHorizontal:hs(10) }}>
      <Text style={styles.heading}>Your Sent Reviews</Text>
      <View style={styles.filterContainer}>
        <Text style={styles.sortText}>Sort by</Text>

        <FlatList
          data={filter}
          renderItem={renderFilterItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}
        />
      </View>
      {sentLoading ? (
        <ActivityIndicator size="large" style={{ marginTop: 40 }} />
      ) : (
        <LegendList
          data={sentData?.reviews}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({ item }: any) => (
            <ReviewCard item={item} type="sent" refetch={refetchSentReviews} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: vs(40) }}
          ListEmptyComponent={<Text style={styles.empty}>No sent reviews</Text>}
          refreshControl={
            <RefreshControl
              refreshing={sentLoading}
              onRefresh={() => refetchSentReviews()}
            />
          }
        />
      )}
    </View>
  );

  const componenet2 = (
    <View style={{ flex: 1, marginTop: vs(10),backgroundColor:"#F4F0F0",paddingHorizontal:hs(10) }}>
      <Text style={styles.heading}>Your Received Reviews</Text>
      <View style={styles.filterContainer}>
        <Text style={styles.sortText}>Sort by</Text>

        <FlatList
          data={filter}
          renderItem={renderFilterItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}
        />
      </View>
      {reciveLoading ? (
        <ActivityIndicator size="large" style={{ marginTop: 40 }} />
      ) : (
        <LegendList
          data={reciveData?.reviews}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({ item }: any) => (
            <ReviewCard item={item} type="received" />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: vs(40) }}
          ListEmptyComponent={
            <Text style={styles.empty}>No received reviews</Text>
          }
          refreshControl={
            <RefreshControl
              refreshing={reciveLoading}
              onRefresh={() => refetchRecived()}
            />
          }
        />
      )}
    </View>
  );

  return (
    <View className="flex-1 bg-white" style={{backgroundColor:"#F4F0F0"}}>
      <HeaderWithBack title="Reviews" />

      <View className="flex-1" style={{ marginHorizontal: hs(5) }}>
        <TablikeButton
          btn1value="Sent"
          btn2value="Received"
          btnTxt1="Sent"
          btnTxt2="Received"
        backgroundColor="#F4F0F0"
          onPress={(value) => {
            setValue(value), setSelectedFilter("All");
          }}
          value={value}
          Componet1={componenet1}
          Componet2={componenet2}
        />
      </View>
      <Modal visible={editModal} transparent animationType="slide">
        <Formik
          enableReinitialize
          initialValues={{
            review: selectedReview?.review || "",
            imp_facts: selectedReview?.imp_facts || "",
          }}
          onSubmit={(values) => {
            updateReview(values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            touched,
            errors,
            setFieldValue,
            values,
          }) => (
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Edit Review</Text>

                <SetRating
                  rating={postrating}
                  setRating={setpostRating}
                  size={30}
                />

                <FormikInput
                  title="More Description"
                  placeholder="Write here (Upto 5000 characters)"
                  onChangeText={handleChange("review")}
                  onBlur={handleBlur("review")}
                  value={values.review}
                  touched={!!touched.review}
                  errors={!!errors.review}
                  errorText={errors.review}
                  multiline
                  required={false}
                />

                <FormikInput
                  placeholder=" important facts or your experience about "
                  onChangeText={handleChange("imp_facts")}
                  onBlur={handleBlur("imp_facts")}
                  value={values.imp_facts}
                  mulipleFields
                  name="imp_facts"
                  setValue={setFieldValue}
                  title={""}
                  touched={!!touched.imp_facts}
                  errors={!!errors}
                  required={false}
                  errorText={errors.imp_facts}
                />

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    onPress={() => setEditModal(false)}
                    style={styles.cancelBtn}
                  >
                    <Text>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.submitBtn}
                  >
                    <Text style={{ color: "white" }}>Update</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </Modal>
    <Loading isLoading={isLoading} text="Loading..."/>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  heading: {
    fontSize: ms(16),
    fontWeight: "700",
    marginBottom: vs(10),
    marginLeft: ms(5),
    fontFamily: "PopinRegula",
  },
  revisionBox: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#FFF4E5",
    borderRadius: 8,
  },

  reasonText: {
    fontSize: 13,
    color: "#E67E22",
    marginBottom: 8,
  },

  reviseBtn: {
    backgroundColor: Colors.light.DarkGreen,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    alignSelf: "flex-start",
  },

  reviseText: {
    color: "#fff",
    fontWeight: "600",
  },
  empty: {
    textAlign: "center",
    marginTop: 60,
    fontSize: ms(13),
    color: "#999",
    fontFamily: "PopinRegula",
  },

  card: {
    backgroundColor: "#fff",
    marginBottom: vs(12),
    padding: ms(12),
    borderRadius: ms(12),
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: vs(6),
  },

  name: {
    fontSize: ms(14),
    fontFamily: "PopinRegula",
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: ms(20),
  },

  modalTitle: {
    fontSize: ms(16),
    fontWeight: "700",
    marginBottom: vs(12),
    textAlign: "center",
    fontFamily: "PopinRegula",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: ms(12),
    paddingVertical: vs(8),
    fontSize: ms(14),
    marginBottom: vs(12),
    fontFamily: "PopinRegula",
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: vs(10),
  },

  cancelBtn: {
    paddingVertical: vs(10),
    paddingHorizontal: hs(16),
    backgroundColor: "#ccc",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  submitBtn: {
    paddingVertical: vs(10),
    paddingHorizontal: hs(16),
    backgroundColor: Colors.light.red,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: hs(10),
  },
  rating: {
    fontSize: ms(12),
    color: Colors.light.DarkGreen,
    marginTop: vs(2),
    fontWeight: "600",
    fontFamily: "PopinRegula",
  },

  review: {
    marginTop: vs(6),
    fontSize: ms(13),
    color: "#333",
    lineHeight: 18,
    fontFamily: "PopinRegula",
  },

  facts: {
    marginTop: vs(4),
    fontSize: ms(12),
    color: "#666",
    fontStyle: "italic",
    fontFamily: "PopinRegula",
  },

  date: {
    marginTop: vs(6),
    fontSize: ms(11),
    color: "#999",
    textAlign: "right",
    fontFamily: "PopinRegula",
  },
  filterContainer: {
    backgroundColor: "#F4F0F0",
    paddingVertical: vs(5),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: vs(20),
  },

  sortText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
    marginLeft: 16,
    marginBottom: 8,
    fontFamily: "PopinRegula",
  },

  filterList: {
    paddingHorizontal: 12,
  },

  filterChip: {
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#FFFF",
    marginRight: 8,
  },

  filterChipActive: {
    backgroundColor: Colors.light.red,
  },
  filterText: {
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
    fontFamily: "PopinRegula",
  },

  filterTextActive: {
    color: "#fff",
    fontWeight: "600",
    fontFamily: "PopinRegula",
  },
});
