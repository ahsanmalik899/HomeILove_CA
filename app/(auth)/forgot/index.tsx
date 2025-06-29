/* eslint-disable global-require */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable react/function-component-definition */
import Logo from '@assets/logo/logo-black.svg';
import { hs, ms, vs } from '@utils/design/design';
import { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');

  return (
    <ImageBackground
      source={require('@assets/signinicon/Background.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
      onError={(error) => console.log('Image load error:', error.nativeEvent.error)} 
    >
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1">
          <View style={styles.topSection}>
            <View style={styles.logoContainer}>
              <Logo />
            </View>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>Forgot Password.</Text>
            <Text style={styles.subtitle}>Sign in in to find your perfect home or service.</Text>

            <View style={styles.form}>
              {/* Email Input */}
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />

              {/* Sign In Button */}
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%', 
    height: '100%', 
  },
  topSection: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: vs(70), 
    marginBottom: vs(50), 
  },
  logoContainer: {
    alignItems: 'center',
  },
  formContainer: {
    paddingHorizontal: hs(20), 
    borderTopLeftRadius: ms(50), 
    borderTopRightRadius: ms(50), 
    paddingBottom: vs(500), 
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    overflow: 'hidden',
  },
  title: {
    fontSize: ms(42), 
    fontWeight: '400',
    color: 'black',
    marginTop: vs(50), 
  },
  subtitle: {
    fontSize: ms(18), 
    color: 'black',
    fontWeight: '500',
    marginTop: vs(15), 
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
  button: {
    backgroundColor: '#D32F2F',
    padding: ms(15), 
    borderRadius: ms(8),
    alignItems: 'center',
    marginTop: vs(200
 ), 
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: ms(16), 
  },
  form: {
    marginTop: vs(20), 
  },
});