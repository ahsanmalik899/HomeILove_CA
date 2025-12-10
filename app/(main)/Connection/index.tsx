import HeaderWithBack from '@src/components/globals/HeaderWithBack';
import TablikeButton from '@src/components/globals/TablikeButton';
import { vs } from '@utils/design/design';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const index = () => {
    const [value, setValue] = useState("Connections");
  const [sellectAll, setSellectAll] = useState(false);
  const componenet1 = (
    <View style={{ marginTop: vs(10) }}>
      <Text>No Connection yet</Text>
     
    </View>
  );
  const componenet2 = (
    <View style={{ marginTop: vs(10) }}>
      <Text>Your Connection</Text>
      
    </View>
  );
  return (
    <View className='flex-1 bg-white'>
    <HeaderWithBack title='Connection'/>
     <TablikeButton
          btn1value="Connections"
          btn2value="Your Connections"
          btnTxt1="Connections"
          btnTxt2="Your Connections"
          onPress={(value) => setValue(value)}
          value={value}
          Componet1={componenet1}
          Componet2={componenet2}
        />
    </View>
  )
}

export default index

const styles = StyleSheet.create({})