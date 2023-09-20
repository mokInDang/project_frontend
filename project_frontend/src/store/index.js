import { configureStore } from '@reduxjs/toolkit';
import userInfoReducer from './userSlice';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
const storage = createWebStorage("local");
const persistConfig = {
    key: "root",
    storage,
    whiteList:["user"]
}
const persistedReducer = persistReducer(persistConfig,userInfoReducer)
export const store = configureStore({ reducer: persistedReducer, middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:{ignoredActions:[
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER]}}) });
    export const persistor = persistStore(store);
