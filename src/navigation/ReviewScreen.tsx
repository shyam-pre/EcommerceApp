import { View, Text } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

const ReviewScreen = () => {
    return (
        <View style={{flex:1}}>
            <Text style={{ fontSize: moderateScale(20), padding: scale(10), marginTop: verticalScale(10) }}>ReviewScreen</Text>
        </View>
    )
}

export default ReviewScreen