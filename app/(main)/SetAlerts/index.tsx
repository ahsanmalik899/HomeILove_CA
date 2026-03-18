import { Notification } from '@/store/slices/selector/Notification'
import { userdata } from '@/store/slices/selector/user'
import AddAlerts from '@assets/SideBar/addAlerts.svg'
import Currentalerts from '@assets/SideBar/currentalerts.svg'
import HeaderWithBack from '@src/components/globals/HeaderWithBack'
import SideBarCard from '@src/components/globals/SideBarCard'
import { useAppSelector } from '@src/hooks/useReduxHooks'
import { hs, vs } from '@utils/design/design'
import { router } from 'expo-router'
import { StyleSheet, View } from 'react-native'
const index = () => {
   const user = useAppSelector(userdata);
 const notifiation = useAppSelector(Notification)
  return (
    <View className='flex-1 bg-white'>
      <HeaderWithBack title='Set Alerts' />
      <View className='flex-row justify-between'style={{marginHorizontal:hs(20),marginTop:vs(40)}}>
         <SideBarCard
         Svg={AddAlerts}
         type=''
         text='Add New Alerts'
         onPress={()=>{router.navigate('/AddNewAlerts')}}
         />
            <SideBarCard
         Svg={Currentalerts}
         type=''
         text='Current Alerts'
           totalPosts={notifiation.NotificationCount.toString()}
         onPress={()=>{router.navigate('/CurrentAlerts')}}
         />
      </View>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})