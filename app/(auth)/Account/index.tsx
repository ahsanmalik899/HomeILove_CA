/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/function-component-definition */
import VerificationIllustration from '@assets/Accountcreated/feed 13.png';
import Fireworks from '@assets/Accountcreated/feed 8.png';
import Logo from '@assets/logo/logo-black.svg';
import backgroundimage from '@assets/signinicon/Background.png';
import LargeButton from '@src/components/globals/LaregeButton';
import { hs, ms, vs } from '@utils/design/design';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function VerifyAccountScreen() {
  const handleContinue = () => {
    console.log('Continuing...');
  };

  return (
    <ImageBackground source={backgroundimage} style={styles.backgroundImage} resizeMode="cover">
      {/* 🎆 Fireworks Overlay */}
      <Image source={Fireworks} style={styles.fireworksOverlay} resizeMode="contain" />

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

            <View style={{ marginTop: vs(60) }}>
              <LargeButton handleSubmit={handleContinue} text="Continue" />
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
    backgroundColor: '#e6f0fa',
  },
  fireworksOverlay: {
    position: 'absolute',
    top: '60%',
    // Vertical center
    left: '50%',
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
     
    width: '80%',
    height: '80%',
    // zIndex: -1, // behind all content
    opacity: 4, // adjust as needed
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
    paddingHorizontal: hs(20),
    paddingBottom: vs(40),
    paddingTop: vs(40),
    marginTop: vs(-40),
  },
  title: {
    fontSize: ms(37),
    fontWeight: '400',
    color: 'black',
    lineHeight: vs(44),
    textAlign: 'left',
    marginTop: vs(-15),
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
    marginTop: vs(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationImage: {
    width: ms(250),
    height: vs(180),
  },
});
