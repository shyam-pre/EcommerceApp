// import {showMessage} from 'react-native-flash-message';
import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export const getCurrentLocation = () =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const cords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          heading: position?.coords?.heading,
        };
    

        return resolve(cords);
      },
      error => {
        return reject(error.message);
      },
      // {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });

export const locationPermission = () =>
  new Promise(async (resolve, reject) => {
    if (Platform.OS === 'ios') {
      try {
        Geolocation.requestAuthorization(
          () => resolve('granted'),
          err => reject('Permission not granted'),
        );
      } catch (error) {
        return reject(error);
      }
    } else {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ])
        .then(granted => {
          if (
            granted['android.permission.ACCESS_FINE_LOCATION'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            granted['android.permission.ACCESS_COARSE_LOCATION'] ===
              PermissionsAndroid.RESULTS.GRANTED
          ) {
            return resolve('granted');
          } else if (
            granted['android.permission.ACCESS_FINE_LOCATION'] !==
            PermissionsAndroid.RESULTS.GRANTED
          ) {
            return reject('ACCESS_FINE_LOCATION Permission denied');
          } else if (
            granted['android.permission.ACCESS_COARSE_LOCATION'] !==
            PermissionsAndroid.RESULTS.GRANTED
          ) {
            return reject('ACCESS_COARSE_LOCATION Permission denied');
          }
        })
        .catch(error => {
          console.log('Ask Location permission error: ', error);
          return reject(error);
        });
    }
  });

// const showError = message => {
//   showMessage({
//     message,
//     type: 'danger',
//     icon: 'danger',
//   });
// };

// const showSuccess = message => {
//   showMessage({
//     message,
//     type: 'success',
//     icon: 'success',
//   });
// };

// export {showError, showSuccess};
