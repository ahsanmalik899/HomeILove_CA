import Builder from '@assets/SideBar/builder.svg'
import Decore from '@assets/SideBar/decore.svg'
import Electrician from '@assets/SideBar/electricican.svg'
import Investor from '@assets/SideBar/investor.svg'
import Mortgagae from '@assets/SideBar/mortgage.svg'
import Painter from '@assets/SideBar/painter.svg'
import Plumber from '@assets/SideBar/plumber.svg'
import HeaderWithBack from '@src/components/globals/HeaderWithBack'
import SideBarCard from '@src/components/globals/SideBarCard'
import { hs, ms, vs } from '@utils/design/design'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
const index = () => {
    const insets = useSafeAreaInsets()
    const bottom = insets.bottom
  return (
    <View className='bg-white flex-1'>
      <HeaderWithBack  />
      <View >
        <View style={{marginHorizontal:hs(20)}}>
        <Text style={{fontSize:ms(18),fontWeight:600,marginVertical:vs(20)}}>Business Profiles</Text>
        
        </View>
        <ScrollView  style={{paddingHorizontal:hs(20),paddingTop:vs(5),marginBottom:bottom+vs(150)}}>
        <View className='flex-row justify-between'>
            <SideBarCard text='Electrician Profile' Svg={Electrician}/>
            <SideBarCard text='Builder Profile' Svg={Builder}/>
        </View>
          <View className='flex-row justify-between'>
            <SideBarCard text='Mortgage Profile' Svg={Mortgagae}/>
            <SideBarCard text='Decor Profile' Svg={Decore}/>
        </View>
          <View className='flex-row justify-between'>
            <SideBarCard text='Plumber Profile' Svg={Plumber}/>
            <SideBarCard text='Painter Profile' Svg={Painter}/>
        </View>
          <View className='flex-row justify-between'>
            <SideBarCard text='Investor Profile' Svg={Investor}/>
        </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default index