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
  withCircule = false,
  limt,
}: UploadPic) => {

  const pickImage = async () => {
    const currentCount = Array.isArray(value) ? value.length : value ? 1 : 0;
    const remaining = limt - currentCount;

    if (remaining <= 0) {
      alert(`You can upload only ${limt} image${limt > 1 ? "s" : ""}`);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
     mediaTypes: ["images"],
      allowsMultipleSelection: limt > 1,
      selectionLimit: limt > 1 ? remaining : 1,
      quality: 1,
    });

    if (result.canceled) return;

    const files = result.assets.map((asset) => {
      const uri = asset.uri;
      const filename = uri.split("/").pop() || `image-${Date.now()}.jpg`;
      const ext = filename.split(".").pop();

      return {
        uri,
        name: filename,
        type: `image/${ext}`,
      };
    });

    if (limt === 1) {
      setValue(name, files[0]);
    } else {
      setValue(name, [...(Array.isArray(value) ? value : []), ...files]);
    }
  };

  const images = Array.isArray(value) ? value : value ? [value] : [];

  return (
    <View style={{ marginBottom: vs(20) }}>
      <View className="flex-row">
        <Text style={{ fontSize: ms(15), fontWeight: "600" }}>
          {text1}
          <Text style={{ color: Colors.light.red }}>{text2}</Text>
          {text3}
        </Text>
        {additionalText && <Text>{` (${additionalText})`}</Text>}
      </View>

      <View
        style={{
          marginTop: vs(10),
          backgroundColor: "white",
          borderWidth: border ? 0.5 : 0,
          borderColor: Colors.light.textGray,
          borderRadius: ms(10),
          paddingVertical:vs(5),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {images.length && (
          <View className="flex-row flex-wrap gap-2 justify-center">
            {images.map((img, index) => (
              <View key={index} className="relative">
                <TouchableOpacity
                  onPress={() => {
                    if (limt === 1) {
                      setValue(name, null);
                    } else {
                      const updated = images.filter((_, i) => i !== index);
                      setValue(name, updated);

                    }
                  }}
                  style={{borderRadius:ms(12)}}
                  className="absolute right-0 top-0 z-10 bg-white "
                >
                  <Cross />
                </TouchableOpacity>

                <Image
                  source={{ uri: img.uri }}
                  style={{
                    width:limt===1?hs(200): hs(100),
                    height:limt===1? hs(250): hs(100),
                    borderRadius: hs(8),
                  }}
                />
              </View>
            ))}
          </View>
        ) }   {images.length < limt && (
          <TouchableOpacity onPress={pickImage}>
            <View
              style={[
                withCircule ? {
                  borderWidth: 1,
                  paddingHorizontal: hs(50),
                  paddingVertical: vs(50),
                  borderRadius: ms(80),
                  borderColor: Colors.light.lightGray,
                }:{paddingVertical:vs(40)}]}
            >
              <Logo />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default index;



const styles = StyleSheet.create({});
