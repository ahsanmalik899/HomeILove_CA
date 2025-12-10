import Agent from "@assets/SideBar/agent.svg";
import Builder from "@assets/SideBar/builder.svg";
import Decore from "@assets/SideBar/decore.svg";
import Electrician from "@assets/SideBar/electricican.svg";
import Investor from "@assets/SideBar/investor.svg";
import Mortgagae from "@assets/SideBar/mortgage.svg";
import Painter from "@assets/SideBar/painter.svg";
import Plumber from "@assets/SideBar/plumber.svg";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import SideBarCard from "@src/components/globals/SideBarCard";
import { hs, vs } from "@utils/design/design";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const index = () => {
  const insets = useSafeAreaInsets();
  const bottom = insets.bottom;

  return (
    <View className="bg-white flex-1">
      <HeaderWithBack title="Business Profiles" />

      <ScrollView style={{ paddingHorizontal: hs(20), paddingTop: vs(10) }}>
        <View className="flex-row justify-between">
          <SideBarCard
            text="Mortgage Profile"
            Svg={Mortgagae}
            type="busenessProfile"
          />

          <SideBarCard
            text="Builder Profile"
            Svg={Builder}
            type="busenessProfile"
          />
        </View>
        <View className="flex-row justify-between">
          <SideBarCard
            text="Investor Profile"
            Svg={Investor}
            type="busenessProfile"
          />
          <SideBarCard
            text="Agent Profile"
            Svg={Agent}
            type="busenessProfile"
          />
        </View>
        <View className="flex-row justify-between">
          <SideBarCard
            text="Plumber Profile"
            Svg={Plumber}
            type="busenessProfile"
          />
          <SideBarCard
            text="Painter Profile"
            Svg={Painter}
            type="busenessProfile"
          />
        </View>
        <View className="flex-row justify-between">
          <SideBarCard
            text="Electrician Profile"
            Svg={Electrician}
            type="busenessProfile"
          />
          <SideBarCard
            text="Decor Profile"
            Svg={Decore}
            type="busenessProfile"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default index;
