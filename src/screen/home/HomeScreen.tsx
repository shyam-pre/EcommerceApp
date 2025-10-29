// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import React, { useState } from 'react'
// import { View, Text, TouchableOpacity, TextInput } from 'react-native'
// // import {scale, moderateScale} from 'react-native-size-matters'
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import { RootStackParamList } from '../../navigation/RootNavigator';
// import CountChild from './CountChild';

// type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>

// type Props = {
//   navigation: HomeScreenNavigationProp
// }
// const HomeScreen: React.FC<Props> = ({ navigation } : Props) => {

//   const [count, setCount] = useState(0);
//   const [input, setInput] = useState('');

//   return (
//     <View style={{flex:1, backgroundColor:'green'}}>
//       <Text style={{
//         fontSize: moderateScale(20),     // 👈 font responsive
//         color: '#000',
//         borderWidth: 1,
//         marginTop: verticalScale(10),    // 👈 responsive margin top
//         padding: scale(10),              // 👈 responsive padding
//       }} onPress={() => navigation.navigate('Details')}>HomeScreen</Text>
//       <Text style={{
//         fontSize: moderateScale(20),     // 👈 font responsive
//         color: '#000',
//         borderWidth: 1,
//         marginTop: verticalScale(10),    // 👈 responsive margin top
//         padding: scale(10),              // 👈 responsive padding
//       }} onPress={() => navigation.navigate('NoteScreen')}>Note</Text>
//       <Text style={{
//         fontSize: moderateScale(20),     // 👈 font responsive
//         color: '#000',
//         borderWidth: 1,
//         marginTop: verticalScale(10),    // 👈 responsive margin top
//         padding: scale(10),
//         // 👈 responsive padding
//       }} onPress={() => navigation.navigate('CartScreen')}>CartScreen</Text>


//       <TouchableOpacity>
//         <Text style={{
//           fontSize: moderateScale(20),     // 👈 font responsive
//           color: '#000',
//           borderWidth: 1,
//           marginTop: verticalScale(10),    // 👈 responsive margin top
//           padding: scale(10),              // 👈 responsive padding
//         }} onPress={() => setCount(prevCount => prevCount + 1)}>{count}</Text>
//       </TouchableOpacity>
//       <CountChild count={count} />

//       <TextInput value={input} onChangeText={(text) => setInput(text)} placeholder='Enter value' style={{ fontSize: 20, color: '#000', fontWeight: "600" }} />
//       <Text>You typed: {input}</Text>

//     </View>
//   )
// }

// export default HomeScreen




// HomeScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const HomeScreen: React.FC = () => {
  const { theme, changeTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.text, { color: theme.text }]}>Telegram Theme Example</Text>

      <View style={styles.buttons}>
        <Button title="Light" color={theme.primary} onPress={() => changeTheme('light')} />
        <Button title="Dark" color={theme.primary} onPress={() => changeTheme('dark')} />
        <Button title="Purple" color={theme.primary} onPress={() => changeTheme('purple')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 22, fontWeight: '600', marginBottom: 30 },
  buttons: { gap: 15 },
});

export default HomeScreen;
