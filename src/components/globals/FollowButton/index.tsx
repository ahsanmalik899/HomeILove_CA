import Colors from '@src/constants/Colors';
import { hs, vs } from '@utils/design/design';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
 id:number;
 onPress:()=>void;
}
const index = ({id,onPress}: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() =>{
      onPress()
    }}>
      <Text style={styles.buttonText}>Connect</Text>
    </TouchableOpacity>
  );
};

export default index;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.red,
    paddingHorizontal: hs(15),
    paddingVertical: vs(10),
    borderRadius: 8,
    width:'30%',
    alignItems: 'center',
   
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontFamily: "PopinRegula",
  },
});
