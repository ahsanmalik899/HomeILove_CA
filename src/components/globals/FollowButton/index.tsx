import Colors from '@src/constants/Colors';
import { hs, vs } from '@utils/design/design';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
 id:number;
}
const index = ({id}: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() =>{
        console.log('pressed')
    }}>
      <Text style={styles.buttonText}>Unfollow</Text>
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
  },
});
