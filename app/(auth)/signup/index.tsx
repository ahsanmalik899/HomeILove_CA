/* eslint-disable import/order */
/* eslint-disable global-require */
/* eslint-disable react/style-prop-object */
/* eslint-disable react/function-component-definition */
import Logo from '@assets/logo/logo-black.svg';
import backgroundimage from '@assets/signupbg/bg.png';
import Uploadlogo from '@assets/signupbg/solar_upload-bold-duotone.svg';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@src/constants/Colors';
import { renderToastError, renderToastSuccess } from '@src/hooks/useToasty';
import { hs, ms, vs } from '@utils/design/design';
// import * as ImagePicker from 'expo-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Formik } from 'formik';
import { useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// eslint-disable-next-line import/order
import { useSignupMutation } from '@/store/api/user/Authapi';
import { setemail } from '@/store/slices/user';
import LargeButton from '@src/components/globals/LaregeButton';
import Loading from '@src/components/globals/Loading';
import { router } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
// Assuming the logo is a local asset (replace with your logo path)

export default function SignUpScreen() {
  const [signup, { isLoading }] = useSignupMutation();
  const dispatch = useDispatch();
  const [imagename, setimagename] = useState('');
  const SignupSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').required('Name is required'),
    mobile: Yup.string()
      .matches(/^\+?[\d\s-]{10,}$/, 'Invalid mobile number')
      .required('Mobile is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Too short').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
    busenessType: Yup.string().notOneOf(
      ['Select Business Type'],
      'Please select business type',
    ),
    logo: Yup.string().required('Please upload a logo'),
  });
  const pickImage = async (
    setFieldValue: (field: string, value: string) => void,
  ) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      setimagename(result.assets[0].fileName);
      setFieldValue('logo', selectedImage);
    }
  };

  const [showPassword, setShowPassword] = useState(true);

  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [open, setOpen] = useState(false);

  return (
    <LinearGradient
      colors={[Colors.light.backgroundcolor, '#FFFFFF']}
      style={styles.colordbackground}
      start={{ x: 0.6, y: 0 }}
      end={{ x: 0.65, y: 0.4 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 ">
          <View style={styles.topSection}>
            <View style={styles.logoContainer}>
              <Logo />
            </View>
          </View>

          <ImageBackground
            source={backgroundimage}
            resizeMode="cover"
            className="flex-1 "
            style={styles.bottomSection}
          >
            <View style={styles.formContainer}>
              <Text style={styles.title}>Create{'\n'}Account.</Text>
              <Text style={styles.subtitle}>
                Join HomeLove to discover homes & trusted services tailored for
                you.
              </Text>

              <Text style={styles.label}>Fill in the Details</Text>
              <Formik
                initialValues={{
                  name: '',
                  mobile: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                  busenessType: 'Select Business Type',
                  logo: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={async values => {
                  try {
                    const res = await signup(values).unwrap();

                    if (res?.sucess) {
                      renderToastSuccess(res?.message || 'Signup successful');
                      dispatch(setemail(values.email));
                      router.replace('/(auth)/Verifyacc');
                    } else {
                      const message =
                        res?.data?.message ||
                        res?.message ||
                        (typeof err === 'string' ? err : null) ||
                        'Network error: Check your connection';
                      renderToastError(message);
                    }
                  } catch (err) {
                    const message =
                      err?.data?.message ||
                      err?.message ||
                      (typeof err === 'string' ? err : null) ||
                      'Network error: Check your connection';
                    renderToastError(message);
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
                  <View style={styles.form}>
                    <TextInput
                      style={styles.input}
                      placeholder="Name"
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                    />
                    {touched.name && errors.name && (
                      <Text style={styles.error}>{errors.name}</Text>
                    )}

                    <TextInput
                      style={styles.input}
                      placeholder="Mobile"
                      keyboardType="phone-pad"
                      onChangeText={handleChange('mobile')}
                      onBlur={handleBlur('mobile')}
                      value={values.mobile}
                    />
                    {touched.mobile && errors.mobile && (
                      <Text style={styles.error}>{errors.mobile}</Text>
                    )}

                    <TextInput
                      style={styles.input}
                      placeholder="Email"
                      keyboardType="email-address"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.error}>{errors.email}</Text>
                    )}
                    <View style={styles.passwordContainer}>
                      <TextInput
                        style={styles.passwordInput}
                        placeholder="Password"
                        secureTextEntry={showPassword}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                      />
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                      >
                        <Ionicons
                          name={
                            showPassword ? 'eye-outline' : 'eye-off-outline'
                          }
                          size={20}
                          color="#9A9A9A"
                        />
                      </TouchableOpacity>
                    </View>
                    {touched.password && errors.password && (
                      <Text style={styles.error}>{errors.password}</Text>
                    )}

                    {/* Confirm Password Field */}
                    <View style={styles.passwordContainer}>
                      <TextInput
                        style={styles.passwordInput}
                        placeholder="Confirm Password"
                        secureTextEntry={showConfirmPassword}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                      />
                      <TouchableOpacity
                        onPress={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        <Ionicons
                          name={
                            showConfirmPassword
                              ? 'eye-outline'
                              : 'eye-off-outline'
                          }
                          size={20}
                          color="#9A9A9A"
                        />
                      </TouchableOpacity>
                    </View>
                    {touched.confirmPassword && errors.confirmPassword && (
                      <Text style={styles.error}>{errors.confirmPassword}</Text>
                    )}

                    <DropDownPicker
                      open={open}
                      value={values.busenessType}
                      items={[
                        { label: 'Business', value: 'Business' },
                        { label: 'Private', value: 'Private' },
                      ]}
                      setOpen={setOpen}
                      setValue={val => {
                        const selectedValue = val();
                        setFieldValue('busenessType', selectedValue);
                      }}
                      placeholder="Select Business Type"
                      style={{
                        marginBottom:
                          touched.busenessType && errors.busenessType ? 0 : 15,
                      }}
                    />
                    {touched.busenessType && errors.busenessType && (
                      <Text style={styles.error}>{errors.busenessType}</Text>
                    )}
                    <View style={styles.input}>
                      <Text style={styles.textview}>{imagename}</Text>
                      <TouchableOpacity
                        className="absolute right-0  "
                        onPress={() => pickImage(setFieldValue)}
                      >
                        <View className="flex-row " style={styles.uploadbutton}>
                          <Uploadlogo />
                          <Text style={styles.buttonText}>Upload Logo</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    {touched.logo && errors.logo && (
                      <Text style={styles.error}>{errors.logo}</Text>
                    )}
                    <View style={styles.loginTextContainer}>
                      <Text style={styles.loginTextBlack}>
                        Already have an account?{' '}
                      </Text>
                      <TouchableOpacity
                        onPress={() => router.push('/(auth)/signin')}
                      >
                        {' '}
                        <Text style={styles.loginTextGreen}>Login</Text>
                      </TouchableOpacity>
                    </View>
                    <LargeButton handleSubmit={handleSubmit} text="Sign up " />
                  </View>
                )}
              </Formik>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
      <Loading isLoading={isLoading} text="Creating account...." />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  colordbackground: {
    flex: 1,
    height: vs(20),
  },

  topSection: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: vs(70),
    marginBottom: vs(20),
  },
  loginTextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',

    marginTop: vs(10),
  },
  loginTextBlack: {
    fontSize: ms(14),
    color: '#666',
  },
  loginTextGreen: {
    fontSize: ms(14),
    color: '#4A90A4',
    fontWeight: '600',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: ms(8),
    marginBottom: vs(15),
    paddingHorizontal: hs(15),
    backgroundColor: '#FFFFFF',
  },

  passwordInput: {
    flex: 1,
    height: vs(48),
    fontSize: ms(14),
    color: '#333',
  },

  logoContainer: {
    alignItems: 'center',
  },

  formContainer: {
    paddingHorizontal: hs(20),
  },
  title: {
    fontSize: ms(30),
    fontWeight: 400,
    marginTop: vs(50),
    color: 'black',
  },
  subtitle: {
    fontSize: ms(15),
    color: 'black',
    fontWeight: '500',
    marginTop: vs(10),
    marginBottom: vs(20),
    lineHeight: vs(20),
  },
  label: {
    fontSize: ms(14),
    color: '#333',
    fontWeight: '500',
  },
  input: {
    height: vs(48),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: ms(8),
    marginBottom: vs(15),
    paddingHorizontal: hs(15),
    backgroundColor: '#FFFFFF',
    fontSize: ms(14),

    color: '#333',
  },
  textview: {
    marginVertical: 'auto',
  },
  container: {
    padding: 20,
  },
  form: {
    marginTop: vs(10),
  },
  bottomSection: {
    flex: 1,
    overflow: 'hidden',
    marginTop: vs(35),
    borderTopLeftRadius: ms(40),
    borderTopRightRadius: ms(40),
  },
  error: {
    color: 'red',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#D32F2F',
    padding: ms(15),
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: vs(15),
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  uploadbutton: {
    backgroundColor: Colors.light.red,
    color: 'white',
    borderRadius: 8,
    marginVertical: vs(3),
    paddingVertical: vs(10),
    paddingHorizontal: hs(5),
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: ms(16),
    fontWeight: '600',
  },
});
