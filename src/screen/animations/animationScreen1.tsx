// import React, { useState } from "react";
// import { Text, TouchableOpacity, View, StyleSheet, Button, useWindowDimensions } from "react-native";
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   withSpring,
// } from "react-native-reanimated";
// import { scale, moderateScale, VerticalScale } from 'react-native-size-matters'
// import { wp } from "../../utils/responsive";

// export default function InstaCommentReanimated({ navigation }) {
//   const [visible, setVisible] = useState(false);

//   const height = useSharedValue(0);
//   const opacity = useSharedValue(0);
//   const width = useSharedValue(100);
//   const translateX = useSharedValue(0)

//   const handlePressx = () => {
//     translateX.value = withSpring(translateX.value += 50)
//   }

//   const toggle = () => {
//     setVisible(!visible);

//     if (!visible) {
//       height.value = withTiming(120, { duration: 300 });
//       opacity.value = withTiming(1, { duration: 250 });
//     } else {
//       height.value = withTiming(0, { duration: 250 });
//       opacity.value = withTiming(0, { duration: 200 });
//     }
//   };

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       height: height.value,
//       opacity: opacity.value,
//     };
//   });

//   const handlePress = () => {
//     width.value = withSpring(width.value + 50)
//   }
//   return (
//     <View style={{ flex: 1 }}>
//       <TouchableOpacity onPress={toggle}>
//         <Text style={{ fontSize: 18, marginBottom: 8 }}>
//           {visible ? "Hide Comments" : "View Comments"}
//         </Text>
//       </TouchableOpacity>

//       <Animated.View style={[styles.box, animatedStyle]}>
//         {visible && (
//           <View>
//             <Text style={styles.txt}>Nice picture!</Text>
//             <Text style={styles.txt}>Amazing shot 🔥</Text>
//             <Text style={styles.txt}>Love this ❤️</Text>
//           </View>
//         )}
//       </Animated.View>

//       <View style={{ alignItems: "center" }}>
//         <Animated.View style={[styles.animatedBox, { transform: [{ translateX }] }]} />
//         <Button onPress={handlePressx} title="Click me " />
//       </View>

//       <TouchableOpacity style={{}} onPress={() => navigation.navigate('AnimatedStyleProp')}>
//       <Text style={{ fontSize: moderateScale(16), color: '#000' }}>Animated</Text></TouchableOpacity>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   box: {
//     overflow: "hidden",
//     backgroundColor: "#f0f0f0",
//     borderRadius: 12,
//     paddingHorizontal: 12,
//   },
//   txt: {
//     fontSize: 16,
//     paddingVertical: 6,
//   },
//   animatedBox: {
//     height: wp(30),
//     aspectRatio: 1,
//     backgroundColor: 'violet',
//     borderWidth: 2
//   }
// });


import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Animated,
} from "react-native";

export default function StickySearchScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],       // kitna scroll par effect
    outputRange: [80, 50],     // height choti hoti jayegi
    extrapolate: "clamp",
  });

  const searchBarTop = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [20, 5], // top margin reduce
    extrapolate:"clamp",
  });

  const DATA = Array.from({ length: 25 }).map((_, i) => ({
    id: i.toString(),
    title: `Product ${i + 1}`,
  }));

  return (
    <View style={styles.container}>
      
      {/* 🔥 Animated Sticky Header */}
      <Animated.View
        style={[
          styles.header,
          { height: headerHeight },
        ]}
       >
        <Animated.View style={[styles.searchWrapper, { marginTop: searchBarTop }]}> 
          <TextInput
            placeholder="Search products..."  
            style={styles.searchBox}
          />
        </Animated.View>
      </Animated.View>

      {/* 🔥 FlatList */}
      <Animated.FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 90 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={{ fontSize: 16 }}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#6a5acd",
    zIndex: 50,
    paddingHorizontal: 15,
    elevation: 10,
  },

  searchWrapper: {
    width: "100%",
  },

  searchBox: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 5,
  },

  card: {
    padding: 20,
    marginHorizontal: 15,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginBottom: 12,
  },
});
