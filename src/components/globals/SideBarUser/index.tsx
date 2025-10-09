import SidebarLogo from '@assets/SideBar/sideBarLogo.svg'
import { hs, ms, vs } from '@utils/design/design'
import { router } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import LargeButton from '../LaregeButton'
import SideBarButtons from '../SideBarButtons'
const index = () => {
  return (
    <View style={{paddingTop:vs(40),marginHorizontal:hs(20), borderTopRightRadius:ms(20),
              borderBottomRightRadius:ms(20),}}className='flex-1 bg-white'>
    <SidebarLogo/>
    <View style={{marginTop:vs(20)}}>
    <SideBarButtons text='Business Profiles' onPress={()=>router.navigate('/(auth)/Account')}/>
        </View>
        <View style={{marginTop:vs(5)}}>
    <SideBarButtons text='Your Ads' onPress={()=>router.navigate('/(auth)/Account')}/>
        </View>
           <View style={{marginTop:vs(5)}}>
    <SideBarButtons text='Inquiries' onPress={()=>router.navigate('/(auth)/Account')}/>
        </View>
         <View style={{marginTop:vs(5)}}>
    <SideBarButtons text='Buy Credit' onPress={()=>router.navigate('/(auth)/Account')}/>
        </View>
         <View style={{marginTop:vs(5)}}>
    <SideBarButtons text='Advertise' onPress={()=>router.navigate('/(auth)/Account')}/>
        </View>
         <View style={{marginTop:vs(5)}}>
    <SideBarButtons text='Your Promotions' onPress={()=>router.navigate('/(auth)/Account')}/>
        </View>
         <View style={{marginTop:vs(5)}}>
    <SideBarButtons text='Set Alerts' onPress={()=>router.navigate('/(auth)/Account')}/>
        </View>
         <View style={{marginTop:vs(5)}}>
    <SideBarButtons text='Reviews' onPress={()=>router.navigate('/(auth)/Account')}/>
        </View>
        <View style={{marginTop:'auto', marginBottom:vs(60)}}>
        <LargeButton text='Delete Account' handleSubmit={()=>router.navigate('/(auth)/Account')}/>
            </View>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})