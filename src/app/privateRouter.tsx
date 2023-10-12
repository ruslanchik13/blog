import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { authSelector } from '../store/reducers/authSlice';

function PrivateRouter() {
	const { token } = useAppSelector(authSelector);
	return token ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default PrivateRouter;
