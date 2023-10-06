import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ArticlePage from '../pages/ArticlePage/ArticlePage';
import MainPage from '../pages/MainPage/MainPage';
import AuthPage from '../pages/AuthPage/AuthPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import CreatePage from '../pages/CreatePage/CreatePage';
import PrivateRouter from './privateRouter';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import EditPage from '../pages/EditPage/EditPage';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setUser } from '../store/reducers/authSlice';

function Router() {
	const dispatch = useAppDispatch();
	const { token } = useAppSelector((state) => state.auth);
	const user = JSON.parse(localStorage.getItem('user') || '{}');

	useEffect(() => {
		dispatch(setUser(user));
	}, []);
	return (
		<Routes>
			<Route element={<PrivateRouter />}>
				<Route path="/new-article" element={<CreatePage />} />
				<Route path="/edit-profile" element={<ProfilePage />} />
				<Route path="/articles/:slug/edit" element={<EditPage />} />
			</Route>
			<Route path="/" element={<MainPage />} />
			<Route path="/articles" element={<MainPage />} />
			<Route path="/articles/:slug" element={<ArticlePage />} />
			<Route
				path="/sign-up"
				element={token ? <Navigate to="/" /> : <RegisterPage />}
			/>
			<Route
				path="/sign-in"
				element={token ? <Navigate to="/" /> : <AuthPage />}
			/>
		</Routes>
	);
}

export default Router;
