import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['userInfo'],
};

const userInfoReducer = (
	state = {
		userInfo: {
			email: '',
			alias: '',
			region: '',
			profileImageUrl: '',
		},
		isLogined: false,
		accessToken: '',
	},
	action
) => {
	if (action.type === 'login') {
		return {
			userInfo: action.userInfo,
			isLogined: true,
			accessToken: action.accessToken,
		};
	}
	if (action.type === 'logout') {
		return {
			userInfo: {
				email: '',
				alias: '',
				region: '',
				profileImageUrl: '',
			},
			isLogined: false,
		};
	}
	if (action.type === 'test') {
		return {
			userInfo: action.userInfo,
			isLogined: true,
			accessToken: action.accessToken,
		};
	}
	if (action.type === 'mypage') {
		return {
			...state,
			userInfo: action.userInfo,
		};
	}
	if (action.type === 'accessToken') {
		return {
			...state,
			accessToken: action.accessToken,
		};
	}
	return state;
};
const combinedReducer = combineReducers({ user: userInfoReducer });
const rootReducer = persistReducer(persistConfig, combinedReducer);
export const store = createStore(rootReducer, composeWithDevTools());
export const persistor = persistStore(store);
