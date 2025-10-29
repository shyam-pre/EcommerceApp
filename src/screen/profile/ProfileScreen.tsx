import React from 'react';
import { View, Button, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../src/navigation/RootNavigator';
import { keys, removeData } from '../../../src/utils/storage';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters'
import { ProfileStackParamList } from '../../navigation/ProfileNavigator';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { decrement, increment, reset } from '../../redux/slices/CounterSlice';
import { RootState } from '../../redux/store';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
type Props = NativeStackScreenProps<ProfileStackParamList, 'Profile'>;

// type Props = {
//   navigation :ProfileScreenNativeProps;

// }
const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  // const count = useSelector((state: { counter: { value: number } }) => state?.counter?.value)
  const count = useAppSelector((state) => state?.counter?.value)
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    removeData(keys.TOKEN);
    // navigation.replace('Auth'); // back to login/signup
    // navigation.getParent()?.navigate('Auth')
    // add change
    navigation.getParent()?.navigate('Auth')
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{
        fontSize: moderateScale(20), padding: scale(20),
        marginBottom: verticalScale(10),
        color: '#000', borderWidth: 1
      }} onPress={() => navigation.navigate('EditProfile')}>Profile</Text>
      <Button title="Logout" onPress={handleLogout} />
      <Text style={{ color: '#000', fontWeight: '700', fontSize: 20, marginVertical: 5 }}>{count}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Text style={{ color: '#000', fontWeight: '700', fontSize: 20, marginVertical: 5 }}>{count}</Text>
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
      <Text style={{ color: '#000', fontWeight: '700', fontSize: 20, marginVertical: 5 }}>{count}</Text>
      <Button title="Reset" onPress={() => dispatch(reset())} />
    </View>
  );
};

export default ProfileScreen;


// import { View, Text } from 'react-native'
// import React from 'react'

// const ProfileScreen = () => {
//   return (
//     <View>
//       <Text>ProfileScreen</Text>
//     </View>
//   )
// }

// export default ProfileScreen