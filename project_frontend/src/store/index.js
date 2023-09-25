import { combineReducers, configureStore } from '@reduxjs/toolkit';
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
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	storage,
	whiteList: ['user'],
};
const rootReducer = combineReducers({
	user: userInfoReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
	reducer: persistedReducer,
	preloadedState: {
		loading: {
			loadingState: true,
		},
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});
export const persistor = persistStore(store);
