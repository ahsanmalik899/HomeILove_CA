/* eslint-disable global-require */
/* eslint-disable react/style-prop-object */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/prefer-default-export */
import Logo from '@assets/logo/logo-black.svg';
import backgroundimage from '@assets/signupbg/bg.png';
import Colors from '@src/constants/Colors';
import { hs, ms, vs } from '@utils/design/design';
import { LinearGradient } from 'expo-linear-gradient';
import { Formik } from 'formik';
import { useState } from 'react';
import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as Yup from 'yup';
// Assuming the logo is a local asset (replace with your logo path)

export default function SignUpScreen() {
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
    // logo: Yup.string().required('Please upload a logo'),
  });

  const [open, setOpen] = useState(false);
  return (
    <LinearGradient
      colors={[Colors.light.backgroundcolor, '#FFFFFF']}
      style={styles.colordbackground}
      start={{ x: 0.6, y: 0 }}
      end={{ x: 0.6, y: 0.3 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 ">
          {/* Top section with logo */}
          <View style={styles.topSection}>
            <View style={styles.logoContainer}>
              <Logo />
            </View>
          </View>

          <ImageBackground
            source={backgroundimage}
            style={styles.bottomSection}
            resizeMode="cover"
            className="flex-1 "
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
                onSubmit={values => {
                  console.log('Form submitted:', values); // ✅ Check if this logs
                  Alert.alert('Account Created', 'Welcome to HomeLove!');
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

                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      secureTextEntry
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                    {touched.password && errors.password && (
                      <Text style={styles.error}>{errors.password}</Text>
                    )}

                    <TextInput
                      style={styles.input}
                      placeholder="Confirm Password"
                      secureTextEntry
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword}
                    />
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
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => handleSubmit()}
                    >
                      <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
              <View style={styles.loginTextContainer}>
                <Text style={styles.loginTextBlack}>
                  Already have an account?{' '}
                </Text>
                <Text style={styles.loginTextGreen}>Login</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
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
    marginBottom: vs(50),
  },
  loginTextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: vs(25),
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
  logoContainer: {
    alignItems: 'center',
  },

  formContainer: {
    paddingHorizontal: hs(20),
    borderTopLeftRadius: ms(50),
    borderTopRightRadius: ms(80),
  },
  title: {
    fontSize: ms(30),
    fontWeight: 400,
    color: 'black',
  },
  subtitle: {
    fontSize: ms(15),
    color: 'black',
    fontWeight: '500',
    marginBottom: vs(30),
    lineHeight: vs(20),
  },
  label: {
    fontSize: ms(14),
    color: '#333',
    marginBottom: vs(15),
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
  container: {
    padding: 20,
  },
  form: {
    marginTop: 20,
  },
  bottomSection: {
    flex: 0.75,
    backgroundImage: backgroundimage,
    borderTopLeftRadius: ms(30),
    borderTopRightRadius: ms(30),
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#D32F2F',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: ms(16),
    fontWeight: '600',
  },
});
