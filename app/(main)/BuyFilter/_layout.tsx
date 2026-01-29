import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen options={{headerShown:false}} name='index'/>
    </Stack>
  )
}

export default _layout