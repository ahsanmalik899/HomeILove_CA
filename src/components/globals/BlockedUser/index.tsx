import { MaterialIcons } from "@expo/vector-icons";
import Colors from "@src/constants/Colors";
import { hs, vs } from "@utils/design/design";
import { useEffect, useState } from "react";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import LargeButton from "../LaregeButton";

type Props = {
  visible: boolean;
  profileType?: string;
  profileId?: number | null;
  message?: string;
  initialMessage?: string; // <-- NEW
  onClose: () => void;
  onSendMessage: (message: string) => void;
  onEdit: () => void;
};

const BlockedProfileModal = ({
  visible,
  profileType,
  message,
  initialMessage,
  onClose,
  onSendMessage,
  onEdit,
}: Props) => {
  const [adminMessage, setAdminMessage] = useState("");

  // Populate previous message whenever modal opens
  useEffect(() => {
    if (visible) {
      setAdminMessage(initialMessage || "");
    }
  }, [visible, initialMessage]);

  const handleSend = () => {
    if (!adminMessage.trim()) return;

    onSendMessage(adminMessage);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.card}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <MaterialIcons
              name="close"
              size={24}
              color="#666"
            />
          </TouchableOpacity>

          {/* Header */}

          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <MaterialIcons
                name="block"
                size={36}
                color="#fff"
              />
            </View>

            <Text style={styles.title}>Profile Blocked</Text>

            <Text style={styles.subtitle}>
              This profile has been blocked by the administrator.
            </Text>

            {!!profileType && (
              <Text style={styles.profileType}>
                {profileType.toUpperCase()} PROFILE
              </Text>
            )}
          </View>

          {/* Reason */}

          <View style={styles.reasonCard}>
            <View style={styles.reasonHeader}>
              <MaterialIcons
                name="info"
                size={18}
                color="#E53935"
              />

              <Text style={styles.reasonTitle}>Reason</Text>
            </View>

            <Text style={styles.reasonText}>
              {message ??
                "This profile is under review. If you believe this was a mistake, update your profile or send a review request."}
            </Text>
          </View>

          {/* Message */}

          <View style={styles.inputHeader}>
            <MaterialIcons
              name="chat"
              size={20}
              color={Colors.light.DarkGreen}
            />

            <Text style={styles.inputTitle}>
              Message Administrator
            </Text>
          </View>

          <TextInput
            multiline
            textAlignVertical="top"
            placeholder="Write your message..."
            placeholderTextColor="#999"
            style={styles.input}
            value={adminMessage}
            onChangeText={setAdminMessage}
            maxLength={300}
          />

          <Text style={styles.counter}>
            {adminMessage.length}/300
          </Text>

          <View
            style={{
              marginHorizontal: hs(18),
              marginTop: vs(10),
            }}
          >
          <TouchableOpacity
  style={styles.sendButton}
  onPress={handleSend}
  activeOpacity={0.8}
>
  <MaterialIcons
    name="send"
    size={20}
    color="#fff"
  />
  <Text style={styles.sendButtonText}>
    Send Review Request
  </Text>
</TouchableOpacity>
          </View>

          <View
            style={{
              marginHorizontal: hs(18),
              marginTop: vs(8),
            }}
          >
            <LargeButton
              text="Edit Profile"
              handleSubmit={onEdit}
            />
          </View>

          <Text style={styles.footer}>
            Support usually responds within 24–48 hours.
          </Text>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default BlockedProfileModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.55)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
sendButton: {
  marginHorizontal: hs(18),
  marginTop: vs(10),
  height: 50,
  borderRadius: 12,
  backgroundColor: Colors.light.DarkGreen, // Dark Green
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
},

sendButtonText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "700",
  marginLeft: 8,
},
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingBottom: 18,
  },

  closeButton: {
    position: "absolute",
    right: 12,
    top: 12,
    zIndex: 10,
  },

  header: {
    backgroundColor: "#E53935",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,.18)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

  subtitle: {
    color: "#fff",
    textAlign: "center",
    marginTop: 4,
    fontSize: 13,
  },

  profileType: {
    color: "#fff",
    fontWeight: "700",
    marginTop: 8,
    fontSize: 13,
  },

  reasonCard: {
    marginHorizontal: 18,
    marginTop: 16,
    backgroundColor: "#FFF5F5",
    borderRadius: 12,
    padding: 14,
  },

  reasonHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  reasonTitle: {
    marginLeft: 6,
    fontSize: 15,
    fontWeight: "700",
  },

  reasonText: {
    color: "#666",
    lineHeight: 20,
    fontSize: 14,
  },

  inputHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 18,
    marginTop: 16,
    marginBottom: 8,
  },

  inputTitle: {
    marginLeft: 6,
    fontWeight: "700",
    fontSize: 15,
  },

  input: {
    marginHorizontal: 18,
    height: 90,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    backgroundColor: "#FAFAFA",
    padding: 12,
    fontSize: 14,
  },

  counter: {
    textAlign: "right",
    color: "#888",
    marginRight: 20,
    marginTop: 4,
    fontSize: 12,
  },

  footer: {
    marginTop: 12,
    textAlign: "center",
    color: "#888",
    fontSize: 12,
    paddingHorizontal: 20,
  },
});