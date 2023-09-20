import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userInfo: {
		email: '',
		alias: '',
		region: '',
		profileImageUrl: '',
	},
	accessToken: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action) => {
			state.userInfo = action.payload.userInfo;
			state.accessToken = action.payload.accessToken;
		},
		logout: (state, action) => {
			state.userInfo = {};
		},
	},
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
