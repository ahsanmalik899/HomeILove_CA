import { Ionicons } from '@expo/vector-icons';
import Colors from '@src/constants/Colors';
import { ms } from '@utils/design/design';
import React from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const index = () => {
    const options=["a","b","c"];
   const  value=""
     const [open, setOpen] = React.useState(false);
      const [items, setItems] = React.useState(
        options.map((opt) => ({ label: opt, value: opt }))
      );
  return (
    <View>
        <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={(callback) => {
         
        }}
        setItems={setItems}
        placeholder={"Radius(miles)"}
        placeholderStyle={{
          color: Colors.light.textGray,
          
        }}
        style={{
          
          borderColor: Colors.light.textGray,
          borderRadius: ms(5),
        }}
        dropDownContainerStyle={{
          backgroundColor: "white",
          borderColor: "white",
          elevation: 2,
        }}
        textStyle={{
          fontSize: ms(14),
          textAlign:'center',
          color: Colors.light.textGray,
        }}
        listItemLabelStyle={{
          color: "black",
        }}
       
        ArrowUpIconComponent={() => (
          <Ionicons
            name="chevron-up"
            size={18}
            color={Colors.light.textGray}
          />
        )}
        ArrowDownIconComponent={() => (
          <Ionicons
            name="chevron-down"
            size={18}
            color={Colors.light.textGray}
          />
        )}
        TickIconComponent={() => null}
        zIndex={2000}
        zIndexInverse={1000}
      />
    </View>
  )
}

export default index