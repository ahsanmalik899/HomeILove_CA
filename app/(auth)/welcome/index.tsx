/* eslint-disable import/order */
import { setonboarding } from '@/store/slices/onboarding';
import Arrow from '@assets/onboarding/arrow.svg';
import { hs, ms, vs } from '@utils/design/design';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import backgroundImage from '../../../assets/onboarding/bgimage.png';
import onboarding1 from '../../../assets/onboarding/onboarding1.png';
import onboarding2 from '../../../assets/onboarding/onboarding2.png';
import onboarding3 from '../../../assets/onboarding/onboarding3.png';
import onboarding4 from '../../../assets/onboarding/onboarding4.png';
import onboarding5 from '../../../assets/onboarding/onboarding5.png';

const Welcome = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalScreens = 5;
  const dispatch = useDispatch();
  const screens = [
    {
      title: 'Change the way you\nlove homing.',
      description:
        'Raise queries for your home search to reputed and experienced agents',
      image: onboarding1,
    },
    {
      title: 'Get informed with latest trends in your FEED.',
      description:
        'Get trending properties and news from experts straight into your feed',
      image: onboarding2,
    },
    {
      title: 'Post ad for sale or rent for FREE.',
      description: 'Post property ad for sale & rent for FREE nationwide',
      image: onboarding3,
    },
    {
      title: 'FREE home maintenance search.',
      description:
        'Search reputed home maintenance businesses locally & nationwide',
      image: onboarding4,
    },
    {
      title: 'Real-estate related\nbusiness? post your \nprofile for FREE.',
      description:
        'Post business profile along with services across nationwide',
      image: onboarding5,
    },
  ];

  const currentScreen = screens[currentIndex] ?? screens[0];

  const dots = Array.from({ length: totalScreens }, (_, index) => (
    <View
      key={index}
      className={`w-2 h-2 rounded-full ${
        currentIndex === index ? 'bg-dotcolor' : 'bg-gray-400'
      }`}
    />
  ));

  const renderTitle = () => {
    if (currentIndex === 0) {
      return (
        <View className="flex-row flex-wrap">
          <Text className="  text-black-700 " style={styles.headingtext}>
            Change the{' '}
          </Text>
          <Text
            className=" text-green-700 text-left"
            style={styles.headingtext}
          >
            way
          </Text>
          <Text
            className="  text-black-700 text-left"
            style={styles.headingtext}
          >
            you love homing.
          </Text>
        </View>
      );
    }
    if (currentIndex === 1) {
      return (
        <View>
          <Text style={styles.headingtext}>
            Get informed with latest{' '}
            <Text style={[styles.headingtext, { color: '#059669' }]}>
              trends
            </Text>
            in{'\n'} your FEED.
          </Text>
        </View>
      );
    }
    return (
      <Text className="  text-black-700 text-left" style={styles.headingtext}>
        {currentScreen.title}
      </Text>
    );
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View className="flex-1   items-center">
        <View
          className="flex-row  justify-between items-center w-full px-5 mt-2"
          style={styles.header}
        >
          <Text>{`${currentIndex + 1}/${totalScreens}`}</Text>
          <TouchableOpacity onPress={() => setCurrentIndex(totalScreens - 1)}>
            <Text className="text-black-700 ">Skip</Text>
          </TouchableOpacity>
        </View>
        {currentScreen?.image && (
          <Image
            source={currentScreen.image}
            style={styles.iamge}
            resizeMode="contain"
          />
        )}
        <View style={styles.heading}>
          {renderTitle()}
          <Text className="text-xl " style={styles.discription}>
            {currentScreen.description}
          </Text>
        </View>
        <View className="flex-1" />
        <View
          className="flex-row justify-between  text-center items-center w-full px-5 "
          style={styles.bottom}
        >
          <View className="flex-row ">{dots}</View>
          <TouchableOpacity
            className="p-3 bg-white-700 "
            onPress={() => {
              if (currentIndex === totalScreens - 1) {
                router.replace('/(auth)/signup');
                dispatch(setonboarding(true));
              }
              setCurrentIndex(currentIndex + 1);
            }}
          >
            <Arrow />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  iamge: {
    marginTop: vs(120),
    width: hs(300),
    height: vs(250),
  },
  header: {
    marginTop: vs(40),
    paddingHorizontal: hs(20),
  },
  heading: {
    marginTop: vs(90),
    marginHorizontal: hs(20),
        fontFamily: "PopinRegula",
  },
  headingtext: {
    fontSize: ms(30),
    letterSpacing: 2,
    fontWeight: 600,
        fontFamily: "PopinRegula",
  },
  discription: {
    marginTop: vs(20),
        fontFamily: "PopinRegula",
  },
  bottom: {
    marginBottom: vs(30),
  },
});

export default Welcome;
