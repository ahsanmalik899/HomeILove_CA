import {
  useDeleterecivedInquiriesMutation,
  useDeletSendedInquiryMutation,
  useGetRecivedInquieryQuery,
  useGetsendedInquieryQuery,
} from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import Delete from "@assets/SideBar/deletbaskit.svg";
import { MaterialIcons } from "@expo/vector-icons";
import { LegendList } from "@legendapp/list";
import CircleImage from "@src/components/globals/CircleImage/CircleImage";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import Loading from "@src/components/globals/Loading";
import TablikeButton from "@src/components/globals/TablikeButton";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { renderToastError, renderToastSuccess } from "@src/hooks/useToasty";
import { hs, ms, vs } from "@utils/design/design";
import { ImageFormater } from "@utils/ImageFormat";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const index = () => {
  const user = useAppSelector(userdata);
  const [value, setValue] = useState("Sent");
  const [ids, setIds] = useState<number[]>([]);
  const [recivesIds, setReciveIds] = useState<number[]>([]);
  const [deletsended, { isLoading }] = useDeletSendedInquiryMutation();
  const [deletrecived, { isLoading: loadingRecivedDelet }] =
    useDeleterecivedInquiriesMutation();
  const [selectAll, setSellectall] = useState(false);
  const [selectAllcomp2, setSellectallcomp2] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteType, setDeleteType] = useState<"sent" | "received" | null>(
    null
  );

  const handleSelect = (id: number | string) => {
    const numId = Number(id);
    setIds((prev) => {
      if (prev.includes(numId)) {
        return prev.filter((i) => i !== numId);
      } else {
        return [...prev, numId];
      }
    });
  };
  const handlereciveSelect = (id: number | string) => {
    const numId = Number(id);
    setReciveIds((prev) => {
      if (prev.includes(numId)) {
        return prev.filter((i) => i !== numId);
      } else {
        return [...prev, numId];
      }
    });
  };
  const [sendpage, setsendPage] = useState(1);
  const [recivedpage, setrecivedPage] = useState(1);
  const [sended, setsended] = useState([]);
  const [recived, setrecived] = useState([]);
  const { isFetching, data,refetch:refetchSended } = useGetsendedInquieryQuery({
    id: user.id,
    page: sendpage,
  });
    const confirmDelete = async () => {
      try {
        if (deleteType === "sent") {
          const formData = new FormData();
          formData.append("ids", ids.join(","));

          const result = await deletsended(formData).unwrap();
          renderToastSuccess("Deleted successfully!");

          setsended((prev) =>
            prev.filter((item) => !ids.includes(Number(item.inquiry_id)))
          );

          setIds([]);
          setSellectall(false);
        }

        if (deleteType === "received") {
          const formData = new FormData();
          formData.append("ids", recivesIds.join(","));
          formData.append("user_id", user.id.toString());

          const result = await deletrecived(formData).unwrap();
          renderToastSuccess("Deleted successfully!");

          setrecived((prev) =>
            prev.filter((item) => !recivesIds.includes(Number(item.inquiry_id)))
          );

          setReciveIds([]);
          setSellectallcomp2(false);
        }

        setShowConfirm(false);
      } catch (err) {
        console.log("Delete Error:", err);
        renderToastError("Failed to delete inquiries");
        setShowConfirm(false);
      }
    };
  const { isFetching: recivedLoading, data: recivedData, refetch: refetchRecived } =
    useGetRecivedInquieryQuery({ id: user.id, page: recivedpage });
  const renderItem = ({ item }) => {
    const profileCount = item.profiles?.length || 0;
    const [showprofile, setShowprofile] = useState(false);
  

    return (
      <TouchableOpacity
        style={[
          styles.card,
          {
            elevation: ids.includes(Number(item.inquiry_id)) ? 0 : 3,
            backgroundColor: ids.includes(Number(item.inquiry_id))
              ? Colors.light.LightGreen
              : "#fff",
            borderColor: ids.includes(Number(item.inquiry_id))
              ? Colors.light.DarkGreen
              : "#eee",
          },
        ]}
        activeOpacity={0.9}
        onPress={() => handleSelect(item.inquiry_id)}
      >
        <View style={styles.topRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>
              {item.inquiry_for}
              {item.inquiry_type && (
                <Text style={styles.subTitle}> • {item.inquiry_type}</Text>
              )}
            </Text>
            <Text style={styles.address}>{item.address}</Text>
          </View>
          <Text style={styles.date}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>

        {(item.property_type || item.min_price || item.max_price) && (
          <View style={styles.infoRow}>
            {item.property_type && (
              <View style={styles.tag}>
                <Text style={styles.tagText}>{item.property_type}</Text>
              </View>
            )}
            {item.min_price && item.max_price && (
              <View style={styles.tag}>
                <Text style={styles.tagText}>
                  ${item.min_price} - ${item.max_price}
                </Text>
              </View>
            )}
            {item.min_bed && (
              <View style={styles.tag}>
                <Text style={styles.tagText}>
                  {item.min_bed}-{item.max_bed} Beds
                </Text>
              </View>
            )}
          </View>
        )}

        {item.message && (
          <Text numberOfLines={2} style={styles.message}>
            {item.message}
          </Text>
        )}

        <TouchableOpacity
          onPress={() => setShowprofile(showprofile ? false : true)}
        >
          {showprofile ? (
            <Text style={styles.subTitle}>Hide</Text>
          ) : (
            <Text style={styles.subTitle}>
              {profileCount} {profileCount > 1 ? "profiles" : "profile"}{" "}
              received your inquiry:
            </Text>
          )}
        </TouchableOpacity>
        {showprofile && item.profiles?.length > 0 && (
          <LegendList
            className="bg-black"
            data={item.profiles}
            extraData={ids}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) =>
              item.users_id?.toString() || Math.random().toString()
            }
            renderItem={({ item: profile }) => (
              <TouchableOpacity style={styles.card}>
                <View style={styles.topRow}>
                  <CircleImage
                    Size={45}
                    source={{ uri: ImageFormater(profile?.logo) }}
                  />

                  <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{profile?.business_name}</Text>
                    <Text style={styles.address}>{profile?.address}</Text>
                  </View>
                </View>
                {profile?.inquiry_closed && (
                  <View style={styles.closedBadge}>
                    <Text style={styles.closedText}>Inquiry Closed</Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
          />
        )}
      </TouchableOpacity>
    );
  };
  const renderrecived = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          styles.card,
          {
            elevation: recivesIds.includes(Number(item.inquiry_id)) ? 0 : 3,
            backgroundColor: recivesIds.includes(Number(item.inquiry_id))
              ? Colors.light.LightGreen
              : "#fff",
            borderColor: recivesIds.includes(Number(item.inquiry_id))
              ? Colors.light.DarkGreen
              : "#eee",
          },
        ]}
        onPress={() => handlereciveSelect(item.inquiry_id)}
      >
        <View style={styles.senderBox}>
          <CircleImage
            Size={45}
            source={{
              uri: item.sender_image
                ? ImageFormater(item.sender_image)
                : "https://i.pravatar.cc/150?img=12",
            }}
          />

          {/* INFO */}
          <View style={{ flex: 1 }}>
            <Text style={styles.senderName}>{item.sender_name}</Text>

            {item.sender_phone && (
              <Text style={styles.senderInfo}>📞 {item.sender_phone}</Text>
            )}

            {item.sender_email && (
              <Text style={styles.senderInfo}>✉️ {item.sender_email}</Text>
            )}
          </View>
        </View>
        {/* TOP ROW */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.inquiryFor}>{item.inquiry_for}</Text>

            {item.inquiry_type && (
              <Text style={styles.inquiryType}>{item.inquiry_type}</Text>
            )}
          </View>

          <Text style={styles.date}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>

        {/* ADDRESS */}
        {item.address && <Text style={styles.address}>📍 {item.address}</Text>}

        {item.message && <Text style={styles.message}>💬 {item.message}</Text>}
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (data?.success) {
      if (sendpage === 1) {
        setsended(data?.data || []);
      } else {
        setsended((prev) => [...prev, ...(data?.data || [])]);
      }
    }
  }, [data]);
  useEffect(() => {
    if (recivedData?.success) {
      if (recivedpage === 1) {
        setrecived(recivedData?.data || []);
      } else {
        setrecived((prev) => [...prev, ...(recivedData?.data || [])]);
      }
    }
  }, [recivedData]);
  const componenet1 = (
    <View style={{ marginTop: vs(10), flex: 1 }}>
      <Text>Your inquiries</Text>
      <View className="justify-between flex-row" style={{ marginTop: vs(10) }}>
        <TouchableOpacity
          className="flex-row gap-3 mb-3"
          onPress={() => {
            const newSelectAll = !selectAll;
            setSellectall(newSelectAll);
            console.log(data);
            setIds(newSelectAll ? data?.all_ids ?? [] : []);
          }}
        >
          <MaterialIcons
            size={18}
            color={Colors.light.DarkGreen}
            name={selectAll ? "check-box" : "check-box-outline-blank"}
          />
          <Text>Select All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (!ids.length) return;
            setDeleteType("sent");
            setShowConfirm(true);
          }}
        >
          <Delete />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        {!isFetching && sended?.length === 0 ? (
          <View style={{ alignItems: "center", marginTop: 120 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "black" }}>
              No Data Found
            </Text>
          </View>
        ) : (
          <LegendList
            className="bg-black"
            data={sended}
            extraData={ids}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item) => item.inquiry_id?.toString()}
            onEndReached={() => {
              if (sended?.length > 9) setsendPage((prev) => prev + 1);
            }}
            ListFooterComponent={
              isFetching ? <ActivityIndicator size="small" /> : null
            }
            refreshControl={
              <RefreshControl
                refreshing={isFetching}
                onRefresh={()=>{
   setsendPage(1);
   refetchSended();
}} 
              />
            }
          />
        )}
      </View>
    </View>
  );
  const componenet2 = (
    <View style={{ marginTop: vs(10), flex: 1 }}>
      <View>
        <Text>Your inquiries</Text>
      </View>

      {!recivedLoading && recived?.length === 0 ? (
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: ms(20), fontWeight: 600 }}>
            Boost your <Text style={{ color: Colors.light.red }}>BUSINESS</Text>{" "}
            & to next level
          </Text>
          <Text style={{ marginTop: vs(20) }}>
            Upgrade your business profile to Trending and receive unlimited
            queries relevant to your business such as if you upgrade your agent
            profile then you can receive queries for buying,selling or letting
            from your city No limit of receiving queries untill your profile
            remains trending you will keep receiving queries. Simply go to your
            business profiles and select the profile you want to upgrade and
            starting getting enquiries straight into your account. Increase your
            clientele base without spending too much on advertisement.
          </Text>
          <TouchableOpacity>
            <Text style={{ color: Colors.light.DarkGreen }}>
              One place to boost your businesss
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex-1">
          <View
            className="justify-between flex-row"
            style={{ marginTop: vs(10) }}
          >
            <TouchableOpacity
              className="flex-row gap-3 mb-3"
              onPress={() => {
                const newSelectAll = !selectAllcomp2;
                setSellectallcomp2(newSelectAll);
                console.log(data);
                setReciveIds(newSelectAll ? recivedData?.all_ids ?? [] : []);
              }}
            >
              <MaterialIcons
                size={18}
                color={Colors.light.DarkGreen}
                name={selectAllcomp2 ? "check-box" : "check-box-outline-blank"}
              />
              <Text>Select All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (!recivesIds.length) return;
                setDeleteType("received");
                setShowConfirm(true);
              }}
            >
              <Delete />
            </TouchableOpacity>
          </View>
          <LegendList
            className="bg-black"
            data={recived}
            extraData={recivesIds}
            showsVerticalScrollIndicator={false}
            renderItem={renderrecived}
            keyExtractor={(item) => item.inquiry_id?.toString()}
            onEndReached={() => {
              if (recived?.length > 9) setrecivedPage((prev) => prev + 1);
            }}
            ListFooterComponent={
              isFetching ? <ActivityIndicator size="small" /> : null
            }
            refreshControl={
              <RefreshControl
              refreshing={recivedLoading}
               onRefresh={()=>{
   setrecivedPage(1);
   refetchRecived();
}}
              />
            }
          />
        </View>
      )}
    </View>
  );
  return (
    <View className="flex-1 bg-white" style={{backgroundColor:"#F4F0F0"}}>
      <HeaderWithBack title="Inquiries" />
      <View className="flex-1" style={{ marginHorizontal: hs(10) }}>
        <TablikeButton
          btn1value="Sent"
          btn2value="Received"
          btnTxt1="Sent"
          btnTxt2="Received"
          onPress={(value) => setValue(value)}
          value={value}
          Componet1={componenet1}
          Componet2={componenet2}
          backgroundColor="#F4F0F0"
        />
      </View>
      <Loading isLoading={isLoading} text="Deleting..." />
      <View
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
       {showConfirm && (
  <View
    style={{
      width: "100%",
      height: "100%",
      position: "absolute",
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <View
      style={{
        width: "80%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 12,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 20 }}>
        Are you sure you want to delete{" "}
        {deleteType === "sent" ? ids.length : recivesIds.length} inquiries?
      </Text>

      <View style={{ flexDirection: "row",justifyContent:"space-between" }}>
        <TouchableOpacity onPress={() => setShowConfirm(false)}>
          <Text style={{ color: "gray", fontWeight: "600" }}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={confirmDelete}>
          <Text style={{ color: Colors.light.red, fontWeight: "700" }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
)}

      </View>
      <Loading isLoading={loadingRecivedDelet||isLoading} text="Deleting ..."/>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  smallCard: {
    padding: ms(12),
    borderRadius: 14,
    marginVertical: vs(6),
    marginHorizontal: hs(2),
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  name: {
    fontSize: ms(16),
    fontWeight: "500",
    color: Colors.light.red,
    fontFamily: "PopinRegula",
  },

  city: {
    fontSize: ms(12),
    color: "#666",
    marginTop: 2,
    fontFamily: "PopinRegula",
  },
  card: {
    marginVertical: 8,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.light.red,
    fontFamily: "PopinRegula",
  },

  subTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.light.DarkGreen,
    fontFamily: "PopinRegula",
  },

  address: {
    fontSize: 13,
    color: "#777",
    marginTop: 3,
    fontFamily: "PopinRegula",
  },

  date: {
    fontSize: 12,
    color: "#999",
    fontWeight: "600",
    fontFamily: "PopinRegula",
  },

  infoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    gap: 6,
  },

  tag: {
    backgroundColor: Colors.light.DarkGreen,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  tagText: {
    fontSize: 12,
    color: "white",
    fontWeight: "600",
    fontFamily: "PopinRegula",
  },

  message: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "black",
    fontFamily: "PopinRegula",
  },
  senderBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingTop: vs(5),
    paddingBottom: vs(10),
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  senderName: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.light.red,
    fontFamily: "PopinRegula",
  },

  senderInfo: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
    fontFamily: "PopinRegula",
  },
  closedBadge: {
    marginTop: 10,
    alignSelf: "flex-start",
    backgroundColor: "#ffe5e5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  closedText: {
    color: Colors.light.red,
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "PopinRegula",
  },
});
