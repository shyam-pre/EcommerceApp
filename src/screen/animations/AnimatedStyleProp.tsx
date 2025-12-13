import React from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import Animated, {
    useSharedValue,
    withSpring,
    useAnimatedStyle,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AnimatedStyleProp({navigation}) {
    const translateX = useSharedValue<number>(0);

    const handlePress = () => {
        translateX.value += 50;
    };

    //   const animatedStyles = useAnimatedStyle(() => ({
    //     transform: [{ translateX: withSpring(translateX.value * 2) }],
    //   }));

    const amimatedStyles = useAnimatedStyle(() => {
        return ({
            transform: [{ translateX: withSpring(translateX.value) }]
        })
    })

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Animated.View style={[styles.box, amimatedStyles]} />
            <View style={styles.container}>
                <Button onPress={handlePress} title="Click me" />
            </View>

            <Text onPress={() => navigation.navigate('ProductScreen')}>Product screen</Text>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        height: 120,
        width: 120,
        backgroundColor: '#b58df1',
        borderRadius: 20,
        marginVertical: 50,
    },
});