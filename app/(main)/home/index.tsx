/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
// import PhoneInput from '@src/components/globals/PhoneInput';
import ScreenAuth from '@src/components/globals/ScreenAuth';
import useMultistepForm from '@src/hooks/useMultiStepForm';
import {
  GlobalProps,
  MultiStepFormProps,
} from '@src/hooks/useMultiStepForm/types';
import { useMemo, useState } from 'react';

import { Button, Text, View } from 'react-native';

interface StepProps extends MultiStepFormProps {
  data?: any;
  setData?: (data: any) => void;
}

const Step1 = ({ next, data }: StepProps) => {
  return (
    <View>
      <Text>Step 1</Text>
      <Text>{JSON.stringify(data)}</Text>
      <Button onPress={() => next?.()} title="Next" />
    </View>
  );
};

const Step2 = ({ next }: StepProps) => {
  return (
    <View>
      <Text>Step 2</Text>
      <Button onPress={() => next?.()} title="Next" />
    </View>
  );
};

const Step3 = ({ goTo, setData }: StepProps) => {
  return (
    <View>
      <Text>Step 3</Text>
      <Button onPress={() => setData?.({ name: 'John' })} title="Set Data" />
      <Button onPress={() => goTo?.(0)} title="Next" />
    </View>
  );
};

const Index = () => {
  const [data, setData] = useState({
    name: '',
  });

  const object: GlobalProps = useMemo(
    () => ({ data, setData, animated: true }),
    [data, setData],
  );

  const { step, currentStepIndex } = useMultistepForm(
    [<Step1 />, <Step2 />, <Step3 />],
    object,
  );

  return (
    <ScreenAuth className="bg-[#D0FFE6] flex-1">
      <Text>{currentStepIndex}</Text>
      {step}
    </ScreenAuth>
  );
};

export default Index;
