import { forwardRef } from 'react';
import { TouchableOpacity as Lib, TouchableOpacityProps } from 'react-native';

const TouchableOpacity = forwardRef(
  (props: TouchableOpacityProps, ref: React.Ref<Lib>) => {
    return <Lib {...props} ref={ref} />;
  },
);

export default TouchableOpacity;
