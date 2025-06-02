import React, { forwardRef } from 'react';
import { Text as Lib, TextProps } from 'react-native';

const Text = forwardRef((props: TextProps, ref: React.Ref<Lib>) => {
  return <Lib {...props} ref={ref} />;
});

export default Text;
