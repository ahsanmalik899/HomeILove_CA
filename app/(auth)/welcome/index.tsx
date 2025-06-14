import { useState } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import onboarding1 from '../../../assets/onboarding/onboarding1.png';
import onboarding2 from '../../../assets/onboarding/onboarding2.png';
import onboarding3 from '../../../assets/onboarding/onboarding3.png';
import onboarding4 from '../../../assets/onboarding/onboarding4.png';
import onboarding5 from '../../../assets/onboarding/onboarding5.png';

import backgroundImage from '../../../assets/onboarding/bgimage.png';

const Welcome = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalScreens = 5;

  const screens = [
    {
      title: 'Change the way you love homing.',
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
      title: 'Real-estate related business? post your profile for FREE.',
      description: 'Post business profile postings across nationwide',
      image: onboarding5,
    },
  ];

  const currentScreen = screens[currentIndex];

  const dots = Array.from({ length: totalScreens }, (_, index) => (
    <View
      key={index}
      className={`w-2.5 h-2.5 rounded-full ${
        currentIndex === index ? 'bg-green-700' : 'bg-gray-400'
      }`}
    />
  ));

  const renderTitle = () => {
    if (currentIndex === 0) {
      return (
        <View className="flex-row flex-wrap">
          <Text className="text-4xl font-bold text-black-700 text-left">
            Change the{' '}
          </Text>
          <Text className="text-4xl font-bold text-green-700 text-left">
            way
          </Text>
          <Text className="text-4xl font-bold text-black-700 text-left">
            {' '}
            you love homing.
          </Text>
        </View>
      );
    }
    if (currentIndex === 1) {
      return (
        <View className="flex-row flex-wrap">
          <Text className="text-3xl font-bold text-black-700 text-left">
            Get informed with latest{' '}
          </Text>
          <Text className="text-3xl font-bold text-green-700 text-left">
            trends
          </Text>
          <Text className="text-3xl font-bold text-black-700 text-left">
            {' '}
            in your FEED.
          </Text>
        </View>
      );
    }
    return (
      <Text className="text-4xl font-bold text-black-700 text-left">
        {currentScreen.title}
      </Text>
    );
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View className="flex-1 bg-black-100 items-center p-5">
        <View className="flex-row justify-between w-full pt-6">
          <Text className="text-black-700 text-base ml-7">{`${
            currentIndex + 1
          }/${totalScreens}`}</Text>
          <TouchableOpacity
            className="absolute top-6 right-6"
            onPress={() => setCurrentIndex(totalScreens - 1)}
          >
            <Text className="text-black-700 text-base">Skip</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={currentScreen.image}
          className="w-[250px] h-[250px] mt-32"
          resizeMode="contain"
        />
        <View
          className={`w-full ${currentIndex === 4 ? 'mt-16' : 'mt-20'} ml-5`}
        >
          {renderTitle()}
          <Text className="text-xl text-black-600 text-left my-2.5">
            {currentScreen.description}
          </Text>
        </View>
        <View className="flex-1" />
        <View className="flex-row justify-between items-center w-full mb-0">
          <View className="flex-row gap-0.5 ml-5 mt-[-70px]">{dots}</View>
          <TouchableOpacity
            className="p-3 bg-white-700 rounded-full mt-[-120px]"
            onPress={() => {
              if (currentIndex < totalScreens - 1) {
                setCurrentIndex(currentIndex + 1);
              } else {
                setCurrentIndex(0);
              }
            }}
          >
            <Text className="text-green-700 text-3xl">➔</Text>
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
});

export default Welcome;
