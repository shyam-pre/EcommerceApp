import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducre from '../../src/redux/slices/CounterSlice'
import noteReducer from '../../src/redux/slices/NoteSlice'
import cartReducer from '../redux/slices/CardSlices'
import MainCartReducer from '../redux/slices/MainCartSlice'
import { cartApi } from '../api/cartApi'
import { reduxStorage } from "../utils/storage";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  counter: counterReducre,
  notes: noteReducer,
  cart: cartReducer,
  mainCart: MainCartReducer,
  [cartApi.reducerPath]: cartApi.reducer,
});

const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['mainCart'], // ✅ only persist cart slice
};

// wrap reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(cartApi.middleware)
  // middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware().concat(cartApi.middleware),
  // });
})

// export type RootState = ReturnType<typeof store.getState> 
// export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch