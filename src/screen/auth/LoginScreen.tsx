import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert, BackHandler } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackParamList } from '../../../src/navigation/AuthNavigator';
import { keys, saveData } from '../../../src/utils/storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { scale, ModerateScale, verticalScale, moderateScale } from 'react-native-size-matters'
import { useGetCartsQuery } from '../../api/cartApi';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { setCarts } from '../../redux/slices/MainCartSlice';
type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const { data, error, isLoading } = useGetCartsQuery()
    console.log('dataddddddddd', data);
    
const dispatch = useDispatch<AppDispatch>()
  const handleLogin = async() => {
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
    // saveData(keys.Cart_Data, data?.carts)
    

    // if (data?.carts) {
    //   dispatch(setCarts(data.carts)); // ✅ store data in Redux
    // }
            // dispatch(addItemToCart(item))

    navigation.getParent()?.navigate('Main');
  };

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove()
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: moderateScale(2) }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ borderWidth: 1, borderColor: '#000', height: hp(6) }} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, borderColor: '#000', height: hp(6), marginVertical: hp(2) }} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
