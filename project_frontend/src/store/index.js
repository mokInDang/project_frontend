import { createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

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
	return state;
};
const store = createStore(userInfoReducer, composeWithDevTools());

export default store;
