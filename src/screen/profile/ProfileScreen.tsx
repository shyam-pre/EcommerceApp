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


import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
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

  const checkPermission = async () => {
    setLoading(true);

    const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    if (result === RESULTS.GRANTED) {
      getLocation();
    } else {
      setLoading(false);
      setShowModal(true);
    }
  };

  const requestPermission = async () => {
    setLoading(true);

    const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    if (result === RESULTS.GRANTED) {
      setShowModal(false);
      getLocation();
    } else {
      setLoading(false);
      setShowModal(true);
    }
  };

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

        // yaha crash stop ho jayega
        if (error.code === 1) {
          setShowModal(true);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        forceRequestLocation: true,
        showLocationDialog: true,
      }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text>Fetching location...</Text>
        </View>
      ) : location ? (
        <MapView
          style={{ flex: 1 }}
          region={location}
          showsUserLocation={true}>
          <Marker coordinate={location} title="You are here" />
        </MapView>
      ) : (
        <View style={styles.center}>
          <Text>No location found</Text>
        </View>
      )}

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
                <Text style={styles.okText}>OK</Text>
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

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
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
  modalTitle: { fontSize: 20, fontWeight: "bold" },
  modalMessage: { fontSize: 15, color: "#555", marginTop: 10 },
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
  okButton: {
    backgroundColor: "#ff4d4d",
    padding: 12,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
  },
  okText: { color: "white", fontWeight: "bold" },
  retryButton: {
    marginTop: 15,
    backgroundColor: "#4caf50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  retryText: { color: "white", fontWeight: "bold" },
});



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