/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
  Alert,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MapView, {Marker, AnimatedRegion, UrlTile} from 'react-native-maps';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {GOOGLE_MAP_KEY} from '../constants/googleMapKey';
import ic_greenMarker from '../../../../Provider/png/greenMarker.png';
// import imagePath from '../constants/imagePath';
// import MapViewDirections from 'react-native-maps-directions';
// import Loader from '../components/Loader';
// import {locationPermission, getCurrentLocation} from '../helper/helperFunction';
// import AddressPickup from '../components/AddressPickup';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import {getCurrentLocation, locationPermission} from './helperFunction';
import AppLoader from '../../../../Provider/AppLoader';

//location enable
import {promptForEnableLocationIfNeeded} from 'react-native-android-location-enabler';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import { selectLocationData } from '../../../../redux/action/selectMapLocation';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0036680667433550695;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const LONGITUDE_DELTA = 0.0020602717995643616;

export default MapScreen = ({selectedAddress}) => {
  const dispatch = useDispatch();

  const navigation = useNavigation(); // Use the useNavigation hook

  const mapRef = useRef();

  const [changing, setChanging] = useState(false);
  const [state, setState] = useState({
    curLoc: {
      latitude: 30.7046,
      longitude: 77.1025,
    },
    loading: false,
    coordinate: new AnimatedRegion({
      latitude: 30.7046,
      longitude: 77.1025,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    selected_coordinate: {
      latitude: 30.7046,
      longitude: 77.1025,
    },
  });

  const {curLoc, loading, coordinate} = state;
  const updateState = data => setState(pevState => ({...pevState, ...data}));  
  // dispatch(selectLocationData(state.selected_coordinate));

  useEffect(() => {
    getLiveLocation();
  }, []);

  useEffect(() => {
    if (selectedAddress) {
      handleSearch(selectedAddress.lat, selectedAddress.lng);
    }
  }, [selectedAddress]);

    // This useEffect will dispatch the selected coordinate whenever it changes
    useEffect(() => {
      if (state.selected_coordinate) {
        dispatch(selectLocationData(state.selected_coordinate));
      }
    }, [state.selected_coordinate, dispatch]);

  // useEffect(() => {
  //   if (props.route.params.autoSelectLocation) {
  //     setGetSelectedLocation(props.route.params.autoSelectLocation);
  //   }
  // }, [props.route.params]);

  // const getLiveLocation = async () => {
  //   handleCheckPressed();
  //   const locPermission = await locationPermission();
  //   // console.log(locPermission);
  //   if (locPermission === 'granted') {
  //     console.log('33333333#############################', await getCurrentLocation());
  //     const {latitude, longitude} = await getCurrentLocation();
  //     // const a = getCurrentLocation();
  //     // console.log('^544444444444444444433333333333',a);

  //     animate(latitude, longitude);
  //     updateState({
  //       curLoc: {latitude, longitude},
  //       coordinate: new AnimatedRegion({
  //         latitude: latitude,
  //         longitude: longitude,
  //         latitudeDelta: LATITUDE_DELTA,
  //         longitudeDelta: LONGITUDE_DELTA,
  //       }),
  //       selected_coordinate: {
  //         latitude: latitude,
  //         longitude: longitude,
  //       },
  //     });
  //   }
  // };

  const getLiveLocation = async () => {
    // location permission
    await handleCheckPressed(); // Ensure location services are enabled

    try {
      const locPermission = await locationPermission();
      // console.log('Location Permission:', locPermission);

      if (locPermission === 'granted') {
        const location = await getCurrentLocation();
        // console.log('Current Location:ssssssss', location);

        animate(location.latitude, location.longitude);
        updateState({
          curLoc: location,
          coordinate: new AnimatedRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }),
          selected_coordinate: location,
        });
      } else {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to proceed.',
        );
      }
    } catch (error) {
      Alert.alert('Error', `Failed to get location: ${error}`);
      console.log('Error getting location:', error);
    }
  };

  // enable location
  const handleCheckPressed = async () => {
    if (Platform.OS === 'android') {
      try {
        const enableResult = await promptForEnableLocationIfNeeded();
        // console.log('eneeeeeeeeeeeeeeee', enableResult);
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert('Error', 'something went wrong during the process');
          // console.log('*************errrhhhhhhhhhh',error);
        }
      }
    }
  };

  // const onPressLocation = () => {
  //   navigation.navigate('address_picker_map_chooseLocation', {
  //     getCordinates: fetchValue,
  //   });
  // };
  // const fetchValue = ({coordinates}) => {
  //   const {latitude, longitude} = coordinates;
  //   animate(latitude, longitude);
  //   updateState({
  //     coordinate: new AnimatedRegion({
  //       latitude: latitude,
  //       longitude: longitude,
  //       latitudeDelta: LATITUDE_DELTA,
  //       longitudeDelta: LONGITUDE_DELTA,
  //     }),
  //     selected_coordinate: {
  //       latitude: latitude,
  //       longitude: longitude,
  //     },
  //   });
  // };

  const animate = (latitude, longitude) => {
    const newCoordinate = {latitude, longitude};
    if (Platform.OS == 'android') {
      mapRef.current.animateToRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };

  const handleRegionChangeComplete = region => {
    // console.log('sssssssssssssssssssssregin', region);

    setChanging(false);
    const {latitude, longitude, latitudeDelta, longitudeDelta} = region;
    updateState({
      coordinate: new AnimatedRegion({
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta,
      }),
      selected_coordinate: {
        latitude: latitude,
        longitude: longitude,
      },
    });

    // console.log('handleRegion', {
    //   latitude,
    //   longitude,
    //   latitudeDelta,
    //   longitudeDelta,
    // });
  };

  const handleSearch = (latitude, longitude, zipCode, cityText) => {
    // console.log('>>>>>/////////////////////',latitude,longitude);
    animate(latitude, longitude);

    // updateState({
    //   coordinate: new AnimatedRegion({
    //     latitude,
    //     longitude,
    //     latitudeDelta: LATITUDE_DELTA,
    //     longitudeDelta: LONGITUDE_DELTA,
    //   }),

    //   selected_coordinate: {
    //     latitude: latitude,
    //     longitude: longitude,
    //   },
    // });
  };

  const markerTranslate = useAnimatedStyle(() => {
    return {
      transform: [{translateY: withTiming(changing ? -10 : 0)}],
      height: 30,
      width: 30,
    };
  });
  

  // locatioin enable fuction
  // const handleCheckPressed = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const enableResult = await promptForEnableLocationIfNeeded();
  //       // console.log('&7777777777777',enableResult);
  //       setLocationStatus(enableResult)

  //       // await promptForEnableLocationIfNeeded();
  //       requestLocationPermission();
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         Alert.alert('Error', 'something went wrong during the process')
  //         // console.log('*************errrhhhhhhhhhh',error);
  //       }
  //     }
  //   }
  // };

  return (
    <SafeAreaView edges={[]} style={styles.container}>
      <StatusBar style="auto" />

      {/* <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          // paddingHorizontal: '5%',
        }}>
        <AntDesign
          // onPress={() => props.navigation.goBack()}
          onPress={() => navigation.navigate('SelectAddress')}
          name="left"
          color="#000"
          size={hp(4)}
          style={{marginRight: wp(5), marginLeft: 10}}
        />
        <AddressPickup
          placheholderText="Search your location"
          fetchAddress={handleSearch}
        />
      </View> */}

      <MapView
        mapType="standard"
        ref={mapRef}
        showsUserLocation
        mapPadding={{top: hp(2.8), right: wp(1.4)}} // map padding
        showsBuildings
        showsScale
        onRegionChangeComplete={handleRegionChangeComplete}
        onRegionChange={() => setChanging(true)}
        style={{flex: 1, borderWidth: 1}}
        initialRegion={{
          ...curLoc,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      />
      <View style={styles.markerFixed}>
        <View
          style={[
            {
              backgroundColor: 'rgba(0,0,0,.3)',
              borderRadius: 5,
              height: 10,
              width: 10,
              elevation: 5,
              // ...global.props.ios_elevation,
              alignSelf: 'center',
              justifyContent: 'center',
              position: 'absolute',
              bottom: -5,
            },
          ]}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,.5)',
              borderRadius: 5,
              height: 7,
              width: 7,
              alignSelf: 'center',
            }}>
            <View
              style={{
                backgroundColor: 'black',
                borderRadius: 5,
                height: 5,
                width: 5,
                alignSelf: 'center',
                opacity: 0.8,
              }}
            />
          </View>
        </View>
        <Animated.Image style={markerTranslate} source={ic_greenMarker} />
      </View>

      {/* <TouchableOpacity
        onPress={() => {
          showSnack('Your current location submitted');
          navigation.navigate(stack.logoutStack.registerScreen, {
            coordinate: state.selected_coordinate,

            status: 1,
            // data,
          });
        }}
        style={{
          position: 'absolute',
          bottom: 35,
          marginHorizontal: wp(5),
          height: hp(6),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'green',
          borderRadius: hp(1),
          width: wp(90),
        }}>
        <Text style={{color: '#fff'}}>Done</Text>
      </TouchableOpacity> */}

      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: hp(25),
    // width:wp(90)
    marginHorizontal: wp(8),
    borderRadius:wp(2),
    backgroundColor:'#f2f2f2',
    marginTop:hp(1.5)
  },
  bottomCard: {
    backgroundColor: 'white',
    width: '100%',
    padding: 30,
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
  },
  inpuStyle: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    marginTop: 16,
  },
  markerFixed: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -15,
    marginTop: -6,
    zIndex: 999999,
  },
});
