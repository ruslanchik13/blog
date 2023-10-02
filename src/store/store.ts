import { configureStore } from '@reduxjs/toolkit';
import articleApi from '../services/articleService';
import { authSlice } from './reducers/authSlice';

const store = configureStore({
	reducer: {
		[articleApi.reducerPath]: articleApi.reducer,
		auth: authSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(articleApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
