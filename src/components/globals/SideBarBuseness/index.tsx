import Electrician from '@assets/SideBar/electricican.svg'
import { View } from 'react-native'
import HeaderWithBack from '../HeaderWithBack'
import SideBarCard from '../SideBarCard'
const index = () => {
  return (
    <View className='bg-white flex-1'>
      <HeaderWithBack  />
      <View>
        <View>
            <SideBarCard text='Electrician Profile' Svg={Electrician}/>
        </View>
      </View>
    </View>
  )
}

export default index