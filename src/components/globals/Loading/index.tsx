import Colors from '@src/constants/Colors';
import { ActivityIndicator, Text, View } from 'react-native';

interface Loadingprops {
  text: string;
  isLoading: boolean;
}
const Loading = ({ text, isLoading }: Loadingprops) => {
  if (!isLoading) return null;
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: '100%',
        width: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
      }}
    >
      <ActivityIndicator size="large" color={Colors.light.red} />
      <Text style={{ marginTop: 10, color: '#333' }}>{text}</Text>
    </View>
  );
};

export default Loading;
