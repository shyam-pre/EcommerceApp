import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react'
import { View, Text } from 'react-native'
// import {scale, moderateScale} from 'react-native-size-matters'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { RootStackParamList } from '../../navigation/RootNavigator';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>

type Props = {
  navigation : HomeScreenNavigationProp
} 
  const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Text style={{
        fontSize: moderateScale(20),     // 👈 font responsive
        color: '#000',
        borderWidth: 1,
        marginTop: verticalScale(10),    // 👈 responsive margin top
        padding: scale(10),              // 👈 responsive padding
      }} onPress={() => navigation.navigate('Details') }>HomeScreen</Text>
      <Text style={{
        fontSize: moderateScale(20),     // 👈 font responsive
        color: '#000',
        borderWidth: 1,
        marginTop: verticalScale(10),    // 👈 responsive margin top
        padding: scale(10),              // 👈 responsive padding
      }} onPress={() => navigation.navigate('NoteScreen') }>Note</Text>
      <Text style={{
        fontSize: moderateScale(20),     // 👈 font responsive
        color: '#000',
        borderWidth: 1,
        marginTop: verticalScale(10),    // 👈 responsive margin top
        padding: scale(10),              // 👈 responsive padding
      }} onPress={() => navigation.navigate('CartScreen') }>CartScreen</Text>
      
    </View>
  )
}

export default HomeScreen