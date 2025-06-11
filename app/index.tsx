import { useAppSelector } from '@src/hooks/useReduxHooks';
import { Redirect, useRootNavigationState } from 'expo-router';

const Index = () => {
  const user = useAppSelector(state => state.user);
  const rootNavigationState = useRootNavigationState();


  return <Redirect href="/(auth)/welcome" />;
};
export default Index;
