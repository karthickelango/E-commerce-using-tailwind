import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from 'redux-thunk'
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from 'redux-persist/lib/storage'
import cartSlice from "./cartSlice";
import previewSlice from "./previewSlice";

const persistConfig = {
    key: 'root',
    storage,
  }

  const rootReducer = combineReducers({ 
    cart: cartSlice,
    previewpage: previewSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})

export const persistor = persistStore(store)