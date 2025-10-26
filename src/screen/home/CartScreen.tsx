// import React, { useState } from 'react'
// import { View, Text, TouchableOpacity, FlatList, TextInput, Keyboard } from 'react-native'
// import { useAppDispatch, useAppSelector } from '../../redux/hooks'
// import { addToCart, clearCart, removeFromCart } from '../../redux/slices/CardSlices'

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
//     <View style={{ flex: 1, padding: 10 }}>
//       <TextInput
//         placeholder="Item name"
//         value={title}
//         onChangeText={setTitle}
//         style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
//       />
//       <TextInput
//         placeholder="Price"
//         keyboardType="numeric"
//         value={price}
//         onChangeText={setPrice}
//         style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
//       />
//       <TouchableOpacity onPress={handleAdd}>
//         <Text style={{ textAlign: 'center', backgroundColor: '#ddd', padding: 12 }}>Add to Cart</Text>
//       </TouchableOpacity>

//       <FlatList
//         data={cartItems}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={{ borderBottomWidth: 1, paddingVertical: 10 }}>
//             <Text>{item.title}</Text>
//             <Text>₹{item.price}</Text>
//             <Text>Qty: {item.quantity}</Text>
//             <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))}>
//               <Text style={{ color: 'red' }}>Remove</Text>
//             </TouchableOpacity>
//             <View style={{flexDirection:'row',justifyContent:'space-between'}}>
//             <TouchableOpacity onPress={() => dispatch(increaseQuan(1))}>
//               <Text style={{ color: 'red' }}>Remove</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => dispatch(decreaseQuantity(1))}>
//               <Text style={{ color: 'red' }}>Remove</Text>
//             </TouchableOpacity>
//           </View>
//           </View>
//         )}
//       />

//       {cartItems.length > 0 && (
//         <TouchableOpacity onPress={() => dispatch(clearCart())}>
//           <Text style={{ textAlign: 'center', backgroundColor: 'tomato', color: '#fff', padding: 12 }}>
//             Clear Cart
//           </Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   )
// }

// export default CartScreen

import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, TextInput, Keyboard } from 'react-native'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { addToCart, clearCart, removeFromCart, increaseQuantity, decreaseQuantity } from '../../redux/slices/CardSlices'

const CartScreen = () => {
  const dispatch = useAppDispatch()
  const { cartItems } = useAppSelector(state => state.cart)
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')

  const handleAdd = () => {
    if (!title.trim() || !price.trim()) return

    const newItem = {
      id: Date.now(),
      title,
      price: parseFloat(price),
      quantity: 1,
    }

    dispatch(addToCart(newItem))
    setTitle('')
    setPrice('')
    Keyboard.dismiss()
  }

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: '#fff' }}>
      {/* Input Section */}
      <TextInput
        placeholder="Item name"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, borderRadius: 5, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
        style={{ borderWidth: 1, borderRadius: 5, marginBottom: 10, padding: 8 }}
      />

      <TouchableOpacity
        onPress={handleAdd}
        style={{ backgroundColor: '#2196F3', padding: 12, borderRadius: 5, marginBottom: 15 }}
      >
        <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '600' }}>Add to Cart</Text>
      </TouchableOpacity>

      {/* Cart List */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', color: 'gray', marginTop: 20 }}>No items in cart</Text>
        }
        renderItem={({ item }) => (
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: '#ccc',
              paddingVertical: 10,
              marginBottom: 5,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.title}</Text>
            <Text>₹{item.price}</Text>

            {/* Quantity Controls */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
              <TouchableOpacity
                onPress={() => dispatch(decreaseQuantity(item.id))}
                style={{
                  borderWidth: 1,
                  borderColor: '#aaa',
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              >
                <Text style={{ fontSize: 18 }}>−</Text>
              </TouchableOpacity>

              <Text style={{ marginHorizontal: 10, fontSize: 16 }}>{item.quantity}</Text>

              <TouchableOpacity
                onPress={() => dispatch(increaseQuantity(item.id))}
                style={{
                  borderWidth: 1,
                  borderColor: '#aaa',
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              >
                <Text style={{ fontSize: 18 }}>+</Text>
              </TouchableOpacity>

              {/* Remove Button */}
              <TouchableOpacity
                onPress={() => dispatch(removeFromCart(item.id))}
                style={{ marginLeft: 20 }}
              >
                <Text style={{ color: 'red', fontWeight: '600' }}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Clear Cart Button */}
      {cartItems.length > 0 && (
        <TouchableOpacity
          onPress={() => dispatch(clearCart())}
          style={{ backgroundColor: 'tomato', padding: 12, borderRadius: 5, marginTop: 15 }}
        >
          <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '600' }}>Clear Cart</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default CartScreen
