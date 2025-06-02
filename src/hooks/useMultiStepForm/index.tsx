/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import {
  GlobalProps,
  MultiStepFormProps,
  StepType,
} from '@hooks/useMultiStepForm/types';
import { useCallback, useMemo, useState } from 'react';
import Animated, {
  FadeInUp,
  FadeOutDown,
  LinearTransition,
} from 'react-native-reanimated';

const useMultistepForm = (
  steps: StepType[],
  globalProps: GlobalProps = {},
): MultiStepFormProps => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { animated, animatedProps } = globalProps;

  const next = useCallback(() => {
    setCurrentStepIndex(i => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }, [steps.length]);

  const back = useCallback(() => {
    setCurrentStepIndex(i => {
      if (i <= 0) return i;
      return i - 1;
    });
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrentStepIndex(index);
  }, []);

  const enhancedSteps = useMemo(
    () =>
      steps.map((step: StepType, index) => {
        const stepType = (
          <step.type
            {...{ ...step.props, ...globalProps }}
            goTo={goTo}
            next={next}
            back={back}
            key={index}
            currentStepIndex={currentStepIndex}
            isFirstStep={currentStepIndex === 0}
            isLastStep={currentStepIndex === steps.length - 1}
          />
        );

        if (!animated) return stepType;

        return (
          <Animated.View
            entering={FadeInUp.duration(300).delay(400)}
            exiting={FadeOutDown.duration(300)}
            layout={LinearTransition}
            key={`${index}step`}
            {...animatedProps}
          >
            {stepType}
          </Animated.View>
        );
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [globalProps],
  );

  return {
    currentStepIndex,
    step: enhancedSteps[currentStepIndex],
    steps: enhancedSteps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goTo,
    next,
    back,
  };
};

export default useMultistepForm;
