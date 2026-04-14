import { userdata } from '@/store/slices/selector/user';
import Colors from '@src/constants/Colors';
import { useAppSelector } from '@src/hooks/useReduxHooks';
import { hs, vs } from '@utils/design/design';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  id: number;
  status?: 'accepted' | 'pending' | 'none'; // 👈 added
  onPress: (status:string) => void;
}

const FollowButton = ({ id, status = 'none', onPress }: ButtonProps) => {
 const user = useAppSelector(userdata);
  const getButtonText = () => {
   
    if (status === 'accepted') return 'Unfollow';
    if (status === 'pending') {if(id===user?.id.toString()) return 'Accept Request'; else return 'Cancel Request';}
    return 'Connect';
  };

  const getButtonStyle = () => {
    if (status === 'accepted') return styles.connected;
    if (status === 'pending') return styles.pending;
    return styles.default;
  };

  
  

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle()]}
      onPress={()=>onPress(getButtonText().toString())}
    
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>
        {getButtonText()}
      </Text>
    </TouchableOpacity>
  );
};

export default FollowButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: hs(15),
    paddingVertical: vs(10),
    borderRadius: 8,
    width:hs(140),
    alignItems: 'center',
  },

  default: {
    backgroundColor: Colors.light.red, // 🔴 Connect
  },

  connected: {
    backgroundColor: '#4CAF50', // 🟢 Connected
  },

  pending: {
    backgroundColor: '#9E9E9E', // ⚪ Requested
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontFamily: "PopinRegula",
  },
});