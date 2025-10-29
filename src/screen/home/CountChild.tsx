import React from 'react'
import { View, Text } from 'react-native'

interface countChildProp {
    count : number
}

// const CountChild =  ({count} : {count : number}) => {


const CountChild =  ({count} : countChildProp) => {
    console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj', count);
      console.log('🔴 RE-RENDERED - Count:', count);
    return (
    <View>
      <Text>CountChild {count}</Text>
    </View>
  )
}

export default React.memo(CountChild)
// export default CountChild