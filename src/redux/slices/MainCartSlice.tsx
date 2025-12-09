import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Cart } from '../../api/cartApi'

// interface 
interface CartState {
    carts: Cart[]
}

const initialState: CartState = {
    carts: []
}

export const MainCartSlice = createSlice({
    name: 'mainCart',
    initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<Cart>) => {
            const exists = state.carts?.find(cart => cart.id === action.payload.id)
            console.log('eeeeeee', exists);
            
            if (!exists ) {
                state.carts?.push(action.payload)
            }
        },
      
        // updateCart : (state, action:PayLoadAction<Cart>) => {
        //     const 
        // },
        clearCart: (state) => {
            state.carts = []
        }
    }
})

export const { addItemToCart, clearCart } = MainCartSlice.actions
export default MainCartSlice.reducer