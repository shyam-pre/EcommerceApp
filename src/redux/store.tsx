import { configureStore } from "@reduxjs/toolkit";
import counterReducre from '../../src/redux/slices/CounterSlice'
import noteReducer from '../../src/redux/slices/NoteSlice'
import cardReducer from '../redux/slices/CardSlices'

export const store = configureStore({
    reducer: {
        counter: counterReducre,
        notes: noteReducer,
        cart: cardReducer,

    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;