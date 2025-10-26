// import React from 'react';
// import {View,Text} from 'react-native'
// import MapScreen from './srcc/MapScreen';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import MemoScreen from './srcc/MemoScreen';

// const App = () => {
//   return(
//     <SafeAreaView style={{flex:1}}>
//        {/* <MapScreen/> */}
//        <MemoScreen/>
//     </SafeAreaView>
//   )
// }

// export default App

import React from 'react'
import RootNavigator from "./src/navigation/RootNavigator";
import {Provider} from 'react-redux'
import { store } from './src/redux/store';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaView style={{flex:1}} edges={['top', 'bottom','left','right']}>
      <Provider store={store}>
      <RootNavigator/>
      </Provider>
    </SafeAreaView>
  )
}

export default App
