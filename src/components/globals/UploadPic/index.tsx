import Cross from "@assets/CreateProfile/cross.svg";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import * as ImagePicker from "expo-image-picker";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UploadPic } from "./type";
const index = ({
  text1,
  text2,
  text3,
  additionalText,
  Logo,
  setValue,
  name,
  border,
  value,
}: UploadPic) => {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      const uri = asset.uri;
      const filename = uri.split("/").pop();
      const ext = filename?.split(".").pop();

      setValue(name, {
        uri,
        name: filename,
        type: `image/${ext}`,
      });
    }
  };
  return (
    <View style={{ marginBottom: vs(20) }}>
      <View className="flex-row ">
        <Text style={{ fontSize: ms(15), fontWeight: 600 }}>
          {text1}
          <Text style={{ color: Colors.light.red }}>{text2}</Text>
          {text3}
        </Text>
        {additionalText && <Text>{` (${additionalText})`}</Text>}
      </View>
      <View
        style={{
          marginTop: vs(10),
          backgroundColor: value?.uri ? "black":"white",
          borderWidth: border ? 0.5 : 0,
          borderColor: Colors.light.textGray,
          height: vs(150),
          borderRadius: ms(10),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {value?.uri ? (
          <>
          <TouchableOpacity onPress={()=>setValue(name,null)} className="absolute right-2 top-2 z-10">
              <Cross/>
            </TouchableOpacity>
       
            
             <Image
            source={{ uri: value.uri }}
            style={{
              width: hs(200),
              height: hs(140),
              borderRadius: hs(8),
            }}
            resizeMode="cover"
          />
          
         </>
            
        ) : (
          <TouchableOpacity
            onPress={() => {
              pickImage();
            }}
          >
            <Logo />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
