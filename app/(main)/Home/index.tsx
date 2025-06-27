/* eslint-disable import/order */
import { resetUserData } from '@/store/slices/user';
import { Button, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

const Index = () => {
  const dispatch = useDispatch();
  return (
    <View>
      <Text>Home</Text>
      <Button title="Log out " onPress={() => dispatch(resetUserData())} />
    </View>
  );
};

export default Index;
