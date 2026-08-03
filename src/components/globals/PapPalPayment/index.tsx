import { usePaybyPaypalMutation } from "@/store/api/user/MainApi";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import { renderToastError } from "@src/hooks/useToasty";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Modal, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

interface PayPalProps {
  visible: boolean;
  onPress: (
    order_id: string,
    setApproveUrl: (value: string | null) => void
  ) => void;
  amount: string | number;
  type?: string;
  profileType?: string;
  upgrdeId?: number;
  upgrade_amount?: number;
  setVisible: (value: boolean) => void;
}

const PayPalScreen = ({
  visible,
  onPress,
  amount,
  setVisible,
}: PayPalProps) => {
  const captureCalled = useRef(false);

  const [createOrder, { isLoading: isCreating }] = usePaybyPaypalMutation();
  const [approveUrl, setApproveUrl] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const selectedAmount = Number(amount);

  useEffect(() => {
    if (!visible) return;

    captureCalled.current = false;
    setApproveUrl(null);
    setOrderId(null);

    if (isNaN(selectedAmount) || selectedAmount <= 0) {
      renderToastError("Invalid amount");
      return;
    }

    handlePay();
  }, [visible]);

  const handlePay = async () => {
    try {
      const response = await createOrder({ amount: selectedAmount }).unwrap();

      // ✅ Fix 1: backend now returns approve_link + order_id directly
      const { approve_link, order_id } = response;

      if (!approve_link) {
        Alert.alert("Error", "Could not get PayPal approval URL");
        return;
      }

      setApproveUrl(approve_link);
      setOrderId(order_id);
    } catch (err) {
      console.log("Payment creation error:", err);
      Alert.alert("Error", "Could not initiate payment. Please try again.");
    }
  };

  const handleNavigationChange = async (navState: any) => {
    const url = navState.url;

    const isSuccess = url.startsWith("https://example.com/success");
    const isCancel = url.startsWith("https://example.com/cancel");

    if (isSuccess && !captureCalled.current) {
      captureCalled.current = true;
      setVisible(false);
      if (!orderId) {
        renderToastError("Order ID missing");
        return;
      }

      onPress(orderId, setApproveUrl);
    }

    if (isCancel) {
      setApproveUrl(null);
      setVisible(false);
      Alert.alert("Payment Cancelled ❌", "You cancelled the payment.");
    }
  };

  const handleClose = () => {
    setApproveUrl(null);
    setOrderId(null);
    captureCalled.current = false;
    setVisible(false);
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
      <SafeAreaView
        style={{ flex: 1 }}
        edges={[ "bottom", "left", "right"]}
      >
        <HeaderWithBack title="PayPal Payment" onBackpress={handleClose} />

        {isCreating ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color="#0070ba" />
          </View>
        ) : approveUrl ? (
          <WebView
            source={{ uri: approveUrl }}
            style={{ flex: 1 }}
            onNavigationStateChange={handleNavigationChange}
            startInLoadingState
            javaScriptEnabled
            domStorageEnabled
            originWhitelist={["*"]}
            renderLoading={() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size="large" color="#0070ba" />
              </View>
            )}
          />
        ) : null}
      </SafeAreaView>
    </Modal>
  );
};

export default PayPalScreen;
