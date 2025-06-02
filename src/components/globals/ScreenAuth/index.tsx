/* eslint-disable react/jsx-props-no-spreading */
import {
  SafeAreaView,
  ScrollView,
  View as ViewDef,
} from '@src/components/libraries';
import { ViewProps } from 'react-native';

interface Props extends ViewProps {
  scroll?: boolean;
}

const ScreenAuth = (props: Props) => {
  const { scroll = false, className, children, ...rest } = props;

  if (scroll)
    return (
      <SafeAreaView edges={['top']}>
        <ScrollView>
          <ViewDef {...rest}>{children}</ViewDef>
        </ScrollView>
      </SafeAreaView>
    );

  return (
    <SafeAreaView edges={['top']} className={className}>
      {/* <AppBar /> */}
      {children}
    </SafeAreaView>
  );
};

export default ScreenAuth;
