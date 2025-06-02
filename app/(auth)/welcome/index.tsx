import { setData } from '@store/slices/userSlice';
import { ms } from '@utils/design/design';
import { useRouter } from 'expo-router';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

const Welcome = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <SafeAreaView>
      <Text
        style={{
          fontSize: ms(20),
        }}
      >
        Welcome
      </Text>

      <Button
        onPress={() => {
          dispatch(
            setData({
              email: 'sa@sa.com',
            }),
          );
          router.push('/(main)/account');
        }}
        title="signin"
      />
    </SafeAreaView>
  );
};

export default Welcome;
