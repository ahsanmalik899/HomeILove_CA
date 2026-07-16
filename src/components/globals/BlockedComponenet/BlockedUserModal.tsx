import { useLogoutApiMutation } from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import { resetUserData } from "@/store/slices/user";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { hs, vs } from "@utils/design/design";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import Loading from "../Loading";

type Props = {
  visible: boolean;
  message?: string;
  initialMessage?: string;
  loading?: boolean;
  onSendMessage: (message: string) => void;
};

const BlockedUserModal = ({
  visible,
  message,
  initialMessage,
  loading = false,
  onSendMessage,
}: Props) => {
  const user = useAppSelector(userdata);
  const dispatch = useDispatch();

  const [logoutApi, { isLoading }] = useLogoutApiMutation();

  const [adminMessage, setAdminMessage] = useState("");

  useEffect(() => {
    if (visible) {
      setAdminMessage(initialMessage ?? "");
    }
  }, [initialMessage, visible]);

  const handleLogout = async () => {
    try {
      const res = await logoutApi({
        user_id: user?.id,
      });

      if (res?.data?.status) {
        dispatch(resetUserData());
        router.replace("/(auth)/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSend = () => {
    if (!adminMessage.trim()) return;

    onSendMessage(adminMessage);
  };

  return (
    <>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
      >
        <View style={styles.overlay}>
          <SafeAreaView style={styles.card}>
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              {/* HEADER */}

              <View style={styles.header}>
                <View style={styles.iconCircle}>
                  <MaterialIcons
                    name="block"
                    size={55}
                    color="#fff"
                  />
                </View>

                <Text style={styles.title}>
                  Account Restricted
                </Text>

                <Text style={styles.subtitle}>
                  Your account has been temporarily blocked by the administrator.
                </Text>
              </View>

              {/* MESSAGE */}

              <View style={styles.reasonCard}>
                <View style={styles.reasonHeader}>
                  <MaterialIcons
                    name="info"
                    size={22}
                    color="#E53935"
                  />

                  <Text style={styles.reasonTitle}>
                    Why are you seeing this?
                  </Text>
                </View>

                <Text style={styles.reasonText}>
                  {message ??
                    "Your account is currently under review because it may have violated our community guidelines or terms of service. If you believe this action was taken by mistake, you can request a review below."}
                </Text>
              </View>

              {/* FEATURES */}

              <View style={styles.featureCard}>
                <Text style={styles.featureTitle}>
                  While your account is restricted:
                </Text>

                <View style={styles.featureRow}>
                  <MaterialIcons
                    name="close"
                    size={18}
                    color="#E53935"
                  />
                  <Text style={styles.featureText}>
                    You cannot create posts.
                  </Text>
                </View>

                <View style={styles.featureRow}>
                  <MaterialIcons
                    name="close"
                    size={18}
                    color="#E53935"
                  />
                  <Text style={styles.featureText}>
                    Messaging other users is disabled.
                  </Text>
                </View>

                <View style={styles.featureRow}>
                  <MaterialIcons
                    name="close"
                    size={18}
                    color="#E53935"
                  />
                  <Text style={styles.featureText}>
                    Some features may be unavailable.
                  </Text>
                </View>
              </View>

              {/* INPUT */}

              <View style={styles.inputHeader}>
                <MaterialIcons
                  name="chat"
                  color={Colors.light.DarkGreen}
                  size={22}
                />

                <Text style={styles.inputTitle}>
                  Message Administrator
                </Text>
              </View>

              <TextInput
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                placeholder="Explain your situation here..."
                placeholderTextColor="#999"
                style={styles.input}
                value={adminMessage}
                onChangeText={setAdminMessage}
                maxLength={500}
              />

              <Text style={styles.counter}>
                {adminMessage.length}/500
              </Text>

              {/* SEND */}

              <TouchableOpacity
                disabled={loading}
                style={styles.button}
                onPress={handleSend}
              >
                <MaterialIcons
                  name="send"
                  size={20}
                  color="#fff"
                />

                <Text style={styles.buttonText}>
                  {loading
                    ? "Sending..."
                    : "Send Review Request"}
                </Text>
              </TouchableOpacity>

              {/* LOGOUT */}

              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: "#E53935",
                    marginTop: vs(10),
                  },
                ]}
                onPress={handleLogout}
              >
                <MaterialIcons
                  name="logout"
                  size={20}
                  color="#fff"
                />

                <Text style={styles.buttonText}>
                  Logout
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  marginHorizontal: hs(20),
                  marginVertical: vs(12),
                }}
              >
                <Text style={styles.footer}>
                  Our support team usually responds within 24–48 hours.
                </Text>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>

        <Loading
          isLoading={loading || isLoading}
          text="Please wait..."
        />
      </Modal>
    </>
  );
};

export default BlockedUserModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.65)",
    justifyContent: "center",
    padding: 18,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 25,
    maxHeight: "92%",
    overflow: "hidden",
  },

  header: {
    backgroundColor: "#E53935",
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 25,
  },

  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(255,255,255,.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },

  subtitle: {
    marginTop: 10,
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
    lineHeight: 22,
  },

  reasonCard: {
    margin: 20,
    backgroundColor: "#FFF5F5",
    borderRadius: 15,
    padding: 18,
  },

  reasonHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  reasonTitle: {
    marginLeft: 8,
    fontWeight: "700",
    fontSize: 17,
  },

  reasonText: {
    color: "#666",
    lineHeight: 23,
    fontSize: 15,
  },

  featureCard: {
    marginHorizontal: 20,
    backgroundColor: "#F7F8FA",
    borderRadius: 15,
    padding: 18,
  },

  featureTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 12,
  },

  featureRow: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },

  featureText: {
    marginLeft: 10,
    color: "#555",
    flex: 1,
  },

  inputHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 22,
    marginBottom: 10,
  },

  inputTitle: {
    marginLeft: 8,
    fontWeight: "700",
    fontSize: 17,
  },

  input: {
    marginHorizontal: 20,
    minHeight: 140,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#DDD",
    backgroundColor: "#FAFAFA",
    padding: 15,
    fontSize: 15,
  },

  counter: {
    textAlign: "right",
    color: "#888",
    marginTop: 6,
    marginRight: 22,
  },

  button: {
    marginHorizontal: 20,
    marginTop: 20,
    height: 56,
    borderRadius: 15,
    backgroundColor: Colors.light.DarkGreen,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  buttonText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "700",
    fontSize: 17,
  },

  footer: {
    textAlign: "center",
    color: "#888",
    lineHeight: 20,
  },
});