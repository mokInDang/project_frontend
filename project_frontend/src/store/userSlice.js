import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	alias: '',
	email: '',
	profileImageUrl: '',
	region: '',
	accessToken: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action) => {
			const userInfo = action.payload;
			state.alias = userInfo.alias;
			state.email = userInfo.email;
			state.region = userInfo.region;
			state.profileImageUrl = userInfo.profileImageUrl;
		},
		getToken: (state, action) => {
			state.accessToken = action.payload;
		},
	},
});

export const { login, getToken, logout } = userSlice.actions;
export default userSlice.reducer;
