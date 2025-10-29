import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, Theme as NavigationTheme, DefaultTheme } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import SplashScreen from '../screen/auth/SplashScreen';
import OnbordingNavigator from './OnbordingNavigator';
import { useTheme } from '../context/ThemeContext';
import { StatusBar } from 'react-native';

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined; // DrawerNavigator
  Home: undefined;      // 👈 add this line
  Details: undefined;   // 👈 add this line
  Profile: undefined;
  Onbording: undefined
  // EditProfile:undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { theme } = useTheme();

  // 🟩 Fix: extend from DefaultTheme to satisfy required properties
  const navTheme: NavigationTheme = {
    ...DefaultTheme,
    dark: theme.mode === 'dark',
    colors: {
      ...DefaultTheme.colors,
      background: theme.background,
      text: theme.text,
      primary: theme.primary,
      card: theme.card,
      border: theme.card,
      notification: theme.primary,
    },
  };

  return (
    <>
      <StatusBar
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.card} // matches header
      />

      <NavigationContainer theme={navTheme}>
        <Stack.Navigator screenOptions={{
          headerShown: false,
          headerStyle: { backgroundColor: theme.card }, // 🟩 Header background
          headerTintColor: theme.text, // 🟩 Header text (back button + title)
          headerTitleStyle: { color: theme.text },
          contentStyle: { backgroundColor: theme.background }, // 🟩 Screen background
        }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Auth" component={AuthNavigator} />
          <Stack.Screen name="Main" component={DrawerNavigator} />
          <Stack.Screen name='Onbording' component={OnbordingNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </>

  );
};

export default RootNavigator;
