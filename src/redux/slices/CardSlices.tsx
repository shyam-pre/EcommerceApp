import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { keys, getData, saveData } from '../../utils/storage'

export interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
}

interface CartState {
  cartItems: CartItem[]
}

// ✅ Load saved cart from MMKV
const initialState: CartState = {
  cartItems: getData(keys.Cart_Data) || []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // ✅ Add to cart (if exists, increase quantity)  
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload 
      const existingItem = state.cartItems.find(i => i.id === item.id)

      // if (existingItem) {
      //   existingItem.quantity += item.quantity
      // } else {
      //   state.cartItems.push({ ...item, quantity: item.quantity || 1 })
      // }
      // saveData(keys.Cart_Data, state.cartItems)

      if (!existingItem) {
        state.cartItems.push({ ...item, quantity: item.quantity || 1 })
      }

      
      saveData(keys.Cart_Data, state.cartItems)
    },

    updateCart:(state, action:PayloadAction<CartItem>) => {
      const updatedItem   = action.payload
      const index  = state.cartItems.findIndex(i => i.id === updatedItem.id )
      if(index  !== -1){
        state.cartItems[index ] = updatedItem
      }
    },  
    
    // ✅ Remove from cart completely
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(i => i.id !== action.payload)
      saveData(keys.Cart_Data, state.cartItems)
    },

    // ✅ Increase quantity
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find(i => i.id === action.payload)
      if (item) {
        item.quantity += 1
        saveData(keys.Cart_Data, state.cartItems)
      }
    },

    // ✅ Decrease quantity (remove item if 0)
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find(i => i.id === action.payload)
      if (item) { 
        if (item.quantity > 1) {
          item.quantity -= 1
        } else {
          // remove if quantity goes to 0
          state.cartItems = state.cartItems.filter(i => i.id !== action.payload)
        }
        saveData(keys.Cart_Data, state.cartItems)
      }
    },

    // ✅ Clear full cart
    clearCart: (state) => {
      state.cartItems = []
      saveData(keys.Cart_Data, [])
    },
  },
})

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity ,updateCart} =
  cartSlice.actions

export default cartSlice.reducer
