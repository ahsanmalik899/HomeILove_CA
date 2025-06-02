import { forwardRef } from 'react';
import { View as Lib, ViewProps } from 'react-native';

const View = forwardRef((props: ViewProps, ref: React.Ref<Lib>) => {
  return <Lib {...props} ref={ref} />;
});

export default View;
