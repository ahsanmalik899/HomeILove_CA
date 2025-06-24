import Colors from '@src/constants/Colors';
import { hs, vs } from '@utils/design/design';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  text: string;
  handleSubmit: () => void;
}
const LargeButton = ({ handleSubmit, text }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default LargeButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.red,
    paddingHorizontal: hs(15),
    paddingVertical: vs(15),

    borderRadius: 8,
    alignItems: 'center',
    marginVertical: vs(15),
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
