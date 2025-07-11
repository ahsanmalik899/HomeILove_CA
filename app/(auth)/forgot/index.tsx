/* eslint-disable import/order */
/* eslint-disable global-require */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable react/function-component-definition */
import { useResetpassMutation } from '@/store/api/user/Authapi';
import { setemail } from '@/store/slices/user';
import { resetpass } from '@/store/type/user';
import Logo from '@assets/logo/logo-black.svg';
import LargeButton from '@src/components/globals/LaregeButton';
import Loading from '@src/components/globals/Loading';
import { renderToastError, renderToastSuccess } from '@src/hooks/useToasty';
import { hs, ms, vs } from '@utils/design/design';
import { router } from 'expo-router';
import { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
 
export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const [resetpassword,{isLoading}]=useResetpassMutation();
 const forgotpassword=async ()=>{
  dispatch(setemail(email));
  try{
const res = await resetpassword({ email } as resetpass).unwrap();

if(res?.sucss){
  renderToastSuccess(res?.message);
  router.replace('/(auth)/PassReset');}
else{
   
    const message = res?.message|| err?.error ||"Network Error";
    renderToastError(message);
}

  }
  catch(err){
    console.log(err)
    const message = err?.data?.error|| err?.error ||"Network Error";
    renderToastError(message);
  }
 }
 
  return (
    <ImageBackground
      source={require('@assets/signinicon/Background.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
      onError={(error) => console.log('Image load error:', error.nativeEvent.error)} 
    >
 
        <View className="flex-1">
          <View style={styles.topSection}>
            <View style={styles.logoContainer}>
              <Logo />
            </View>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>Forgot {'\n'}Password.</Text>
            <Text style={styles.subtitle}>Sign in in to find your perfect home or service.</Text>

            <View style={styles.form}>
             
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />

            
            </View>
            <LargeButton text='signin' handleSubmit={forgotpassword}/>
          </View>
        </View>
   <Loading isLoading={isLoading} text="Sernding Mail...." />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%', 
    height: '100%', 
  },
  topSection: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: vs(100), 
    marginBottom: vs(50), 
  },
  logoContainer: {
    alignItems: 'center',
  },
  formContainer: {
    paddingHorizontal: hs(20), 
    borderTopLeftRadius: ms(50), 
    borderTopRightRadius: ms(50), 
    paddingBottom: vs(500), 
    marginTop:vs(40),
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    overflow: 'hidden',
  },
  title: {
    fontSize: ms(42), 
    fontWeight: '400',
    color: 'black',
    marginTop: vs(50), 
  },
  subtitle: {
    fontSize: ms(18), 
    color: 'black',
    fontWeight: '500',
    marginTop: vs(20), 
    lineHeight: vs(20), 
  },
  input: {
    height: vs(60), 
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: ms(8), 
    marginBottom: vs(15), 

    paddingHorizontal: hs(15), 
    backgroundColor: '#FFFFFF',
    fontSize: ms(14), 
    color: '#333',
  },


  form: {
    marginTop: vs(20), 
    marginBottom:vs(210),
  },
});