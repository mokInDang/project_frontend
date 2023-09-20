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
			state.userInfo = action.payload;
		},
        getToken: (state, action) =>{
            state.accessToken = action.payload
        },
		logout: (state, action) => {
			state.userInfo = {};
		},
	},
});

export const { login, getToken, logout } = userSlice.actions;
export default userSlice.reducer;
