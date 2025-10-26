import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackParamList } from '../../../src/navigation/AuthNavigator';
import { keys, saveData } from '../../../src/utils/storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { scale, ModerateScale, verticalScale, moderateScale } from 'react-native-size-matters'
type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 🔹 API call logic
    // assume login success and token received: 
    const token = 'mock_token_12345';
    // saveToken(token);
    saveData(keys.TOKEN, token);

    if (email.trim() === '') {
      Alert.alert('', 'please enter email')
      return
    }
    if (password.trim() === '') {
      Alert.alert('', 'Please enter password')
      return
    }
    // navigation.replace('Main'); // go to Drawer/Home
    navigation.getParent()?.navigate('Main')
  };



  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: moderateScale(2) }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ borderWidth: 1, borderColor: '#000', height: hp(6) }} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, borderColor: '#000', height: hp(6), marginVertical: hp(2) }} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
