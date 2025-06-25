import { Redirect } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Index = () => {
  const isonboarding = useSelector(
    (state: RootState) => state.onboarding.isOnboarding,
  );
  if (isonboarding) {
    return <Redirect href="/(auth)/signup" />;
  }
  return <Redirect href="/(auth)/welcome" />;
};
export default Index;
