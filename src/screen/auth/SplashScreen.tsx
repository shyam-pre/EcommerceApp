import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import {getData, keys} from '../../utils/storage';
import { Text } from 'react-native-gesture-handler';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const checkAuth = async () => {
      const token = getData(keys.TOKEN); // synchronous MMKV
      
      if (token) {
        navigation.replace('Main'); // Home / Drawer
      } else {
        navigation.replace('Auth'); // Login/Signup
      }
      // OnbordingNavigator
    };

    // Optional: add a small delay for splash
    setTimeout(checkAuth, 3000);
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{color:'#000', fontSize:20}}>Splash screen</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default SplashScreen;
