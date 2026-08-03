import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const _layout = () => {
  return (
       <SafeAreaView
                                      style={{ flex: 1 }}
                                      edges={["bottom", "left", "right"]}
                                    >
    <Stack>
        <Stack.Screen options={{headerShown:false}} name='index'/>
    </Stack>
    </SafeAreaView>
  )
}

export default _layout