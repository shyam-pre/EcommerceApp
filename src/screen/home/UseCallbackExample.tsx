import React, { useState, useCallback } from 'react';
import { View, Button, Text } from 'react-native';

const UseCallbackExample = () => {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState(false);

  // 🧠 Without useCallback => function recreated on every render
  // 🧠 With useCallback => same function reused until dependencies change
  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []); // Empty dependency means function never changes

  return (
    <View style={{ padding: 20 }}>
      <Button title="Increment" onPress={increment} />
      <Button title="Toggle Theme" onPress={() => setTheme(!theme)} />
      <Text>Count: {count}</Text>
    </View>
  );
};

export default UseCallbackExample;


