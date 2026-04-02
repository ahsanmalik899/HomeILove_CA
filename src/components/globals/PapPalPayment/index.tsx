import { usePaybyPaypalMutation } from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { renderToastError } from "@src/hooks/useToasty";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Modal, View } from "react-native";
import WebView from "react-native-webview";

interface PayPalProps {
  visible: boolean;
  onPress: (order_id:string,setApproveUrl:(value:string|null)=>void) => void;
  amount: string | number;
  type?: string;
  profileType?: string;
  upgrdeId?: number;
  upgrade_amount?: number;
  setVisible:(value:boolean)=>void;
}

const PayPalScreen = ({ visible, onPress, amount,setVisible }: PayPalProps) => {
  const captureCalled = useRef(false);
  const user = useAppSelector(userdata);

  const selectedAmount = Number(amount);
  if(visible){
  if (isNaN(selectedAmount) || selectedAmount <= 0) {
    renderToastError("Invalid amount");
  }}

  const [createOrder, { isLoading: isCreating }] = usePaybyPaypalMutation();
  const [approveUrl, setApproveUrl] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedAmount > 0) handlePay();
  }, [visible]);

  const handlePay = async () => {
    try {
      const response = await createOrder({ amount: selectedAmount }).unwrap();
      const approve = response.links.find((l: any) => l.rel === "approve");

      if (!approve?.href) {
        Alert.alert("Error", "Could not get PayPal approval URL");
        return;
      }

      setApproveUrl(approve.href);
      const token = new URL(approve.href).searchParams.get("token");
      setOrderId(token);
    } catch (err) {
      console.log("Payment creation error:", err);
      Alert.alert("Error", "Payment failed");
    }
  };

  const handleNavigationChange = async (navState: any) => {
    const url = navState.url;

    if (url.includes("success") && !captureCalled.current) {
      captureCalled.current = true;
      try {
        if (!orderId) throw new Error("Order ID not found");
  onPress(orderId,setApproveUrl);
       
      
      } catch (err) {
        renderToastError("Failed to capture payment");
        console.log("Capture error:", err);
      }
    }

    if (url.includes("cancel")) {
      setApproveUrl(null);
      Alert.alert("Payment Cancelled ❌", "You cancelled the payment.");
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={() => {
        setApproveUrl(null);
        setVisible(false);
      }}
    >
      <HeaderWithBack title="PayPal Payment" onBackpress={()=>setVisible(false)}/>
      {(isCreating ) ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
            <ActivityIndicator size="large" color="#0070ba" style={{ flex: 1, justifyContent: "center" }} />
          )}
        />
      ) : null}
    </Modal>
  );
};

export default PayPalScreen;