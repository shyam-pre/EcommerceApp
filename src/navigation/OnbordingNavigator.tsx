import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import OnbordingScreen1 from '../screen/Onbording/OnbordingScreen1'
import OnbordingScreen2 from '../screen/Onbording/OnbordingScreen2'
const Stack = createNativeStackNavigator()
// expect  = {
//     OnbordingScreen1 : undefined
// }


// export type ProfileStackParamList = {
//   Profile: undefined;
//   EditProfile: undefined;
// };

export type OnbordingStackParamList = {
    OnbordingScreen1:undefined;
    OnbordingScreen2:undefined
}
const OnbordingNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen  name='OnbordingScreen1' component={OnbordingScreen1}/>
            <Stack.Screen  name='OnbordingScreen1' component={OnbordingScreen2}/>
        </Stack.Navigator>
    )
}

export default OnbordingNavigator