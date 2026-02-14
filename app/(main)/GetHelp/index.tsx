import MortgageExpert from "@assets/GetHelp/mortgageexpert.svg";
import PropertyInvestor from "@assets/GetHelp/propertyInvestor.svg";
import ReputedAgent from "@assets/GetHelp/reputeAgent.svg";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import SideBarCard from "@src/components/globals/SideBarCard";
import { hs, vs } from "@utils/design/design";
import { router } from "expo-router";
import { View } from "react-native";
const index = () => {
  return (
    <View className="flex-1 bg-white ">
      <HeaderWithBack title="Get Help"buttonTitile="Raise query to Local Experts for free"  onButtonPress={()=>router.navigate({
        pathname:"/HomeValue",
        params:{type:"get help"}
      })}  />
      <View style={{ marginHorizontal: hs(20), marginTop: vs(20) }}>
        <View className="flex-row justify-between">
          <SideBarCard
            Svg={MortgageExpert}
            text="Mortgage Experts"
            onPress={() => {
              router.navigate({
                pathname: "/(main)/GetHelpListing",
                params: { type: "mortgage" },
              });
            }}
            type={"Buy"}
          />
          <SideBarCard
            Svg={ReputedAgent}
            text="Reputed Agents"
            onPress={() => {
              router.navigate({
                pathname: "/(main)/GetHelpListing",
                params: { type: "agent" },
              });
            }}
            type={"Buy"}
          />
        </View>
        <View className="flex-row justify-between">
          <SideBarCard
            Svg={PropertyInvestor}
            text="Property Investors"
            onPress={() => {
              router.navigate({
                pathname: "/(main)/GetHelpListing",
                params: { type: "investor" },
              });
            }}
            type={"Buy"}
          />
        </View>
      </View>
    </View>
  );
};

export default index;


