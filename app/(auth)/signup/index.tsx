import { useRouter } from 'expo-router';

import { Button, Text, View } from 'react-native';

const Signin = () => {
  const router = useRouter();
  return (
    <View>
      <Text>Signup</Text>
      <Button onPress={() => router.push('(main)/home')} title="signin" />
    </View>
  );
};

export default Signin;
