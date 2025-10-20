import MortgageExpert from '@assets/GetHelp/mortgageexpert.svg'
import PropertyInvestor from '@assets/GetHelp/propertyInvestor.svg'
import ReputedAgent from '@assets/GetHelp/reputeAgent.svg'
import HeaderWithBack from '@src/components/globals/HeaderWithBack'
import SideBarCard from '@src/components/globals/SideBarCard'
import { hs, vs } from '@utils/design/design'
import { StyleSheet, View } from 'react-native'
const index = () => {
  return (
    <View className='flex-1 bg-white '>
     <HeaderWithBack title='Get Help'/>
      <View style={{ marginHorizontal: hs(20), marginTop: vs(20) }}>
        <View className="flex-row justify-between">
          <SideBarCard Svg={MortgageExpert} text="Mortgage Experts" onPress={() => {}} type={"Buy"} />
          <SideBarCard
            Svg={ReputedAgent}
            text="Reputed Agents"
            onPress={() => {}}
            type={"Buy"}
          />
        </View>
        <View className="flex-row justify-between">
         
          <SideBarCard
            Svg={PropertyInvestor}
            text="Property Investors"
            onPress={() => {}}
            type={"Buy"}
          />
        </View>
      </View>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})