// import React, { useEffect, useState } from 'react';
// import { View, Text, PermissionsAndroid, Platform, Alert } from 'react-native';
// import Geolocation from 'react-native-geolocation-service';

// const MapScreen = () => {
//   const [location, setLocation] = useState(null);
//   const [error, setError] = useState(null);

//   const requestLocationPermission = async () => {
//     if (Platform.OS === 'ios') {
//       const status = await Geolocation.requestAuthorization('whenInUse');
//       if (status === 'granted') {
//         return true;
//       }
//       Alert.alert('Location permission denied', 'Please enable location services in your device settings.');
//       return false;
//     } else if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: "Location Permission",
//             message: "This app needs access to your location to show your current position.",
//             buttonNeutral: "Ask Me Later",
//             buttonNegative: "Cancel",
//             buttonPositive: "OK"
//           }
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           return true;
//         } else {
//           Alert.alert('Location permission denied', 'Please enable location services in your device settings.');
//           return false;
//         }
//       } catch (err) {
//         console.warn(err);
//         return false;
//       }
//     }
//     return false;
//   };

//   useEffect(() => {
//     const setupLocationTracking = async () => {
//       const hasPermission = await requestLocationPermission();
//       if (hasPermission) {
//         // Get current position once
//         Geolocation.getCurrentPosition(
//           (position) => {
//             setLocation(position.coords);
//             setError(null);
//           },
//           (err) => {
//             console.warn(err);
//             setError(err.message);
//           },
//           { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//         );

//         // Watch for position changes
//         const watchId = Geolocation.watchPosition(
//           (position) => {
//             setLocation(position.coords);
//             setError(null);
//           },
//           (err) => {
//             console.warn(err);
//             setError(err.message);
//           },
//           { enableHighAccuracy: true, distanceFilter: 10, interval: 5000 } // Update every 10 meters or 5 seconds
//         );

//         return () => Geolocation.clearWatch(watchId); // Clean up the watch when component unmounts
//       }
//     };

//     setupLocationTracking();
//   }, []);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text style={{ fontSize: 20, marginBottom: 10 }}>Current Location:</Text>
//       {location ? (
//         <>
//           <Text>Latitude: {location.latitude}</Text>
//           <Text>Longitude: {location.longitude}</Text>
//           <Text>Accuracy: {location.accuracy} meters</Text>
//           {location.speed !== -1 && <Text>Speed: {location.speed} m/s</Text>}
//         </>
//       ) : (
//         <Text>{error || "Fetching location..."}</Text>
//       )}
//     </View>
//   );
// };

// export default MapScreen;

// import React from 'react'
// import { View, Text } from 'react-native'
// import MapView, { Marker } from 'react-native-maps'
// import Geolocation  from 'react-native-geolocation-service'
// const MapScreen = () => {
//   return (
//     <View style={{flex:1}}> 
//       {/* <Text>mapScreen</Text> */}
//       <MapView style={{flex:1}} showsUserLocation={true} > 
         
//       </MapView>
//     </View>
//   )
// }

// export default MapScreen  


import React, { useState, useEffect } from 'react';
import { View, Text, PermissionsAndroid, Platform } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const MapScreen = () => {
  const [region, setRegion] = useState(null);

  // 1. Request Location Permissions
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    // For iOS, permissions are handled via the Info.plist file.
    return true;
  };

  // 2. Get Current Location
  const getLocation = () => {
    requestLocationPermission().then((granted) => {
      if (granted) {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setRegion({
              latitude,
              longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            });
          },
          (error) => {
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text>MapScreen</Text>
      {region ? (
        <MapView
          style={{ flex: 1 }}
          region={region} // Or use 'initialRegion' for a one-time set
          showsUserLocation={true}
          showsMyLocationButton={true} // Shows a button to center back on the user (Android only by default)
        />
      ) : (
        <Text>Loading map...</Text>
      )}
    </View>
  );
};

export default MapScreen;