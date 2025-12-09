import { Platform, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';

export const requestLocationPermission = async () => {
  try {
    const permission =
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

    let result = await check(permission);

    if (result === RESULTS.DENIED) {
      result = await request(permission);
    }

    if (result === RESULTS.GRANTED) {
      return true;
    } else if (result === RESULTS.BLOCKED) {
      Alert.alert(
        'Permission Blocked',
        'Please enable location permission from settings',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => openSettings() },
        ]
      );
      return false;
    } else {
      Alert.alert(
        'Location Required',
        'Please allow location permission to continue',
        [{ text: 'OK' }]
      );
      return false;
    }
  } catch (error) {
    console.log('Permission error:', error);
    return false;
  }
};

export const getCurrentLocation = () =>
  new Promise(async (resolve, reject) => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      return reject({ message: 'Permission denied' });
    }

    Geolocation.getCurrentPosition(
      position => {
        resolve(position);
      },
      error => {
        console.log('Geolocation error:', error);
        Alert.alert('Error', error.message || 'Unable to get location');
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        forceRequestLocation: true,
        showLocationDialog: true,
      }
    );
  });



// import { Platform, Alert } from 'react-native';
// import Geolocation from 'react-native-geolocation-service';
// import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

// export const requestLocationPermission = async () => {
//   try {
//     const permission =
//       Platform.OS === 'android'
//         ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
//         : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

//     let result = await check(permission);

//     if (result === RESULTS.DENIED) {
//       result = await request(permission);
//     }

//     if (result === RESULTS.GRANTED) {
//       return true;
//     } else {
//       Alert.alert(
//         'Location Permission',
//         'Please allow location permission to continue',
//         [{ text: 'OK' }]
//       );
//       return false;
//     }
//   } catch (error) {
//     console.log('Permission error:', error);
//     return false;
//   }
// };

// export const getCurrentLocation = () =>
//   new Promise(async (resolve, reject) => {
//     const hasPermission = await requestLocationPermission();
//     if (!hasPermission) {
//       return reject('Permission denied');
//     }

//     Geolocation.getCurrentPosition(
//       position => {
//         resolve(position);
//       },
//       error => {
//         reject(error.message);
//       },
//       {
//         enableHighAccuracy: true, // ✅ high accuracy like Zomato/Swiggy
//         timeout: 15000,
//         maximumAge: 10000,
//         forceRequestLocation: true,
//         showLocationDialog: true, // prompts user to enable GPS
//       }
//     );
//   });
