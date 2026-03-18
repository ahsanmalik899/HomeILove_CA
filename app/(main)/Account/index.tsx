import { useUpdateAccountApiMutation } from "@/store/api/user/MainApi";
import { userdata } from "@/store/slices/selector/user";
import Profilelogo from "@assets/CreateProfile/uploadprofilewithcircle.svg";
import Usertypelogo from "@assets/Home/accountperson.svg";
import { FormikInput } from "@src/components/globals/FormictInput";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LargeButton from "@src/components/globals/LaregeButton";
import UploadPic from "@src/components/globals/UploadPic";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { renderToastError, renderToastSuccess } from "@src/hooks/useToasty";
import { hs, ms, vs } from "@utils/design/design";
import { Formik } from "formik";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Yup from "yup";
const index = () => {
      const user = useAppSelector(userdata);
  const profileschemea = Yup.object().shape({
    name: Yup.string().min(2, "Too Short!").required("Name is required"),
    mobile: Yup.string()
      .matches(/^\+?[\d\s-]{10,}$/, "Invalid mobile number")
      .required("Mobile is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),

    oldPassword: Yup.string().required("Old password is required"),

    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),

    reenterNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Please re-enter new password"),
      logo:Yup.string().nullable(),
  });
  useEffect(()=>{
console.log(user.logo)
  },[user])
  const [updateAccount] = useUpdateAccountApiMutation();
  return (
     <View className="bg-white flex-1">
      <ScrollView>
        <HeaderWithBack title="Account Profile" redButton buttonTitile="Delete Account" />
        <View style={{ marginHorizontal: hs(20), marginTop: vs(10), paddingBottom:vs(70)}}>
          <Text style={{ fontSize: ms(20), fontWeight: 600, fontFamily: "PopinRegula", }}>
            Awesome! Right place to{" "}
            <Text style={{ color: Colors.light.red,fontFamily: "PopinRegula", }}>LOVE</Text> your home
          </Text>
          <Formik
          enableReinitialize
            initialValues={{
              name: user.name,
              mobile: user.mobile||"",
              email: user.email,
              oldPassword: "",
              newPassword: "",
              reenterNewPassword: "",
              logo:user.logo||null,
            }}
            validationSchema={profileschemea}
          onSubmit={async (values) => {
  try {

    const body = {
      user_id: user.id,
      name: values.name,
      email: values.email,
      mobile: values.mobile,
      old_password: values.oldPassword,
      new_password: values.newPassword,
      logo: values.logo
    };

    const res = await updateAccount(body).unwrap();

    if(res.success){
      renderToastSuccess(res.message);
    }

  } catch (error) {
    renderToastError("Update failed");
  }
}}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
            }) => (
              <>
                <FormikInput
                  errorText={errors.name}
                  onBlur={handleBlur("name")}
                  errors={!!errors.name}
                  required
                  onChangeText={handleChange("name")}
                  title="Name"
                  touched={!!touched.name}
                  value={values.name}
                  placeholder="Name"
                />
                <FormikInput
                  errorText={errors.mobile}
                  onBlur={handleBlur("mobile")}
                  errors={!!errors.mobile}
                  required
                  onChangeText={handleChange("mobile")}
                  title="Mobile"
                  touched={!!touched.mobile}
                  value={values.mobile}
                  placeholder="Phone Number"
                />
                <FormikInput
                  errorText={errors.email}
                  onBlur={handleBlur("email")}
                  errors={!!errors.email}
                  required
               onChangeText={handleChange("email")}
                  title="Email"
                  touched={!!touched.email}
                  value={values.email}
                  placeholder="Email"
                />
                <Text style={{ marginTop: vs(10), fontWeight: 600,fontFamily: "PopinRegula", }}>
                  Change Password
                </Text>
                <FormikInput
                  errorText={errors.oldPassword}
                  onBlur={handleBlur("oldPassword")}
                  errors={!!errors.oldPassword}
                  required
                  onChangeText={handleChange("oldPassword")}
                  title="Old Password"
                  touched={!!touched.oldPassword}
                  value={values.oldPassword}
                  placeholder=""
                />
                <FormikInput
                  errorText={errors.newPassword}
                  onBlur={handleBlur("newPassword")}
                  errors={!!errors.newPassword}
                  required
                  onChangeText={handleChange("newPassword")}
                  title="New Password"
                  touched={!!touched.newPassword}
                  value={values.newPassword}
                  placeholder=""
                />
                <FormikInput
                  errorText={errors.reenterNewPassword}
                  onBlur={handleBlur("reenterNewPassword")}
                  errors={!!errors.reenterNewPassword}
                  required
                  onChangeText={handleChange("reenterNewPassword")}
                  title="Re-enter New Password"
                  touched={!!touched.reenterNewPassword}
                  value={values.reenterNewPassword}
                  placeholder=""
                />
            
           
          <Text
            style={{
              marginTop: vs(10),
              fontWeight: 600,
              fontFamily: "PopinRegula",
            }}
          >
            User Type:
          </Text>
          <View
            className="justify-center items-center"
            style={{
              height: vs(120),
              borderWidth: ms(0.5),
              borderColor: Colors.light.textGray,
              marginVertical: vs(10),
              borderRadius: ms(5),
            }}
          >
            <Usertypelogo />
            <Text style={{ marginTop: vs(10), fontWeight: 600 ,fontSize:ms(15),fontFamily: "PopinRegula",}}>
              {user.user_type}
            </Text>
          </View>
              <UploadPic
                  Logo={Profilelogo}
                  text1="Upload "
                  text2="Logo/Pic"
                  limt={1}
                  name="logo"
                  setValue={setFieldValue}
                   value={values.logo}                />
                <LargeButton text="Update Account" handleSubmit={handleSubmit} />
                    </>
                 )}
          </Formik>
        </View>
        
      </ScrollView>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})