import { useAppSelector } from '@src/hooks/useReduxHooks';
import { Redirect, useRootNavigationState } from 'expo-router';

const Index = () => {
  const user = useAppSelector(state => state.user);
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;

  if (user.data.email) {
    return <Redirect href="/(main)/home" />;
  }
  return <Redirect href="/(auth)/welcome" />;
};
export default Index;
