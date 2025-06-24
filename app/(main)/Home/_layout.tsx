import { Stack } from 'expo-router';

// eslint-disable-next-line no-underscore-dangle
const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="./(main)/Home" />
    </Stack>
  );
};

export default _layout;
