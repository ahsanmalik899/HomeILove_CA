import BuyAll from '@assets/icons/buy-all.svg'
import HeaderWithBack from '@src/components/globals/HeaderWithBack'
import HorizontalList from '@src/components/globals/HorizontalList'
import SerchBar from '@src/components/globals/SerchBar'
import Colors from '@src/constants/Colors'
import { hs, ms, vs } from '@utils/design/design'
import { useLocalSearchParams } from 'expo-router'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
interface HomeListing {
  mainHeading: String,
  redText: String,
  endText: String,
  subHeading: String,
  Picture: React.FC,
}
const index = () => {
      const { type } = useLocalSearchParams()
  let dataBuy: HomeListing = {
    mainHeading: "",
    redText: "",
    endText: "",
    subHeading: "",
    Picture: BuyAll,

  }
    switch (type) {
    case "New Home":
      dataBuy = {
        mainHeading: "Get inspired & in love\nwith ",
        redText: "NEW",
        endText: "  built",
        subHeading: "New Housing For Sale",
        Picture: BuyAll
      }
      break;
    case "Communities":
      dataBuy = {
        mainHeading: "Get romantic with ",
        redText: "NEW \n",
        endText: "community",
        subHeading: "New Housing Communities",
        Picture: BuyAll
      }
      break;}
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
          }}>Latest <Text style={{ color: Colors.light.red }}>NEW</Text> properties for sale</Text>
          <HorizontalList data={[]} isfetching={false}/>
           <Text style={{
            fontSize: ms(20), fontWeight: 500,
            marginBottom: vs(10)
          }}>Leading <Text style={{ color: Colors.light.red }}>DEVELOPERS</Text></Text>
        </View>
       
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
