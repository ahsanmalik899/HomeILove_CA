import { userdata } from "@/store/slices/selector/user";
import Profilelogo from "@assets/CreateProfile/uploadprofilewithcircle.svg";
import Usertypelogo from "@assets/Home/accountperson.svg";
import { FormikInput } from "@src/components/globals/FormictInput";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LargeButton from "@src/components/globals/LaregeButton";
import UploadPic from "@src/components/globals/UploadPic";
import Colors from "@src/constants/Colors";
import { useAppSelector } from "@src/hooks/useReduxHooks";
import { hs, ms, vs } from "@utils/design/design";
import { Formik } from "formik";
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
  });
  return (
     <View className="bg-white flex-1">
      <ScrollView>
        <HeaderWithBack title="Account Profile" redButton buttonTitile="Delete Account" />
        <View style={{ marginHorizontal: hs(20), marginTop: vs(10), paddingBottom:vs(70)}}>
          <Text style={{ fontSize: ms(20), fontWeight: 600 }}>
            Awesome! Right place to{" "}
            <Text style={{ color: Colors.light.red }}>LOVE</Text> your home
          </Text>
          <Formik
            initialValues={{
              name: user.name,
              mobile: user.mobile,
              email: user.email,
              oldPassword: "",
              newPassword: "",
              reenterNewPassword: "",
            }}
            validationSchema={profileschemea}
            onSubmit={(values) => console.log(values)}
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
                  onChangeText={handleChange("eamil")}
                  title="Email"
                  touched={!!touched.email}
                  value={values.email}
                  placeholder="Email"
                />
                <Text style={{ marginTop: vs(10), fontWeight: 600 }}>
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
              </>
            )}
          </Formik>
          <Text
            style={{
              marginTop: vs(10),
              fontWeight: 600,
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
            <Text style={{ marginTop: vs(10), fontWeight: 600 ,fontSize:ms(15)}}>
              {user.user_type}
            </Text>
          </View>
              <UploadPic
                  Logo={Profilelogo}
                  text1="Upload "
                  text2="Logo/Pic"
                  onPress={() => {}}
                />
                <LargeButton text="Upload Account" handleSubmit={()=>{}}/>
        </View>
      </ScrollView>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})