/* eslint-disable react/no-unescaped-entities */
/* eslint-disable global-require */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable react/function-component-definition */

import Logo from '@assets/logo/logo-black.svg';
import VerificationIllustration from '@assets/Resetscreen/feed 14.png';
import backgroundimage from '@assets/signinicon/Background.png';
import LargeButton from '@src/components/globals/LaregeButton';
import { hs, ms, vs } from '@utils/design/design';
import { useState } from 'react';
import {
  Image,
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function ForgotPasswordScreen() {
  const [countdown, setCountdown] = useState(59);

  const handleResendLink = () => {
    setCountdown(59);
    console.log('Resending verification link...');
  };

  const handleOpenGmail = () => {
    Linking.openURL('mailto:').catch(() => {
      Linking.openURL('https://gmail.com');
    });
  };

  return (
    <ImageBackground source={backgroundimage} style={styles.backgroundImage} resizeMode="cover">
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1">
          <View style={styles.topSection}>
            <View style={styles.logoContainer}>
              <Logo />
            </View>
          </View>

          
          <View style={styles.formContainer}>
            {/* Title */}
            <Text style={styles.title}>
              Forgot{'\n'}Password.
            </Text>

            {/* Subtitle */}
            <Text style={styles.subtitle}>
              Password Reset Link has been send to {'\n'}
              <Text style={styles.emailText}>Alexdoe@gmail.com.</Text>
            </Text>

            {/* Illustration */}
            <View style={styles.illustrationContainer}>
              <Image
                source={VerificationIllustration}
                style={styles.illustrationImage}
                resizeMode="contain"
              />
            </View>

            {/* Resend Link */}
            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>
  Didn’t Receive Reset Link?{' '}
  <Text style={styles.resendLinkText} onPress={handleResendLink}>
    Resend Again
  </Text>
</Text>

              <Text style={styles.resendText}>
                <Text style={styles.againText}> </Text> Resend Link in{' '}
                <Text style={styles.countdownText}>00:{countdown.toString().padStart(2, '0')}</Text>
              </Text>
            </View>

            {/* Open Gmail */}
            <View style={{ marginTop: vs(5) }}>
              <LargeButton handleSubmit={handleOpenGmail} text="Open Gmail" />
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
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: vs(60),
    marginBottom: vs(95),
  },
  logoContainer: {
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: hs(20),
    borderTopLeftRadius: ms(50),
    borderTopRightRadius: ms(50),
    paddingBottom: vs(40), // 🆕 slightly more bottom space
  paddingTop: vs(40),  
  marginTop: vs(-40),
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    overflow: 'hidden',
  },
  title: {
    fontSize: ms(37),
    fontWeight: '400',
    color: 'black',
    marginTop: vs(-2),
     paddingTop: vs(-20),

    lineHeight: vs(44), // keeps “Verify” & “Account.” evenly spaced
  },
  subtitle: {
    fontSize: ms(16),
    color: '#373737',
    fontWeight: '500',
    marginTop: vs(12),
    lineHeight: vs(20),
  },
  emailText: {
    color: 'black',
    fontWeight: '500',
  },
  illustrationContainer: {
    height: vs(200),
    marginTop: vs(30),
    marginBottom: vs(0),
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationImage: {
    width: ms(250),
    height: vs(180),
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: vs(10),
    marginBottom: vs(30),
  },
  resendText: {
    fontSize: ms(14),
    color: 'black',
    textAlign: 'center',
    marginBottom: vs(5),
  },
  resendLinkButton: {
    padding: 1,
    marginTop: vs(9.15),
  },
  resendLinkText: {
    color: '#4A90A4',
    fontSize: ms(14),
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  countdownText: {
    color: 'black',
    fontWeight: '600',
  },
  againText: {
    color: '#4A90A4',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
 
});