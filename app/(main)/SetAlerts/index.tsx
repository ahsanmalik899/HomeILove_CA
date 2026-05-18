import { useAlertCountApiQuery } from '@/store/api/user/MainApi'
import { Notification } from '@/store/slices/selector/Notification'
import { userdata } from '@/store/slices/selector/user'
import AddAlerts from '@assets/SideBar/addAlerts.svg'
import Currentalerts from '@assets/SideBar/currentalerts.svg'
import HeaderWithBack from '@src/components/globals/HeaderWithBack'
import Loading from '@src/components/globals/Loading'
import MyAlerts from '@src/components/globals/MyAlerts'
import SideBarCard from '@src/components/globals/SideBarCard'
import { useAppSelector } from '@src/hooks/useReduxHooks'
import { hs, vs } from '@utils/design/design'
import { router } from 'expo-router'
import { useState } from 'react'
import { Modal, StyleSheet, View } from 'react-native'
const index = () => {
   const user = useAppSelector(userdata);
 const {data:AlertCount,isFetching} = useAlertCountApiQuery({id:user?.id})
 const notifiation = useAppSelector(Notification)
 const [modalVisible, setModalVisible] = useState(false);
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
           totalPosts={AlertCount?.count?.toString()}
         onPress={()=>{setModalVisible(true)}}
         />
      </View>
      <Modal visible={modalVisible} onRequestClose={()=>{setModalVisible(false)}}   transparent   >
<MyAlerts setVisible={setModalVisible}/>
      </Modal>
      <Loading isLoading={isFetching} text="Loading.."/>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})