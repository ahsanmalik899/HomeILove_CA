import { FormikInput } from "@src/components/globals/FormictInput";
import { FormikDropdown } from "@src/components/globals/FormikDropdown/indes";
import HeaderWithBack from "@src/components/globals/HeaderWithBack";
import LargeButton from "@src/components/globals/LaregeButton";
import Colors from "@src/constants/Colors";
import { hs, ms, vs } from "@utils/design/design";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const Index = () => {
  const [step, setStep] = useState(0);
  if (step === 0) {
    return (
      <View className="flex-1 bg-white ">
        <HeaderWithBack />
        <View style={{ marginHorizontal: hs(20) }}>
          <Text style={styles.mainHeading}>
            Get smart with <Text style={{ color: Colors.light.red }}>BEST</Text>{" "}
            valuation
          </Text>
          <Text style={{ marginTop: vs(10), color: Colors.light.textGray }}>
            Get authentic home valuation from our local expert agents for FREE
          </Text>
          <View className="flex-row justify-between gap-2">
            <View className="flex-1">
              <FormikInput
                errorText={"its not correct"}
                onBlur={() => {}}
                errors={false}
                required={false}
                onChangeText={() => {}}
                title=""
                touched={false}
                value={""}
                placeholder="Please enter your location"
              />
            </View>
            <View className="flex-1 mt-3">
              <FormikDropdown
                title={""}
                placeholder={"Radius (miles)"}
                value={""}
                options={[
                  "Private investor",
                  "REIT",
                  "Institude",
                  "Crowd fund",
                  "Others",
                ]}
                onSelect={() => {}}
                touched={false}
                errors={false}
                errorText={"sdjgbigsb"}
              />
            </View>
          </View>
          <FormikDropdown
            title={"Inquiry type"}
            placeholder={"Select Type"}
            value={""}
            options={[
              "Private investor",
              "REIT",
              "Institude",
              "Crowd fund",
              "Others",
            ]}
            onSelect={() => {}}
            touched={false}
            errors={false}
            errorText={"sdjgbigsb"}
            required
          />
        </View>
        <View className="mt-auto mb-5 px-[20px]">
          <LargeButton
            text="Next"
            handleSubmit={() => {
              setStep(1);
            }}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View className="flex-1 bg-white ">
        <HeaderWithBack
          onBackpress={() => {
            setStep(0);
          }}
        />
        <View style={{ marginHorizontal: hs(20) }}>
          <Text style={styles.mainHeading}>Select agents for valuation</Text>
        
        <FormikInput
          title="Message"
          placeholder="Write..."
          onChangeText={() => {}}
          onBlur={() => {}}
          value={"sghfvdj"}
          touched={false}
          errors={false}
          required
       
          multiline
          errorText={"lskdnc"}
        />
        <Text className="mt-5">
          by proceeding,you consent to receive ccalls and texts at the number
          you provided, including marketing by autodialer and prerecorded and
          artificial voice, and email, from homeilove,agents,mortgage advisors
          and others about your inquiry and other home-related matters,but not
          as a condition or any purchase. You also agree to our Terms of Use,
          and to our Privacy Policy regarding the information relating to you.
          Message data rates may apply. This consent applies even if you are on
          a corporate, state or national Do Not Call list.
        </Text>
        
        </View>
          <View className="mt-auto mb-5 px-[20px]">
          <LargeButton
            text="Next"
            handleSubmit={() => {
              setStep(1);
            }}
          />
        </View>
      </View>
    );
  }
};

export default Index;

const styles = StyleSheet.create({
  mainHeading: {
    marginTop: vs(20),
    fontSize: ms(20),
    fontWeight: 500,
  },
});
