/* eslint-disable no-console */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable prettier/prettier */
// Existing imports
import Fireworks from '@assets/Accountcreated/feed 8.png';
import Logo from '@assets/logo/logo-black.svg';
import Illustration from '@assets/passwordchange/feed 15.png';
import TickIcon from '@assets/passwordchange/feed 16.png';
import ThumbIcon from '@assets/passwordchange/feed 17.png';
import BackgroundImage from '@assets/signinicon/Background.png';
import LargeButton from '@src/components/globals/LaregeButton';

import { hs, ms, vs } from '@utils/design/design';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function PasswordChangedScreen() {
  const handleContinue = () => {
    console.log('Continue pressed');
  };

  return (
    <ImageBackground
      source={BackgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
     
      <Image source={Fireworks} style={styles.fireworks} resizeMode="contain" />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Logo />
          </View>

          {/* Title */}
          <Text style={styles.title}>Yay! Password{'\n'}changed.</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            You're all set to start exploring homes{'\n'}and services on HomeILove.
          </Text>

          {/* Main Illustration */}
          <View style={styles.illustrationWrapper}>
            <Image source={Illustration} style={styles.illustration} resizeMode="contain" />

            {/* ✅ Tick and Thumb Icons */}
            <Image source={TickIcon} style={styles.tickIcon} resizeMode="contain" />
            // eslint-disable-next-line prettier/prettier
            <Image
              source={ThumbIcon}
              style={styles.thumbIcon}
              resizeMode="contain"
            />
          </View>

          <View style={{ marginTop: vs(10) }}>
            <LargeButton handleSubmit={handleContinue} text="Continue" />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#e6f0fa',
  },
  container: {
    flex: 1,
    paddingHorizontal: hs(20),
    paddingTop: vs(60),
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: vs(50),
  },
  title: {
    fontSize: ms(37),
    fontWeight: '400',
    color: 'black',
    lineHeight: vs(44),
    marginBottom: vs(20),
    marginTop: vs(50),
  },
  subtitle: {
    fontSize: ms(16),
    color: 'black',
    fontWeight: '500',
    lineHeight: vs(20),
    marginBottom: vs(20),
    marginTop: vs(-10),
  },
  illustrationWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: vs(20),
    marginTop: vs(80),
  },
  illustration: {
    width: ms(250),
    height: vs(250),
  },
  tickIcon: {
    position: 'absolute',
    top: vs(50),
    right: hs(70),
    left: hs(190),
    width: ms(124),
    height: ms(170),
  },
  thumbIcon: {
    position: 'absolute',
    top: vs(10),
    left: hs(105),
    width: ms(35),
    height: ms(35),
  },
  fireworks: {
    position: 'absolute',
    top: vs(500),
    left: vs(200),
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
    width: '70%',
    height: '70%',
    opacity: 4,
  },
});
