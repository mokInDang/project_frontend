import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	email: '',
	alias: '',
	region: '',
	profileImageUrl: '',
	accessToken: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action) => {
			state.email = action.payload.email;
			state.alias = action.payload.alias;
			state.region = action.payload.region;
			state.profileImageUrl = action.payload.profileImageUrl;
		},
		getToken: (state, action) => {
			state.accessToken = action.payload;
		},
	},
});

export const { login, getToken, logout } = userSlice.actions;
export default userSlice.reducer;
