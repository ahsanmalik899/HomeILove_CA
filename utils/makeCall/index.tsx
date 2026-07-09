import { Linking } from "react-native";

    export const makeCall = async (phone: string) => {
  const url = `tel:${phone}`;

  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    console.log("Phone calls are not supported on this device.");
  }
};