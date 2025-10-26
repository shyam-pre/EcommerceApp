import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getData, keys, removeData, saveData } from '../../utils/storage'

export interface CartItem {
    id: number,
    title: string,
    price: number,
    quentity: number
}

interface CartState {
    cartItems: CartItem[]
}

// load save card for mmkv
const initialState: CartState = {
    cartItems: getData(keys.Cart_Data) || []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,

    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const item = action.payload
            let existingItem = state.cartItems.find(i => i.id === item.id)
            if (!existingItem) {
                state.cartItems.push({ ...item, quentity: item.quentity || 1 })
            }
            saveData(keys.Cart_Data, state.cartItems)
        },

        removeFromCart: (state, action: PayloadAction<number>) => {
            state.cartItems = state.cartItems.filter(i => i.id !== action.payload),
                saveData(keys.Cart_Data, state.cartItems)
        },

        increaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.cartItems.find(i => i.id === action.payload)
                if (item) {
                    item.quentity += 1
                } 
                saveData(keys.Cart_Data, state.cartItems)
        },

        decreaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.cartItems.find(i => i.id === action.payload)
            if (item) {
                if (item.id > 1) {
                    item.quentity -= 1
                } else {
                    state.cartItems = state.cartItems.filter(i => i.id !== action.payload)
                }
                saveData(keys.Cart_Data, state.cartItems)
            }
        },

        clearCart: (state) => {
            state.cartItems = [],
                saveData(keys.Cart_Data, state.cartItems)
        }
    }
})

// export const {addToCart, removeFromCart,increaseQuantity,decreaseQuantity,clearCart} = cartSlice.actions

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions

export default cartSlice.reducer