/* eslint-disable import/order */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable global-require */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable react/function-component-definition */

import { useResendResetpaawordMutation } from '@/store/api/user/Authapi';
import { userdata } from '@/store/slices/selector/user';
import Logo from '@assets/logo/logo-black.svg';
import VerificationIllustration from '@assets/Resetscreen/feed 14.png';
import backgroundimage from '@assets/signinicon/Background.png';
import LargeButton from '@src/components/globals/LaregeButton';
import Loading from '@src/components/globals/Loading';
import { useAppSelector } from '@src/hooks/useReduxHooks';
import { renderToastError, renderToastSuccess } from '@src/hooks/useToasty';
import { hs, ms, vs } from '@utils/design/design';
import Timer from '@utils/timer/timer';
import { useState } from 'react';
import {
  Image,
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function ForgotPasswordScreen() {
  const [resend,{isLoading}]= useResendResetpaawordMutation();
  const {timeLeft,start} =Timer({ initialSeconds: 60});
  const [countdown, setCountdown] = useState(59);
 const {email}= useAppSelector(userdata);
  const handleResendLink = async() => {
       try{
      
         const response =await resend({email}) 
         if(response?.data?.sucess){ 
          start()
             renderToastSuccess(response?.data?.message)}
             else {
               renderToastError(response?.data?.message)
             }
            
       }
       catch(error){
         renderToastError(error.error)
       }
  };

  const handleOpenGmail = () => {
    Linking.openURL('mailto:').catch(() => {
      Linking.openURL('https://gmail.com');
    });
  };

  return (
    <ImageBackground source={backgroundimage} style={styles.backgroundImage} resizeMode="cover">
    
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
              <Text style={styles.emailText}>{email}</Text>
            </Text>

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
                 <TouchableOpacity onPress={handleResendLink} disabled={timeLeft>0}>
                    <Text style={styles.resendLinkText} >
                      Resend Again
                                   </Text>
                                   </TouchableOpacity>
                              </Text>

              <Text style={styles.resendText}>
                <Text style={styles.againText}> </Text> Resend Link in{' '}
                <Text style={styles.countdownText}>00:{timeLeft}</Text>
              </Text>
            </View>

         
            <View style={{ marginTop: vs(10) }}>
              <LargeButton handleSubmit={handleOpenGmail} text="Open Gmail" />
            </View>
          </View>
     </View>
     <Loading text="Sending Mail..." isLoading={isLoading} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  topSection: {
   
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
    paddingBottom: vs(40), 
  paddingTop: vs(40),  
  marginTop: vs(-40),
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    overflow: 'hidden',
  },
  title: {
    fontSize: ms(40),
    fontWeight: '400',
    color: 'black',
    marginTop: vs(15),
   
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
  marginTop:vs(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationImage: {
    width: ms(270),
    height: vs(200),
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