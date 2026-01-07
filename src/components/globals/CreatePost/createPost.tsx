import { usePostGeneralPostMutation } from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import Cross from "@assets/CreateProfile/cross.svg";
import ChatIcon from "@assets/icons/chaticon.svg";
import ImageIcon from "@assets/icons/Image.svg";
import Seprater from "@assets/icons/seprater.svg";
import Veido from "@assets/icons/Viedio.svg";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { renderToastError, renderToastSuccess } from "@src/hooks/useToasty";
import { hs, ms, vs } from "@utils/design/design";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import * as Yup from "yup";
import Loading from "../Loading";
import UploadPic from "../UploadPic";
const createPost = () => {
  const UploadButton = () => (
    <View className="flex-row">
      <ImageIcon />
      <Text style={{ color: Colors.light.DarkGreen }}>Image</Text>
    </View>
  );
const [CreatePost,{isError,isLoading}]= usePostGeneralPostMutation()
const user =useAppSelector(userdata)
  const postValidation = Yup.object().shape({
    post_description: Yup.string().required("Description is required"),
  });

  const pickImage = async (setFieldValue: any) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      const uri = asset.uri;
      const filename = uri.split("/").pop();
      const ext = filename?.split(".").pop();

      setFieldValue("image", {
        uri,
        name: filename,
        type: `image/${ext}`,
      });
    }
  };
  const pickVideo = async (setFieldValue: any) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 1,
    });

    if (result.canceled) return;

    const asset = result.assets[0];
    const uri = asset.uri;
    const filename = uri.split("/").pop();
    const ext = filename?.split(".").pop();

    setFieldValue("post_video", {
      uri,
      name: filename,
      type: `video/${ext}`,
    });
  };

  return (
    <Formik
      initialValues={{
        post_description: "",
        images: [],
        post_video: null,
      }}
    onSubmit={async (values,{resetForm}) => {
  try {
    const formData = new FormData();

    formData.append("user_id",user.id ); // or from auth
    formData.append("post_description", values.post_description);

  
    values.images.forEach((img: any) => {
      formData.append("file[]", {
        uri: img.uri,
        name: img.name,
        type: img.type,
      } as any);
    });

    // ✅ Video
    if (values.post_video) {
      formData.append("post_video", {
        uri: values.post_video.uri,
        name: values.post_video.name,
        type: values.post_video.type,
      } as any);
    }

    const result = await CreatePost(formData).unwrap();
    if(result.success){
      renderToastSuccess(result.message);
      resetForm()
    }

    
  } catch (err: any) {
    renderToastError(err?.data?.message || "Post failed");
  }
}}

      validationSchema={postValidation}
    >
      {({
        errors,
        setFieldValue,
        handleSubmit,
        touched,
        values,
        handleChange,
        handleBlur,
        resetForm
      }) => (
        <>
        <View className="bg-white" style={styles.card}>
          <Text className="font-bold" style={{ fontWeight: "600" }}>
            Create Post
          </Text>
          <View
            className="flex-row"
            style={{
              backgroundColor: Colors.light.LightGreen,
              paddingHorizontal: hs(10),
              paddingVertical: vs(10),
              borderRadius: ms(10),
              marginVertical: vs(20),
            }}
          >
            <ChatIcon />

            <TextInput
              style={{ marginLeft: vs(10), fontSize: ms(14), width: hs(265) }}
              placeholder="What's up, Name?"
              onChangeText={handleChange("post_description")}
              onBlur={handleBlur("post_description")}
              value={values.post_description}
            />
          </View>
          {touched && errors && (
            <Text style={{ color: Colors.light.red, marginBottom: vs(5) }}>
              {errors.post_description}
            </Text>
          )}
          <View  className={ values.images?.length >  0 ||values.post_video?.uri ?"":"flex-row justify-between items-center"}>
            <View className={ values.images?.length > 0 ||values.post_video?.uri?"":"flex-row"}>
              <View
                style={{
                  marginTop: vs(-5),
            
                }}
              >
                <UploadPic
                  Logo={ImageIcon}
                  limt={5}
                  setValue={setFieldValue}
                  name="images"
                  text1=""
                  UploadComponenet={UploadButton}
                  value={values.images}
                  additionalText=""
                  border={false}
                />
              </View>
              { values.images?.length || !values.post_video?.uri &&(
                 <View style={{ marginHorizontal: hs(10) }}>
                <Seprater />
              </View>
              ) }
             
              <View>
                {values.post_video?.uri ? (
                   <View className="flex-row flex-wrap gap-2 justify-center">
    <View className="relative">
      
      {/* Remove button */}
      <TouchableOpacity
        onPress={() => setFieldValue("post_video", null)}
        className="absolute right-0 top-0 z-10 bg-white"
        style={{ borderRadius: ms(12), padding: 4 }}
      >
        <Cross />
      </TouchableOpacity>

      {/* Video Preview */}
      <Video
        source={{ uri: values.post_video?.uri }}
        style={{
          width: hs(200),
          height: hs(120),
          borderRadius: hs(8),
        }}

        useNativeControls
        isLooping
      />
    </View>
  </View>
                ) : (
                  <TouchableOpacity
                    className="flex-row"
                    onPress={() => {
                      pickVideo(setFieldValue);
                    }}
                  >
                    <Veido />
                    <Text style={{ color: Colors.light.DarkGreen }}>Video</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.light.red,
                paddingHorizontal: hs(50),
                paddingVertical: values.images?.length>0?vs(15):vs(10),
                borderRadius: ms(5),
               marginTop:values.images?.length>0||values.post_video?.uri? vs(10):vs(0)
              }}
              onPress={() => handleSubmit()}
            >
              <Text style={{ color: "white", fontWeight: "600",textAlign:'center' }}>Post</Text>
            </TouchableOpacity>
          </View>
           
        </View>
        <Loading text={"Creating general post"} isLoading={isLoading}/>
        </>
      )}
     
    </Formik>
  );
};

export default createPost;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: hs(10),
    marginVertical: vs(10),
    paddingHorizontal: hs(15),
    paddingVertical: vs(15),
    borderRadius: ms(20),
  },
});
