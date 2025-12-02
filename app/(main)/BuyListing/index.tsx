import BuyAll from '@assets/icons/buy-all.svg'
import Constructed from '@assets/icons/newly-constructed.svg'
import Renovated from '@assets/icons/newly-renovated.svg'
import ReducePrice from '@assets/icons/price.svg'
import HeaderWithBack from '@src/components/globals/HeaderWithBack'
import QuickSerchCard from '@src/components/globals/QuickSerchCard'
import SerchBar from '@src/components/globals/SerchBar'
import Colors from '@src/constants/Colors'
import { hs, ms, vs } from '@utils/design/design'
import { useLocalSearchParams } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
interface BuyListing {
  mainHeading: String,
  redText: String,
  endText: String,
  subHeading: String,
  Picture: React.FC,
}
const index = () => {
  const { type } = useLocalSearchParams()
  let dataBuy: BuyListing = {
    mainHeading: "",
    redText: "",
    endText: "",
    subHeading: "",
    Picture: BuyAll,

  }

  switch (type) {
    case "All Sale":
      dataBuy = {
        mainHeading: "Helping homers to find their \n",
        redText: "LOVED",
        endText: " home",
        subHeading: "All Sales",
        Picture: BuyAll
      }
      break;
    case "Re-Built":
      dataBuy = {
        mainHeading: "Rebuilt homes that ",
        redText: "INSPIRES \n",
        endText: "economical homing",
        subHeading: "Re-built for sale",
        Picture: BuyAll
      }
      break;
    case "Foreclosure":
      dataBuy = {
        mainHeading: "Search below market ",
        redText: "FORCLOSURE\n",
        endText: "Properties",
        subHeading: "Foreclosure for sale",
        Picture: BuyAll
      }
      break;
    case "Farm & Land":
      dataBuy = {
        mainHeading: "Explore the Latest UK ",
        redText: "FARMS & \nLANDS ",
        endText: "to buy",
        subHeading: "Forms & Lands for sale",
        Picture: BuyAll
      }
      break;
    case "Commercial":
      dataBuy = {
        mainHeading: "Explore new opportunities through\nour ",
        redText: "COMMERCIALS",
        endText: "",
        subHeading: "Commercial for sale",
        Picture: BuyAll
      }
      break;
    case "Retirement":
      dataBuy = {
        mainHeading: "Assisted and friendly homing with our Loved ",
        redText: "RETIREMENT RESIDENCES",
        endText: "",
        subHeading: "Retirement Property for sale",
        Picture: BuyAll
      }
      break;
  }
  return (
    <ScrollView>
      <View className='bg-white flex-1 pb-5'>
        <HeaderWithBack />
        <View style={{ marginHorizontal: hs(20) }} >
          <Text style={styles.mainHeading}>{dataBuy.mainHeading}
            <Text style={{ color: Colors.light.red }}>{dataBuy.redText}</Text>
            {dataBuy.endText}
          </Text>
          <Text style={styles.subHeading}>{dataBuy.subHeading}</Text>
          <SerchBar />
          <View className='items-center justify-center'>
            <dataBuy.Picture />
          </View>
          <Text style={{
            fontSize: ms(20), fontWeight: 500,
            marginBottom: vs(10)
          }}>Quickly search your <Text style={{ color: Colors.light.red }}>dream</Text> living</Text>
        </View>
        <QuickSerchCard Image={ReducePrice} text="Reduced Price" onPress={() => { }} />
        <QuickSerchCard Image={Renovated} text="Newly renovated" onPress={() => { }} />
        <QuickSerchCard Image={Constructed} text="Newly Constructed" onPress={() => { }} />
      </View>
    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({
  mainHeading: {
    marginTop: vs(20),
    fontSize: ms(20),
    fontWeight: 500,
  },
  subHeading: {
    marginTop: vs(20),
    fontSize: ms(20),
    marginBottom: vs(10),
    fontWeight: 500,
  }
})