// import React, { useState } from 'react'
// import { View, Text, TouchableOpacity, FlatList, TextInput, Keyboard } from 'react-native'
// import { useAppDispatch, useAppSelector } from '../../redux/hooks'
// import { addToCart, clearCart, removeFromCart, increaseQuantity, decreaseQuantity } from '../../redux/slices/CardSlices'

// const CartScreen = () => {
//   const dispatch = useAppDispatch()
//   const { cartItems } = useAppSelector(state => state.cart)
//   const [title, setTitle] = useState('')
//   const [price, setPrice] = useState('')

//   const handleAdd = () => {
//     if (!title.trim() || !price.trim()) return

//     const newItem = {
//       id: Date.now(),
//       title,
//       price: parseFloat(price),
//       quantity: 1,
//     }

//     dispatch(addToCart(newItem))
//     setTitle('')
//     setPrice('')
//     Keyboard.dismiss()
//   }

//   return (
//     <View style={{ flex: 1, padding: 10, backgroundColor: '#fff' }}>
//       {/* Input Section */}
//       <TextInput
//         placeholder="Item name"
//         value={title}
//         onChangeText={setTitle}
//         style={{ borderWidth: 1, borderRadius: 5, marginBottom: 10, padding: 8 }}
//       />
//       <TextInput
//         placeholder="Price"
//         keyboardType="numeric"
//         value={price}
//         onChangeText={setPrice}
//         style={{ borderWidth: 1, borderRadius: 5, marginBottom: 10, padding: 8 }}
//       />

//       <TouchableOpacity
//         onPress={handleAdd}
//         style={{ backgroundColor: '#2196F3', padding: 12, borderRadius: 5, marginBottom: 15 }}
//       >
//         <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '600' }}>Add to Cart</Text>
//       </TouchableOpacity>

//       {/* Cart List */}
//       <FlatList
//         data={cartItems}
//         keyExtractor={(item) => item.id.toString()}
//         ListEmptyComponent={
//           <Text style={{ textAlign: 'center', color: 'gray', marginTop: 20 }}>No items in cart</Text>
//         }
//         renderItem={({ item }) => (
//           <View
//             style={{
//               borderBottomWidth: 1,
//               borderColor: '#ccc',
//               paddingVertical: 10,
//               marginBottom: 5,
//             }}
//           >
//             <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.title}</Text>
//             <Text>₹{item.price}</Text>

//             {/* Quantity Controls */}
//             <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
//               <TouchableOpacity
//                 onPress={() => dispatch(decreaseQuantity(item.id))}
//                 style={{
//                   borderWidth: 1,
//                   borderColor: '#aaa',
//                   borderRadius: 5,
//                   paddingHorizontal: 10,
//                   paddingVertical: 5,
//                 }}
//               >
//                 <Text style={{ fontSize: 18 }}>−</Text>
//               </TouchableOpacity>

//               <Text style={{ marginHorizontal: 10, fontSize: 16 }}>{item.quantity}</Text>

//               <TouchableOpacity
//                 onPress={() => dispatch(increaseQuantity(item.id))}
//                 style={{
//                   borderWidth: 1,
//                   borderColor: '#aaa',
//                   borderRadius: 5,
//                   paddingHorizontal: 10,
//                   paddingVertical: 5,
//                 }}
//               >
//                 <Text style={{ fontSize: 18 }}>+</Text> 
//               </TouchableOpacity>

//               {/* Remove Button */}
//               <TouchableOpacity
//                 onPress={() => dispatch(removeFromCart(item.id))}
//                 style={{ marginLeft: 20 }}
//               >
//                 <Text style={{ color: 'red', fontWeight: '600' }}>Remove</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       />

//       {/* Clear Cart Button */}
//       {cartItems.length > 0 && (
//         <TouchableOpacity
//           onPress={() => dispatch(clearCart())}
//           style={{ backgroundColor: 'tomato', padding: 12, borderRadius: 5, marginTop: 15 }}
//         >
//           <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '600' }}>Clear Cart</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   )
// }

// export default CartScreen

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import MapScreen from '../../../srcc/MapScreen';
import { useSelector } from 'react-redux';

const CartScreen = () => {
  const [count, setCount] = useState(0);
  const [dark, setDark] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');

  // 👇 useMemo caches this value until 'count' changes
  const doubleCount = useMemo(() => {
    console.log('Calculating double...');
    return count * 2;
  }, [count]); // dependency

    // ✅ useCallback keeps handlePress the same between renders
  // const hellofn = useCallback(() => {
  //   setCount(pre => pre + 1)
  // }, [])   no - dependency never recreated

  const themeStyle = {
    backgroundColor: dark ? '#333' : '#fff',
    color: dark ? '#fff' : '#000',
    padding: 20,
  };


  // const locationData = useSelector(
  //     state => state.locationData.selected_coordinate,
  //   );
  
  //   useEffect(() => {
  //     // Only dispatch if locationData is not already set
  //     if (!locationData) {
  //       dispatch(selectLocationData());
  //     }
  //   }, [dispatch, locationData]); // Add locationData as a dependency
    // console.log('Selected Location Data:ss1111111111aa', locationData);
  
    // useEffect(() => {
    //   if (locationData?.latitude && locationData?.longitude) {
    //     // Perform reverse geocoding
    //     Geocoder.from(locationData?.latitude, locationData?.longitude)
    //       .then(json => {
    //         const addressComponent = json.results[0].formatted_address;
    //         setSelectMapLocation(addressComponent);
    //       })
    //       .catch(error => console.warn('Error: ', error));
    //   }
    // }, [locationData]);
  return (
    <View style={[{ flex: 1 }, themeStyle]}>
      <Text style={{ color: themeStyle.color, fontSize: 20 }}>
        Count: {count}
      </Text>
      <Text style={{ color: themeStyle.color, fontSize: 20 }}>
        Double: {doubleCount}
      </Text>

      <Button title="Increment" onPress={() => setCount(count + 1)} />
      <Button title="Toggle Theme" onPress={() => setDark(!dark)} />

                    {/* <MapScreen  /> */}
        
    </View>
  );
};

export default CartScreen;
