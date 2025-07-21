/* eslint-disable import/order */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable global-require */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable react/function-component-definition */
import { useResendVaerificationMutation } from '@/store/api/user/Authapi';
import { userdata } from '@/store/slices/selector/user';
import VerificationIllustration from '@assets/Vacc/feed 12.png';
import Logo from '@assets/logo/logo-black.svg';
import backgroundimage from '@assets/signinicon/Background.png';
import LargeButton from '@src/components/globals/LaregeButton';
import Loading from '@src/components/globals/Loading';
import { useAppSelector } from '@src/hooks/useReduxHooks';
import { renderToastError, renderToastSuccess } from '@src/hooks/useToasty';
import { hs, ms, vs } from '@utils/design/design';
import Timer from '@utils/timer/timer';
import * as IntentLauncher from 'expo-intent-launcher';
import { useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function VerifyAccountScreen() {

   const [packageName, setPackageName] = useState('com.google.android.gm');
const {timeLeft,start} =Timer({ initialSeconds: 60});
const user= useAppSelector(userdata)
const [resend,{isLoading}]= useResendVaerificationMutation();
  const handleResendLink =async () => {
    try{
      const {email} = user;
      const response =await resend({email}) 
      if(response?.data?.sucess){
          start()
          renderToastSuccess(response?.data?.message)
      }
      else{
        renderToastError(response?.data?.message)
      }
    }
    catch(error){
      renderToastError(error.error)
    }
    };

const handleOpenGmail = async () => {
     if (Platform.OS === 'android') {
       try {
         await IntentLauncher.openApplication(packageName);
           await IntentLauncher.getApplicationIconAsync('com.google.android.gm');
       } catch (error) {
         Alert.alert(
           'Gmail not found',
           'Gmail app is not installed on this device. Please open your email manually.'
         );
       }
     } else {
       Alert.alert('Android only', 'This feature is only available on Android.');
     }


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
              Verify{'\n'}Account.
            </Text>

            {/* Subtitle */}
            <Text style={styles.subtitle}>
              Verification Link has been send to{'\n'}
              <Text style={styles.emailText}>{user.email}</Text>
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
                Didn't Receive Verification Link?{' '}
                <TouchableOpacity disabled={timeLeft>0} onPress={handleResendLink} style={styles.resendLinkButton}>
                  <Text style={styles.resendLinkText}>Resend</Text>
                </TouchableOpacity>
              </Text>
              <Text style={styles.resendText}>
                <Text style={styles.againText}>Again</Text> Resend Link in{' '}
                <Text style={styles.countdownText}>00:{timeLeft}</Text>
              </Text>
            </View>

            {/* Open Gmail */}
            <View style={{ marginTop: vs(5) }}>
              <LargeButton handleSubmit={handleOpenGmail} text="Open Gmail" />
            </View>
          </View>
        </View>
      </ScrollView>
          <Loading isLoading={isLoading} text="Sending Mail...." />
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
    color: 'black',
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
    marginBottom: vs(10),
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