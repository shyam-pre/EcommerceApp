import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, TextInput, Keyboard, Alert } from 'react-native'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { addToCart, clearCart, removeFromCart, increaseQuantity, decreaseQuantity ,updateCart} from '../../redux/slices/CardSlices'
import { useAddCartMutation } from '../../api/cartApi'

const CartScreen = () => {
  const dispatch = useAppDispatch()

  const [addCart, { data: AddCartData, isLoading: AddCartLoading, error: AddCartError, isSuccess }] = useAddCartMutation();
  const { cartItems } = useAppSelector(state => state.cart)
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [editStatus, setEditStatus] = useState<boolean>(false)
  const [editId, setEditId] = useState<number | null>(null)

  const handlePrice = (text:string) => {
    const numericValue = text.replace(/[^0-9]+/g, "");
    setPrice(numericValue)
  }

  const handleTitle = (text:string) => {
    setTitle(text.trim())
  }
  
  const handleAdd = () => {
    if (!title.trim() || !price.trim()) return

    // const newItem = {
    //   id: Date.now(),
    //   title,
    //   price: parseFloat(price),
    //   quantity: 1,
    // }
    
    const newItem = {
      id: editStatus && editId ? editId : Date.now(), // ✅ use same ID in edit mode
      title,
      price: parseFloat(price),
      quantity: 1,
    }

    if (editStatus) {
      dispatch(updateCart(newItem))
      // Alert.alert('Updated successfully ✅')
    } else {
      dispatch(addToCart(newItem))
      // Alert.alert('Added successfully ✅')
    }
   if(editStatus){
 
  dispatch(updateCart(newItem))
   }else{
   Alert.alert('sdfafasfds')
  dispatch(addToCart(newItem))
  }

    setTitle('')
    setPrice('')
    setEditId(null)
    setEditStatus(false)
    Keyboard.dismiss()
  }

  const handleEditInput = (item : any) => {
  setEditStatus(true),
     setEditId(item.id)       
  setPrice(String(item?.price))
  setTitle(item?.title)
 }

  
    const handleAddCart = async () => {
        // Alert.alert('aaaaaaaaaaaaaaaaaa')
        await addCart({
            userId: 1,
            products:cartItems
            //  [
            //     { id: 144, quantity: 4 },
            //     { id: 98, quantity: 1 },
            // ],
        });
    };

useEffect(() => {
   let cartData = async() => {
 try{
      let response = await fetch('https://dummyjson.com/carts')
      if(response){
      let newRes = await response.json();
      console.log('newRes', newRes);
      
      }
    }catch (error) {
      console.log('errr', error)
    }
   }
cartData()
},[])
  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: '#fff' }}>
      {/* Input Section */}
      <TextInput
        placeholder="Item name"
        value={title}
        onChangeText={handleTitle}
        style={{ borderWidth: 1, borderRadius: 5, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        onChangeText={handlePrice}
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
              <TouchableOpacity
                onPress={() => handleEditInput(item)}
                style={{ marginLeft: 20, borderWidth:1,borderColor:'#000', padding:4, borderRadius:5 }}>
                <Text style={{ color: 'blue', fontWeight: '600' }}>Edit</Text>
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

// import React, { useState, useMemo, useCallback, useEffect } from 'react';
// import { View, Text, Button } from 'react-native';
// import MapScreen from '../../../srcc/MapScreen';
// import { useSelector } from 'react-redux';

// const CartScreen = () => {
//   const [count, setCount] = useState(0);
//   const [dark, setDark] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState('');

//   // 👇 useMemo caches this value until 'count' changes
//   // const doubleCount = useMemo(() => {
//   //   console.log('Calculating double...');
//   //   return count * 2;
//   // }, [count]); // dependency
//   const doubleCount  = useMemo(() => {
//     console.log('.................s');
//     return count * 2
//   },[count])

//     // ✅ useCallback keeps handlePress the same between renders
//   // const hellofn = useCallback(() => {
//   //   setCount(pre => pre + 1)
//   // }, [])   // no - dependency never recreated


//   const themeStyle = {
//     backgroundColor: dark ? '#333' : '#fff',
//     color: dark ? '#fff' : '#000',
//     padding: 20,
//   };
//   return (
//     <View style={[{ flex: 1 }, themeStyle]}>
//       <Text style={{ color: themeStyle.color, fontSize: 20 }}>
//         Count: {count}
//       </Text>
//       <Text style={{ color: themeStyle.color, fontSize: 20 }}>
//         Double: {doubleCount}
//       </Text>

//       <Button title="Increment" onPress={() => setCount(count + 1)} />
//       <Button title="Toggle Theme" onPress={() => setDark(!dark)} />

//                     {/* <MapScreen  /> */}
        
//     </View>
//   );
// };

// export default CartScreen;
