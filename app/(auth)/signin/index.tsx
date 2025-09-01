/* eslint-disable import/order */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable react/function-component-definition */
// eslint-disable-next-line import/order
import { useSigninMutation } from '@/store/api/user/Authapi';
import { setusedata } from '@/store/slices/user';
import Logo from '@assets/logo/logo-black.svg';
import backgroundimage from '@assets/signinicon/Background.png';
import Google from '@assets/signinicon/Google logo.svg';
import Appple from '@assets/signinicon/apple.svg';
import Facebook from '@assets/signinicon/facbook.svg';
import { Ionicons } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import LargeButton from '@src/components/globals/LaregeButton';
import Loading from '@src/components/globals/Loading';
import { renderToastError, renderToastSuccess } from '@src/hooks/useToasty';
import { hs, ms, vs } from '@utils/design/design';
import { router } from 'expo-router';
import { Formik } from 'formik';
import { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

export default function SignInScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [signin, { isLoading }] = useSigninMutation();
  const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Incorrect password').required('Password is required'),
  });
  const dispatch = useDispatch();

  return (
    <ImageBackground
      source={backgroundimage}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1">
          <View style={styles.topSection}>
            <View style={styles.logoContainer}>
              <Logo />
            </View>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>Sign in.</Text>
            <Text style={styles.subtitle}>
              Sign in to find your perfect home or {'\n'}service.
            </Text>

            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={SignInSchema}
              onSubmit={async values => {
                try {
                  const connection =await  NetInfo.fetch();
                  if(!connection.isConnected){
                     renderToastError("No internet connection. Please check your network.");
                     return;
                  }
                  const res = await signin(values);
                  if (res?.data?.sucess) {
                    renderToastSuccess("Log in sucessfuly");
                    dispatch(setusedata(res?.data?.userData));
                    router.replace('/(main)/Home');
                  } else {
                    const message =
                      res?.data?.message ||
                      res?.error?.data?.message ||
                      res?.error?.message ||
                      (typeof res?.error === 'string' ? res.error : null) ||
                      'Network error: Check your connection';
                    renderToastError(message);
                  }
                } catch (err) {
                  renderToastError(err?.data.message || "Faild to log in ");
                  console.log(err);
                }
                
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.form}>
                  {/* Email Input */}
                  <TextInput
                    style={[styles.input, touched.email && errors.email ? styles.errorInput : null]}
                    placeholder="Email Address"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}

                  {/* Password Input with Eye Icon */}
                  <View style={[styles.passwordContainer, touched.password && errors.password ? styles.errorInput : null]}>
                    <TextInput
                      style={styles.passwordInput}
                      placeholder="Password"
                      placeholderTextColor="#999"
                      secureTextEntry={!showPassword}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Ionicons
                        name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                        size={20}
                        color="#999"
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                  )}

                  <View style={styles.forgotContainer}>
                    <TouchableOpacity onPress={() => router.push('/(auth)/forgot')}>
                      <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <View style={styles.forgotLine} />
                  </View>

                  <LargeButton handleSubmit={handleSubmit} text='Sign in' />

                  <View style={styles.orContainer}>
                    <View style={styles.line} />
                    <Text style={styles.orText}>or</Text>
                    <View style={styles.line} />
                  </View>

                  <View style={styles.socialIcons}>
                    <TouchableOpacity>
                      <Google />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Facebook />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Appple />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.registerContainer}>
                    <Text style={styles.loginTextBlack}>
                      Don’t have an account?{' '}
                    </Text>
                    <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
                      <Text style={styles.loginTextGreen}>Register Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
        <Loading text='Loging in...' isLoading={isLoading} />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  topSection: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: vs(50),
    marginBottom: vs(60),
  },
  logoContainer: {
    alignItems: 'center',
  },
  formContainer: {
    paddingHorizontal: hs(20),
    borderTopLeftRadius: ms(50),
    borderTopRightRadius: ms(50),
    paddingBottom: vs(20),
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    overflow: 'hidden',
  },
  title: {
    fontSize: ms(37),
    fontWeight: '400',
    color: 'black',
    marginTop: vs(35),
  },
  subtitle: {
    fontSize: ms(16),
    color: 'black',
    fontWeight: '500',
    marginTop: vs(10),
    lineHeight: vs(20),
  },
  input: {
    height: vs(60),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: ms(8),
    marginBottom: vs(15),
    paddingHorizontal: hs(15),
    backgroundColor: '#FFFFFF',
    fontSize: ms(14),
    color: '#333',
  },
  errorInput: {
    borderColor: 'red',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: ms(8),
    paddingHorizontal: hs(15),
    backgroundColor: '#FFFFFF',
    height: vs(60),
    marginBottom: vs(15),
  },
  passwordInput: {
    flex: 1,
    fontSize: ms(14),
    color: '#333',
  },
  forgotContainer: {
    alignItems: 'flex-end',
    marginTop: vs(10),
    marginBottom: vs(25),
  },
  forgotText: {
    fontSize: ms(14),
    color: '#4A90A4',
    fontWeight: '600',
  },
  forgotLine: {
    height: 2,
    backgroundColor: '#4A90A4',
    width: 120,
    marginTop: 0,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vs(20),
    marginVertical: vs(20),
  },
  orText: {
    marginHorizontal: 10,
    fontSize: ms(19),
    color: 'black',
    fontWeight: 'bold',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vs(10),
    marginHorizontal: hs(100),
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: vs(10),
    paddingBottom: vs(20),
  },
  loginTextBlack: {
    fontSize: ms(14),
    color: '#666',
    marginTop: vs(10),
  },
  loginTextGreen: {
    fontSize: ms(14),
    color: '#4A90A4',
    fontWeight: '600',
    marginTop: vs(10),
  },
  error: {
    color: 'red',
    marginBottom: vs(8),
  },
  form: {
    marginTop: vs(20),
  },
});