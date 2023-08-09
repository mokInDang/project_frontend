import { createStore } from 'redux';

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
	return state;
};
const store = createStore(userInfoReducer);

export default store;
