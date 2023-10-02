import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
	token: string | null;
	username: string | null;
	image: string | null;
	email: string | null;
}

const initialState = {
	token: null,
	username: null,
	image: null,
	email: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state: IState, action: PayloadAction<IState>) => {
			localStorage.setItem(
				'user',
				JSON.stringify({
					username: action.payload.username,
					token: action.payload.token,
					image: action.payload.image,
					email: action.payload.email || null,
				})
			);
			state.username = action.payload.username;
			state.image = action.payload.image;
			state.token = action.payload.token;
			state.email = action.payload.email;
		},
		logout: (state) => {
			localStorage.clear();
			state.username = null;
			state.token = null;
			state.image = null;
		},
	},
});

export const { setUser, logout } = authSlice.actions;
