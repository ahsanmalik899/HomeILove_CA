import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack  screenOptions={{headerShown:false}}>
        <Stack.Screen />
    </Stack>
  )
}

export default _layout