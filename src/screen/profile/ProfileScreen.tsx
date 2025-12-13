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



// ######################### location
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Modal,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import Geolocation from "react-native-geolocation-service";
// import {
//   check,
//   request,
//   PERMISSIONS,
//   RESULTS,
//   openSettings,
// } from "react-native-permissions";

// export default function ProfileScreen() {
//   const [location, setLocation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     checkPermission();
//   }, []);

//   const checkPermission = async () => {
//     setLoading(true);

//     const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

//     if (result === RESULTS.GRANTED) {
//       getLocation();
//     } else {
//       setLoading(false);
//       setShowModal(true);
//     }
//   };

//   const requestPermission = async () => {
//     setLoading(true);

//     const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

//     if (result === RESULTS.GRANTED) {
//       setShowModal(false);
//       getLocation();
//     } else {
//       setLoading(false);
//       setShowModal(true);
//     }
//   };

//   const getLocation = () => {
//     Geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setLocation({
//           latitude,
//           longitude,
//           latitudeDelta: 0.01,
//           longitudeDelta: 0.01,
//         });
//         setLoading(false);
//       },
//       (error) => {
//         console.log("LOCATION ERROR:", error);
//         setLoading(false);

//         // yaha crash stop ho jayega
//         if (error.code === 1) {
//           setShowModal(true);
//         }
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 15000,
//         maximumAge: 10000,
//         forceRequestLocation: true,
//         showLocationDialog: true,
//       }
//     );
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {loading ? (
//         <View style={styles.center}>
//           <ActivityIndicator size="large" />
//           <Text>Fetching location...</Text>
//         </View>
//       ) : location ? (
//         <MapView
//           style={{ flex: 1 }}
//           region={location}
//           showsUserLocation={true}>
//           <Marker coordinate={location} title="You are here" />
//         </MapView>
//       ) : (
//         <View style={styles.center}>
//           <Text>No location found</Text>
//         </View>
//       )}

//       <Modal visible={showModal} transparent animationType="fade">
//         <View style={styles.modalBackground}>
//           <View style={styles.modalBox}>
//             <Text style={styles.modalTitle}>Enable Location</Text>
//             <Text style={styles.modalMessage}>
//               To continue, please enable your device location.
//             </Text>

//             <View style={styles.buttonRow}>
//               <TouchableOpacity
//                 style={styles.cancelButton}
//                 onPress={() => setShowModal(false)}>
//                 <Text style={styles.cancelText}>Cancel</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.okButton}
//                 onPress={() => openSettings()}>
//                 <Text style={styles.okText}>OK</Text>
//               </TouchableOpacity>
//             </View>

//             <TouchableOpacity
//               style={styles.retryButton}
//               onPress={requestPermission}>
//               <Text style={styles.retryText}>Retry</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   center: { flex: 1, justifyContent: "center", alignItems: "center" },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalBox: {
//     width: "85%",
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 15,
//   },
//   modalTitle: { fontSize: 20, fontWeight: "bold" },
//   modalMessage: { fontSize: 15, color: "#555", marginTop: 10 },
//   buttonRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 20,
//   },
//   cancelButton: {
//     backgroundColor: "#ddd",
//     padding: 12,
//     borderRadius: 8,
//     width: "45%",
//     alignItems: "center",
//   },
//   okButton: {
//     backgroundColor: "#ff4d4d",
//     padding: 12,
//     borderRadius: 8,
//     width: "45%",
//     alignItems: "center",
//   },
//   okText: { color: "white", fontWeight: "bold" },
//   retryButton: {
//     marginTop: 15,
//     backgroundColor: "#4caf50",
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   retryText: { color: "white", fontWeight: "bold" },
// });

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from "react-native-permissions";

export default function ProfileScreen() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    checkPermission();
  }, []);

  // -----------------------------
  // CHECK PERMISSION
  // -----------------------------
  const checkPermission = async () => {
    const permission =
      Platform.OS === "android"
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

    const result = await check(permission);

    if (result === RESULTS.GRANTED) {
      getLocation();
    } else {
      setLoading(false);
      setShowModal(true);
    }
  };

  // -----------------------------
  // REQUEST PERMISSION
  // -----------------------------
  const requestPermission = async () => {
    setLoading(true);

    const permission =
      Platform.OS === "android"
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

    const result = await request(permission);

    if (result === RESULTS.GRANTED) {
      setShowModal(false);
      getLocation();
    } else {
      setLoading(false);
      setShowModal(true);
    }
  };

  // -----------------------------
  // GET CURRENT LOCATION – SAFE (NO CRASH)
  // -----------------------------
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLocation({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });

        setLoading(false);
      },
      (error) => {
        console.log("LOCATION ERROR:", error);

        setLoading(false);

        if (error.code === 1) {
          // Permission denied
          setShowModal(true);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* --------- LOADING --------- */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 8 }}>Fetching location...</Text>
        </View>
      ) : location ? (
        /* --------- MAP --------- */
        <MapView style={{ flex: 1 }} region={location} showsUserLocation>
          <Marker coordinate={location} title="You are here" />
        </MapView>
      ) : (
        <View style={styles.center}>
          <Text>No location found</Text>
        </View>
      )}

      {/* --------- PERMISSION MODAL --------- */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Enable Location</Text>

            <Text style={styles.modalMessage}>
              To continue, please enable your device location.
            </Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowModal(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.okButton}
                onPress={() => openSettings()}>
                <Text style={styles.okText}>Open Settings</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.retryButton}
              onPress={requestPermission}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// --------------------------------
// STYLES
// --------------------------------
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalMessage: {
    fontSize: 15,
    color: "#555",
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
  },
  cancelText: {
    fontWeight: "bold",
    color: "#222",
  },
  okButton: {
    backgroundColor: "#ff4d4d",
    padding: 12,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
  },
  okText: {
    color: "white",
    fontWeight: "bold",
  },
  retryButton: {
    marginTop: 15,
    backgroundColor: "#4caf50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  retryText: {
    color: "white",
    fontWeight: "bold",
  },
});

//################################

//***********
// import React, { useRef } from 'react';
// import { 
//   Animated, 
//   ScrollView, 
//   View, 
//   Text, 
//   StyleSheet,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const AnimatedHeader = ({ animatedValue }) => {
//   const HEADER_HEIGHT = 50;
  
//   const headerHeight = animatedValue.interpolate({
//     inputRange: [0, HEADER_HEIGHT + 50],
//     outputRange: [HEADER_HEIGHT + 50, 50],
//     extrapolate: 'clamp'
//   });

//   return (
//     <Animated.View style={[styles.header, { height: headerHeight }]}>
//       <Text style={styles.headerText}>Animated Header</Text>
//     </Animated.View>
//   );
// };

// export default function ProfileScreen() {
//   const scrollY = useRef(new Animated.Value(0)).current;

//   const handleScroll = Animated.event(
//     [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//     { useNativeDriver: false }
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <AnimatedHeader animatedValue={scrollY} />
//       <ScrollView
//         onScroll={handleScroll}
//         scrollEventThrottle={16}
//         style={styles.scrollView}
//       >
//         {/* Your scroll content here */}
//         {Array.from({ length: 50 }).map((_, i) => (
//           <View key={i} style={styles.card}>
//             <Text>Item {i + 1}</Text>
//           </View>
//         ))}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   header: {
//     backgroundColor: 'lightblue',
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     zIndex: 10,
//   },
//   headerText: { fontSize: 24, fontWeight: 'bold' },
//   scrollView: { flex: 1, 
//     marginTop: 100

//    },
//   card: {
//     height: 100,
//     margin: 8,
//     backgroundColor: '#f0f0f0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 8,
//   },
// });
//***********


// import React, { useEffect, useState } from 'react';
// import { View, Button, Text, Alert, ActivityIndicator } from 'react-native';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../../src/navigation/RootNavigator';
// import { keys, removeData } from '../../../src/utils/storage';
// import { scale, moderateScale, verticalScale } from 'react-native-size-matters'
// import { ProfileStackParamList } from '../../navigation/ProfileNavigator';
// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// import { decrement, reset } from '../../redux/slices/CounterSlice';
// import { RootState } from '../../redux/store';
// import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// import { getCurrentLocation } from './LocationServices';
// type Props = NativeStackScreenProps<ProfileStackParamList, 'Profile'>;

// // type Props = {
// //   navigation :ProfileScreenNativeProps;

// // }
// const ProfileScreen: React.FC<Props> = ({ navigation }) => {
//   // const count = useSelector((state: { counter: { value: number } }) => state?.counter?.value)
//   const count = useAppSelector((state) => state?.counter?.value)
//   // const dispatch = useDispatch();
//   const dispatch = useAppDispatch();

//   const handleLogout = () => {
//     removeData(keys.TOKEN);
//     // navigation.replace('Auth'); // back to login/signup
//     // navigation.getParent()?.navigate('Auth')
//     // add change
//     navigation.getParent()?.navigate('Auth')
//   };




//   ///////////// location code
//    const [location, setLocation] = useState(null);
//   const [loading, setLoading] = useState(false);

//  const fetchLocation = async () => {
//   setLoading(true);
//   try {
//     const pos = await getCurrentLocation();
//     setLocation(pos.coords);
//   } catch (error) {
//     console.log('Location error:', error);
//     Alert.alert('Location Error', error.message || JSON.stringify(error));
//   } finally {
//     setLoading(false);
//   }
// };


//   useEffect(() => {
//     fetchLocation();
//   }, []);
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             {loading && <ActivityIndicator size="large" color="#ff0000" />}
//   {location ? (
//     <Text>
//           Latitude: {location.latitude}{"\n"}
//           Longitude: {location.longitude}
//         </Text>
//       ) : (
//         <Text>No location fetched yet</Text>
//       )}

//       <Button title="Refresh Location" onPress={fetchLocation} />




// {/* 
//       <Text style={{
//         fontSize: moderateScale(20), padding: scale(20),
//         marginBottom: verticalScale(10),
//         color: '#000', borderWidth: 1
//       }} onPress={() => navigation.navigate('EditProfile')}>Profile</Text>
//       <Button title="Logout" onPress={handleLogout} />
//       <Text style={{ color: '#000', fontWeight: '700', fontSize: 20, marginVertical: 5 }}>{count}</Text>
//       <Button title="Increment" onPress={() => dispatch(increment())} />
//       <Text style={{ color: '#000', fontWeight: '700', fontSize: 20, marginVertical: 5 }}>{count}</Text>
//       <Button title="Decrement" onPress={() => dispatch(decrement())} />
//       <Text style={{ color: '#000', fontWeight: '700', fontSize: 20, marginVertical: 5 }}>{count}</Text>
//       <Button title="Reset" onPress={() => dispatch(reset())} />

//          */}
//     </View>
//   )}
      

// export default ProfileScreen;


// // import { View, Text } from 'react-native'
// // import React from 'react'

// // const ProfileScreen = () => {
// //   return (
// //     <View>
// //       <Text>ProfileScreen</Text>
// //     </View>
// //   )
// // }

// // export default ProfileScreen