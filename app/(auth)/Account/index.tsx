/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/order */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/function-component-definition */
import { useVerifyaccountMutation } from '@/store/api/user/Authapi';
import VerificationIllustration from '@assets/Accountcreated/feed 13.png';
import Fireworks from '@assets/Accountcreated/feed 8.png';
import Logo from '@assets/logo/logo-black.svg';
import backgroundimage from '@assets/signinicon/Background.png';
import LargeButton from '@src/components/globals/LaregeButton';
import Loading from '@src/components/globals/Loading';
import { renderToastError, renderToastSuccess } from '@src/hooks/useToasty';
import { hs, ms, vs } from '@utils/design/design';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';

export default function VerifyAccountScreen() {
  const handleContinue = () => {
   router.replace('/(auth)/signin')
  };
const [verify,{isLoading}] = useVerifyaccountMutation();
 const { token } = useLocalSearchParams();
 const safeToken = Array.isArray(token) ? token[0] : token;
 const verifyAccount = async () => {
  try {
    const result = await verify({ token: safeToken }).unwrap();
    if(result.sucess){    renderToastSuccess(result.message);}
    else{
      renderToastError(result.message);
      router.replace('/(auth)/Verifyacc')
    }

  } catch (error) {
    console.log('Verification failed:', error);
    renderToastError(error?.data?.error || 'Verification failed');
    router.replace('/(auth)/Verifyacc')
  }
};
useEffect(() => {


  if (token) {
    verifyAccount();
  }
}, []);

  return (
    <ImageBackground source={backgroundimage} style={styles.backgroundImage} resizeMode="cover">
    
      <Image source={Fireworks} style={styles.fireworksOverlay} resizeMode="contain" />

   
        <View className="flex-1">
          <View style={styles.topSection}>
            <View style={styles.logoContainer}>
              <Logo />
            </View>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>Yayy! Account{'\n'}Created.</Text>

            <Text style={styles.subtitle}>
              You're all set to start exploring homes{'\n'}and services on
              HomeLove.
            </Text>

            <View style={styles.illustrationContainer}>
              <Image
                source={VerificationIllustration}
                style={styles.illustrationImage}
                resizeMode="contain"
              />
            </View>

            <View style={{ marginTop: vs(80) }}>
              <LargeButton handleSubmit={handleContinue} text="Continue" />
            </View>
          </View>
        </View>
     
      <Loading text="Verifying Account...." isLoading={isLoading} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: '#e6f0fa',
  },
  fireworksOverlay: {
    position: 'absolute',
    top: vs(500),
    left: '50%',
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
    width: '80%',
    height: '80%',
    opacity: 4, 
  },
  topSection: {
    justifyContent: 'center',
    alignItems: 'center',
  marginTop:vs(60),

  },
  logoContainer: {
    alignItems: 'center',
  },
  formContainer: {
    paddingHorizontal: hs(20),

  },
  title: {
    marginTop:vs(60),
    fontSize: ms(47),
    fontWeight: '400',
    color: 'black',
    textAlign: 'left',
  
  },
  subtitle: {
    fontSize: ms(16),
    color: 'black',
    fontWeight: '500',
    marginTop: vs(12),
    lineHeight: vs(20),
    textAlign: 'left',
  },
  illustrationContainer: {
    height: vs(200),
    marginTop: vs(95),
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationImage: {
    width: ms(260),
    height: vs(400),
  },
});
