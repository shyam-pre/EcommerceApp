import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { lazy, useCallback, useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet, Alert, FlatList, ActivityIndicator, BackHandler } from 'react-native'
// import {scale, moderateScale} from 'react-native-size-matters'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { RootStackParamList } from '../../navigation/RootNavigator';
import CountChild from './CountChild';
import { useTheme } from '../../context/ThemeContext';
import { UserContext } from '../../context/UserContext';
import { useFocusEffect } from '@react-navigation/native';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>

type Props = {
  navigation: HomeScreenNavigationProp
}
const HomeScreen: React.FC<Props> = ({ navigation }: Props) => {
  const { theme, changeTheme } = useTheme();
  const { setSelectedUser } = useContext(UserContext);
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');
  const [loader, setLoader] = useState(false)

  const handlePress = (item: any) => {
    setSelectedUser(item);
    navigation.navigate('NoteScreen')
  }

  const [userData, setUserData] = useState<any[]>([]);

  useEffect(() => {
    let userDetails = async () => {
      setLoader(true)
      try {
        let res = await fetch('https://dummyjson.com/users')
        let newRes = await res.json()
        if (newRes) {
          setUserData(newRes.users)
          console.log('ddddddddd', newRes);
          setLoader(false)
        } else {
          Alert.alert('', 'Wrong data')
        }
      }
      catch (err) {
        Alert.alert('', err),
          setLoader(false),
          console.log('err', err)
      }
    }
    userDetails()
  }, [])

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {

        BackHandler.exitApp()
        return true; // prevent default behavior
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => backHandler.remove();
    }, [])
  );


  if (loader) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* <View style={{flex:1, backgroundColor:'red'}}> */}
      <Text style={{
        fontSize: moderateScale(20),     // 👈 font responsive
        color: '#000',
        borderWidth: 1,
        // marginTop: verticalScale(10),    // 👈 responsive margin top
        // padding: scale(10),              // 👈 responsive padding
      }} onPress={() => navigation.navigate('Details')}>HomeScreen</Text>
      <Text style={{
        fontSize: moderateScale(20),     // 👈 font responsive
        color: '#000',
        borderWidth: 1,
        // marginTop: verticalScale(10),    // 👈 responsive margin top
        // padding: scale(10),              // 👈 responsive padding
      }} onPress={() => navigation.navigate('NoteScreen')}>Note</Text>
      <Text style={{
        fontSize: moderateScale(20),     // 👈 font responsive
        color: '#000',
        borderWidth: 1,
        // marginTop: verticalScale(10),    // 👈 responsive margin top
        // padding: scale(10),              // 👈 responsive padding
      }} onPress={() => navigation.navigate('CartMainScreen')}>CartMainScreen</Text>
      <Text style={{
        fontSize: moderateScale(20),     // 👈 font responsive
        color: '#000',
        borderWidth: 1,
        // marginTop: verticalScale(10),    // 👈 responsive margin top
        // padding: scale(10),
        // 👈 responsive padding
      }} onPress={() => navigation.navigate('CartScreen')}>CartScreen</Text>
      <Text style={{
        fontSize: moderateScale(20),     // 👈 font responsive
        color: '#000',
        borderWidth: 1,
        // marginTop: verticalScale(10),    // 👈 responsive margin top
        // padding: scale(10),
        // 👈 responsive padding
      }} onPress={() => navigation.navigate('AddTocartScreen')
      }>AddTocartScreen</Text>


      <TouchableOpacity>
        <Text style={{
          fontSize: moderateScale(20),     // 👈 font responsive
          color: '#000',
          borderWidth: 1,
          // marginTop: verticalScale(10),    // 👈 responsive margin top
          // padding: scale(10),              // 👈 responsive padding
        }} onPress={() => setCount(prevCount => prevCount + 1)}>{count}444444444</Text>
      </TouchableOpacity>
      <CountChild count={count} />
      <TouchableOpacity>
        <Text style={{
          fontSize: moderateScale(20),     // 👈 font responsive
          color: '#000',
          borderWidth: 1,
          // marginTop: verticalScale(10),    // 👈 responsive margin top
          // padding: scale(10),              // 👈 responsive padding
        }} onPress={() => setCount(prevCount => prevCount + 1)}>{count}444444444</Text>
      </TouchableOpacity>
      <CountChild count={count} />

      <TextInput value={input} onChangeText={(text) => setInput(text)} placeholder='Enter value' style={{ fontSize: 20, color: '#000', fontWeight: "600" }} />
      <Text>You typed: {input}</Text>
      <Text style={[styles.text, { color: theme.text }]}>Telegram Theme Example</Text>
      <View style={styles.buttons}>
        <Button title="Light" color={theme.primary} onPress={() => changeTheme('light')} />
        <Button title="Dark" color={theme.primary} onPress={() => changeTheme('dark')} />
        <Button title="Purple" color={theme.primary} onPress={() => changeTheme('purple')} />
      </View>
      {/* </View> */}

      <FlatList data={userData} renderItem={({ item }) => {
        return (
          <TouchableOpacity style={styles.boxContainer} onPress={() => handlePress(item)}>
            <Text>{item?.firstName}</Text>
          </TouchableOpacity>
        )
      }} />
    </View>
  )
}

export default HomeScreen
const styles = StyleSheet.create({
  container: { flex: 1 },
  text: { fontSize: 22, fontWeight: '600', marginBottom: 30 },
  buttons: { gap: 15 },
  boxContainer: {
    padding: scale(10),
    borderWidth: 1,
    borderColor: "#000"
  }
});
