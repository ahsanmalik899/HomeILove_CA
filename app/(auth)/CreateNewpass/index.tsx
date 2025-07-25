/* eslint-disable import/order */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/function-component-definition */
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import { useState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import * as Yup from 'yup';

import { useSetpasswordMutation } from '@/store/api/user/Authapi';
import Logo from '@assets/logo/logo-black.svg';
import backgroundimage from '@assets/signinicon/Background.png';
import LargeButton from '@src/components/globals/LaregeButton';
import Loading from '@src/components/globals/Loading';
import { hs, ms, vs } from '@utils/design/design';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});

export default function CreateNewPasswordScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [setpassword, { isLoading }] = useSetpasswordMutation();
  const token = useLocalSearchParams();
  const safeToken = Array.isArray(token) ? token[0] : token;

  return (
    <ImageBackground source={backgroundimage} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Logo />
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.title}>Create New{'\n'}Password.</Text>
              <Text style={styles.subtitle}>
                Please enter and confirm your new {'\n'}password.
              </Text>

              <Formik
                initialValues={{ password: '', confirmPassword: '' }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  try {
                    console.log(safeToken);
                    const result = await setpassword({ token: safeToken.token, password: values.password });
                    console.log(result);
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <>
                    {/* Password Field */}
                    <View style={styles.inputWrapper}>
                      <TextInput
                        placeholder="Enter New Password"
                        placeholderTextColor="#999"
                        secureTextEntry={!showPassword}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        style={styles.input}
                      />
                      <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                        <Ionicons
                          name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                          size={20}
                          color="#999"
                        />
                      </TouchableOpacity>
                    </View>
                    {touched.password && errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}

                    <Text style={styles.hintText}>Must contain 8 character</Text>

                    {/* Confirm Password Field */}
                    <View style={[styles.inputWrapper, { marginTop: vs(15) }]}>
                      <TextInput
                        placeholder="Confirm New Password"
                        placeholderTextColor="#999"
                        secureTextEntry={!showConfirm}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                        style={styles.input}
                      />
                      <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={styles.eyeIcon}>
                        <Ionicons
                          name={showConfirm ? 'eye-outline' : 'eye-off-outline'}
                          size={20}
                          color="#999"
                        />
                      </TouchableOpacity>
                    </View>
                    {touched.confirmPassword && errors.confirmPassword && (
                      <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                    )}

                    <View style={{ marginTop: vs(120) }}>
                      <LargeButton text="Confirm New Password" handleSubmit={handleSubmit} />
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Loading text='Changing password' isLoading={isLoading} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#e6f0fa',
  },
  safeArea: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: vs(60),
    marginBottom: vs(70),
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderTopLeftRadius: ms(40),
    borderTopRightRadius: ms(40),
    paddingHorizontal: hs(20),
    paddingTop: vs(90),
    paddingBottom: vs(40),
    flex: 1,
  },
  title: {
    fontSize: ms(34),
    fontWeight: '400',
    color: 'black',
    lineHeight: vs(40),
    marginTop: vs(-30),
  },
  subtitle: {
    fontSize: ms(16),
    color: 'black',
    fontWeight: '500',
    marginBottom: vs(30),
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    height: vs(55),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: ms(10),
    paddingHorizontal: hs(15),
    backgroundColor: '#fff',
    fontSize: ms(14),
    color: '#000',
  },
  eyeIcon: {
    position: 'absolute',
    right: hs(10),
    top: vs(14),
  },
  hintText: {
    fontSize: ms(12),
    color: '#999',
    marginTop: vs(18),
    marginLeft: hs(190),
  },
  errorText: {
    color: 'red',
    fontSize: ms(12),
    marginTop: vs(4),
    marginLeft: hs(4),
  },
});