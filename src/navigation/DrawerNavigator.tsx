  // import React from 'react'
  // import {createDrawerNavigator} from '@react-navigation/drawer'
  // import HomeNavigator from './HomeNavigator'
  // import ProfileNavigator from './ProfileNavigator'
  // import ReviewScreen from './ReviewScreen'

  // export type DrawerParamList = {
  // HomeDrawer:undefined;
  // ProfileDrawer:undefined;
  // ReviewScreen:undefined
  // }

  // const Drawer = createDrawerNavigator<DrawerParamList>();

  
  // const DrawerNavigator = () => {
  //   return(
  //     <Drawer.Navigator initialRouteName='HomeDrawer' screenOptions={{headerShown:false}}>
  //       <Drawer.Screen name='HomeDrawer' component={HomeNavigator} options={{title:'Home', headerShown:false}} />
  //       <Drawer.Screen name='ProfileDrawer' component={ProfileNavigator} options={{title:'Porfile'}}/>
  //       <Drawer.Screen name='ReviewScreen' component={ReviewScreen} options={{title:'Review'}}/>
  //     </Drawer.Navigator>
  //   )
  // }

  // export default DrawerNavigator;



  import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import HomeNavigator from './HomeNavigator';
import ProfileNavigator from './ProfileNavigator';
import ReviewScreen from './ReviewScreen';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import animationScreen1 from '../screen/animations/animationScreen1'
import AnimatedStyleProp from '../screen/animations/AnimatedStyleProp';
import ProductScreen from '../screen/animations/ProductScreen';

export type DrawerParamList = {
  HomeDrawer: undefined;
  ProfileDrawer: undefined;
  ReviewScreen: undefined;
  animationScreen1: undefined;
  AnimatedStyleProp: undefined;
  ProductScreen: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

// ✅ Custom Drawer Content
const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My App</Text>
      </View>

      {/* Render default drawer items */}
      <DrawerItemList {...props} />

      {/* Add a custom button */}
      <TouchableOpacity
        style={styles.customButton}
        onPress={() => Alert.alert('Custom Action!')}
      >
        <Text style={styles.buttonText}>Custom Button</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeDrawer"
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: 'green',
        drawerInactiveTintColor: 'gray',
        drawerItemStyle: {
      borderRadius: scale(5),   // ✅ make the focus button square
      marginVertical: moderateScale(1), 
      height:hp(7)
    },
      }}
   drawerContent={(props) => <CustomDrawerContent {...props}/>}
    >
      <Drawer.Screen
        name="HomeDrawer"
        component={HomeNavigator}
        options={{ title: 'Home' }}
        
      />
      <Drawer.Screen
        name="ProfileDrawer"
        component={ProfileNavigator}
        options={{ title: 'Profile' }}
      />
      <Drawer.Screen
        name="ReviewScreen"
        component={ReviewScreen}
        options={{ title: 'Review' }}
      />

      <Drawer.Screen name='AnimatedStyleProp' component={AnimatedStyleProp} />
      <Drawer.Screen name='animationScreen1' component={animationScreen1} />
      <Drawer.Screen name='ProductScreen' component={ProductScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({
  header: {
    height: hp('18%'),
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: { fontSize: moderateScale(22), fontWeight: 'bold' },
  customButton: {
    marginTop: verticalScale(20),
    marginHorizontal: scale(10),
    padding: scale(15),
    backgroundColor: 'orange',
    borderRadius: scale(10),
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
