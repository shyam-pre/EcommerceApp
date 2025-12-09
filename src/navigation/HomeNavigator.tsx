import React, { createContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screen/home/HomeScreen';
import DetailsScreen from '../screen/home/DetailsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileNavigator from './ProfileNavigator';
import NoteScreen from '../screen/home/NoteScreen';
import CartScreen from '../screen/home/CartScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import CartMainScreen from '../screen/home/CartMainScreen';
import AddTocartScreen from '../screen/home/AddTocartScreen';

export type HomeStackParamList = {
  HomeMain: undefined;
  Details: { id: string };
  NoteScreen: undefined;
  CartScreen: undefined;
  CartMainScreen: undefined;
  AddTocartScreen: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Details' }} />
      <Stack.Screen name='NoteScreen' component={NoteScreen} options={{ title: 'Note' }} />
      <Stack.Screen name='CartMainScreen' component={CartMainScreen} options={{ title: 'CartMain' }} />
      <Stack.Screen name='AddTocartScreen' component={AddTocartScreen} options={{ title: 'AddTocart' }} />
      <Stack.Screen name='CartScreen' component={CartScreen} options={{ title: 'Cart' }} />
    </Stack.Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: 'yellow', tabBarInactiveTintColor: 'green', tabBarHideOnKeyboard: true }}>
      {/* <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ tabBarIcon: ({ color, size }) =>( <Icon name="home-outline" size={size} color={color}/>)
      // tabBarLabel:'Homessss'  // optional
      }}
      /> */}
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeMain';

          // 👇 define which stack screens should hide tab bar
          const hideTabScreens = ['NoteScreen', 'CartScreen'];

          return {
            tabBarStyle: {
              display: hideTabScreens.includes(routeName) ? 'none' : 'flex',
            },
            tabBarIcon: ({ color, size }) => (
              <Icon name="home-outline" size={size} color={color} />
            ),
          };
        }}
      />

      <Tab.Screen
        name="ProfileTab"
        component={ProfileNavigator} // optional: reuse HomeStack or separate
        options={{ tabBarIcon: ({ color, size }) => <Icon name="person-outline" size={size} color={color} /> }}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigator;
