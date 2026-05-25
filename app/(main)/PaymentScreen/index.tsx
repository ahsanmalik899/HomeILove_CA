import { useCapturePaymentMutation, usePaybyPaypalMutation } from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { renderToastError, renderToastSuccess } from "@src/hooks/useToasty";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import WebView from "react-native-webview";

const PayPalScreen = () => {
  const captureCalled = useRef(false);
  const user = useAppSelector(userdata);
  const {amount,type,profileType,upgrdeId,upgrade_amount}=useLocalSearchParams()
  const selectedAmount = parseFloat(amount as string);
if (isNaN(selectedAmount)) {
  renderToastError("Invalid amount");
  return;
}
  const [createOrder, { isLoading: isCreating }] = usePaybyPaypalMutation();
  const [capturePayment, { isLoading: isCapturing }] = useCapturePaymentMutation();
  const [approveUrl, setApproveUrl] = useState<string | null>(null);
useEffect(()=>{
  handlePay();
},[])
  
const handlePay = async () => {
  try {
    const response = await createOrder({
      amount: selectedAmount,
    }).unwrap();

    console.log("PAYPAL RESPONSE =", response);

    const url = response.approve_link;

    if (url) {
      setApproveUrl(url);
    } else {
      Alert.alert("Error", "Could not get PayPal approval URL");
    }
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
      const orderId = approveUrl?.split("token=")[1];
      if (!orderId) throw new Error("Order ID not found");

      const result = await capturePayment({
        order_id: orderId,
        user_id: user.id,
        upgrade_type: type,
        profile_type: profileType||"",
        upgrade_id:upgrdeId || 0,
        upgrade_amount:upgrade_amount ||0,
      }).unwrap();

      renderToastSuccess("Payment added to wallet successfully");
       router.back()
      const purchaseUnit = result.data.purchase_units[0];
      const capture = purchaseUnit.payments.captures[0];


    } catch (err) {
      renderToastError("error");
      console.log("Capture Error:", err);
      Alert.alert("Error", "Failed to capture payment");
    } finally {
      setApproveUrl(null);
    }
  }

  if (url.includes("cancel")) {
    Alert.alert("Payment Cancelled ❌", "You cancelled the payment.");
    setApproveUrl(null);
  }
};

  return (
    <View style={{ flex: 1,backgroundColor:"white" }}>
        <HeaderWithBack title="" />
      {isCreating || isCapturing? (
         <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color="#0070ba" />
    </View>
      ):approveUrl?(
        <WebView
          source={{ uri: approveUrl }}
          style={{ flex: 1 }}
          onNavigationStateChange={handleNavigationChange}
          startInLoadingState
          renderLoading={() => (
            <ActivityIndicator
              size="large"
              color="#0070ba"
              style={{ flex: 1, justifyContent: "center" }}
            />
          )}
          javaScriptEnabled
          domStorageEnabled
          originWhitelist={["*"]}
        />
      ) :null}
    </View>
  );
};

export default PayPalScreen;